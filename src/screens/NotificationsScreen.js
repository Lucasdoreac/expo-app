import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Switch, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { COLORS } from '../styles/globalStyles';
import NotificationService from '../services/NotificationService';

const NotificationsScreen = ({ navigation }) => {
  const [preferences, setPreferences] = useState({
    dailyReminder: true,
    weeklyProgress: true,
    achievements: true,
    inactivityReminder: true,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPreferences();
  }, []);

  const loadPreferences = async () => {
    try {
      const savedPreferences = await NotificationService.loadNotificationPreferences();
      setPreferences(savedPreferences);
    } catch (error) {
      console.error('Erro ao carregar preferências:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const updatePreference = async (key, value) => {
    try {
      const newPreferences = { ...preferences, [key]: value };
      setPreferences(newPreferences);
      
      await NotificationService.saveNotificationPreferences(newPreferences);
      await NotificationService.setupNotificationsFromPreferences();
      
      if (value) {
        Alert.alert(
          '✅ Notificação Ativada',
          'As notificações foram configuradas com sucesso!',
          [{ text: 'OK' }]
        );
      }
    } catch (error) {
      console.error('Erro ao atualizar preferências:', error);
      Alert.alert(
        '❌ Erro',
        'Não foi possível atualizar as preferências de notificação.',
        [{ text: 'OK' }]
      );
    }
  };

  const testNotification = async () => {
    try {
      await NotificationService.scheduleNotification(
        '🧪 Teste de Notificação',
        'Se você está vendo isso, as notificações estão funcionando!',
        { seconds: 2 },
        { type: 'test' }
      );
      
      Alert.alert(
        '🔔 Teste Enviado',
        'Uma notificação de teste será exibida em 2 segundos.',
        [{ text: 'OK' }]
      );
    } catch (error) {
      Alert.alert(
        '❌ Erro no Teste',
        'Não foi possível enviar a notificação de teste.',
        [{ text: 'OK' }]
      );
    }
  };

  if (isLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={styles.loadingText}>Carregando preferências...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>🔔 Notificações</Text>
        <Text style={styles.subtitle}>Configure quando receber lembretes</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📱 Notificações Ativas</Text>
        
        <View style={styles.optionRow}>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>📚 Lembrete Diário</Text>
            <Text style={styles.optionDescription}>
              Todos os dias às 19h para continuar seus estudos
            </Text>
          </View>
          <Switch
            value={preferences.dailyReminder}
            onValueChange={(value) => updatePreference('dailyReminder', value)}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <View style={styles.optionRow}>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>📊 Progresso Semanal</Text>
            <Text style={styles.optionDescription}>
              Segundas-feiras às 9h com resumo do seu progresso
            </Text>
          </View>
          <Switch
            value={preferences.weeklyProgress}
            onValueChange={(value) => updatePreference('weeklyProgress', value)}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <View style={styles.optionRow}>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>🎉 Conquistas</Text>
            <Text style={styles.optionDescription}>
              Quando você alcançar novas conquistas e metas
            </Text>
          </View>
          <Switch
            value={preferences.achievements}
            onValueChange={(value) => updatePreference('achievements', value)}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>

        <View style={styles.optionRow}>
          <View style={styles.optionInfo}>
            <Text style={styles.optionTitle}>💤 Lembrete de Inatividade</Text>
            <Text style={styles.optionDescription}>
              Após 3 dias sem usar o app
            </Text>
          </View>
          <Switch
            value={preferences.inactivityReminder}
            onValueChange={(value) => updatePreference('inactivityReminder', value)}
            trackColor={{ false: COLORS.lightGray, true: COLORS.primary }}
            thumbColor={COLORS.white}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🧪 Teste</Text>
        <TouchableOpacity style={styles.testButton} onPress={testNotification}>
          <Text style={styles.testButtonText}>Enviar Notificação de Teste</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoSection}>
        <Text style={styles.infoTitle}>ℹ️ Como Funciona</Text>
        <Text style={styles.infoText}>
          • As notificações são locais (não precisam de internet){'\n'}
          • Você pode alterar essas configurações a qualquer momento{'\n'}
          • Se desativar uma notificação, ela será cancelada automaticamente
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    padding: 20,
    backgroundColor: COLORS.primary,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.white,
    opacity: 0.9,
  },
  section: {
    margin: 20,
    padding: 16,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    shadowColor: COLORS.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.lightGray,
  },
  optionInfo: {
    flex: 1,
    marginRight: 15,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 18,
  },
  testButton: {
    backgroundColor: COLORS.accent,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  testButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.white,
  },
  infoSection: {
    margin: 20,
    marginTop: 0,
    padding: 16,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 12,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.textSecondary,
    lineHeight: 20,
  },
  loadingText: {
    fontSize: 16,
    color: COLORS.textSecondary,
  },
});

export default NotificationsScreen;