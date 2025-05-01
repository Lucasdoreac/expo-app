import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { COLORS, globalStyles } from '../styles/globalStyles';
import InvestorProfileQuiz from '../components/InvestorProfileQuiz';
import RiskReturnLiquidity from '../components/RiskReturnLiquidity';

const Chapter3Screen = ({ navigation }) => {
  const [userProfile, setUserProfile] = useState(null);
  
  const handleProfileDetermined = (profile) => {
    setUserProfile(profile);
  };
  
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 50}}
        style={{flex: 1, width: '100%'}}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Capítulo 3</Text>
          <Text style={styles.headerSubtitle}>Conhecendo Seu Perfil de Investidor</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            Antes de começar a investir, é fundamental conhecer seu perfil de investidor. 
            Isso ajuda a alinhar seus investimentos com seus objetivos, temperamento e 
            situação financeira, evitando decisões que possam gerar arrependimento.
          </Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>🎓 Por que conhecer seu perfil é importante?</Text>
            <Text style={styles.infoText}>
              Investir de forma incompatível com seu perfil pode levar a:
              • Ansiedade desnecessária
              • Decisões precipitadas em momentos de volatilidade
              • Resultados abaixo do potencial
              • Abandono da estratégia antes de colher resultados
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>📊 Descubra Seu Perfil de Investidor</Text>
          <Text style={styles.paragraph}>
            Responda às perguntas abaixo com honestidade. Este questionário irá avaliar sua 
            tolerância ao risco, horizonte de investimento e objetivos financeiros para 
            determinar seu perfil.
          </Text>
          
          {/* Componente de Questionário de Perfil */}
          <InvestorProfileQuiz onProfileDetermined={handleProfileDetermined} />
          
          <Text style={styles.sectionTitle}>🔄 A Tríade Risco-Retorno-Liquidez</Text>
          <Text style={styles.paragraph}>
            <Text style={styles.highlight}>Todo investimento tem três dimensões fundamentais</Text> que precisam 
            ser equilibradas. Entender essa tríade é essencial para fazer escolhas conscientes.
          </Text>
          
          <View style={styles.triadExplanation}>
            <View style={styles.triadItem}>
              <Text style={styles.triadTitle}>Risco</Text>
              <Text style={styles.triadDescription}>
                Chance de perder parte do capital ou obter retorno diferente do esperado.
              </Text>
            </View>
            
            <View style={styles.triadItem}>
              <Text style={styles.triadTitle}>Retorno</Text>
              <Text style={styles.triadDescription}>
                Ganho potencial que o investimento pode proporcionar ao longo do tempo.
              </Text>
            </View>
            
            <View style={styles.triadItem}>
              <Text style={styles.triadTitle}>Liquidez</Text>
              <Text style={styles.triadDescription}>
                Facilidade de converter o investimento em dinheiro sem perder valor.
              </Text>
            </View>
          </View>
          
          <Text style={styles.paragraph}>
            <Text style={styles.highlight}>Não existem investimentos perfeitos</Text> que maximizem as 
            três dimensões simultaneamente. É necessário escolher suas prioridades com base em seus 
            objetivos e perfil.
          </Text>
          
          {/* Componente de Ajuste da Tríade */}
          <RiskReturnLiquidity />
          
          <Text style={styles.sectionTitle}>📈 Estratégias para Cada Perfil</Text>
          
          <View style={styles.profileStrategies}>
            <View style={[styles.strategyCard, styles.conservativeCard]}>
              <Text style={styles.strategyTitle}>Conservador</Text>
              <Text style={styles.strategyDescription}>
                <Text style={styles.highlight}>Prioriza:</Text> Segurança e preservação de capital{'\n'}
                <Text style={styles.highlight}>Ideal para:</Text> Reserva de emergência, objetivos de curto prazo{'\n'}
                <Text style={styles.highlight}>Composição:</Text> 80-90% renda fixa, 10-20% renda variável{'\n'}
                <Text style={styles.highlight}>Exemplos:</Text> Tesouro Selic, CDBs, fundos DI
              </Text>
            </View>
            
            <View style={[styles.strategyCard, styles.moderateCard]}>
              <Text style={styles.strategyTitle}>Moderado</Text>
              <Text style={styles.strategyDescription}>
                <Text style={styles.highlight}>Prioriza:</Text> Equilíbrio entre segurança e crescimento{'\n'}
                <Text style={styles.highlight}>Ideal para:</Text> Objetivos de médio prazo (3-7 anos){'\n'}
                <Text style={styles.highlight}>Composição:</Text> 60-70% renda fixa, 30-40% renda variável{'\n'}
                <Text style={styles.highlight}>Exemplos:</Text> Tesouro IPCA+, fundos multimercado, ETFs
              </Text>
            </View>
            
            <View style={[styles.strategyCard, styles.aggressiveCard]}>
              <Text style={styles.strategyTitle}>Arrojado</Text>
              <Text style={styles.strategyDescription}>
                <Text style={styles.highlight}>Prioriza:</Text> Maximização de retorno a longo prazo{'\n'}
                <Text style={styles.highlight}>Ideal para:</Text> Objetivos de longo prazo (7+ anos){'\n'}
                <Text style={styles.highlight}>Composição:</Text> 30-50% renda fixa, 50-70% renda variável{'\n'}
                <Text style={styles.highlight}>Exemplos:</Text> Ações, ETFs internacionais, fundos imobiliários
              </Text>
            </View>
          </View>
          
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>💡 Dica Financeira</Text>
            <Text style={styles.tipText}>
              <Text style={styles.highlight}>Seu perfil pode mudar ao longo do tempo.</Text> Reavalie 
              periodicamente, especialmente após mudanças significativas em sua vida financeira ou 
              familiar. Com mais experiência e conhecimento, é natural que sua tolerância ao risco 
              aumente gradualmente.
            </Text>
          </View>
          
          
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={() => navigation.navigate('Chapter2')}
            >
              <Text style={styles.prevButtonText}>← Capítulo 2</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={() => navigation.navigate('Chapter4')}
            >
              <Text style={styles.nextButtonText}>Capítulo 4 →</Text>
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
  },
  triadExplanation: {
    flexDirection: 'column',
    marginBottom: 20,
  },
  triadItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
  },
  triadTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 5,
  },
  triadDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  profileStrategies: {
    marginBottom: 20,
  },
  strategyCard: {
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  conservativeCard: {
    backgroundColor: '#e6f7ff',
    borderWidth: 1,
    borderColor: '#91d5ff',
  },
  moderateCard: {
    backgroundColor: '#fff7e6',
    borderWidth: 1,
    borderColor: '#ffd591',
  },
  aggressiveCard: {
    backgroundColor: '#fff1f0',
    borderWidth: 1,
    borderColor: '#ffa39e',
  },
  strategyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  strategyDescription: {
    fontSize: 15,
    lineHeight: 22,
  },
  tipContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    marginBottom: 25,
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

export default Chapter3Screen;
