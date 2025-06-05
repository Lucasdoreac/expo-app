import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

const Chapter6ScreenSimple = ({ navigation }) => {
  const { colors } = useTheme();
  
  // 🎨 Estilos dinâmicos baseados no tema
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      padding: 20,
      backgroundColor: colors.primary,
    },
    headerTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: colors.buttonText,
      textAlign: 'center',
    },
    content: {
      padding: 20,
    },
    text: {
      fontSize: 16,
      color: colors.text,
      lineHeight: 24,
      marginBottom: 15,
    },
    buttonContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20,
    },
    navButton: {
      backgroundColor: colors.primary,
      paddingHorizontal: 20,
      paddingVertical: 12,
      borderRadius: 8,
    },
    navButtonText: {
      color: colors.buttonText,
      fontSize: 16,
      fontWeight: 'bold',
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView>
        <View style={dynamicStyles.headerContainer}>
          <Text style={dynamicStyles.headerTitle}>Capítulo 6</Text>
          <Text style={dynamicStyles.headerTitle}>Fundos de Investimento</Text>
        </View>
        
        <View style={dynamicStyles.content}>
          <Text style={dynamicStyles.text}>
            🚧 Este capítulo está sendo corrigido e será disponibilizado em breve.
          </Text>
          
          <Text style={dynamicStyles.text}>
            Os fundos de investimento são uma excelente forma de diversificar seus investimentos 
            com baixo valor inicial e gestão profissional.
          </Text>
          
          <Text style={dynamicStyles.text}>
            Em breve você poderá acessar:
          </Text>
          
          <Text style={dynamicStyles.text}>
            • Calculadora de comparação de fundos{'\n'}
            • Carteira modelo com fundos{'\n'}
            • 20 dicas práticas{'\n'}
            • Gráficos interativos
          </Text>
        </View>
        
        <View style={dynamicStyles.buttonContainer}>
          <TouchableOpacity 
            style={dynamicStyles.navButton}
            onPress={() => navigation.navigate('Chapter5')}
          >
            <Text style={dynamicStyles.navButtonText}>← Capítulo 5</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={dynamicStyles.navButton}
            onPress={() => navigation.navigate('Chapter7')}
          >
            <Text style={dynamicStyles.navButtonText}>Capítulo 7 →</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chapter6ScreenSimple;
