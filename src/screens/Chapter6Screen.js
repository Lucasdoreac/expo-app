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
import FundComparisonCalculator from '../components/FundComparisonCalculator';
import UltraSimplePieChart from '../components/UltraSimplePieChart';
import InteractiveTips from '../components/InteractiveTips';
import SectionWrapper from '../components/SectionWrapper';

const Chapter6Screen = ({ navigation }) => {
  const { colors } = useTheme();
  
  // 🎨 Estilos dinâmicos baseados no tema
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      backgroundColor: colors.primaryDark,
      padding: 20,
      alignItems: 'center',
    },
    headerTitle: {
      color: colors.white,
      fontSize: 24,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerSubtitle: {
      color: colors.white,
      fontSize: 18,
      marginTop: 5,
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginVertical: 15,
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
      marginBottom: 15,
      textAlign: 'justify',
    },
    highlight: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    calculatorContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginVertical: 20,
      padding: 15,
      borderWidth: 1,
      borderColor: colors.lightGray,
    },
    portfolioSection: {
      marginTop: 40,
      backgroundColor: colors.surface,
      borderRadius: 12,
      padding: 20,
      borderWidth: 1,
      borderColor: colors.lightGray,
    },
    chartRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 20,
    },
    pieChartContainer: {
      flex: 1,
      alignItems: 'center',
    },
    pieLabelsContainer: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 20,
    },
    legendItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginVertical: 5,
    },
    legendColor: {
      width: 20,
      height: 20,
      borderRadius: 10,
      marginRight: 10,
    },
    legendText: {
      fontSize: 14,
      color: colors.text,
      flex: 1,
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      paddingHorizontal: 20,
    },
    navButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 5,
    },
    navButtonText: {
      color: colors.white,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    tipBox: {
      backgroundColor: colors.surface,
      borderLeftWidth: 4,
      borderLeftColor: colors.warning,
      padding: 15,
      marginVertical: 15,
      borderRadius: 8,
    },
    tipText: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 22,
    },
  });

  const portfolioData = [
    { label: 'Fundo DI', percentage: 40, color: colors.primaryDark },
    { label: 'ETF IVVB11', percentage: 30, color: colors.success },
    { label: 'Multimercado', percentage: 20, color: colors.warning },
    { label: 'FIIs', percentage: 10, color: colors.secondary },
  ];

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 50}}
        showsVerticalScrollIndicator={false}
      >
        <View style={dynamicStyles.headerContainer}>
          <Text style={dynamicStyles.headerTitle}>Capítulo 6 - Conclusão</Text>
          <Text style={dynamicStyles.headerSubtitle}>Fundos de Investimento + 20 Dicas Práticas</Text>
        </View>

        <View style={dynamicStyles.contentContainer}>
          <Text style={dynamicStyles.paragraph}>
            Os <Text style={dynamicStyles.highlight}>fundos de investimento</Text> são uma das formas mais 
            acessíveis e diversificadas de investir, especialmente para quem está começando ou 
            não tem tempo para análises detalhadas do mercado.
          </Text>

          {/* O que são Fundos */}
          <Text style={dynamicStyles.sectionTitle}>🎯 O que são Fundos de Investimento?</Text>
          <View style={dynamicStyles.tipBox}>
            <Text style={dynamicStyles.tipText}>
              Um fundo é como um <Text style={dynamicStyles.highlight}>"condomínio de investidores"</Text> onde 
              várias pessoas juntam seu dinheiro em um patrimônio comum, administrado por um 
              gestor profissional que toma as decisões de investimento.
            </Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>Vantagens:</Text> Diversificação automática, gestão profissional, 
                acesso a investimentos que exigiriam valores maiores individualmente.
              </Text>
            </View>
          </View>

          {/* Tipos de Fundos */}
          <View style={dynamicStyles.section}>
            <Text style={dynamicStyles.sectionTitle}>🏦 Principais Tipos de Fundos</Text>
            
            <View style={dynamicStyles.fundCard}>
              <Text style={dynamicStyles.fundTitle}>💰 Fundos DI e Renda Fixa</Text>
              <Text style={dynamicStyles.fundDesc}>
                <Text style={styles.highlight}>Objetivo:</Text> Seguir a taxa DI ou investir em títulos de renda fixa{'\n'}
                <Text style={styles.highlight}>Risco:</Text> Baixo • <Text style={styles.highlight}>Liquidez:</Text> Diária{'\n'}
                <Text style={styles.highlight}>Ideal para:</Text> Reserva de emergência, objetivos de curto prazo
              </Text>
            </View>

            <View style={styles.fundCard}>
              <Text style={styles.fundTitle}>🎭 Fundos Multimercado</Text>
              <Text style={styles.fundDesc}>
                <Text style={styles.highlight}>Objetivo:</Text> Buscar retornos superiores através de estratégias diversificadas{'\n'}
                <Text style={styles.highlight}>Risco:</Text> Médio a alto • <Text style={styles.highlight}>Liquidez:</Text> Diária{'\n'}
                <Text style={styles.highlight}>Ideal para:</Text> Diversificação da carteira, busca por rentabilidade
              </Text>
            </View>

            <View style={styles.fundCard}>
              <Text style={styles.fundTitle}>📈 Fundos de Ações</Text>
              <Text style={styles.fundDesc}>
                <Text style={styles.highlight}>Objetivo:</Text> Investir em ações de empresas brasileiras{'\n'}
                <Text style={styles.highlight}>Risco:</Text> Alto • <Text style={styles.highlight}>Liquidez:</Text> Diária{'\n'}
              <Text style={dynamicStyles.highlight}>Ideal para:</Text> Crescimento de longo prazo, jovens investidores
            </Text>
          </View>

          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>🏢 Fundos Imobiliários (FIIs)</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>Objetivo:</Text> Investir em imóveis comerciais e distribuir aluguéis{'\n'}
              <Text style={dynamicStyles.highlight}>Risco:</Text> Médio • <Text style={dynamicStyles.highlight}>Liquidez:</Text> Diária{'\n'}
              <Text style={dynamicStyles.highlight}>Ideal para:</Text> Renda passiva mensal, diversificação
            </Text>
          </View>

          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>🌍 ETFs (Exchange Traded Funds)</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>Objetivo:</Text> Replicar índices de mercado com baixo custo{'\n'}
              <Text style={dynamicStyles.highlight}>Risco:</Text> Varia conforme o índice{'\n'}
              <Text style={dynamicStyles.highlight}>Ideal para:</Text> Diversificação instantânea, baixo custo
            </Text>
          </View>

          {/* Custos */}
          <Text style={dynamicStyles.sectionTitle}>💰 Custos dos Fundos</Text>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>📋 Taxa de Administração</Text>
            <Text style={dynamicStyles.tipText}>
              Cobrada anualmente sobre o patrimônio. Varia de 0,3% (ETFs) até 3% (multimercado).
            </Text>
          </View>
          
          <View style={styles.costCard}>
            <Text style={styles.costTitle}>🎯 Taxa de Performance</Text>
            <Text style={styles.costDesc}>
              Cobrada quando o fundo supera um benchmark. Normalmente 20% do que exceder o CDI.
            </Text>
          </View>

          {/* Calculator */}
          <SectionWrapper type="calculator">
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>🧮 Compare Fundos</Text>
              <Text style={styles.paragraphText}>
                Use a calculadora abaixo para comparar diferentes fundos:
              </Text>
              <FundComparisonCalculator />
            </View>
          </SectionWrapper>

          {/* Portfolio Model */}
          <SectionWrapper type="portfolio">
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>📊 Carteira Modelo com Fundos</Text>
            
            <View style={styles.portfolioContainer}>
              <Text style={styles.portfolioTitle}>Exemplo: Carteira Conservadora</Text>
              
              <View style={styles.chartRow}>
                <View style={styles.pieChartContainer}>
                  <UltraSimplePieChart
                    size={200}
                    data={[
                      { key: 1, value: 40, svg: { fill: colors.primary } },
                      { key: 2, value: 30, svg: { fill: '#4CAF50' } },
                      { key: 3, value: 20, svg: { fill: '#FFC107' } },
                      { key: 4, value: 10, svg: { fill: '#9C27B0' } },
                    ]}
                  />
                </View>
                
                <View style={styles.pieLabelsContainer}>
                  {portfolioData.map((item, index) => (
                    <View key={index} style={styles.pieLabelRow}>
                      <View style={[styles.pieLabelColor, { backgroundColor: item.color }]} />
                      <Text style={styles.pieLabelText}>{item.label}: {item.percentage}%</Text>
                    </View>
                  ))}
                </View>
              </View>
              
              <View style={styles.portfolioList}>
                {portfolioData.map((item, index) => (
                  <View key={index} style={styles.portfolioItem}>
                    <View style={[styles.portfolioColor, { backgroundColor: item.color }]} />
                    <Text style={styles.portfolioLabel}>{item.label}: {item.percentage}%</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
          </SectionWrapper>

          {/* Selection Guide */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>✅ Como Escolher um Bom Fundo</Text>
            
            <View style={styles.stepCard}>
              <Text style={styles.stepNumber}>1</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Defina seu Objetivo</Text>
                <Text style={styles.stepDesc}>
                  Reserva de emergência → Fundo DI{'\n'}
                  Crescimento → Fundo de Ações ou ETF{'\n'}
                  Renda → FIIs ou Multimercado
                </Text>
              </View>
            </View>
            
            <View style={styles.stepCard}>
              <Text style={styles.stepNumber}>2</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Analise os Custos</Text>
                <Text style={styles.stepDesc}>
                  Taxa de administração abaixo da média{'\n'}
                  Evite taxas de entrada/saída{'\n'}
                  Compare custo vs. performance histórica
                </Text>
              </View>
            </View>
            
            <View style={styles.stepCard}>
              <Text style={styles.stepNumber}>3</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Verifique a Gestora</Text>
                <Text style={styles.stepDesc}>
                  Histórico da gestora e gestor{'\n'}
                  Patrimônio líquido do fundo{'\n'}
                  Reputação no mercado
                </Text>
              </View>
            </View>
          </View>
          {/* Tips */}
          <View style={styles.section}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>💡 20 Dicas Práticas para Investir com Sabedoria</Text>
            
            <Text style={styles.paragraphText}>
              Para concluir este guia, reunimos <Text style={styles.highlight}>20 dicas práticas e essenciais</Text> que 
              todo investidor iniciante deve conhecer:
            </Text>
            
            <View style={styles.tipsContainer}>
              <InteractiveTips />
            </View>
          </View>

          {/* Warning */}
          <View style={styles.warningCard}>
            <Text style={styles.warningTitle}>⚠️ Cuidados Importantes</Text>
            <Text style={styles.warningText}>
              • <Text style={styles.highlight}>Rentabilidade passada não garante rentabilidade futura</Text>{'\n'}
              • Leia sempre o prospecto e regulamento do fundo{'\n'}
              • Diversifique entre diferentes tipos de fundo{'\n'}
              • Fundos não têm garantia do FGC{'\n'}
              • Cuidado com fundos "da moda" ou promessas irreais
            </Text>
          </View>

          {/* Final Wisdom */}
          <View style={styles.wisdomContainer}>
            <Text style={styles.wisdomTitle}>🎯 Conclusão</Text>
            <Text style={styles.wisdomText}>
              <Text style={styles.highlight}>Investir com sabedoria não é sobre ser o mais inteligente do mercado,</Text> 
              mas sobre ser disciplinado, consistente e paciente. Comece hoje, mesmo que com pouco, 
              e vá aprendendo pelo caminho. Seu eu do futuro agradecerá!
            </Text>
          </View>

          {/* Navigation */}
          <View style={styles.navigation}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={() => navigation.navigate('Chapter5')}
            >
              <Text style={styles.prevButtonText}>← Capítulo 5</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={() => navigation.navigate('Chapter7')}
            >
              <Text style={styles.nextButtonText}>🎓 Módulos Extras →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    backgroundColor: colors.primaryDark,
    padding: 20,
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
    padding: 20,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
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
  },
  infoCard: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: 20,
    marginBottom: 10,
  },
  cardText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  paragraphText: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.black,
    marginBottom: 20,
  },
  fundCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: colors.primary,
  },
  fundTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 8,
  },
  fundDesc: {
    fontSize: 15,
    lineHeight: 22,
  },
  costCard: {
    backgroundColor: '#fff1f0',
    borderRadius: 10,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#e74c3c',
  },
  costTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#c0392b',
    marginBottom: 5,
  },
  costDesc: {
    fontSize: 14,
    lineHeight: 20,
  },
  portfolioContainer: {
    backgroundColor: '#f9f9f9',
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
    flexWrap: 'wrap',
    marginBottom: 20,
    width: '100%',
  },
  pieChartContainer: {
    width: 200,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  pieLabelsContainer: {
    minWidth: 150,
    paddingLeft: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  pieLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    paddingVertical: 4,
    paddingHorizontal: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 4,
    width: '100%',
  },
  pieLabelColor: {
    width: 16,
    height: 16,
    borderRadius: 3,
    marginRight: 8,
  },
  pieLabelText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  portfolioList: {
    marginBottom: 10,
  },
  portfolioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.cardBackground,
    borderRadius: 8,
  },
  portfolioColor: {
    width: 20,
    height: 20,
    borderRadius: 4,
    marginRight: 12,
  },
  portfolioLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  stepCard: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: colors.cardBackground,
    borderRadius: 10,
    padding: 15,
    shadowColor: colors.shadow,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepNumber: {
    backgroundColor: colors.primary,
    color: colors.buttonText,
    width: 30,
    height: 30,
    borderRadius: 15,
    textAlign: 'center',
    lineHeight: 30,
    fontWeight: 'bold',
    fontSize: 16,
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  tipsContainer: {
    marginBottom: 20,
  },
  warningCard: {
    backgroundColor: '#fff1f0',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0392b',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    lineHeight: 20,
  },
  wisdomContainer: {
    backgroundColor: colors.primaryLight,
    borderRadius: 12,
    padding: 20,
    marginBottom: 30,
  },
  wisdomTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 10,
  },
  wisdomText: {
    fontSize: 15,
    lineHeight: 22,
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
});

export default Chapter6Screen;
