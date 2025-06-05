import React, { createContext, useContext, useState, useEffect } from 'react';
import WebSafeStorage from '../utils/webStorage';
import { Alert } from 'react-native';
import AnalyticsService from '../services/AnalyticsService';

// Criar contexto do Freemium
const FreemiumContext = createContext();

// Hook para usar o contexto
export const useFreemium = () => {
  const context = useContext(FreemiumContext);
  if (!context) {
    throw new Error('useFreemium deve ser usado dentro de FreemiumProvider');
  }
  return context;
};

// Provider do contexto Freemium
export const FreemiumProvider = ({ children }) => {
  const [isPremiumUser, setIsPremiumUser] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [purchaseHistory, setPurchaseHistory] = useState([]);

  // Chaves AsyncStorage
  const STORAGE_KEYS = {
    IS_PREMIUM: 'is_premium_user',
    PURCHASE_HISTORY: 'purchase_history',
    PREMIUM_UNLOCK_DATE: 'premium_unlock_date'
  };

  // Definir conteúdo gratuito vs premium
  const FREE_CONTENT = {
    chapters: ['Chapter1'], // Apenas Capítulo 1 "Importância de Investir aos Poucos"
    calculators: ['CompoundInterestCalculator'], // Demonstração do diferencial
    features: ['taxas_reais_demo'] // Taxas reais funcionam no gratuito (hook!)
  };

  const PREMIUM_CONTENT = {
    chapters: ['Chapter2', 'Chapter3', 'Chapter4', 'Chapter5', 'Chapter6'], // Resto do livro base
    modules: ['Chapter7', 'Chapter8', 'Chapter9'], // Módulos extras
    features: [
      'investor_profile_full', // Quiz completo + personalização
      'advanced_tools', // PersonalGoalsTracker + PortfolioTracker
      'unlimited_simulations', // Sem limites nas calculadoras
      'export_reports', // Exportação de dados
      'premium_support' // Suporte prioritário
    ]
  };

  // Inicializar estado do freemium
  useEffect(() => {
    loadFreemiumState();
  }, []);

  // Carregar estado do freemium do AsyncStorage
  const loadFreemiumState = async () => {
    try {
      setIsLoading(true);
      
      const [isPremium, historyData] = await Promise.all([
        WebSafeStorage.getItem(STORAGE_KEYS.IS_PREMIUM),
        WebSafeStorage.getItem(STORAGE_KEYS.PURCHASE_HISTORY)
      ]);

      // Carregar status premium
      if (isPremium !== null) {
        const premiumStatus = JSON.parse(isPremium);
        setIsPremiumUser(premiumStatus);
        
        // 📊 ANALYTICS: Status premium carregado
        await AnalyticsService.logEvent('freemium_status_loaded', {
          is_premium: premiumStatus,
          load_source: 'AsyncStorage'
        });
      }

      // Carregar histórico de compras
      if (historyData) {
        const history = JSON.parse(historyData);
        setPurchaseHistory(history);
      }

    } catch (error) {
      console.log('Erro ao carregar estado freemium:', error);
      
      // 📊 ANALYTICS: Erro no carregamento
      await AnalyticsService.logEvent('freemium_load_error', {
        error_message: error.message
      });
      
    } finally {
      setIsLoading(false);
    }
  };

  // Verificar se conteúdo é acessível
  const isContentAccessible = (contentType, contentId) => {
    // Conteúdo gratuito sempre acessível
    if (FREE_CONTENT[contentType]?.includes(contentId)) {
      return true;
    }

    // Conteúdo premium apenas para usuários premium
    if (PREMIUM_CONTENT[contentType]?.includes(contentId)) {
      return isPremiumUser;
    }

    // Por padrão, permitir acesso (para compatibilidade)
    return true;
  };

  // Verificar se capítulo específico é acessível
  const isChapterAccessible = (chapterName) => {
    return isContentAccessible('chapters', chapterName) || 
           isContentAccessible('modules', chapterName);
  };

  // Verificar se feature é acessível
  const isFeatureAccessible = (featureName) => {
    return isContentAccessible('features', featureName);
  };

  // Mostrar tela de upgrade (freemium hook)
  const showUpgradePrompt = async (feature, source) => {
    // 📊 ANALYTICS: Upgrade prompt mostrado
    await AnalyticsService.logEvent(AnalyticsService.EVENTS.UPGRADE_PROMPTED, {
      feature_requested: feature,
      source_screen: source,
      user_type: 'freemium'
    });

    Alert.alert(
      '🔓 Conteúdo Premium',
      `${getUpgradeMessage(feature)}\n\n💡 Você já experimentou o diferencial único das taxas reais no Capítulo 1!\n\n🎯 Desbloqueie todo o conteúdo da Luciana Araújo:`,
      [
        {
          text: 'Talvez Depois',
          style: 'cancel',
          onPress: () => logUpgradeDeclined(feature, source)
        },
        {
          text: '🚀 Quero Desbloquear!',
          onPress: () => initiateUpgrade(feature, source)
        }
      ]
    );
  };

  // Mensagens de upgrade personalizadas
  const getUpgradeMessage = (feature) => {
    const messages = {
      'Chapter2': '📊 Aprenda sobre o Triângulo Impossível dos investimentos',
      'Chapter3': '🎯 Descubra seu perfil de investidor completo',
      'Chapter4': '💰 Domine Renda Fixa com comparações detalhadas',
      'Chapter5': '📈 Explore Renda Variável com estratégias práticas',
      'Chapter6': '💎 Acesse as 20 Dicas Práticas da Luciana',
      'advanced_tools': '🛠️ Use ferramentas avançadas: metas + carteira',
      'unlimited_simulations': '♾️ Simulações ilimitadas com todas as taxas',
      'default': '🎓 Continue sua jornada de educação financeira'
    };
    
    return messages[feature] || messages.default;
  };

  // Log quando upgrade é recusado
  const logUpgradeDeclined = async (feature, source) => {
    await AnalyticsService.logEvent('upgrade_declined', {
      feature_requested: feature,
      source_screen: source,
      user_type: 'freemium'
    });
  };

  // Iniciar processo de upgrade
  const initiateUpgrade = async (feature, source) => {
    try {
      // 📊 ANALYTICS: Processo de compra iniciado
      await AnalyticsService.logEvent(AnalyticsService.EVENTS.PURCHASE_INITIATED, {
        feature_requested: feature,
        source_screen: source,
        product_id: 'premium_unlock'
      });

      // TODO: Integrar com react-native-iap ou expo-in-app-purchases
      // Por enquanto, simular compra para desenvolvimento
      await simulatePurchase(feature, source);
      
    } catch (error) {
      console.log('Erro ao iniciar upgrade:', error);
      
      Alert.alert(
        'Erro na Compra',
        'Não foi possível processar sua compra. Tente novamente em alguns minutos.',
        [{ text: 'OK' }]
      );
    }
  };

  // Simular compra para desenvolvimento (será substituído por IAP real)
  const simulatePurchase = async (feature, source) => {
    // Por enquanto, simular delay de compra
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    Alert.alert(
      '🎉 Compra Realizada!',
      'Parabéns! Agora você tem acesso completo ao "Investindo com Sabedoria".\n\n✅ Todos os capítulos desbloqueados\n✅ Ferramentas avançadas\n✅ Simulações ilimitadas',
      [
        {
          text: '🚀 Explorar Conteúdo!',
          onPress: () => completePurchase(feature, source)
        }
      ]
    );
  };

  // Completar compra e atualizar estado
  const completePurchase = async (feature, source) => {
    try {
      const purchaseData = {
        feature_requested: feature,
        source_screen: source,
        purchase_date: new Date().toISOString(),
        product_id: 'premium_unlock',
        transaction_id: `sim_${Date.now()}` // Simulado
      };

      // Atualizar estado local
      setIsPremiumUser(true);
      setPurchaseHistory(prev => [...prev, purchaseData]);

      // Salvar no AsyncStorage
      await Promise.all([
        WebSafeStorage.setItem(STORAGE_KEYS.IS_PREMIUM, JSON.stringify(true)),
        WebSafeStorage.setItem(STORAGE_KEYS.PREMIUM_UNLOCK_DATE, new Date().toISOString()),
        WebSafeStorage.setItem(STORAGE_KEYS.PURCHASE_HISTORY, 
          JSON.stringify([...purchaseHistory, purchaseData]))
      ]);

      // 📊 ANALYTICS: Compra completada
      await AnalyticsService.logEvent(AnalyticsService.EVENTS.PURCHASE_COMPLETED, {
        ...purchaseData,
        conversion_source: source,
        user_type: 'converted_freemium'
      });

      // Atualizar propriedades do usuário para personalização
      await AnalyticsService.setUserProfile({
        type: 'premium_user',
        upgrade_date: new Date().toISOString(),
        conversion_feature: feature,
        conversion_source: source
      });

    } catch (error) {
      console.log('Erro ao completar compra:', error);
      
      // Reverter estado em caso de erro
      setIsPremiumUser(false);
      
      Alert.alert(
        'Erro ao Ativar Premium',
        'Sua compra foi processada, mas houve um erro ao ativar. Reinicie o app.',
        [{ text: 'OK' }]
      );
    }
  };

  // Restaurar compras (para desenvolvimento)
  const restorePurchases = async () => {
    try {
      // TODO: Implementar restore real quando integrar IAP
      Alert.alert(
        'Restaurar Compras',
        'Funcionalidade disponível após integração com App Store/Google Play.',
        [{ text: 'OK' }]
      );
      
    } catch (error) {
      console.log('Erro ao restaurar compras:', error);
    }
  };

  // Debug: Resetar para freemium (apenas desenvolvimento)
  const resetToFreemium = async () => {
    try {
      setIsPremiumUser(false);
      setPurchaseHistory([]);
      
      await Promise.all([
        WebSafeStorage.removeItem(STORAGE_KEYS.IS_PREMIUM),
        WebSafeStorage.removeItem(STORAGE_KEYS.PURCHASE_HISTORY),
        WebSafeStorage.removeItem(STORAGE_KEYS.PREMIUM_UNLOCK_DATE)
      ]);

      Alert.alert('🔄 Reset Concluído', 'Usuário voltou ao modo freemium.');
      
    } catch (error) {
      console.log('Erro ao resetar freemium:', error);
    }
  };

  // Obter estatísticas do freemium
  const getFreemiumStats = () => {
    return {
      isPremium: isPremiumUser,
      freeContentAccess: FREE_CONTENT,
      premiumContentAccess: PREMIUM_CONTENT,
      purchaseHistory: purchaseHistory,
      upgradeConversionRate: purchaseHistory.length > 0 ? 100 : 0 // Simplificado
    };
  };

  // Verificar se já mostrou prompt de upgrade para feature específica hoje
  const shouldShowUpgradePrompt = async (feature) => {
    try {
      const lastPromptKey = `upgrade_prompt_${feature}_last_shown`;
      const lastShown = await WebSafeStorage.getItem(lastPromptKey);
      
      if (!lastShown) return true;
      
      const lastShownDate = new Date(lastShown);
      const now = new Date();
      const diffHours = (now - lastShownDate) / (1000 * 60 * 60);
      
      // Mostrar prompt no máximo a cada 6 horas para evitar spam
      return diffHours >= 6;
      
    } catch (error) {
      return true; // Em caso de erro, mostrar prompt
    }
  };

  // Marcar que prompt foi mostrado
  const markUpgradePromptShown = async (feature) => {
    try {
      const promptKey = `upgrade_prompt_${feature}_last_shown`;
      await WebSafeStorage.setItem(promptKey, new Date().toISOString());
    } catch (error) {
      console.log('Erro ao marcar prompt:', error);
    }
  };

  // Valor do contexto
  const contextValue = {
    // Estado
    isPremiumUser,
    isLoading,
    purchaseHistory,
    
    // Verificações de acesso
    isContentAccessible,
    isChapterAccessible,
    isFeatureAccessible,
    
    // Ações de upgrade
    showUpgradePrompt,
    initiateUpgrade,
    restorePurchases,
    
    // Definições de conteúdo
    FREE_CONTENT,
    PREMIUM_CONTENT,
    
    // Estatísticas e debug
    getFreemiumStats,
    resetToFreemium, // Apenas para desenvolvimento
    
    // Controle de prompts
    shouldShowUpgradePrompt,
    markUpgradePromptShown
  };

  return (
    <FreemiumContext.Provider value={contextValue}>
      {children}
    </FreemiumContext.Provider>
  );
};

export default FreemiumContext;
