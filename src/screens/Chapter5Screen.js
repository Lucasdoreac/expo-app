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
import InvestmentGrowthChart from '../components/InvestmentGrowthChart';
import AutomatedInvestmentSimulator from '../components/AutomatedInvestmentSimulator';
import SimplePieChart from '../components/SimplePieChart';

const Chapter5Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}} style={{flex: 1, width: '100%'}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Capítulo 5</Text>
          <Text style={styles.headerSubtitle}>Primeiros Passos em Renda Variável</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            Após construir uma base sólida em renda fixa, é momento de considerar seus primeiros passos 
            em <Text style={styles.highlight}>renda variável</Text> - investimentos que podem trazer 
            retornos potencialmente maiores, embora com mais volatilidade.
          </Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>📈 O que é Renda Variável?</Text>
            <Text style={styles.infoText}>
              Ao contrário da renda fixa, onde você é um credor, na renda variável você se 
              torna <Text style={styles.highlight}>sócio ou proprietário</Text> de empresas ou 
              empreendimentos. Seu retorno varia conforme o desempenho do negócio.
            </Text>
            <Text style={styles.infoText}>
              Os principais investimentos em renda variável são:
            </Text>
            <View style={styles.infoList}>
              <Text style={styles.infoListItem}>• <Text style={styles.highlight}>Ações:</Text> participações em empresas listadas na bolsa</Text>
              <Text style={styles.infoListItem}>• <Text style={styles.highlight}>Fundos Imobiliários (FIIs):</Text> cotas de empreendimentos imobiliários</Text>
              <Text style={styles.infoListItem}>• <Text style={styles.highlight}>ETFs:</Text> fundos que replicam índices de mercado</Text>
              <Text style={styles.infoListItem}>• <Text style={styles.highlight}>BDRs:</Text> recibos de ações de empresas estrangeiras</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>🛠️ Porque Incluir Renda Variável em sua Carteira</Text>
          
          <View style={styles.benefitsContainer}>
            <View style={styles.benefitCard}>
              <Text style={styles.benefitTitle}>🌱 Potencial de Crescimento</Text>
              <Text style={styles.benefitDescription}>
                Historicamente, ações e outros ativos de renda variável tendem a 
                superar a inflação e a renda fixa no longo prazo.
              </Text>
            </View>
            
            <View style={styles.benefitCard}>
              <Text style={styles.benefitTitle}>🔄 Diversificação</Text>
              <Text style={styles.benefitDescription}>
                Diferentes classes de ativos respondem de maneiras distintas às 
                condições econômicas, reduzindo o risco total da carteira.
              </Text>
            </View>
            
            <View style={styles.benefitCard}>
              <Text style={styles.benefitTitle}>💵 Renda Passiva</Text>
              <Text style={styles.benefitDescription}>
                Muitas ações e fundos imobiliários distribuem dividendos e rendimentos 
                regulares aos investidores.
              </Text>
            </View>
            
            <View style={styles.benefitCard}>
              <Text style={styles.benefitTitle}>🏢 Propriedade Real</Text>
              <Text style={styles.benefitDescription}>
                Ao investir em ações, você se torna sócio de empresas reais e se 
                beneficia do crescimento econômico de longo prazo.
              </Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>⚠️ Entendendo a Volatilidade</Text>
          
          <Text style={styles.paragraph}>
            A característica mais desafiadora da renda variável é a <Text style={styles.highlight}>volatilidade</Text> - 
            as oscilações no preço dos ativos. É essencial entender que:
          </Text>
          
          <View style={styles.volatilityBox}>
            <View style={styles.volatilityRow}>
              <Text style={styles.volatilityLabel}>📉 Quedas são normais</Text>
              <Text style={styles.volatilityDescription}>
                Correções de 10% a 20% ocorrem regularmente nos mercados de ações. 
                Crises maiores (30-50%) acontecem a cada 10-15 anos.
              </Text>
            </View>
            
            <View style={styles.volatilityRow}>
              <Text style={styles.volatilityLabel}>⏱️ Horizonte importa</Text>
              <Text style={styles.volatilityDescription}>
                Quanto maior seu prazo de investimento, menor a chance de ter retornos negativos. 
                Historicamente, períodos de 10+ anos raramente resultam em perdas.
              </Text>
            </View>
            
            <View style={styles.volatilityRow}>
              <Text style={styles.volatilityLabel}>🧠 Reação emocional</Text>
              <Text style={styles.volatilityDescription}>
                Muitos investidores vendem no pior momento (durante pânicos) e compram no pior 
                momento (durante euforias), prejudicando seus retornos.
              </Text>
            </View>
            
            <View style={styles.volatilityRow}>
              <Text style={styles.volatilityLabel}>🔍 Oportunidades</Text>
              <Text style={styles.volatilityDescription}>
                A volatilidade cria oportunidades para comprar bons ativos a preços descontados, 
                especialmente para quem investe regularmente.
              </Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>🏆 Estratégias para Iniciantes</Text>
          
          <Text style={styles.paragraph}>
            Para começar em renda variável com segurança, recomendamos estas estratégias:
          </Text>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>1. Investimento em Índices (ETFs)</Text>
            <Text style={styles.strategyDescription}>
              <Text style={styles.highlight}>O que é:</Text> Fundos que replicam índices como o Ibovespa{'\n'}
              <Text style={styles.highlight}>Vantagens:</Text> Diversificação instantânea, custos baixos, simplicidade{'\n'}
              <Text style={styles.highlight}>Exemplos:</Text> BOVA11 (Ibovespa), IVVB11 (S&P 500), SPXI11 (tecnologia)
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>2. Ações de Grandes Empresas</Text>
            <Text style={styles.strategyDescription}>
              <Text style={styles.highlight}>O que é:</Text> Ações de empresas consolidadas ("blue chips"){'\n'}
              <Text style={styles.highlight}>Vantagens:</Text> Maior estabilidade, histórico de dividendos, liquidez{'\n'}
              <Text style={styles.highlight}>Cuidados:</Text> Pesquisar a empresa, diversificar entre setores
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>3. Fundos Imobiliários</Text>
            <Text style={styles.strategyDescription}>
              <Text style={styles.highlight}>O que é:</Text> Cotas de fundos que investem em imóveis comerciais{'\n'}
              <Text style={styles.highlight}>Vantagens:</Text> Rendimentos mensais, isenção fiscal, acesso ao mercado imobiliário{'\n'}
              <Text style={styles.highlight}>Tipos:</Text> Lajes corporativas, shoppings, galpões logísticos
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>4. Estratégia de Custo Médio</Text>
            <Text style={styles.strategyDescription}>
              <Text style={styles.highlight}>O que é:</Text> Investir regularmente, independente do preço atual{'\n'}
              <Text style={styles.highlight}>Vantagens:</Text> Reduz impacto da volatilidade, disciplina o investidor{'\n'}
              <Text style={styles.highlight}>Exemplo:</Text> Investir R$200 todos os meses em um ETF, sem tentar "adivinhar" o mercado
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>📊 Composição da Carteira para Iniciantes</Text>
          
          <View style={styles.compositionContainer}>
            <Text style={styles.compositionTitle}>Composição de Carteira Modelo</Text>
            <View style={styles.chartRow}>
              <View style={styles.pieChartContainer}>
                <SimplePieChart
                  size={200}
                  data={[
                    {
                      key: 1,
                      value: 65,
                      color: COLORS.primaryDark,
                    },
                    {
                      key: 2,
                      value: 20,
                      color: '#4CAF50',
                    },
                    {
                      key: 3,
                      value: 10,
                      color: '#FFC107',
                    },
                    {
                      key: 4,
                      value: 5,
                      color: '#9C27B0',
                    }
                  ]}
                />
              </View>
              
              <View style={styles.pieLabelsContainer}>
                <View style={styles.pieLabelRow}>
                  <View style={[styles.pieLabelColor, { backgroundColor: COLORS.primaryDark }]} />
                  <Text style={styles.pieLabelText}>Tesouro IPCA+: 65%</Text>
                </View>
                
                <View style={styles.pieLabelRow}>
                  <View style={[styles.pieLabelColor, { backgroundColor: '#4CAF50' }]} />
                  <Text style={styles.pieLabelText}>ETF IVVB11: 20%</Text>
                </View>
                
                <View style={styles.pieLabelRow}>
                  <View style={[styles.pieLabelColor, { backgroundColor: '#FFC107' }]} />
                  <Text style={styles.pieLabelText}>Ações: 10%</Text>
                </View>
                
                <View style={styles.pieLabelRow}>
                  <View style={[styles.pieLabelColor, { backgroundColor: '#9C27B0' }]} />
                  <Text style={styles.pieLabelText}>FIIs: 5%</Text>
                </View>
              </View>
            </View>
          </View>
          
          <View style={styles.explanationBox}>
            <Text style={styles.paragraph}>
              Esta <Text style={styles.highlight}>composição sugerida para iniciantes</Text> combina a segurança 
              da renda fixa com uma exposição gradual à renda variável. 
            </Text>
            <Text style={styles.paragraph}>
              À medida que você ganha experiência e conhecimento, pode aumentar progressivamente a alocação em renda variável, ajustando de acordo com seu perfil de risco e objetivos financeiros.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>🚀 Simulação de Aporte Automático</Text>
          
          <Text style={styles.paragraph}>
            Veja como a estratégia de custo médio e a automação dos investimentos podem ajudar 
            a construir seu patrimônio ao longo do tempo:
          </Text>
          
          <AutomatedInvestmentSimulator />
          
          <Text style={styles.sectionTitle}>💡 Erros Comuns a Evitar</Text>
          
          <View style={styles.mistakesContainer}>
            <View style={styles.mistakeCard}>
              <Text style={styles.mistakeTitle}>🔮 Tentar adivinhar o mercado</Text>
              <Text style={styles.mistakeDescription}>
                Esperar o "momento perfeito" para investir geralmente resulta em perder oportunidades. 
                <Text style={styles.highlight}> Tempo no mercado é mais importante que timing de mercado.</Text>
              </Text>
            </View>
            
            <View style={styles.mistakeCard}>
              <Text style={styles.mistakeTitle}>🎯 Concentrar em poucos ativos</Text>
              <Text style={styles.mistakeDescription}>
                Colocar todo o dinheiro em poucas empresas aumenta o risco.
                <Text style={styles.highlight}> Diversifique entre ativos, setores e regiões.</Text>
              </Text>
            </View>
            
            <View style={styles.mistakeCard}>
              <Text style={styles.mistakeTitle}>📺 Seguir "dicas quentes"</Text>
              <Text style={styles.mistakeDescription}>
                Investir baseado em recomendações sem análise própria pode ser perigoso.
                <Text style={styles.highlight}> Entenda o que está comprando.</Text>
              </Text>
            </View>
            
            <View style={styles.mistakeCard}>
              <Text style={styles.mistakeTitle}>📱 Verificar preços diariamente</Text>
              <Text style={styles.mistakeDescription}>
                Acompanhar oscilações diárias causa ansiedade e pode levar a decisões emocionais.
                <Text style={styles.highlight}> Pense no longo prazo.</Text>
              </Text>
            </View>
          </View>
          
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>💡 Sabedoria Financeira</Text>
            <Text style={styles.tipText}>
              <Text style={styles.highlight}>Investir em renda variável é como plantar uma árvore.</Text> O melhor momento para começar foi há 20 anos. O segundo melhor momento é agora. 
              
              Lembre-se que, assim como uma árvore, seus investimentos precisam de tempo para crescer e dar frutos. Existirão tempestades (crises), secas (períodos de baixo retorno) e pragas (más notícias), mas com paciência e cuidado constante, sua floresta financeira prosperará.
            </Text>
          </View>
          
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={() => navigation.navigate('Chapter4')}
            >
              <Text style={styles.prevButtonText}>← Capítulo 4</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={() => navigation.navigate('Chapter6')}
            >
              <Text style={styles.nextButtonText}>Capítulo 6 →</Text>
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
  infoList: {
    marginLeft: 5,
  },
  infoListItem: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 5,
  },
  benefitsContainer: {
    marginBottom: 20,
  },
  benefitCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
  },
  benefitTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 5,
  },
  benefitDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  volatilityBox: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  volatilityRow: {
    marginBottom: 12,
  },
  volatilityLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 5,
  },
  volatilityDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  strategyCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
  },
  strategyTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  strategyDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  compositionContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    paddingBottom: 20,
    paddingTop: 20,
  },
  compositionTitle: {
    fontSize: 20,
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
    marginTop: 10,
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
    minWidth: 200,
    paddingLeft: 15,
    paddingTop: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  pieLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 6,
    paddingHorizontal: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 4,
    width: '100%',
  },
  pieLabelColor: {
    width: 18,
    height: 18,
    borderRadius: 3,
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  pieLabelText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  mistakesContainer: {
    marginBottom: 20,
  },
  mistakeCard: {
    backgroundColor: '#fff1f0',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#e74c3c',
  },
  mistakeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#c0392b',
    marginBottom: 5,
  },
  mistakeDescription: {
    fontSize: 15,
    lineHeight: 22,
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
  explanationBox: {
    backgroundColor: '#f5f9ff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
  },
});

export default Chapter5Screen;
