import { Platform } from 'react-native';

// Helper function para criar shadows compatíveis com web e mobile
export const createShadow = (options = {}) => {
  const {
    color = '#000',
    offset = { width: 0, height: 2 },
    opacity = 0.1,
    radius = 4,
    elevation = 3
  } = options;

  if (Platform.OS === 'web') {
    return {
      boxShadow: `${offset.width}px ${offset.height}px ${radius}px rgba(0, 0, 0, ${opacity})`,
    };
  }

  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: elevation,
  };
};

// Presets comuns
export const shadows = {
  small: createShadow({
    offset: { width: 0, height: 1 },
    opacity: 0.1,
    radius: 2,
    elevation: 2
  }),
  medium: createShadow({
    offset: { width: 0, height: 2 },
    opacity: 0.1,
    radius: 4,
    elevation: 3
  }),
  large: createShadow({
    offset: { width: 0, height: 4 },
    opacity: 0.15,
    radius: 8,
    elevation: 5
  }),
};
