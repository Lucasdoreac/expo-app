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

const Chapter8Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}} style={{flex: 1, width: '100%'}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Capítulo 8</Text>
          <Text style={styles.headerSubtitle}>Conclusão: Colocando Tudo em Prática</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.sectionTitle}>🌟 Os Pilares da Jornada do Investidor</Text>
          <Text style={styles.paragraph}>
            Sua jornada no mundo dos investimentos é sustentada por princípios fundamentais. Compreendê-los e aplicá-los fará toda a diferença:
          </Text>
          
          <View style={styles.pillarCard}>
            <Text style={styles.pillarNumber}>1.</Text>
            <Text style={styles.pillarText}><Text style={styles.highlight}>Consistência supera valor:</Text> Pequenos aportes regulares ao longo do tempo têm um poder transformador maior do que grandes aportes esporádicos.</Text>
          </View>
          
          <View style={styles.pillarCard}>
            <Text style={styles.pillarNumber}>2.</Text>
            <Text style={styles.pillarText}><Text style={styles.highlight}>Equilíbrio entre emoção e razão:</Text> Decisões baseadas em análise e estratégia, não em euforia ou pânico, levam a melhores resultados.</Text>
          </View>
          
          <View style={styles.pillarCard}>
            <Text style={styles.pillarNumber}>3.</Text>
            <Text style={styles.pillarText}><Text style={styles.highlight}>Diversificação inteligente:</Text> Não coloque todos os ovos na mesma cesta. Distribua seus investimentos para mitigar riscos.</Text>
          </View>
          
          <View style={styles.pillarCard}>
            <Text style={styles.pillarNumber}>4.</Text>
            <Text style={styles.pillarText}><Text style={styles.highlight}>Planejamento tributário:</Text> Entender os impostos e buscar otimizações legais pode aumentar significativamente seus retornos líquidos.</Text>
          </View>
          
          <View style={styles.pillarCard}>
            <Text style={styles.pillarNumber}>5.</Text>
            <Text style={styles.pillarText}><Text style={styles.highlight}>Visão de longo prazo:</Text> Investimento é uma maratona, não uma corrida de 100 metros. Paciência e foco no futuro são cruciais.</Text>
          </View>

          <Text style={styles.mainSectionTitle}>💡 20 Dicas Práticas para Investir com Sabedoria</Text>

          <Text style={styles.subSectionTitle}>🚀 Começando</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>1. <Text style={styles.highlight}>Defina metas claras:</Text> Saiba por que está investindo (ex: aposentadoria, viagem, entrada em imóvel).</Text>
            <Text style={styles.tipText}>2. <Text style={styles.highlight}>Crie uma reserva de emergência:</Text> Antes de investir, tenha de 3 a 6 meses de custos cobertos.</Text>
            <Text style={styles.tipText}>3. <Text style={styles.highlight}>Pague dívidas caras primeiro:</Text> Juros de dívidas (cartão, cheque especial) costumam ser maiores que rendimentos.</Text>
            <Text style={styles.tipText}>4. <Text style={styles.highlight}>Conheça seu perfil de investidor:</Text> Conservador, moderado ou arrojado? Seja honesto consigo mesmo.</Text>
            <Text style={styles.tipText}>5. <Text style={styles.highlight}>Comece com pouco, mas comece:</Text> O importante é dar o primeiro passo, mesmo com R$50 ou R$100.</Text>
          </View>

          <Text style={styles.subSectionTitle}>🏗️ Construindo sua Carteira</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>6. <Text style={styles.highlight}>Diversifique seus investimentos:</Text> Combine renda fixa, variável e outros ativos conforme seu perfil.</Text>
            <Text style={styles.tipText}>7. <Text style={styles.highlight}>Entenda onde você investe:</Text> Não aplique em nada que você não compreenda minimamente.</Text>
            <Text style={styles.tipText}>8. <Text style={styles.highlight}>Considere os custos:</Text> Taxas de administração, corretagem e impostos impactam o resultado final.</Text>
            <Text style={styles.tipText}>9. <Text style={styles.highlight}>Reinvista os dividendos/rendimentos:</Text> Acelera o efeito dos juros compostos.</Text>
            <Text style={styles.tipText}>10. <Text style={styles.highlight}>Aportes regulares são chave:</Text> Crie o hábito de investir mensalmente, mesmo que seja pouco.</Text>
          </View>

          <Text style={styles.subSectionTitle}>📊 Monitoramento e Ajustes</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>11. <Text style={styles.highlight}>Revise sua carteira periodicamente:</Text> A cada 6 meses ou 1 ano, veja se precisa de ajustes.</Text>
            <Text style={styles.tipText}>12. <Text style={styles.highlight}>Não entre em pânico com volatilidade:</Text> Mercados sobem e descem. Mantenha a estratégia.</Text>
            <Text style={styles.tipText}>13. <Text style={styles.highlight}>Aprenda com os erros:</Text> Todo investidor comete erros. O importante é o aprendizado.</Text>
            <Text style={styles.tipText}>14. <Text style={styles.highlight}>Cuidado com "dicas quentes":</Text> Desconfie de promessas de ganhos fáceis e rápidos.</Text>
            <Text style={styles.tipText}>15. <Text style={styles.highlight}>Acompanhe notícias, mas filtre ruídos:</Text> Mantenha-se informado, mas não tome decisões por impulso.</Text>
          </View>

          <Text style={styles.subSectionTitle}>🧠 Atitudes e Mentalidade</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipText}>16. <Text style={styles.highlight}>Paciência é uma virtude:</Text> Resultados consistentes levam tempo.</Text>
            <Text style={styles.tipText}>17. <Text style={styles.highlight}>Educação financeira contínua:</Text> O aprendizado nunca para. Leia livros, artigos, faça cursos.</Text>
            <Text style={styles.tipText}>18. <Text style={styles.highlight}>Não se compare com outros:</Text> Cada jornada financeira é única. Foque nos seus objetivos.</Text>
            <Text style={styles.tipText}>19. <Text style={styles.highlight}>Celebre as pequenas vitórias:</Text> Reconheça seu progresso para manter a motivação.</Text>
            <Text style={styles.tipText}>20. <Text style={styles.highlight}>Busque ajuda se necessário:</Text> Consultores financeiros podem auxiliar, especialmente no início.</Text>
          </View>

          <Text style={styles.sectionTitle}>📜 Frase Final</Text>
          <View style={styles.quoteContainer}>
            <Text style={styles.quoteText}>
              "A verdadeira liberdade financeira não se encontra em promessas de riqueza fácil, 
              mas no poder de entender o que poucos explicam. Investir não é seguir modismos - 
              é escolher com consciência o que faz sentido pra você. Cada decisão é uma semente, 
              e o tempo é o terreno onde ela frutifica. Só colhe bons frutos quem recusa o óbvio, 
              questiona o que escuta e constrói com propósito. Não caia em promessas fáceis, 
              caia na real. Riqueza de verdade nasce de paciência, estratégia e coragem pra 
              pensar por conta própria."
            </Text>
          </View>

          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={() => navigation.navigate('Chapter7')}
            >
              <Text style={styles.prevButtonText}>← Capítulo 7</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.nextButtonText}>Voltar ao Início 🏠</Text>
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
  mainSectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    textAlign: 'center',
    marginBottom: 25,
    marginTop: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 15,
    marginTop: 10,
  },
  subSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.secondaryDark, // Using a secondary color for subsection titles
    marginTop: 20,
    marginBottom: 10,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.primaryLight,
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
  pillarCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pillarNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginRight: 10,
  },
  pillarText: {
    fontSize: 15,
    lineHeight: 22,
    flex: 1,
  },
  tipCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 1 },
    // shadowOpacity: 0.05,
    // shadowRadius: 2,
    // elevation: 1,
  },
  tipText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
    color: '#333',
  },
  quoteContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 20,
    marginVertical: 20,
    borderLeftWidth: 5,
    borderLeftColor: COLORS.primaryDark,
  },
  quoteText: {
    fontSize: 16,
    fontStyle: 'italic',
    lineHeight: 24,
    color: COLORS.primaryDark,
    textAlign: 'center',
  },
  navigationButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 30,
  },
  navButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
    elevation: 2, // For Android shadow
    shadowColor: '#000', // For iOS shadow
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  prevButton: {
    backgroundColor: '#e0e0e0', // Lighter gray for previous
  },
  prevButtonText: {
    fontWeight: 'bold',
    color: '#333',
    fontSize: 15,
  },
  nextButton: {
    backgroundColor: COLORS.primaryDark,
  },
  nextButtonText: {
    fontWeight: 'bold',
    color: COLORS.white,
    fontSize: 15,
  },
});

export default Chapter8Screen;
