import { StyleSheet, Platform } from 'react-native';

// Estilos específicos para versão web
if (Platform.OS === 'web') {
  // Aplica estilos globais ao documento HTML
  document.body.style.overflow = 'auto';
  document.body.style.height = '100%';
  document.body.style.margin = '0';
  document.documentElement.style.height = '100%';
}

// Paleta de cores conforme especificado no Prompt Master
export const COLORS = {
  primary: '#2c3e50',      // Azul marinho (adicionado primary)
  primaryLight: '#b4e0e8', // Azul claro
  primaryDark: '#2c3e50',  // Azul marinho
  secondary: '#3498db',    // Azul médio para botões (ADICIONADO)
  accent: '#4ECDC4',       // Verde-azulado para destaques
  white: '#ffffff',
  black: '#000000',
  gray: '#f0f0f0',
  success: '#4CAF50',
  warning: '#FFC107',
  danger: '#F44336',
  
  // Cores específicas para elementos
  text: '#000000',
  textSecondary: '#666666',
  background: '#ffffff',
  surface: '#ffffff',
  cardBackground: '#ffffff',
  shadow: '#000000',
  lightGray: '#e0e0e0',
};

// Paleta de cores para Dark Mode
export const DARK_COLORS = {
  primary: '#3498db',      // Azul mais claro para dark mode
  primaryLight: '#5dade2', // Azul claro
  primaryDark: '#1b2631',  // Azul muito escuro para headers
  secondary: '#5dade2',    // Azul médio
  accent: '#4ECDC4',       // Verde-azulado (mantém)
  white: '#ffffff',
  black: '#000000',
  gray: '#2c3e50',         // Cinza escuro
  success: '#58d68d',      // Verde mais claro
  warning: '#f4d03f',      // Amarelo mais claro
  danger: '#ec7063',       // Vermelho mais claro
  
  // Cores específicas para dark mode
  text: '#ffffff',         // Texto branco
  textSecondary: '#bdc3c7', // Texto secundário claro
  background: '#1a1a1a',   // Fundo muito escuro
  surface: '#2c3e50',      // Superfícies escuras
  cardBackground: '#34495e', // Cards escuros
  shadow: '#000000',       // Sombra preta
  lightGray: '#566573',    // Cinza claro para dark mode
  border: '#e0e0e0',
};

// Estilos globais para manter consistência na aplicação
export const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.primaryDark,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  paragraph: {
    fontSize: 16,
    color: COLORS.black,
    lineHeight: 24,
    marginHorizontal: 15,
    marginBottom: 15,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  button: {
    backgroundColor: COLORS.primaryDark,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  buttonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginVertical: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  gridItem: {
    width: '48%',
    marginVertical: 5,
  },
});
