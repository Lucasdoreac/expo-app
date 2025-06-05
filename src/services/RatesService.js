import WebSafeStorage from '../utils/webStorage';

// Serviço para buscar taxas em tempo real
class RatesService {
  // URLs das APIs
  static BCB_BASE_URL = 'https://api.bcb.gov.br/dados/serie/bcdata.sgs';
  static AWESOME_API_URL = 'https://economia.awesomeapi.com.br/json/last';
  
  // Códigos das séries do Banco Central
  static SERIES = {
    SELIC: 432,      // Taxa Selic
    CDI: 12,         // Taxa DI
    IPCA: 433,       // IPCA (inflação)
    DOLAR: 1        // Dólar comercial (PTax)
  };
  
  // Cache keys
  static CACHE_KEYS = {
    BC_RATES: 'bc_rates_cache',
    EXCHANGE_RATES: 'exchange_rates_cache',
    LAST_UPDATE: 'rates_last_update'
  };
  
  // Duração do cache (em milissegundos)
  static CACHE_DURATION = {
    BC_RATES: 24 * 60 * 60 * 1000,      // 24 horas
    EXCHANGE_RATES: 30 * 60 * 1000      // 30 minutos
  };

  // Verificar se o cache está válido
  static async isCacheValid(cacheKey, duration) {
    try {
      const lastUpdate = await WebSafeStorage.getItem(`${cacheKey}_timestamp`);
      if (!lastUpdate) return false;
      
      const now = Date.now();
      const cacheTime = parseInt(lastUpdate);
      return (now - cacheTime) < duration;
    } catch (error) {
      console.log('Erro ao verificar cache:', error);
      return false;
    }
  }

  // Salvar no cache
  static async saveToCache(cacheKey, data) {
    try {
      await WebSafeStorage.setItem(cacheKey, JSON.stringify(data));
      await WebSafeStorage.setItem(`${cacheKey}_timestamp`, Date.now().toString());
    } catch (error) {
      console.log('Erro ao salvar cache:', error);
    }
  }

  // Carregar do cache
  static async loadFromCache(cacheKey) {
    try {
      const cached = await WebSafeStorage.getItem(cacheKey);
      return cached ? JSON.parse(cached) : null;
    } catch (error) {
      console.log('Erro ao carregar cache:', error);
      return null;
    }
  }
  // Buscar taxa do Banco Central
  static async fetchBCRate(seriesCode) {
    try {
      const url = `${this.BCB_BASE_URL}.${seriesCode}/dados/ultimos/1?formato=json`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data && data.length > 0) {
        return {
          value: parseFloat(data[0].valor),
          date: data[0].data,
          source: 'Banco Central'
        };
      }
      
      throw new Error('Dados não encontrados');
    } catch (error) {
      console.log(`Erro ao buscar série ${seriesCode}:`, error);
      throw error;
    }
  }

  // Buscar todas as taxas do Banco Central
  static async fetchBCRates() {
    const cacheKey = this.CACHE_KEYS.BC_RATES;
    
    // Verificar cache primeiro
    const isValid = await this.isCacheValid(cacheKey, this.CACHE_DURATION.BC_RATES);
    if (isValid) {
      const cached = await this.loadFromCache(cacheKey);
      if (cached) return cached;
    }

    try {
      // Buscar dados atualizados
      const [selic, cdi, ipca] = await Promise.all([
        this.fetchBCRate(this.SERIES.SELIC),
        this.fetchBCRate(this.SERIES.CDI),
        this.fetchBCRate(this.SERIES.IPCA)
      ]);

      // Calcular poupança (70% da Selic se > 8.5%, senão TR + 6.17%)
      const poupanca = {
        value: selic.value > 8.5 ? selic.value * 0.7 : 6.17, // Simplificado
        date: selic.date,
        source: 'Calculado (70% Selic)'
      };

      const rates = {
        selic,
        cdi,
        ipca,
        poupanca,
        lastUpdate: new Date().toISOString()
      };

      // Salvar no cache
      await this.saveToCache(cacheKey, rates);
      
      return rates;
    } catch (error) {
      console.log('Erro ao buscar taxas BC:', error);
      
      // Fallback para cache (mesmo expirado)
      const cached = await this.loadFromCache(cacheKey);
      if (cached) {
        return { ...cached, isStale: true };
      }
      
      throw error;
    }
  }
  // Buscar taxas de câmbio
  static async fetchExchangeRates() {
    const cacheKey = this.CACHE_KEYS.EXCHANGE_RATES;
    
    // Verificar cache primeiro
    const isValid = await this.isCacheValid(cacheKey, this.CACHE_DURATION.EXCHANGE_RATES);
    if (isValid) {
      const cached = await this.loadFromCache(cacheKey);
      if (cached) return cached;
    }

    try {
      // Buscar USD, EUR e BTC
      const url = `${this.AWESOME_API_URL}/USD-BRL,EUR-BRL,BTC-BRL`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      const rates = {
        usd: {
          value: parseFloat(data.USDBRL.ask),
          date: data.USDBRL.create_date,
          source: 'AwesomeAPI'
        },
        eur: {
          value: parseFloat(data.EURBRL.ask),
          date: data.EURBRL.create_date,
          source: 'AwesomeAPI'
        },
        btc: {
          value: parseFloat(data.BTCBRL.ask),
          date: data.BTCBRL.create_date,
          source: 'AwesomeAPI'
        },
        lastUpdate: new Date().toISOString()
      };

      // Salvar no cache
      await this.saveToCache(cacheKey, rates);
      
      return rates;
    } catch (error) {
      console.log('Erro ao buscar câmbio:', error);
      
      // Fallback para cache (mesmo expirado)
      const cached = await this.loadFromCache(cacheKey);
      if (cached) {
        return { ...cached, isStale: true };
      }
      
      throw error;
    }
  }

  // Função principal: buscar todas as taxas
  static async getAllRates() {
    try {
      const [bcRates, exchangeRates] = await Promise.all([
        this.fetchBCRates(),
        this.fetchExchangeRates()
      ]);

      return {
        success: true,
        rates: {
          ...bcRates,
          ...exchangeRates
        },
        isStale: bcRates.isStale || exchangeRates.isStale
      };
    } catch (error) {
      console.log('Erro ao buscar todas as taxas:', error);
      
      // Tentar carregar qualquer cache disponível
      const [bcCache, exchangeCache] = await Promise.all([
        this.loadFromCache(this.CACHE_KEYS.BC_RATES),
        this.loadFromCache(this.CACHE_KEYS.EXCHANGE_RATES)
      ]);

      if (bcCache || exchangeCache) {
        return {
          success: false,
          rates: {
            ...(bcCache || {}),
            ...(exchangeCache || {})
          },
          isStale: true,
          error: error.message
        };
      }

      // Fallback para taxas padrão
      return {
        success: false,
        rates: this.getDefaultRates(),
        isStale: true,
        error: error.message
      };
    }
  }

  // Taxas padrão para fallback
  static getDefaultRates() {
    return {
      selic: { value: 12.25, date: '01/12/2025', source: 'Estimativa' },
      cdi: { value: 12.15, date: '01/12/2025', source: 'Estimativa' },
      ipca: { value: 4.68, date: '01/12/2025', source: 'Estimativa' },
      poupanca: { value: 8.58, date: '01/12/2025', source: 'Estimativa' },
      usd: { value: 5.42, date: '01/12/2025', source: 'Estimativa' },
      eur: { value: 5.73, date: '01/12/2025', source: 'Estimativa' },
      btc: { value: 273000, date: '01/12/2025', source: 'Estimativa' },
      lastUpdate: new Date().toISOString()
    };
  }

  // Limpar cache (para debugging)
  static async clearCache() {
    try {
      await WebSafeStorage.multiRemove([
        this.CACHE_KEYS.BC_RATES,
        this.CACHE_KEYS.EXCHANGE_RATES,
        `${this.CACHE_KEYS.BC_RATES}_timestamp`,
        `${this.CACHE_KEYS.EXCHANGE_RATES}_timestamp`
      ]);
    } catch (error) {
      console.log('Erro ao limpar cache:', error);
    }
  }
}

export default RatesService;