import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme, Platform } from 'react-native';
import WebSafeStorage from '../utils/webStorage';
import { COLORS, DARK_COLORS } from '../styles/globalStyles';
import AnalyticsService from '../services/AnalyticsService';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [themePreference, setThemePreference] = useState('system');
  const [isLoading, setIsLoading] = useState(true);

  const THEME_STORAGE_KEY = 'theme_preference';

  useEffect(() => {
    loadThemePreference();
  }, []);

  useEffect(() => {
    updateTheme();
  }, [themePreference, systemColorScheme]);

  const loadThemePreference = async () => {
    try {
      setIsLoading(true);
      
      // 🌐 FIX: Bypass AsyncStorage no web para evitar travamento
      if (Platform.OS === 'web') {
        console.log('🌐 ThemeContext: Web detected - using default theme');
        setThemePreference('system');
        setIsLoading(false);
        return;
      }
      
      const savedPreference = await WebSafeStorage.getItem(THEME_STORAGE_KEY);
      
      if (savedPreference) {
        setThemePreference(savedPreference);
        await AnalyticsService.logEvent('theme_preference_loaded', {
          preference: savedPreference,
          system_scheme: systemColorScheme
        });
      } else {
        setThemePreference('system');
      }
    } catch (error) {
      console.log('Erro ao carregar preferência de tema:', error);
      setThemePreference('system');
    } finally {
      setIsLoading(false);
    }
  };

  const updateTheme = () => {
    let shouldUseDark = false;
    switch (themePreference) {
      case 'dark': shouldUseDark = true; break;
      case 'light': shouldUseDark = false; break;
      case 'system':
      default: shouldUseDark = systemColorScheme === 'dark'; break;
    }
    setIsDarkMode(shouldUseDark);
  };
  const saveThemePreference = async (preference) => {
    try {
      // 🌐 FIX: Bypass AsyncStorage no web para evitar travamento
      if (Platform.OS !== 'web') {
        await WebSafeStorage.setItem(THEME_STORAGE_KEY, preference);
      }
      
      setThemePreference(preference);
      
      await AnalyticsService.logEvent('theme_changed', {
        old_preference: themePreference,
        new_preference: preference,
        system_scheme: systemColorScheme,
        final_mode: preference === 'system' ? systemColorScheme : preference
      });
    } catch (error) {
      console.log('Erro ao salvar preferência de tema:', error);
    }
  };

  const toggleTheme = async () => {
    const newPreference = isDarkMode ? 'light' : 'dark';
    await saveThemePreference(newPreference);
  };

  const setTheme = async (preference) => {
    if (['light', 'dark', 'system'].includes(preference)) {
      await saveThemePreference(preference);
    }
  };

  const getColors = () => isDarkMode ? DARK_COLORS : COLORS;
  const getColor = (colorName) => {
    const colors = getColors();
    return colors[colorName] || colors.text;
  };

  const getThemedStyles = (styles) => {
    if (typeof styles === 'function') {
      return styles(getColors());
    }
    return styles;
  };

  const contextValue = {
    isDarkMode, themePreference, systemColorScheme, isLoading,
    toggleTheme, setTheme, getColors, getColor, getThemedStyles,
    colors: getColors()
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useColors = () => {
  const { getColors } = useTheme();
  return getColors();
};

export const useIsDarkMode = () => {
  const { isDarkMode } = useTheme();
  return isDarkMode;
};

// Hook CRÍTICO para compatibilidade sem quebrar
export const useLegacyColors = () => {
  try {
    const { getColors } = useTheme();
    return getColors();
  } catch (error) {
    // Fallback para COLORS se ThemeProvider não disponível
    const { COLORS } = require('../styles/globalStyles');
    return COLORS;
  }
};

export default ThemeContext;