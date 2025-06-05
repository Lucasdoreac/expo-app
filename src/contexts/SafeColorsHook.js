// ✅ HOOK SEGURO: useSafeColors
// Evita erros "Cannot read properties of null" com fallback automático

import { useContext } from 'react';
import { COLORS, DARK_COLORS } from '../styles/globalStyles';

// Hook seguro que sempre retorna cores válidas
export const useSafeColors = () => {
  try {
    // Tentar usar o contexto do tema
    const ThemeContext = require('./ThemeContext').default;
    const context = useContext(ThemeContext);
    
    if (context && context.getColors) {
      return context.getColors();
    }
  } catch (error) {
    // Em caso de erro, usar cores padrão
    console.warn('ThemeContext não disponível, usando cores padrão:', error.message);
  }
  
  // Fallback: retornar cores padrão sempre
  return COLORS;
};

// Hook ainda mais seguro para componentes críticos
export const useColorsOrDefault = (isDarkModeForced = false) => {
  try {
    const colors = useSafeColors();
    return colors;
  } catch (error) {
    // Se tudo falhar, usar cores estáticas baseadas no modo
    return isDarkModeForced ? DARK_COLORS : COLORS;
  }
};

export default useSafeColors;
