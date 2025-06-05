import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import AutomatedInvestmentSimulator from '../components/AutomatedInvestmentSimulator';
import UltraSimplePieChart from '../components/UltraSimplePieChart';
import SectionWrapper from '../components/SectionWrapper';

const Chapter5Screen = ({ navigation }) => {
  const { colors } = useTheme();
  
  // 🎨 Estilos dinâmicos baseados no tema
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      backgroundColor: colors.primaryDark,
      paddingVertical: 20,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    headerTitle: {
      color: colors.buttonText,
      fontSize: 24,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerSubtitle: {
      color: colors.buttonText,
      fontSize: 16,
      marginTop: 5,
      textAlign: 'center',
    },
    content: {
      flex: 1,
      padding: 20,
    },
    scrollContent: {
      paddingBottom: 100,
    },
    introText: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
      marginBottom: 25,
    },
    highlight: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    section: {
      marginBottom: 30,
    },
    sectionTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 15,
      textAlign: 'center',
    },
    tipBox: {
      backgroundColor: colors.lightBlue,
      borderRadius: 10,
      padding: 15,
      marginVertical: 12,
      borderLeftWidth: 4,
      borderLeftColor: colors.primary,
    },
    tipText: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.text,
      fontStyle: 'italic',
    },
    navigation: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 20,
      paddingTop: 20,
      borderTopWidth: 1,
      borderTopColor: colors.lightGray,
    },
    navButton: {
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 8,
      width: '48%',
      alignItems: 'center',
    },
    prevButton: {
      backgroundColor: colors.lightGray,
    },
    nextButton: {
      backgroundColor: colors.primary,
    },
    prevButtonText: {
      fontWeight: 'bold',
      color: colors.textSecondary,
    },
    nextButtonText: {
      fontWeight: 'bold',
      color: colors.buttonText,
    },
    portfolioContainer: {
      backgroundColor: colors.cardBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 15,
    },
    portfolioTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.primary,
      marginBottom: 15,
      textAlign: 'center',
    },
    chartRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 20,
    },
    pieChartContainer: {
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
    },
    explanationText: {
      fontSize: 15,
      lineHeight: 22,
      color: colors.textSecondary,
      fontStyle: 'italic',
      textAlign: 'center',
      marginTop: 10,
    },
  });
  
  const portfolioData = [
    { label: 'Renda Fixa', percentage: 65, color: colors.primary },
    { label: 'Ações Brasil', percentage: 20, color: '#4CAF50' },
    { label: 'FIIs', percentage: 10, color: '#FFC107' },
    { label: 'Internacional', percentage: 5, color: '#9C27B0' },
  ];

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <View style={dynamicStyles.headerContainer}>
        <Text style={dynamicStyles.headerTitle}>Capítulo 5</Text>
        <Text style={dynamicStyles.headerSubtitle}>Renda Variável</Text>
      </View>
      
      <ScrollView style={dynamicStyles.content} contentContainerStyle={dynamicStyles.scrollContent}>
        <View>
          <Text style={dynamicStyles.introText}>
            A <Text style={dynamicStyles.highlight}>renda variável</Text> é essencial para proteger o dinheiro da inflação 
            e fazer o patrimônio crescer no longo prazo.
          </Text>

          {/* Portfolio Section */}
          <SectionWrapper spacing="normal">
            <View style={dynamicStyles.section}>
              <Text style={dynamicStyles.sectionTitle}>💼 Carteira Sugerida para Iniciantes</Text>
              
              <View style={dynamicStyles.portfolioContainer}>
                <Text style={dynamicStyles.portfolioTitle}>Sugestão para Iniciantes</Text>
                
                <View style={dynamicStyles.chartRow}>
                  <View style={dynamicStyles.pieChartContainer}>
                    <UltraSimplePieChart
                      size={200}
                      data={portfolioData.map(item => ({
                        key: item.label,
                        value: item.percentage,
                        svg: { fill: item.color }
                      }))}
                    />
                  </View>
                </View>
                
                <Text style={dynamicStyles.explanationText}>
                  Esta composição combina segurança da renda fixa com exposição gradual à renda variável.
                </Text>
              </View>
            </View>
          </SectionWrapper>

          {/* Simulator */}
          <SectionWrapper spacing="large">
            <View style={dynamicStyles.section}>
              <Text style={dynamicStyles.sectionTitle}>🚀 Simulação de Aporte Automático</Text>
              <AutomatedInvestmentSimulator />
            </View>
          </SectionWrapper>

          {/* Navigation */}
          <View style={dynamicStyles.navigation}>
            <TouchableOpacity 
              style={[dynamicStyles.navButton, dynamicStyles.prevButton]}
              onPress={() => navigation.navigate('Chapter4')}
            >
              <Text style={dynamicStyles.prevButtonText}>← Capítulo 4</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[dynamicStyles.navButton, dynamicStyles.nextButton]}
              onPress={() => navigation.navigate('Chapter6')}
            >
              <Text style={dynamicStyles.nextButtonText}>Capítulo 6 →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chapter5Screen;