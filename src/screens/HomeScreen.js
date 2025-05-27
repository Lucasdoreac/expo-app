import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { COLORS } from '../styles/globalStyles';

const HomeScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 50}}
        style={{flex: 1, width: '100%'}}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.title}>Investindo com Sabedoria</Text>
          <Text style={styles.subtitle}>Guia Prático para Iniciantes</Text>
        </View>
        
        <View style={styles.introContainer}>
          <Text style={styles.introText}>
            Bem-vindo ao seu guia interativo de investimentos! Aqui você aprenderá os fundamentos
            para começar a construir seu patrimônio financeiro mesmo com pequenos valores.
          </Text>
        </View>
        
        <Text style={styles.sectionTitle}>📚 Capítulos</Text>
        
        <TouchableOpacity 
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter1')}
        >
          <Text style={styles.chapterNumber}>Capítulo 1</Text>
          <Text style={styles.chapterTitle}>A Importância de Investir aos Poucos</Text>
          <Text style={styles.chapterDescription}>
            Descubra por que começar com pequenos valores mensais pode transformar seu futuro financeiro.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter2')}
        >
          <Text style={styles.chapterNumber}>Capítulo 2</Text>
          <Text style={styles.chapterTitle}>Ativos Financeiros - Fundamentos</Text>
          <Text style={styles.chapterDescription}>
            Entenda os diferentes tipos de investimentos disponíveis e como eles funcionam.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter3')}
        >
          <Text style={styles.chapterNumber}>Capítulo 3</Text>
          <Text style={styles.chapterTitle}>Conhecendo Seu Perfil de Investidor</Text>
          <Text style={styles.chapterDescription}>
            Descubra qual estratégia de investimento combina melhor com seus objetivos e tolerância a riscos.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter4')}
        >
          <Text style={styles.chapterNumber}>Capítulo 4</Text>
          <Text style={styles.chapterTitle}>Renda Fixa - O Ponto de Partida</Text>
          <Text style={styles.chapterDescription}>
            Aprenda sobre os investimentos mais seguros e como utilizá-los para construir sua base financeira.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter5')}
        >
          <Text style={styles.chapterNumber}>Capítulo 5</Text>
          <Text style={styles.chapterTitle}>Primeiros Passos em Renda Variável</Text>
          <Text style={styles.chapterDescription}>
            Entenda como os investimentos de maior risco podem complementar sua estratégia a longo prazo.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter6')}
        >
          <Text style={styles.chapterNumber}>Capítulo 6</Text>
          <Text style={styles.chapterTitle}>Fundos de Investimento</Text>
          <Text style={styles.chapterDescription}>
            Aprenda sobre fundos de investimento e como eles podem simplificar e diversificar sua carteira.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter7')}
        >
          <Text style={styles.chapterNumber}>Capítulo 7</Text>
          <Text style={styles.chapterTitle}>Impostos e Tributação</Text>
          <Text style={styles.chapterDescription}>
            Entenda como os impostos afetam seus investimentos e como otimizar sua carga tributária.
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.chapterCard}
          onPress={() => navigation.navigate('Chapter8')}
        >
          <Text style={styles.chapterNumber}>Capítulo 8</Text>
          <Text style={styles.chapterTitle}>Conclusão: Colocando Tudo em Prática</Text>
          <Text style={styles.chapterDescription}>
            Revise os pilares da jornada do investidor e dicas finais para investir com sabedoria.
          </Text>
        </TouchableOpacity>

        <View style={styles.tipContainer}>
          <Text style={styles.tipTitle}>💡 Dica Financeira</Text>
          <Text style={styles.tipText}>
            <Text style={styles.highlight}>Consistência supera valor inicial.</Text> Investir R$50 por mês 
            durante 20 anos pode gerar mais riqueza do que investir R$5.000 uma única vez e esperar 
            o mesmo período.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerContainer: {
    backgroundColor: COLORS.primaryDark,
    padding: 30,
    alignItems: 'center',
  },
  title: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  subtitle: {
    color: COLORS.white,
    fontSize: 16,
    marginTop: 10,
    textAlign: 'center',
  },
  introContainer: {
    padding: 20,
    backgroundColor: COLORS.primaryLight,
  },
  introText: {
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    margin: 15,
  },
  chapterCard: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  chapterNumber: {
    color: COLORS.primaryDark,
    fontWeight: 'bold',
    fontSize: 14,
    marginBottom: 5,
  },
  chapterTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  chapterDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  tipContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    margin: 15,
    marginTop: 5,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 20,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
});

export default HomeScreen;
