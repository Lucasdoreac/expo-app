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
import LadderInvestmentSimulator from '../components/LadderInvestmentSimulator';
import FinancialGoalPlanner from '../components/FinancialGoalPlanner';

const Chapter8Screen = ({ navigation }) => {
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
  });
  
  return (
    <SafeAreaView style={[dynamicStyles.container, { backgroundColor: COLORS.background }]}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}} style={{flex: 1, width: '100%'}}>
        <View style={dynamicStyles.headerContainer}>
          <Text style={dynamicStyles.headerTitle}>Capítulo 8</Text>
          <Text style={dynamicStyles.headerSubtitle}>Estratégias Práticas</Text>
        </View>
        
        <View style={dynamicStyles.contentContainer}>
          <Text style={[dynamicStyles.paragraph, { color: COLORS.text }]}>
            Agora que você conhece os fundamentos dos investimentos, é hora de aplicar 
            <Text style={dynamicStyles.highlight}> estratégias práticas</Text> que realmente funcionam 
            no dia a dia e podem acelerar a construção do seu patrimônio.
          </Text>
          
          <View style={[dynamicStyles.infoBox, { backgroundColor: COLORS.surface }]}>
            <Text style={dynamicStyles.infoTitle}>🎯 O que você vai aprender:</Text>
            <Text style={dynamicStyles.infoText}>
              • Estratégia de <Text style={dynamicStyles.highlight}>Escada de Vencimentos</Text> para renda fixa{'\n'}
              • <Text style={dynamicStyles.highlight}>20 dicas práticas</Text> testadas no mercado{'\n'}
              • Como planejar objetivos financeiros específicos{'\n'}
              • Técnicas de otimização de carteira
            </Text>
          </View>
          
          <Text style={[dynamicStyles.sectionTitle, { color: COLORS.text }]}>🪜 Estratégia: Escada de Vencimentos</Text>
          
          <Text style={[dynamicStyles.paragraph, { color: COLORS.text }]}>
            A <Text style={dynamicStyles.highlight}>Escada de Vencimentos</Text> é uma técnica inteligente 
            para investimentos em renda fixa. Ao invés de aplicar todo o dinheiro em um só prazo, 
            você divide o valor em parcelas com vencimentos escalonados.
          </Text>
          
          <View style={dynamicStyles.benefitsContainer}>
            <View style={dynamicStyles.benefitCard}>
              <Text style={dynamicStyles.benefitTitle}>📈 Maior Rentabilidade</Text>
              <Text style={dynamicStyles.benefitDescription}>
                Prazos maiores geralmente oferecem taxas melhores, aumentando seu 
                retorno médio sem comprometer toda a liquidez.
              </Text>
            </View>
            
            <View style={dynamicStyles.benefitCard}>
              <Text style={dynamicStyles.benefitTitle}>🔄 Flexibilidade</Text>
              <Text style={dynamicStyles.benefitDescription}>
                A cada vencimento, você pode reinvestir ou usar o dinheiro, 
                adaptando-se às mudanças do mercado e suas necessidades.
              </Text>
            </View>
            
            <View style={dynamicStyles.benefitCard}>
              <Text style={dynamicStyles.benefitTitle}>⚖️ Gestão de Risco</Text>
              <Text style={dynamicStyles.benefitDescription}>
                Reduz o risco de concentrar todo investimento em um momento ou 
                taxa específica do mercado.
              </Text>
            </View>
            
            <View style={dynamicStyles.benefitCard}>
              <Text style={dynamicStyles.benefitTitle}>🎯 Disciplina</Text>
              <Text style={dynamicStyles.benefitDescription}>
                Força você a pensar no longo prazo enquanto mantém acesso 
                regular a parte dos recursos.
              </Text>
            </View>
          </View>
          
          <View style={dynamicStyles.exampleContainer}>
            <Text style={dynamicStyles.exampleTitle}>💡 Como funciona na prática:</Text>
            <Text style={dynamicStyles.exampleText}>
              <Text style={dynamicStyles.highlight}>Exemplo:</Text> Você tem R$ 10.000 para investir. 
              Ao invés de aplicar tudo em um CDB de 2 anos, você divide:{'\n\n'}
              
              • R$ 2.000 → CDB 1 ano (taxa menor, mas liquidez antes){'\n'}
              • R$ 2.000 → CDB 2 anos{'\n'}
              • R$ 2.000 → CDB 3 anos{'\n'}
              • R$ 2.000 → CDB 4 anos{'\n'}
              • R$ 2.000 → CDB 5 anos (taxa maior){'\n\n'}
              
              Resultado: Rentabilidade média maior + um vencimento por ano para reinvestir ou usar.
            </Text>
          </View>
          
          <Text style={[dynamicStyles.paragraph, { color: COLORS.text }]}>
            Use o simulador abaixo para testar como a Escada de Vencimentos pode 
            funcionar com seus valores:
          </Text>
          
          <LadderInvestmentSimulator />
          
          <Text style={[dynamicStyles.sectionTitle, { color: COLORS.text }]}>🎯 Planejamento de Objetivos</Text>
          
          <Text style={[dynamicStyles.paragraph, { color: COLORS.text }]}>
            Investir sem objetivo é como viajar sem destino. Cada meta financeira 
            requer uma estratégia específica de prazo, risco e liquidez.
          </Text>
          
          <View style={dynamicStyles.objectivesContainer}>
            <View style={dynamicStyles.objectiveCard}>
              <Text style={dynamicStyles.objectiveTitle}>🏠 Casa Própria (5-10 anos)</Text>
              <Text style={dynamicStyles.objectiveStrategy}>
                <Text style={dynamicStyles.highlight}>Estratégia:</Text> 70% renda fixa (Tesouro IPCA+, CDBs longos) 
                + 30% renda variável (ETFs, ações){'\n'}
                <Text style={dynamicStyles.highlight}>Foco:</Text> Proteção contra inflação e crescimento moderado
              </Text>
            </View>
            
            <View style={dynamicStyles.objectiveCard}>
              <Text style={dynamicStyles.objectiveTitle}>🎓 Educação dos Filhos (10-18 anos)</Text>
              <Text style={dynamicStyles.objectiveStrategy}>
                <Text style={dynamicStyles.highlight}>Estratégia:</Text> 50% renda fixa + 50% renda variável{'\n'}
                <Text style={dynamicStyles.highlight}>Foco:</Text> Crescimento real do patrimônio acima da inflação educacional
              </Text>
            </View>
            
            <View style={dynamicStyles.objectiveCard}>
              <Text style={dynamicStyles.objectiveTitle}>🌴 Aposentadoria (20+ anos)</Text>
              <Text style={dynamicStyles.objectiveStrategy}>
                <Text style={dynamicStyles.highlight}>Estratégia:</Text> 30% renda fixa + 70% renda variável (diminuindo o % de RV conforme se aproxima){'\n'}
                <Text style={dynamicStyles.highlight}>Foco:</Text> Máximo crescimento no longo prazo
              </Text>
            </View>
            
            <View style={dynamicStyles.objectiveCard}>
              <Text style={dynamicStyles.objectiveTitle}>✈️ Viagem (1-3 anos)</Text>
              <Text style={dynamicStyles.objectiveStrategy}>
                <Text style={dynamicStyles.highlight}>Estratégia:</Text> 100% renda fixa (CDBs, Tesouro pré-fixado){'\n'}
                <Text style={dynamicStyles.highlight}>Foco:</Text> Segurança e previsibilidade do valor final
              </Text>
            </View>
          </View>
          
          <Text style={[dynamicStyles.paragraph, { color: COLORS.text }]}>
            Use o planejador abaixo para calcular quanto precisará investir mensalmente 
            para atingir seus objetivos:
          </Text>
          
          <FinancialGoalPlanner />
          
          <Text style={[dynamicStyles.sectionTitle, { color: COLORS.text }]}>🧠 Estratégias Comportamentais</Text>
          
          <View style={dynamicStyles.behaviorContainer}>
            <View style={dynamicStyles.behaviorCard}>
              <Text style={dynamicStyles.behaviorTitle}>1. 🔄 Automatização Total</Text>
              <Text style={dynamicStyles.behaviorDescription}>
                Configure tudo no automático: débito do salário, transferência para investimentos, 
                e até rebalanceamento da carteira. Isso elimina decisões emocionais.
              </Text>
            </View>
            
            <View style={dynamicStyles.behaviorCard}>
              <Text style={dynamicStyles.behaviorTitle}>2. 📅 Regra do "Dia do Investimento"</Text>
              <Text style={dynamicStyles.behaviorDescription}>
                Escolha um dia do mês para revisar investimentos e fazer aportes. 
                Não olhe no resto do tempo. Isso reduz ansiedade e decisões impulsivas.
              </Text>
            </View>
            
            <View style={dynamicStyles.behaviorCard}>
              <Text style={dynamicStyles.behaviorTitle}>3. 💰 Estratégia dos Aumentos</Text>
              <Text style={dynamicStyles.behaviorDescription}>
                Sempre que receber aumento ou promoção, direcione 50% do valor extra 
                para investimentos antes de se acostumar com o novo padrão de vida.
              </Text>
            </View>
            
            <View style={dynamicStyles.behaviorCard}>
              <Text style={dynamicStyles.behaviorTitle}>4. 🎯 Metas Visuais</Text>
              <Text style={dynamicStyles.behaviorDescription}>
                Crie gráficos ou planilhas que mostrem seu progresso visualmente. 
                Ver o patrimônio crescer motiva a continuar investindo com disciplina.
              </Text>
            </View>
          </View>
          
          <Text style={[dynamicStyles.sectionTitle, { color: COLORS.text }]}>⚡ Estratégias para Cenários Especiais</Text>
          
          <View style={dynamicStyles.scenarioContainer}>
            <View style={dynamicStyles.scenarioCard}>
              <Text style={dynamicStyles.scenarioTitle}>📉 Durante Crises</Text>
              <Text style={dynamicStyles.scenarioText}>
                • Mantenha a calma e continue os aportes regulares{'\n'}
                • Se tiver reserva extra, considere aumentar aportes (comprar mais barato){'\n'}
                • Evite pânico e vendas precipitadas{'\n'}
                • Crises são temporárias, seus objetivos de longo prazo não mudaram
              </Text>
            </View>
            
            <View style={dynamicStyles.scenarioCard}>
              <Text style={dynamicStyles.scenarioTitle}>📈 Durante Euforias</Text>
              <Text style={dynamicStyles.scenarioText}>
                • Não se deixe levar pelo otimismo exagerado{'\n'}
                • Continue sua estratégia definida{'\n'}
                • Evite aumentar risco além do planejado{'\n'}
                • Use ganhos extras para rebalancear a carteira
              </Text>
            </View>
            
            <View style={dynamicStyles.scenarioCard}>
              <Text style={dynamicStyles.scenarioTitle}>💼 Mudança de Emprego</Text>
              <Text style={dynamicStyles.scenarioText}>
                • Reavalie sua capacidade de aporte{'\n'}
                • Considere resgatar FGTS para quitar dívidas ou investir{'\n'}
                • Ajuste estratégia se a renda mudou significativamente{'\n'}
                • Mantenha reserva de emergência reforçada
              </Text>
            </View>
          </View>
          
          <View style={dynamicStyles.conclusionContainer}>
            <Text style={dynamicStyles.conclusionTitle}>🏆 Conclusão do Curso</Text>
            <Text style={dynamicStyles.conclusionText}>
              Parabéns! Você completou todos os 8 capítulos de "Investindo com Sabedoria". 
              Agora você tem conhecimento para:
            </Text>
            
            <View style={dynamicStyles.achievementsList}>
              <Text style={dynamicStyles.achievement}>✅ Começar a investir com segurança</Text>
              <Text style={dynamicStyles.achievement}>✅ Diversificar sua carteira de forma inteligente</Text>
              <Text style={dynamicStyles.achievement}>✅ Entender riscos e retornos</Text>
              <Text style={dynamicStyles.achievement}>✅ Otimizar impostos legalmente</Text>
              <Text style={dynamicStyles.achievement}>✅ Planejar objetivos financeiros</Text>
              <Text style={dynamicStyles.achievement}>✅ Aplicar estratégias comprovadas</Text>
            </View>
            
            <Text style={dynamicStyles.nextStepsText}>
              <Text style={dynamicStyles.highlight}>Próximos passos:</Text>{'\n'}
              1. Abra conta em uma corretora confiável{'\n'}
              2. Monte sua reserva de emergência{'\n'}
              3. Comece com investimentos simples (Tesouro, CDB){'\n'}
              4. Automatize seus aportes{'\n'}
              5. Continue estudando e evoluindo
            </Text>
          </View>
          
          <View style={dynamicStyles.navigationButtons}>
            <TouchableOpacity 
              style={[dynamicStyles.navButton, dynamicStyles.prevButton]}
              onPress={() => navigation.navigate('Chapter7')}
            >
              <Text style={dynamicStyles.prevButtonText}>← Capítulo 7</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[dynamicStyles.navButton, dynamicStyles.nextButton]}
              onPress={() => navigation.navigate('Chapter9')}
            >
              <Text style={dynamicStyles.nextButtonText}>Módulo 3 →</Text>
            </TouchableOpacity>
          </View>

          {/* Destaque especial para Módulo 3 */}
          <TouchableOpacity 
            style={dynamicStyles.specialNextButton}
            onPress={() => navigation.navigate('Chapter9')}
          >
            <Text style={dynamicStyles.specialNextTitle}>🚀 Módulo 3: Ferramentas Avançadas</Text>
            <Text style={dynamicStyles.specialNextSubtitle}>Metas • Carteira • Relatórios Premium</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chapter8Screen;
