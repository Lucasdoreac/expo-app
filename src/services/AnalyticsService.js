import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent, setAnalyticsCollectionEnabled, setUserId, setUserProperties } from 'firebase/analytics';
import WebSafeStorage from '../utils/webStorage';

// CONFIGURAÇÃO MOCK - SEM CHAVES REAIS EXPOSTAS
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY || "mock-api-key",
  authDomain: process.env.FIREBASE_AUTH_DOMAIN || "mock-domain.firebaseapp.com",
  projectId: process.env.FIREBASE_PROJECT_ID || "mock-project",
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET || "mock-storage.app",
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID || "000000000000",
  appId: process.env.FIREBASE_APP_ID || "mock-app-id",
  measurementId: process.env.FIREBASE_MEASUREMENT_ID || "G-MOCK"
};

class AnalyticsService {
  static app = null;
  static analytics = null;
  static isInitialized = false;
  static userId = null;
  
  // Eventos específicos do app "Investindo com Sabedoria"
  static EVENTS = {
    // Navegação e Telas
    SCREEN_VIEW: 'screen_view',
    CHAPTER_OPENED: 'chapter_opened',
    MODULE_ACCESSED: 'module_accessed',
    
    // Calculadoras (CORE DO APP)
    CALCULATOR_USED: 'calculator_used',
    SIMULATION_COMPLETED: 'simulation_completed',
    TAXAS_REAIS_CLICKED: 'taxas_reais_clicked',
    CALCULATION_EXPORTED: 'calculation_exported',
    
    // Educação e Conteúdo
    CHAPTER_COMPLETED: 'chapter_completed',
    QUIZ_STARTED: 'quiz_started',
    QUIZ_COMPLETED: 'quiz_completed',
    PROFILE_IDENTIFIED: 'profile_identified',
    TIP_VIEWED: 'tip_viewed',
    
    // Ferramentas Avançadas
    GOAL_CREATED: 'goal_created',
    PORTFOLIO_UPDATED: 'portfolio_updated',
    REPORT_GENERATED: 'report_generated',
    
    // Engajamento
    SESSION_START: 'session_start',
    SESSION_END: 'session_end',
    FEATURE_DISCOVERED: 'feature_discovered',
    HELP_ACCESSED: 'help_accessed',
    
    // Monetização (preparação para freemium)
    PREMIUM_FEATURE_VIEWED: 'premium_feature_viewed',
    UPGRADE_PROMPTED: 'upgrade_prompted',
    PURCHASE_INITIATED: 'purchase_initiated',
    PURCHASE_COMPLETED: 'purchase_completed'
  };
  
  // Parâmetros customizados
  static PARAMETERS = {
    CHAPTER: 'chapter_name',
    CALCULATOR_TYPE: 'calculator_type',
    SIMULATION_TYPE: 'simulation_type',
    USER_PROFILE: 'investor_profile',
    GOAL_TYPE: 'goal_type',
    FEATURE_NAME: 'feature_name',
    ERROR_TYPE: 'error_type',
    VALUE_AMOUNT: 'value_amount',
    TIME_SPENT: 'time_spent_seconds'
  };
  
  // Cache para analytics offline
  static CACHE_KEY = 'analytics_events_cache';
  static MAX_CACHED_EVENTS = 100;

  // Inicializar Firebase Analytics
  static async initialize() {
    try {
      if (this.isInitialized) return true;
      
      // Verificar se é ambiente mock (sem chaves reais)
      if (firebaseConfig.apiKey === "mock-api-key") {
        console.log('Analytics em modo MOCK - Firebase desabilitado');
        this.isInitialized = true;
        return false; // Não inicializar Firebase com chaves mock
      }
      
      // Verificar se analytics está habilitado pelo usuário
      const isEnabled = await this.isAnalyticsEnabled();
      if (!isEnabled) {
        console.log('Analytics desabilitado pelo usuário');
        return false;
      }
      
      // Inicializar Firebase
      this.app = initializeApp(firebaseConfig);
      this.analytics = getAnalytics(this.app);
      
      // Configurar coleta de dados
      await setAnalyticsCollectionEnabled(this.analytics, true);
      
      this.isInitialized = true;
      
      // Configurar ID do usuário (anônimo mas consistente)
      await this.initializeUserId();
      
      // Processar eventos cached (offline)
      await this.processCachedEvents();
      
      // Log de inicialização
      await this.logEvent(this.EVENTS.SESSION_START, {
        app_version: '1.0.0',
        platform: 'mobile'
      });
      
      console.log('📊 Firebase Analytics inicializado com sucesso');
      return true;
      
    } catch (error) {
      console.log('❌ Erro ao inicializar Firebase Analytics:', error);
      this.isInitialized = false;
      return false;
    }
  }

  // Verificar se analytics está habilitado
  static async isAnalyticsEnabled() {
    try {
      const enabled = await WebSafeStorage.getItem('analytics_enabled');
      return enabled !== 'false'; // Habilitado por padrão
    } catch (error) {
      return true; // Habilitado por padrão em caso de erro
    }
  }

  // Habilitar/desabilitar analytics
  static async setAnalyticsEnabled(enabled) {
    try {
      await WebSafeStorage.setItem('analytics_enabled', enabled.toString());
      
      if (this.analytics) {
        await setAnalyticsCollectionEnabled(this.analytics, enabled);
      }
      
      return true;
    } catch (error) {
      console.log('Erro ao alterar configuração analytics:', error);
      return false;
    }
  }

  // Inicializar ID único do usuário
  static async initializeUserId() {
    try {
      let userId = await WebSafeStorage.getItem('analytics_user_id');
      
      if (!userId) {
        // Gerar ID único baseado em timestamp + random
        userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await WebSafeStorage.setItem('analytics_user_id', userId);
      }
      
      this.userId = userId;
      
      if (this.analytics) {
        await setUserId(this.analytics, userId);
      }
      
    } catch (error) {
      console.log('Erro ao inicializar user ID:', error);
    }
  }

  // Definir propriedades do usuário
  static async setUserProfile(profile) {
    try {
      if (!this.analytics) {
        await this.initialize();
      }
      
      const properties = {
        investor_profile: profile.type || 'unknown',
        experience_level: profile.experience || 'iniciante',
        investment_goal: profile.goal || 'general',
        first_access_date: profile.firstAccess || new Date().toISOString()
      };
      
      await setUserProperties(this.analytics, properties);
      
      // Salvar no cache local também
      await WebSafeStorage.setItem('user_profile', JSON.stringify(properties));
      
    } catch (error) {
      console.log('Erro ao definir propriedades do usuário:', error);
    }
  }

  // Log de evento principal
  static async logEvent(eventName, parameters = {}) {
    try {
      // Sempre armazenar no cache primeiro (para offline)
      await this.addEventToCache(eventName, parameters);
      
      // Se está em modo mock, apenas fazer log local
      if (firebaseConfig.apiKey === "mock-api-key") {
        console.log(`📊 [MOCK] Analytics Event: ${eventName}`, parameters);
        return true;
      }
      
      // Se analytics não inicializado, tentar inicializar
      if (!this.isInitialized) {
        const initialized = await this.initialize();
        if (!initialized) {
          console.log('Analytics offline - evento cached');
          return false;
        }
      }
      
      // Adicionar timestamp e user_id aos parâmetros
      const enrichedParams = {
        ...parameters,
        timestamp: Date.now(),
        user_id: this.userId,
        session_id: await this.getSessionId()
      };
      
      // Log no Firebase
      await logEvent(this.analytics, eventName, enrichedParams);
      
      return true;
      
    } catch (error) {
      console.log(`Erro ao logar evento ${eventName}:`, error);
      return false;
    }
  }

  // Métodos específicos para o app educacional
  
  // Navegar para tela/capítulo
  static async logScreenView(screenName, chapterName = null) {
    const params = {
      [this.PARAMETERS.CHAPTER]: chapterName,
      screen_name: screenName
    };
    return await this.logEvent(this.EVENTS.SCREEN_VIEW, params);
  }
  
  // Uso de calculadora (CORE EVENT)
  static async logCalculatorUsed(calculatorType, simulationType = null, valueAmount = null) {
    const params = {
      [this.PARAMETERS.CALCULATOR_TYPE]: calculatorType,
      [this.PARAMETERS.SIMULATION_TYPE]: simulationType
    };
    
    if (valueAmount) {
      params[this.PARAMETERS.VALUE_AMOUNT] = valueAmount;
    }
    
    return await this.logEvent(this.EVENTS.CALCULATOR_USED, params);
  }
  
  // Click em "usar taxas reais" (DIFERENCIAL ÚNICO)
  static async logTaxasReaisClicked(calculatorType, sourceScreen) {
    const params = {
      [this.PARAMETERS.CALCULATOR_TYPE]: calculatorType,
      source_screen: sourceScreen
    };
    return await this.logEvent(this.EVENTS.TAXAS_REAIS_CLICKED, params);
  }
  
  // Conclusão de capítulo
  static async logChapterCompleted(chapterName, timeSpent = null) {
    const params = {
      [this.PARAMETERS.CHAPTER]: chapterName
    };
    
    if (timeSpent) {
      params[this.PARAMETERS.TIME_SPENT] = timeSpent;
    }
    
    return await this.logEvent(this.EVENTS.CHAPTER_COMPLETED, params);
  }
  
  // Quiz de perfil do investidor
  static async logQuizCompleted(profileResult) {
    const params = {
      [this.PARAMETERS.USER_PROFILE]: profileResult
    };
    return await this.logEvent(this.EVENTS.QUIZ_COMPLETED, params);
  }
  
  // Ferramentas avançadas
  static async logGoalCreated(goalType, targetAmount = null) {
    const params = {
      [this.PARAMETERS.GOAL_TYPE]: goalType
    };
    
    if (targetAmount) {
      params[this.PARAMETERS.VALUE_AMOUNT] = targetAmount;
    }
    
    return await this.logEvent(this.EVENTS.GOAL_CREATED, params);
  }

  // Cache offline para eventos
  static async addEventToCache(eventName, parameters) {
    try {
      const cached = await WebSafeStorage.getItem(this.CACHE_KEY);
      let events = cached ? JSON.parse(cached) : [];
      
      events.push({
        event: eventName,
        params: parameters,
        timestamp: Date.now()
      });
      
      // Manter apenas os últimos eventos
      if (events.length > this.MAX_CACHED_EVENTS) {
        events = events.slice(-this.MAX_CACHED_EVENTS);
      }
      
      await WebSafeStorage.setItem(this.CACHE_KEY, JSON.stringify(events));
    } catch (error) {
      console.log('Erro ao adicionar evento ao cache:', error);
    }
  }

  // Processar eventos cached (quando volta online)
  static async processCachedEvents() {
    try {
      const cached = await WebSafeStorage.getItem(this.CACHE_KEY);
      if (!cached || !this.analytics) return;
      
      const events = JSON.parse(cached);
      
      for (const event of events) {
        try {
          await logEvent(this.analytics, event.event, event.params);
        } catch (error) {
          console.log('Erro ao processar evento cached:', error);
        }
      }
      
      // Limpar cache após processar
      await WebSafeStorage.removeItem(this.CACHE_KEY);
      
      console.log(`📊 Processados ${events.length} eventos offline`);
      
    } catch (error) {
      console.log('Erro ao processar eventos cached:', error);
    }
  }

  // Obter session ID único
  static async getSessionId() {
    try {
      let sessionId = await WebSafeStorage.getItem('current_session_id');
      
      if (!sessionId) {
        sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        await WebSafeStorage.setItem('current_session_id', sessionId);
      }
      
      return sessionId;
    } catch (error) {
      return `session_${Date.now()}`;
    }
  }

  // Nova sessão (chamado no App.js)
  static async startNewSession() {
    try {
      // Gerar novo session ID
      const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      await WebSafeStorage.setItem('current_session_id', sessionId);
      
      // Log evento de nova sessão
      await this.logEvent(this.EVENTS.SESSION_START, {
        session_id: sessionId,
        app_version: '1.0.0'
      });
      
    } catch (error) {
      console.log('Erro ao iniciar nova sessão:', error);
    }
  }

  // Finalizar sessão
  static async endSession() {
    try {
      const sessionId = await this.getSessionId();
      
      await this.logEvent(this.EVENTS.SESSION_END, {
        session_id: sessionId
      });
      
      // Limpar session ID
      await WebSafeStorage.removeItem('current_session_id');
      
    } catch (error) {
      console.log('Erro ao finalizar sessão:', error);
    }
  }

  // Debugging: Limpar todos os dados
  static async clearAllData() {
    try {
      await WebSafeStorage.multiRemove([
        'analytics_enabled',
        'analytics_user_id',
        'user_profile',
        'current_session_id',
        this.CACHE_KEY
      ]);
      
      console.log('📊 Dados de analytics limpos');
      
    } catch (error) {
      console.log('Erro ao limpar dados analytics:', error);
    }
  }

  // Status do serviço
  static getStatus() {
    return {
      isInitialized: this.isInitialized,
      hasUserId: !!this.userId,
      hasAnalytics: !!this.analytics
    };
  }
}

export default AnalyticsService;
