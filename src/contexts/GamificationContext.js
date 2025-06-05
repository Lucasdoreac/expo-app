import React, { createContext, useContext, useState, useEffect } from 'react';
import WebSafeStorage from '../utils/webStorage';
import AnalyticsService from '../services/AnalyticsService';
import NotificationService from '../services/NotificationService';

// Criar contexto de gamificação
const GamificationContext = createContext();

// Hook para usar o contexto
export const useGamification = () => {
  const context = useContext(GamificationContext);
  if (!context) {
    throw new Error('useGamification deve ser usado dentro de GamificationProvider');
  }
  return context;
};

// Provider do contexto de gamificação
export const GamificationProvider = ({ children }) => {
  const [userProgress, setUserProgress] = useState({
    chaptersCompleted: [],
    calculationsPerformed: 0,
    taxasReaisUsed: 0,
    quizCompleted: false,
    goalsCreated: 0,
    achievementsUnlocked: [],
    totalScore: 0,
    level: 1,
    currentStreak: 0,
    lastActivityDate: null
  });

  const [isLoading, setIsLoading] = useState(true);

  // Chaves AsyncStorage
  const STORAGE_KEYS = {
    USER_PROGRESS: 'gamification_user_progress',
    ACHIEVEMENTS: 'gamification_achievements',
    DAILY_STREAK: 'gamification_daily_streak'
  };

  // Definição de conquistas disponíveis
  const ACHIEVEMENTS = {
    FIRST_CALCULATION: {
      id: 'first_calculation',
      title: '🧮 Primeira Simulação',
      description: 'Realizou sua primeira simulação financeira',
      points: 50,
      icon: '🧮',
      category: 'calculadora'
    },
    TAXAS_REAIS_EXPLORER: {
      id: 'taxas_reais_explorer',
      title: '📊 Explorador de Taxas Reais',
      description: 'Usou taxas reais do Banco Central pela primeira vez',
      points: 100,
      icon: '📊',
      category: 'diferencial_unico'
    },
    CHAPTER_MASTER: {
      id: 'chapter_master',
      title: '📚 Mestre dos Capítulos',
      description: 'Completou 3 capítulos consecutivos',
      points: 200,
      icon: '📚',
      category: 'educacao'
    },
    PROFILE_DISCOVERED: {
      id: 'profile_discovered',
      title: '🎯 Perfil Descoberto',
      description: 'Completou o quiz de perfil do investidor',
      points: 150,
      icon: '🎯',
      category: 'quiz'
    },
    GOAL_SETTER: {
      id: 'goal_setter',
      title: '🏆 Planejador de Metas',
      description: 'Criou sua primeira meta financeira',
      points: 120,
      icon: '🏆',
      category: 'ferramentas_avancadas'
    },
    STREAK_WARRIOR: {
      id: 'streak_warrior',
      title: '🔥 Guerreiro da Sequência',
      description: 'Manteve 7 dias consecutivos de atividade',
      points: 300,
      icon: '🔥',
      category: 'engajamento'
    },
    CALCULATION_EXPERT: {
      id: 'calculation_expert',
      title: '⚡ Expert em Simulações',
      description: 'Realizou 10 simulações diferentes',
      points: 250,
      icon: '⚡',
      category: 'calculadora'
    },
    TAXAS_REAIS_MASTER: {
      id: 'taxas_reais_master',
      title: '🔥 Mestre das Taxas Reais',
      description: 'Usou taxas reais 5 vezes (diferencial único!)',
      points: 400,
      icon: '🔥',
      category: 'diferencial_unico'
    }
  };

  // Níveis baseados em pontos
  const LEVELS = [
    { level: 1, minPoints: 0, title: 'Iniciante', icon: '🌱' },
    { level: 2, minPoints: 200, title: 'Estudante', icon: '📖' },
    { level: 3, minPoints: 500, title: 'Praticante', icon: '💪' },
    { level: 4, minPoints: 1000, title: 'Conhecedor', icon: '🎓' },
    { level: 5, minPoints: 2000, title: 'Expert', icon: '⭐' },
    { level: 6, minPoints: 3500, title: 'Mestre', icon: '👑' }
  ];

  // Inicializar gamificação
  useEffect(() => {
    loadUserProgress();
  }, []);

  // Carregar progresso do usuário
  const loadUserProgress = async () => {
    try {
      setIsLoading(true);
      
      const progressData = await WebSafeStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      
      if (progressData) {
        const progress = JSON.parse(progressData);
        setUserProgress(progress);
        
        // 📊 ANALYTICS: Progresso carregado
        await AnalyticsService.logEvent('gamification_progress_loaded', {
          level: progress.level,
          total_score: progress.totalScore,
          achievements_count: progress.achievementsUnlocked.length
        });
      }

    } catch (error) {
      console.log('Erro ao carregar progresso:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Salvar progresso
  const saveUserProgress = async (newProgress) => {
    try {
      await WebSafeStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(newProgress));
      setUserProgress(newProgress);
    } catch (error) {
      console.log('Erro ao salvar progresso:', error);
    }
  };

  // Marcar capítulo como completado
  const markChapterCompleted = async (chapterName) => {
    if (userProgress.chaptersCompleted.includes(chapterName)) {
      return; // Já completado
    }

    const newProgress = {
      ...userProgress,
      chaptersCompleted: [...userProgress.chaptersCompleted, chapterName],
      totalScore: userProgress.totalScore + 100, // Pontos por capítulo
      lastActivityDate: new Date().toISOString()
    };

    // Verificar conquistas relacionadas a capítulos
    await checkAchievements(newProgress, 'chapter_completed', { chapterName });
    
    // Atualizar nível
    const newLevel = calculateLevel(newProgress.totalScore);
    if (newLevel > newProgress.level) {
      newProgress.level = newLevel;
      await showLevelUpNotification(newLevel);
    }

    await saveUserProgress(newProgress);

    // 📊 ANALYTICS: Capítulo completado
    await AnalyticsService.logChapterCompleted(chapterName);
    await AnalyticsService.logEvent('gamification_chapter_completed', {
      chapter_name: chapterName,
      total_chapters: newProgress.chaptersCompleted.length,
      points_earned: 100,
      new_total_score: newProgress.totalScore
    });
  };

  // Registrar uso de calculadora
  const recordCalculationPerformed = async (calculatorType) => {
    const newProgress = {
      ...userProgress,
      calculationsPerformed: userProgress.calculationsPerformed + 1,
      totalScore: userProgress.totalScore + 20, // Pontos por cálculo
      lastActivityDate: new Date().toISOString()
    };

    // Verificar conquistas
    await checkAchievements(newProgress, 'calculation_performed', { calculatorType });

    await saveUserProgress(newProgress);

    // 📊 ANALYTICS: Cálculo realizado
    await AnalyticsService.logEvent('gamification_calculation_recorded', {
      calculator_type: calculatorType,
      total_calculations: newProgress.calculationsPerformed,
      points_earned: 20
    });
  };

  // Registrar uso de taxas reais (DIFERENCIAL ÚNICO)
  const recordTaxasReaisUsed = async (calculatorType) => {
    const newProgress = {
      ...userProgress,
      taxasReaisUsed: userProgress.taxasReaisUsed + 1,
      totalScore: userProgress.totalScore + 50, // Mais pontos pelo diferencial único
      lastActivityDate: new Date().toISOString()
    };

    // Verificar conquistas especiais para taxas reais
    await checkAchievements(newProgress, 'taxas_reais_used', { calculatorType });

    await saveUserProgress(newProgress);

    // 📊 ANALYTICS: Taxas reais usadas
    await AnalyticsService.logEvent('gamification_taxas_reais_recorded', {
      calculator_type: calculatorType,
      total_taxas_reais_used: newProgress.taxasReaisUsed,
      points_earned: 50
    });
  };

  // Marcar quiz completado
  const markQuizCompleted = async (profileType) => {
    if (userProgress.quizCompleted) {
      return; // Já completado
    }

    const newProgress = {
      ...userProgress,
      quizCompleted: true,
      totalScore: userProgress.totalScore + 150,
      lastActivityDate: new Date().toISOString()
    };

    await checkAchievements(newProgress, 'quiz_completed', { profileType });
    await saveUserProgress(newProgress);
  };

  // Registrar meta criada
  const recordGoalCreated = async (goalType) => {
    const newProgress = {
      ...userProgress,
      goalsCreated: userProgress.goalsCreated + 1,
      totalScore: userProgress.totalScore + 80,
      lastActivityDate: new Date().toISOString()
    };

    await checkAchievements(newProgress, 'goal_created', { goalType });
    await saveUserProgress(newProgress);
  };

  // Verificar e desbloquear conquistas
  const checkAchievements = async (progress, action, data) => {
    const newAchievements = [];

    // Verificar cada conquista
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      // Pular se já foi desbloqueada
      if (progress.achievementsUnlocked.includes(achievement.id)) {
        return;
      }

      let shouldUnlock = false;

      // Lógica específica para cada conquista
      switch (achievement.id) {
        case 'first_calculation':
          shouldUnlock = action === 'calculation_performed' && progress.calculationsPerformed === 1;
          break;
        case 'taxas_reais_explorer':
          shouldUnlock = action === 'taxas_reais_used' && progress.taxasReaisUsed === 1;
          break;
        case 'chapter_master':
          shouldUnlock = action === 'chapter_completed' && progress.chaptersCompleted.length === 3;
          break;
        case 'profile_discovered':
          shouldUnlock = action === 'quiz_completed';
          break;
        case 'goal_setter':
          shouldUnlock = action === 'goal_created' && progress.goalsCreated === 1;
          break;
        case 'calculation_expert':
          shouldUnlock = action === 'calculation_performed' && progress.calculationsPerformed === 10;
          break;
        case 'taxas_reais_master':
          shouldUnlock = action === 'taxas_reais_used' && progress.taxasReaisUsed === 5;
          break;
      }

      if (shouldUnlock) {
        newAchievements.push(achievement);
        progress.achievementsUnlocked.push(achievement.id);
        progress.totalScore += achievement.points;
      }
    });

    // Mostrar notificações para novas conquistas
    for (const achievement of newAchievements) {
      await showAchievementNotification(achievement);
    }

    return newAchievements;
  };

  // Calcular nível baseado em pontos
  const calculateLevel = (totalScore) => {
    for (let i = LEVELS.length - 1; i >= 0; i--) {
      if (totalScore >= LEVELS[i].minPoints) {
        return LEVELS[i].level;
      }
    }
    return 1;
  };

  // Mostrar notificação de nova conquista
  const showAchievementNotification = async (achievement) => {
    // 📊 ANALYTICS: Nova conquista desbloqueada
    await AnalyticsService.logEvent('gamification_achievement_unlocked', {
      achievement_id: achievement.id,
      achievement_title: achievement.title,
      points_earned: achievement.points,
      category: achievement.category
    });

    // 🔔 PUSH NOTIFICATION: Nova conquista
    try {
      await NotificationService.scheduleAchievementNotification(achievement.title);
    } catch (error) {
      console.log('⚠️ Erro ao enviar notificação de conquista:', error);
    }

    console.log(`🏆 Nova conquista desbloqueada: ${achievement.title}`);
  };

  // Mostrar notificação de level up
  const showLevelUpNotification = async (newLevel) => {
    const levelInfo = LEVELS.find(l => l.level === newLevel);
    
    // 📊 ANALYTICS: Level up
    await AnalyticsService.logEvent('gamification_level_up', {
      new_level: newLevel,
      level_title: levelInfo?.title,
      level_icon: levelInfo?.icon
    });

    // 🔔 PUSH NOTIFICATION: Level up
    try {
      await NotificationService.scheduleNotification(
        '🎉 Level Up!',
        `Parabéns! Agora você é ${levelInfo?.title} ${levelInfo?.icon}`,
        { seconds: 1 },
        { type: 'level_up', level: newLevel }
      );
    } catch (error) {
      console.log('⚠️ Erro ao enviar notificação de level up:', error);
    }

    console.log(`🎉 Level Up! Agora você é ${levelInfo?.title} ${levelInfo?.icon}`);
  };

  // Obter informações do nível atual
  const getCurrentLevelInfo = () => {
    return LEVELS.find(l => l.level === userProgress.level) || LEVELS[0];
  };

  // Obter progresso para próximo nível
  const getProgressToNextLevel = () => {
    const currentLevel = getCurrentLevelInfo();
    const nextLevel = LEVELS.find(l => l.level === currentLevel.level + 1);
    
    if (!nextLevel) {
      return { isMaxLevel: true, progress: 100 };
    }

    const pointsInCurrentLevel = userProgress.totalScore - currentLevel.minPoints;
    const pointsNeededForNext = nextLevel.minPoints - currentLevel.minPoints;
    const progress = (pointsInCurrentLevel / pointsNeededForNext) * 100;

    return {
      isMaxLevel: false,
      progress: Math.min(progress, 100),
      pointsNeeded: nextLevel.minPoints - userProgress.totalScore,
      nextLevel
    };
  };

  // Obter estatísticas de conquistas
  const getAchievementStats = () => {
    const totalAchievements = Object.keys(ACHIEVEMENTS).length;
    const unlockedCount = userProgress.achievementsUnlocked.length;
    const completionPercentage = (unlockedCount / totalAchievements) * 100;

    return {
      total: totalAchievements,
      unlocked: unlockedCount,
      locked: totalAchievements - unlockedCount,
      completionPercentage
    };
  };

  // Obter conquistas por categoria
  const getAchievementsByCategory = () => {
    const categories = {};
    
    Object.values(ACHIEVEMENTS).forEach(achievement => {
      if (!categories[achievement.category]) {
        categories[achievement.category] = [];
      }
      categories[achievement.category].push({
        ...achievement,
        isUnlocked: userProgress.achievementsUnlocked.includes(achievement.id)
      });
    });

    return categories;
  };

  // Reset progresso (debug apenas)
  const resetProgress = async () => {
    const initialProgress = {
      chaptersCompleted: [],
      calculationsPerformed: 0,
      taxasReaisUsed: 0,
      quizCompleted: false,
      goalsCreated: 0,
      achievementsUnlocked: [],
      totalScore: 0,
      level: 1,
      currentStreak: 0,
      lastActivityDate: null
    };

    await WebSafeStorage.removeItem(STORAGE_KEYS.USER_PROGRESS);
    setUserProgress(initialProgress);
  };

  // Valor do contexto
  const contextValue = {
    // Estado
    userProgress,
    isLoading,
    
    // Ações de progresso
    markChapterCompleted,
    recordCalculationPerformed,
    recordTaxasReaisUsed,
    markQuizCompleted,
    recordGoalCreated,
    
    // Informações de nível e conquistas
    getCurrentLevelInfo,
    getProgressToNextLevel,
    getAchievementStats,
    getAchievementsByCategory,
    
    // Definições
    ACHIEVEMENTS,
    LEVELS,
    
    // Debug
    resetProgress
  };

  return (
    <GamificationContext.Provider value={contextValue}>
      {children}
    </GamificationContext.Provider>
  );
};

export default GamificationContext;
