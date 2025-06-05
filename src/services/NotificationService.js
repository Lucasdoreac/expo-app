import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';
import WebSafeStorage from '../utils/webStorage';
import AnalyticsService from './AnalyticsService';

// Configuração do comportamento das notificações
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

class NotificationService {
  constructor() {
    this.STORAGE_KEY = 'notifications_preferences';
    this.isInitialized = false;
  }

  // Inicializar serviço de notificações
  async initialize() {
    try {
      if (this.isInitialized) return true;

      // Solicitar permissões
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== 'granted') {
        console.log('Permissão para notificações negada');
        return false;
      }

      // Configurar canal de notificação para Android
      if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
          name: 'Investindo com Sabedoria',
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: '#2c3e50',
          sound: 'default',
        });
      }

      this.isInitialized = true;
      
      // Analytics: Permissão concedida
      await AnalyticsService.logEvent('notification_permission_granted', {
        platform: Platform.OS
      });

      return true;
    } catch (error) {
      console.error('Erro ao inicializar notificações:', error);
      return false;
    }
  }

  // Agendar notificação local
  async scheduleNotification(title, body, trigger, data = {}) {
    try {
      const isInitialized = await this.initialize();
      if (!isInitialized) return null;

      const identifier = await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          data,
          sound: 'default',
        },
        trigger,
      });

      // Analytics: Notificação agendada
      await AnalyticsService.logEvent('notification_scheduled', {
        type: data.type || 'general',
        trigger_type: trigger.constructor.name
      });

      return identifier;
    } catch (error) {
      console.error('Erro ao agendar notificação:', error);
      return null;
    }
  }

  // Notificação de lembrete diário
  async scheduleDailyReminder() {
    return this.scheduleNotification(
      '📚 Hora de Aprender!',
      'Continue sua jornada de educação financeira com a Luciana Araújo',
      {
        hour: 19, // 19h
        minute: 0,
        repeats: true,
      },
      { type: 'daily_reminder' }
    );
  }

  // Notificação de conquista
  async scheduleAchievementNotification(achievement) {
    return this.scheduleNotification(
      '🎉 Parabéns! Nova Conquista',
      `Você conquistou: ${achievement}`,
      { seconds: 1 }, // Imediata
      { type: 'achievement', achievement }
    );
  }

  // Notificação de meta atingida
  async scheduleGoalNotification(goalTitle, progress) {
    return this.scheduleNotification(
      '🎯 Meta Alcançada!',
      `Parabéns! Você atingiu ${progress}% da meta: ${goalTitle}`,
      { seconds: 1 }, // Imediata
      { type: 'goal_reached', goal: goalTitle, progress }
    );
  }

  // Notificação semanal de progresso
  async scheduleWeeklyProgress() {
    return this.scheduleNotification(
      '📊 Seu Progresso Semanal',
      'Veja como você evoluiu esta semana nos seus estudos financeiros',
      {
        weekday: 1, // Segunda-feira
        hour: 9,
        minute: 0,
        repeats: true,
      },
      { type: 'weekly_progress' }
    );
  }

  // Notificação de inatividade
  async scheduleInactivityReminder() {
    return this.scheduleNotification(
      '📖 Sentimos Sua Falta!',
      'Que tal continuar seus estudos? Novos capítulos te aguardam!',
      { seconds: 259200 }, // 3 dias
      { type: 'inactivity_reminder' }
    );
  }

  // Cancelar notificação específica
  async cancelNotification(identifier) {
    try {
      await Notifications.cancelScheduledNotificationAsync(identifier);
      return true;
    } catch (error) {
      console.error('Erro ao cancelar notificação:', error);
      return false;
    }
  }

  // Cancelar todas as notificações
  async cancelAllNotifications() {
    try {
      await Notifications.cancelAllScheduledNotificationsAsync();
      
      // Analytics: Todas notificações canceladas
      await AnalyticsService.logEvent('all_notifications_cancelled', {});
      
      return true;
    } catch (error) {
      console.error('Erro ao cancelar todas as notificações:', error);
      return false;
    }
  }

  // Listar notificações agendadas
  async getScheduledNotifications() {
    try {
      return await Notifications.getAllScheduledNotificationsAsync();
    } catch (error) {
      console.error('Erro ao buscar notificações agendadas:', error);
      return [];
    }
  }

  // Salvar preferências de notificação
  async saveNotificationPreferences(preferences) {
    try {
      await WebSafeStorage.setItem(this.STORAGE_KEY, JSON.stringify(preferences));
      
      // Analytics: Preferências alteradas
      await AnalyticsService.logEvent('notification_preferences_changed', preferences);
      
      return true;
    } catch (error) {
      console.error('Erro ao salvar preferências:', error);
      return false;
    }
  }

  // Carregar preferências de notificação
  async loadNotificationPreferences() {
    try {
      const preferences = await WebSafeStorage.getItem(this.STORAGE_KEY);
      return preferences ? JSON.parse(preferences) : {
        dailyReminder: true,
        weeklyProgress: true,
        achievements: true,
        inactivityReminder: true,
      };
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
      return {
        dailyReminder: true,
        weeklyProgress: true,
        achievements: true,
        inactivityReminder: true,
      };
    }
  }

  // Configurar notificações baseadas nas preferências
  async setupNotificationsFromPreferences() {
    try {
      const preferences = await this.loadNotificationPreferences();
      
      // Cancelar todas as notificações primeiro
      await this.cancelAllNotifications();
      
      // Reagendar baseado nas preferências
      if (preferences.dailyReminder) {
        await this.scheduleDailyReminder();
      }
      
      if (preferences.weeklyProgress) {
        await this.scheduleWeeklyProgress();
      }
      
      if (preferences.inactivityReminder) {
        await this.scheduleInactivityReminder();
      }
      
      return true;
    } catch (error) {
      console.error('Erro ao configurar notificações:', error);
      return false;
    }
  }

  // Listener para quando app recebe notificação
  addNotificationReceivedListener(callback) {
    return Notifications.addNotificationReceivedListener(callback);
  }

  // Listener para quando usuário toca na notificação
  addNotificationResponseReceivedListener(callback) {
    return Notifications.addNotificationResponseReceivedListener(callback);
  }
}

export default new NotificationService();