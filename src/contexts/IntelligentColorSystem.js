// 🎯 SISTEMA ÍNTEGRO DE CORES INTELIGENTE
// Solução completa para adaptação automática de modo dark em toda a aplicação

import { useContext, createContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';
import WebSafeStorage from '../utils/webStorage';

// 🎨 PALETA DE CORES COMPLETA E INTELIGENTE
export const INTELLIGENT_COLORS = {
  // MODO CLARO
  light: {
    // Cores principais
    primary: '#2c3e50',
    primaryLight: '#3498db',
    primaryDark: '#1a252f',
    secondary: '#3498db',
    accent: '#4ECDC4',
    
    // Cores de fundo
    background: '#ffffff',
    surface: '#ffffff',
    cardBackground: '#ffffff',
    headerBackground: '#2c3e50',
    
    // Cores de texto
    text: '#000000',
    textSecondary: '#666666',
    textLight: '#888888',
    textWhite: '#ffffff',
    
    // Cores de interface
    border: '#e0e0e0',
    shadow: '#000000',
    overlay: 'rgba(0, 0, 0, 0.1)',
    
    // Cores de status
    success: '#4CAF50',
    warning: '#FFC107',
    danger: '#F44336',
    info: '#2196F3',
    
    // Cores específicas
    inputBackground: '#ffffff',
    buttonPrimary: '#2c3e50',
    buttonSecondary: '#f0f0f0',
    link: '#3498db',
  },
  
  // MODO ESCURO  
  dark: {
    // Cores principais
    primary: '#3498db',
    primaryLight: '#5dade2',
    primaryDark: '#1b2631',
    secondary: '#5dade2',
    accent: '#4ECDC4',
    
    // Cores de fundo
    background: '#1a1a1a',
    surface: '#2c3e50',
    cardBackground: '#34495e',
    headerBackground: '#1b2631',
    
    // Cores de texto
    text: '#ffffff',
    textSecondary: '#bdc3c7',
    textLight: '#95a5a6',
    textWhite: '#ffffff',
    
    // Cores de interface
    border: '#566573',
    shadow: '#000000',
    overlay: 'rgba(255, 255, 255, 0.1)',
    
    // Cores de status
    success: '#58d68d',
    warning: '#f4d03f',
    danger: '#ec7063',
    info: '#5dade2',
    
    // Cores específicas
    inputBackground: '#34495e',
    buttonPrimary: '#3498db',
    buttonSecondary: '#566573',
    link: '#5dade2',
  }
};

// 🧠 CONTEXTO INTELIGENTE DE CORES
const IntelligentColorContext = createContext(null);

// 🎯 PROVIDER INTELIGENTE
export const IntelligentColorProvider = ({ children }) => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [userPreference, setUserPreference] = useState('system');

  // Carregar preferência salva
  useEffect(() => {
    loadUserPreference();
  }, []);

  // Atualizar modo baseado na preferência
  useEffect(() => {
    updateDarkMode();
  }, [userPreference, systemScheme]);

  const loadUserPreference = async () => {
    try {
      const saved = await WebSafeStorage.getItem('theme_preference');
      if (saved) {
        setUserPreference(saved);
      }
    } catch (error) {
      console.log('Erro ao carregar preferência de tema:', error);
    }
  };

  const updateDarkMode = () => {
    let shouldBeDark = false;
    
    switch (userPreference) {
      case 'dark':
        shouldBeDark = true;
        break;
      case 'light':
        shouldBeDark = false;
        break;
      case 'system':
      default:
        shouldBeDark = systemScheme === 'dark';
        break;
    }
    
    setIsDarkMode(shouldBeDark);
  };

  const setThemePreference = async (preference) => {
    try {
      await WebSafeStorage.setItem('theme_preference', preference);
      setUserPreference(preference);
    } catch (error) {
      console.log('Erro ao salvar preferência de tema:', error);
    }
  };

  // 🎨 FUNÇÃO INTELIGENTE DE CORES
  const getColors = () => {
    return isDarkMode ? INTELLIGENT_COLORS.dark : INTELLIGENT_COLORS.light;
  };

  // 🔧 FUNÇÃO DE COR ESPECÍFICA
  const getColor = (colorName) => {
    const colors = getColors();
    return colors[colorName] || colors.text;
  };

  // 🎯 FUNÇÃO DE ESTILOS DINÂMICOS
  const createDynamicStyles = (styleFunction) => {
    return styleFunction(getColors());
  };

  const contextValue = {
    isDarkMode,
    userPreference,
    systemScheme,
    getColors,
    getColor,
    createDynamicStyles,
    setThemePreference,
    colors: getColors(),
  };

  return (
    <IntelligentColorContext.Provider value={contextValue}>
      {children}
    </IntelligentColorContext.Provider>
  );
};

// 🚀 HOOKS INTELIGENTES E SEGUROS

// Hook principal - sempre funciona
export const useIntelligentColors = () => {
  try {
    const context = useContext(IntelligentColorContext);
    if (context) {
      return context;
    }
  } catch (error) {
    console.warn('IntelligentColorContext não disponível, usando fallback');
  }
  
  // Fallback seguro
  return {
    isDarkMode: false,
    colors: INTELLIGENT_COLORS.light,
    getColors: () => INTELLIGENT_COLORS.light,
    getColor: (name) => INTELLIGENT_COLORS.light[name] || INTELLIGENT_COLORS.light.text,
    createDynamicStyles: (fn) => fn(INTELLIGENT_COLORS.light),
  };
};

// Hook apenas para cores (mais simples)
export const useSmartColors = () => {
  const { colors } = useIntelligentColors();
  return colors;
};

// Hook para modo escuro
export const useIsDark = () => {
  const { isDarkMode } = useIntelligentColors();
  return isDarkMode;
};

// Hook para estilos dinâmicos
export const useDynamicStyles = (styleFunction) => {
  const { createDynamicStyles } = useIntelligentColors();
  return createDynamicStyles(styleFunction);
};

export default IntelligentColorProvider;
