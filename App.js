import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { COLORS } from './src/styles/globalStyles';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import LoadingIndicator from './src/components/LoadingIndicator';

// Importação das telas
import HomeScreen from './src/screens/HomeScreen';
import Chapter1Screen from './src/screens/Chapter1Screen';
import Chapter2Screen from './src/screens/Chapter2Screen';
import Chapter3Screen from './src/screens/Chapter3Screen';
import Chapter4Screen from './src/screens/Chapter4Screen';
import Chapter5Screen from './src/screens/Chapter5Screen';
import Chapter6Screen from './src/screens/Chapter6Screen';
import Chapter7Screen from './src/screens/Chapter7Screen';
import Chapter8Screen from './src/screens/Chapter8Screen';

// Criação do stack navigator
const Stack = createStackNavigator();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Verificar o carregamento das bibliotecas necessárias
  useEffect(() => {
    const checkDependencies = async () => {
      if (Platform.OS === 'web') {
        try {
          // Tentar carregar as bibliotecas necessárias para web
          // Se não funcionar, não é problema, usaremos o fallback
          setIsLoading(false);
        } catch (error) {
          console.warn('Erro ao carregar dependências:', error);
          setIsLoading(false);
        }
      } else {
        try {
          // No mobile, tentar carregar react-native-svg e react-native-svg-charts
          require('react-native-svg');
          require('react-native-svg-charts');
          setIsLoading(false);
        } catch (error) {
          console.error('Erro ao carregar bibliotecas SVG:', error);
          setHasError(true);
          setErrorMessage('Não foi possível carregar as bibliotecas de visualização de gráficos.');
          setIsLoading(false);
        }
      }
    };

    checkDependencies();
  }, []);

  // Renderizar indicador de carregamento
  if (isLoading) {
    return (
      <SafeAreaProvider>
        <LoadingIndicator message="Carregando recursos..." />
      </SafeAreaProvider>
    );
  }

  // Renderizar mensagem de erro caso alguma dependência tenha falhado
  if (hasError) {
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

  // Renderizar o aplicativo normalmente
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <StatusBar style="light" backgroundColor={COLORS.primaryDark} />
        
        <Stack.Navigator
          initialRouteName="Home"
          screenOptions={{
            headerStyle: {
              backgroundColor: COLORS.primaryDark,
            },
            headerTintColor: COLORS.white,
            headerTitleStyle: {
              fontWeight: 'bold',
              textTransform: 'uppercase',
            },
            headerTitleAlign: 'center',
          }}
        >
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ 
            title: 'Investindo com Sabedoria',
            headerShown: false, // Oculta o header na tela inicial
          }} 
        />
        
        <Stack.Screen 
          name="Chapter1" 
          component={Chapter1Screen} 
          options={{ 
            title: 'Capítulo 1',
            headerBackTitle: 'Voltar',
          }} 
        />
        
        <Stack.Screen 
          name="Chapter2" 
          component={Chapter2Screen} 
          options={{ 
            title: 'Capítulo 2',
            headerBackTitle: 'Voltar',
          }} 
        />
        
        <Stack.Screen 
          name="Chapter3" 
          component={Chapter3Screen} 
          options={{ 
            title: 'Capítulo 3',
            headerBackTitle: 'Voltar',
          }} 
        />
        
        <Stack.Screen 
          name="Chapter4" 
          component={Chapter4Screen} 
          options={{ 
            title: 'Capítulo 4',
            headerBackTitle: 'Voltar',
          }} 
        />
        
        <Stack.Screen 
          name="Chapter5" 
          component={Chapter5Screen} 
          options={{ 
            title: 'Capítulo 5',
            headerBackTitle: 'Voltar',
          }} 
        />
        
        <Stack.Screen 
          name="Chapter6" 
          component={Chapter6Screen} 
          options={{ 
            title: 'Capítulo 6',
            headerBackTitle: 'Voltar',
          }} 
        />

        <Stack.Screen 
          name="Chapter7" 
          component={Chapter7Screen} 
          options={{ 
            title: 'Capítulo 7',
            headerBackTitle: 'Voltar',
          }} 
        />

        <Stack.Screen 
          name="Chapter8" 
          component={Chapter8Screen} 
          options={{ 
            title: 'Capítulo 8',
            headerBackTitle: 'Voltar',
          }} 
        />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
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
  errorHelp: {
    fontSize: 14,
    color: '#777',
    marginTop: 20,
    textAlign: 'center',
  },
});
