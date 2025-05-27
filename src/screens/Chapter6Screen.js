import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { COLORS, globalStyles } from '../styles/globalStyles';
import FundComparisonCalculator from '../components/FundComparisonCalculator';
import SimplePieChart from '../components/SimplePieChart';

const Chapter6Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}} style={{flex: 1, width: '100%'}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Capítulo 6</Text>
          <Text style={styles.headerSubtitle}>Fundos de Investimento</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            Os <Text style={styles.highlight}>fundos de investimento</Text> são uma das formas mais 
            acessíveis e diversificadas de investir, especialmente para quem está começando ou 
            não tem tempo para análises detalhadas do mercado.
          </Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🎯 O que são Fundos de Investimento?</Text>
            <Text style={styles.infoText}>
              Um fundo é como um <Text style={styles.highlight}>"condomínio de investidores"</Text> onde 
              várias pessoas juntam seu dinheiro em um patrimônio comum, administrado por um 
              gestor profissional que toma as decisões de investimento.
            </Text>
            <Text style={styles.infoText}>
              <Text style={styles.highlight}>Vantagens:</Text> Diversificação automática, gestão profissional, 
              acesso a investimentos que exigiriam valores maiores individualmente.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>🏦 Principais Tipos de Fundos</Text>
          
          <View style={styles.fundTypeCard}>
            <Text style={styles.fundTypeTitle}>1. 💰 Fundos DI e Renda Fixa</Text>
            <Text style={styles.fundTypeDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Seguir a taxa DI ou investir em títulos de renda fixa{'\n'}
              <Text style={styles.highlight}>Risco:</Text> Baixo{'\n'}
              <Text style={styles.highlight}>Liquidez:</Text> Diária{'\n'}
              <Text style={styles.highlight}>Ideal para:</Text> Reserva de emergência, objetivos de curto prazo
            </Text>
            <View style={styles.fundExample}>
              <Text style={styles.exampleTitle}>📊 Exemplo de Composição:</Text>
              <Text style={styles.exampleText}>• 80% CDI/Tesouro Selic</Text>
              <Text style={styles.exampleText}>• 15% CDBs de bancos grandes</Text>
              <Text style={styles.exampleText}>• 5% LCIs/LCAs</Text>
            </View>
          </View>
          
          <View style={styles.fundTypeCard}>
            <Text style={styles.fundTypeTitle}>2. 🎭 Fundos Multimercado</Text>
            <Text style={styles.fundTypeDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Buscar retornos superiores através de estratégias diversificadas{'\n'}
              <Text style={styles.highlight}>Risco:</Text> Médio a alto{'\n'}
              <Text style={styles.highlight}>Liquidez:</Text> Diária (pode ter carência){'\n'}
              <Text style={styles.highlight}>Ideal para:</Text> Diversificação da carteira, busca por rentabilidade
            </Text>
            <View style={styles.fundExample}>
              <Text style={styles.exampleTitle}>🎯 Estratégias Comuns:</Text>
              <Text style={styles.exampleText}>• Macro: apostas em cenários econômicos</Text>
              <Text style={styles.exampleText}>• Long Short: compra e venda de ações</Text>
              <Text style={styles.exampleText}>• Capital Protegido: proteção do capital</Text>
            </View>
          </View>
          
          <View style={styles.fundTypeCard}>
            <Text style={styles.fundTypeTitle}>3. 📈 Fundos de Ações</Text>
            <Text style={styles.fundTypeDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Investir em ações de empresas brasileiras{'\n'}
              <Text style={styles.highlight}>Risco:</Text> Alto{'\n'}
              <Text style={styles.highlight}>Liquidez:</Text> Diária{'\n'}
              <Text style={styles.highlight}>Ideal para:</Text> Crescimento de longo prazo, jovens investidores
            </Text>
            <View style={styles.fundExample}>
              <Text style={styles.exampleTitle}>🏢 Tipos Principais:</Text>
              <Text style={styles.exampleText}>• Índice: replicam Ibovespa, IBRX-100</Text>
              <Text style={styles.exampleText}>• Livre: gestão ativa na seleção</Text>
              <Text style={styles.exampleText}>• Setoriais: foco em setores específicos</Text>
            </View>
          </View>
          
          <View style={styles.fundTypeCard}>
            <Text style={styles.fundTypeTitle}>4. 🏢 Fundos Imobiliários (FIIs)</Text>
            <Text style={styles.fundTypeDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Investir em imóveis comerciais e distribuir aluguéis{'\n'}
              <Text style={styles.highlight}>Risco:</Text> Médio{'\n'}
              <Text style={styles.highlight}>Liquidez:</Text> Diária (via bolsa){'\n'}
              <Text style={styles.highlight}>Ideal para:</Text> Renda passiva mensal, diversificação
            </Text>
            <View style={styles.fundExample}>
              <Text style={styles.exampleTitle}>🏗️ Tipos de FIIs:</Text>
              <Text style={styles.exampleText}>• Tijolo: prédios comerciais, shoppings</Text>
              <Text style={styles.exampleText}>• Papel: CRIs, LCIs do setor imobiliário</Text>
              <Text style={styles.exampleText}>• Híbridos: combinação dos anteriores</Text>
            </View>
          </View>
          
          <View style={styles.fundTypeCard}>
            <Text style={styles.fundTypeTitle}>5. 🌍 ETFs (Exchange Traded Funds)</Text>
            <Text style={styles.fundTypeDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Replicar índices de mercado com baixo custo{'\n'}
              <Text style={styles.highlight}>Risco:</Text> Varia conforme o índice{'\n'}
              <Text style={styles.highlight}>Liquidez:</Text> Diária (via bolsa){'\n'}
              <Text style={styles.highlight}>Ideal para:</Text> Diversificação instantânea, baixo custo
            </Text>
            <View style={styles.fundExample}>
              <Text style={styles.exampleTitle}>📊 ETFs Populares:</Text>
              <Text style={styles.exampleText}>• BOVA11: Ibovespa</Text>
              <Text style={styles.exampleText}>• IVVB11: S&P 500 (EUA)</Text>
              <Text style={styles.exampleText}>• SMAL11: Small Caps Brasil</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>💰 Custos dos Fundos</Text>
          
          <View style={styles.costsContainer}>
            <View style={styles.costCard}>
              <Text style={styles.costTitle}>📋 Taxa de Administração</Text>
              <Text style={styles.costDescription}>
                Cobrada anualmente sobre o patrimônio. Varia de 0,3% (ETFs) até 3% (multimercado).
                <Text style={styles.highlight}> É descontada diariamente da cota.</Text>
              </Text>
            </View>
            
            <View style={styles.costCard}>
              <Text style={styles.costTitle}>🎯 Taxa de Performance</Text>
              <Text style={styles.costDescription}>
                Cobrada quando o fundo supera um benchmark. Normalmente 20% do que exceder o CDI.
                <Text style={styles.highlight}> Só paga quando há ganho extra.</Text>
              </Text>
            </View>
            
            <View style={styles.costCard}>
              <Text style={styles.costTitle}>🚪 Taxa de Entrada/Saída</Text>
              <Text style={styles.costDescription}>
                Alguns fundos cobram ao aplicar ou resgatar. 
                <Text style={styles.highlight}> Evite fundos com essas taxas.</Text>
              </Text>
            </View>
            
            <View style={styles.costCard}>
              <Text style={styles.costTitle}>⏱️ Come-Cotas</Text>
              <Text style={styles.costDescription}>
                Antecipação de IR em maio e novembro. Aplicável apenas para fundos de longo prazo.
                <Text style={styles.highlight}> Não é custo adicional, é antecipação.</Text>
              </Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>🧮 Compare Fundos</Text>
          
          <Text style={styles.paragraph}>
            Use a calculadora abaixo para comparar diferentes fundos e entender o impacto 
            das taxas na sua rentabilidade final:
          </Text>
          
          <FundComparisonCalculator />
          
          <Text style={styles.sectionTitle}>📊 Carteira Modelo com Fundos</Text>
          
          <View style={styles.portfolioContainer}>
            <Text style={styles.portfolioTitle}>Exemplo: Carteira Conservadora</Text>
            <View style={styles.chartRow}>
              <View style={styles.pieChartContainer}>
                <SimplePieChart
                  size={200}
                  data={[
                    {
                      key: 1,
                      value: 40,
                      color: COLORS.primaryDark,
                    },
                    {
                      key: 2,
                      value: 30,
                      color: '#4CAF50',
                    },
                    {
                      key: 3,
                      value: 20,
                      color: '#FFC107',
                    },
                    {
                      key: 4,
                      value: 10,
                      color: '#9C27B0',
                    }
                  ]}
                />
              </View>
              
              <View style={styles.pieLabelsContainer}>
                <View style={styles.pieLabelRow}>
                  <View style={[styles.pieLabelColor, { backgroundColor: COLORS.primaryDark }]} />
                  <Text style={styles.pieLabelText}>Fundo DI: 40%</Text>
                </View>
                
                <View style={styles.pieLabelRow}>
                  <View style={[styles.pieLabelColor, { backgroundColor: '#4CAF50' }]} />
                  <Text style={styles.pieLabelText}>ETF IVVB11: 30%</Text>
                </View>
                
                <View style={styles.pieLabelRow}>
                  <View style={[styles.pieLabelColor, { backgroundColor: '#FFC107' }]} />
                  <Text style={styles.pieLabelText}>Multimercado: 20%</Text>
                </View>
                
                <View style={styles.pieLabelRow}>
                  <View style={[styles.pieLabelColor, { backgroundColor: '#9C27B0' }]} />
                  <Text style={styles.pieLabelText}>FIIs: 10%</Text>
                </View>
              </View>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>✅ Como Escolher um Bom Fundo</Text>
          
          <View style={styles.selectionGuide}>
            <View style={styles.selectionStep}>
              <Text style={styles.stepNumber}>1</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Defina seu Objetivo</Text>
                <Text style={styles.stepDescription}>
                  Reserva de emergência → Fundo DI{'\n'}
                  Crescimento → Fundo de Ações ou ETF{'\n'}
                  Renda → FIIs ou Multimercado
                </Text>
              </View>
            </View>
            
            <View style={styles.selectionStep}>
              <Text style={styles.stepNumber}>2</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Analise os Custos</Text>
                <Text style={styles.stepDescription}>
                  Taxa de administração abaixo da média do tipo{'\n'}
                  Evite taxas de entrada/saída{'\n'}
                  Compare custo vs. performance histórica
                </Text>
              </View>
            </View>
            
            <View style={styles.selectionStep}>
              <Text style={styles.stepNumber}>3</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Verifique a Gestora</Text>
                <Text style={styles.stepDescription}>
                  Histórico da gestora e gestor{'\n'}
                  Patrimônio líquido do fundo{'\n'}
                  Reputação no mercado
                </Text>
              </View>
            </View>
            
            <View style={styles.selectionStep}>
              <Text style={styles.stepNumber}>4</Text>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Avalie Performance</Text>
                <Text style={styles.stepDescription}>
                  Compare com benchmark e pares{'\n'}
                  Analise consistência ao longo do tempo{'\n'}
                  Considere volatilidade (risco)
                </Text>
              </View>
            </View>
          </View>
          
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>⚠️ Cuidados Importantes</Text>
            <Text style={styles.warningText}>
              • <Text style={styles.highlight}>Rentabilidade passada não garante rentabilidade futura</Text>{'\n'}
              • Leia sempre o prospecto e regulamento do fundo{'\n'}
              • Diversifique entre diferentes tipos de fundo{'\n'}
              • Fundos não têm garantia do FGC{'\n'}
              • Cuidado com fundos "da moda" ou promessas irreais
            </Text>
          </View>
          
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>💡 Sabedoria Financeira</Text>
            <Text style={styles.tipText}>
              <Text style={styles.highlight}>Fundos são como um táxi financeiro:</Text> você paga para alguém mais 
              experiente te levar ao destino. O importante é escolher um motorista confiável, 
              conhecer o destino (seu objetivo) e estar disposto a pagar um preço justo pela viagem.
              
              Para a maioria dos investidores iniciantes, um ETF que replica o índice pode ser 
              o melhor "táxi" - simples, barato e eficiente.
            </Text>
          </View>
          
          <View style={styles.navigationButtons}>
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
              <Text style={styles.nextButtonText}>Capítulo 7 →</Text>
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
    backgroundColor: COLORS.white,
  },
  headerContainer: {
    backgroundColor: COLORS.primaryDark,
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  headerSubtitle: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
  },
  contentContainer: {
    padding: 15,
  },
  paragraph: {
    fontSize: 16,
    lineHeight: 24,
    color: COLORS.black,
    marginBottom: 20,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 15,
    marginTop: 10,
  },
  infoBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
  },
  fundTypeCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
  },
  fundTypeTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  fundTypeDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  fundExample: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 6,
    padding: 10,
    marginTop: 8,
  },
  exampleTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 5,
  },
  exampleText: {
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 2,
  },
  costsContainer: {
    marginBottom: 20,
  },
  costCard: {
    backgroundColor: '#fff1f0',
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#e74c3c',
  },
  costTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#c0392b',
    marginBottom: 5,
  },
  costDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  portfolioContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
  },
  portfolioTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'wrap',
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
    color: '#333',
  },
  selectionGuide: {
    marginBottom: 20,
  },
  selectionStep: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  stepNumber: {
    backgroundColor: COLORS.primaryDark,
    color: 'white',
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
    color: COLORS.primaryDark,
    marginBottom: 4,
  },
  stepDescription: {
    fontSize: 14,
    lineHeight: 20,
    color: '#555',
  },
  warningBox: {
    backgroundColor: '#fff1f0',
    borderRadius: 8,
    padding: 15,
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
  tipContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    marginVertical: 20,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 5,
    width: '48%',
    alignItems: 'center',
  },
  prevButton: {
    backgroundColor: '#f0f0f0',
  },
  nextButton: {
    backgroundColor: COLORS.primaryDark,
  },
  prevButtonText: {
    fontWeight: 'bold',
    color: '#555',
  },
  nextButtonText: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default Chapter6Screen;