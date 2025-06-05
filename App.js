import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, AppState } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from './src/styles/globalStyles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { HistoryProvider } from './src/contexts/HistoryContext';
import { FreemiumProvider } from './src/contexts/FreemiumContext';
import { GamificationProvider } from './src/contexts/GamificationContext';
import { ThemeProvider } from './src/contexts/ThemeContext';
import LoadingIndicator from './src/components/LoadingIndicator';
import AnalyticsService from './src/services/AnalyticsService';
import NotificationService from './src/services/NotificationService';
import OnboardingScreen from './src/components/OnboardingScreen';
import WebSafeStorage from './src/utils/webStorage';

// Importação de TODAS as telas (testado e funcionando)
import HomeScreenSimple from './src/screens/HomeScreenSimple';
import Chapter1Screen from './src/screens/Chapter1Screen';
import Chapter2Screen from './src/screens/Chapter2Screen';
import Chapter3Screen from './src/screens/Chapter3Screen';
import Chapter4Screen from './src/screens/Chapter4Screen';
import Chapter5Screen from './src/screens/Chapter5Screen';
import Chapter6Screen from './src/screens/Chapter6Screen';
import Chapter7Screen from './src/screens/Chapter7Screen';
import Chapter8Screen from './src/screens/Chapter8Screen';
import Chapter9Screen from './src/screens/Chapter9Screen';
import HistoryScreen from './src/screens/HistoryScreen';
import NotificationsScreen from './src/screens/NotificationsScreen';

const Stack = createStackNavigator();

// 🛡️ ERROR BOUNDARY para capturar erros de componentes
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('🚨 ErrorBoundary caught error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <SafeAreaProvider>
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ Erro no Componente</Text>
            <Text style={styles.errorMessage}>
              Um componente encontrou um problema, mas o app continua funcionando.
            </Text>
            <Text style={styles.errorDetail}>
              {this.state.error?.message || 'Erro desconhecido'}
            </Text>
          </View>
        </SafeAreaProvider>
      );
    }

    return this.props.children;
  }
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [hasOnboarded, setHasOnboarded] = useState(true);

  // Verificar se já passou pelo onboarding
  useEffect(() => {
    console.log('🚀 App.js: Iniciando aplicativo completo');
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    console.log('🔍 App.js: Verificando onboarding...');
    try {
      const hasCompleted = await WebSafeStorage.getItem('onboarding_completed');
      console.log('📱 App.js: Onboarding status:', hasCompleted);
      setHasOnboarded(hasCompleted === 'true');
    } catch (error) {
      console.log('❌ Erro ao verificar onboarding:', error);
      setHasOnboarded(true); // Se der erro, pula o onboarding
    } finally {
      console.log('✅ App.js: Carregamento concluído');
      setIsLoading(false);
    }
  };

  const completeOnboarding = async () => {
    console.log('🎯 App.js: Completando onboarding...');
    try {
      await WebSafeStorage.setItem('onboarding_completed', 'true');
      setHasOnboarded(true);
    } catch (error) {
      console.log('❌ Erro ao completar onboarding:', error);
      setHasOnboarded(true); // Prossegue mesmo se der erro
    }
  };

  console.log('🎪 App.js - Estados:', { isLoading, hasOnboarded, hasError });

  if (isLoading) {
    console.log('⏳ App.js: Mostrando LoadingIndicator');
    return <LoadingIndicator />;
  }

  if (!hasOnboarded) {
    console.log('📖 App.js: Mostrando OnboardingScreen');
    return <OnboardingScreen onComplete={completeOnboarding} />;
  }

  if (hasError) {
    console.log('💥 App.js: Mostrando tela de erro');
    return (
      <SafeAreaProvider>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Erro ao carregar aplicativo</Text>
          <Text style={styles.errorMessage}>{errorMessage}</Text>
          <Text style={styles.errorHelp}>Verifique se todas as dependências estão instaladas corretamente.</Text>
        </View>
      </SafeAreaProvider>
    );
  }

  // 🎉 Renderizar o aplicativo completo com TODAS as funcionalidades
  console.log('🎉 App.js: Renderizando aplicativo COMPLETO');
  return (
    <ErrorBoundary>
      <SafeAreaProvider>
        <ThemeProvider>
          <GamificationProvider>
            <FreemiumProvider>
              <HistoryProvider>
                <NavigationContainer>
                  <Stack.Navigator
                    initialRouteName="Home"
                    screenOptions={{
                      headerStyle: {
                        backgroundColor: COLORS.primaryDark,
                      },
                      headerTintColor: '#fff',
                      headerTitleStyle: {
                        fontWeight: 'bold',
                      },
                    }}
                  >
                    <Stack.Screen 
                      name="Home" 
                      component={HomeScreenSimple} 
                      options={{ 
                        title: '💰 Investindo com Sabedoria',
                        headerShown: false
                      }} 
                    />
                    
                    <Stack.Screen 
                      name="Chapter1" 
                      component={Chapter1Screen} 
                      options={{ 
                        title: 'Capítulo 1 - Investir aos Poucos',
                        headerBackTitle: 'Voltar'
                      }} 
                    />
                    
                    <Stack.Screen 
                      name="Chapter2" 
                      component={Chapter2Screen} 
                      options={{ 
                        title: 'Capítulo 2 - Ativos Financeiros',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="Chapter3" 
                      component={Chapter3Screen} 
                      options={{ 
                        title: 'Capítulo 3 - Perfil de Investidor',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="Chapter4" 
                      component={Chapter4Screen} 
                      options={{ 
                        title: 'Capítulo 4 - Renda Fixa',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="Chapter5" 
                      component={Chapter5Screen} 
                      options={{ 
                        title: 'Capítulo 5 - Renda Variável',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="Chapter6" 
                      component={Chapter6Screen} 
                      options={{ 
                        title: 'Capítulo 6 - Fundos + Dicas',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="Chapter7" 
                      component={Chapter7Screen} 
                      options={{ 
                        title: '🎓 Módulo Extra 1 - Impostos',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="Chapter8" 
                      component={Chapter8Screen} 
                      options={{ 
                        title: '🎓 Módulo Extra 2 - Estratégias',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="Chapter9" 
                      component={Chapter9Screen} 
                      options={{ 
                        title: '🎓 Módulo Extra 3 - Ferramentas Avançadas',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="History" 
                      component={HistoryScreen} 
                      options={{ 
                        title: '📊 Histórico',
                        headerBackTitle: 'Voltar'
                      }} 
                    />

                    <Stack.Screen 
                      name="Notifications" 
                      component={NotificationsScreen} 
                      options={{ 
                        title: '🔔 Notificações',
                        headerBackTitle: 'Voltar',
                        headerShown: true,
                      }} 
                    />

                  </Stack.Navigator>
                </NavigationContainer>
              </HistoryProvider>
            </FreemiumProvider>
          </GamificationProvider>
        </ThemeProvider>
      </SafeAreaProvider>
    </ErrorBoundary>
  );
}

// Estilos para as mensagens de erro
const styles = StyleSheet.create({
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.white,
  },
  errorTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e74c3c',
    marginBottom: 15,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorDetail: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'monospace',
  },
  errorHelp: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
