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
        
        {/* Banner Ferramentas Avançadas */}
        <TouchableOpacity 
          style={styles.premiumBanner}
          onPress={() => {
            console.log('Banner Premium clicado - Navegando para Chapter9');
            navigation.navigate('Chapter9');
          }}
        >
          <View style={styles.premiumBannerContent}>
            <Text style={styles.premiumBannerIcon}>🚀⭐</Text>
            <View style={styles.premiumBannerText}>
              <Text style={styles.premiumBannerTitle}>FERRAMENTAS AVANÇADAS</Text>
              <Text style={styles.premiumBannerSubtitle}>Calculadoras Premium • Metas • Relatórios</Text>
            </View>
            <Text style={styles.premiumBannerArrow}>▶️</Text>
          </View>
        </TouchableOpacity>
        
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

        <TouchableOpacity 
          style={[styles.chapterCard, styles.conclusionChapter]}
          onPress={() => navigation.navigate('Chapter6')}
        >
          <View style={styles.conclusionBadge}>
            <Text style={styles.conclusionBadgeText}>📚 CONCLUSÃO</Text>
          </View>
          <Text style={styles.chapterNumber}>Capítulo 6</Text>
          <Text style={styles.chapterTitle}>Fundos de Investimento + 20 Dicas Práticas</Text>
          <Text style={styles.chapterDescription}>
            Descubra como os fundos podem diversificar sua carteira e finalize com 20 dicas essenciais para investir com sabedoria.
          </Text>
        </TouchableOpacity>
        
        <Text style={styles.sectionTitle}>🎓 Módulos Extras - Aprofundamento</Text>
        
        <View style={styles.extrasContainer}>
          <Text style={styles.extrasDescription}>
            Conteúdo adicional para quem quer se aprofundar ainda mais no mundo dos investimentos.
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.chapterCard, styles.extraModule]}
          onPress={() => navigation.navigate('Chapter7')}
        >
          <Text style={styles.chapterNumber}>Módulo Extra 1</Text>
          <Text style={styles.chapterTitle}>Impostos e Tributação</Text>
          <Text style={styles.chapterDescription}>
            Aprenda a otimizar seus ganhos entendendo como funcionam os impostos nos investimentos.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.chapterCard, styles.extraModule]}
          onPress={() => navigation.navigate('Chapter8')}
        >
          <Text style={styles.chapterNumber}>Módulo Extra 2</Text>
          <Text style={styles.chapterTitle}>Estratégias Práticas</Text>
          <Text style={styles.chapterDescription}>
            Implemente técnicas comprovadas para acelerar seu crescimento financeiro.
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.chapterCard, styles.premiumChapter]}
          onPress={() => {
            console.log('Navegando para Chapter9 - Ferramentas Avançadas');
            navigation.navigate('Chapter9');
          }}
        >
          <View style={styles.premiumBadge}>
            <Text style={styles.premiumBadgeText}>⭐ PREMIUM</Text>
          </View>
          <Text style={styles.chapterNumber}>🚀 Módulo Extra 3</Text>
          <Text style={[styles.chapterTitle, { color: '#FF6B6B', fontSize: 20 }]}>Ferramentas Avançadas</Text>
          <Text style={styles.chapterDescription}>
            Acesse calculadoras premium, sistema de metas, tracking de carteira e gerador de relatórios.
          </Text>
          <View style={styles.featureList}>
            <Text style={styles.featureItem}>🎯 Sistema de metas pessoais</Text>
            <Text style={styles.featureItem}>💼 Acompanhamento de carteira</Text>
            <Text style={styles.featureItem}>📋 Relatórios personalizados</Text>
            <Text style={styles.featureItem}>⭐ Integração premium hub</Text>
          </View>
          
          {/* Acesso Rápido aos Relatórios - Temporariamente desabilitado */}
          <TouchableOpacity
            style={{
              backgroundColor: '#999',
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 20,
              marginTop: 10,
              alignSelf: 'flex-start',
              opacity: 0.6
            }}
            disabled={true}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              📊 Ver Relatórios Salvos (Em Breve)
            </Text>
          </TouchableOpacity>

          {/* Acesso Rápido ao Histórico Geral */}
          <TouchableOpacity
            style={{
              backgroundColor: '#E67E22',
              paddingHorizontal: 15,
              paddingVertical: 8,
              borderRadius: 20,
              marginTop: 8,
              alignSelf: 'flex-start'
            }}
            onPress={(e) => {
              e.stopPropagation();
              navigation.navigate('History');
            }}
          >
            <Text style={{ color: 'white', fontSize: 12, fontWeight: 'bold' }}>
              📚 Histórico de Atividades
            </Text>
          </TouchableOpacity>
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
  premiumChapter: {
    borderWidth: 3,
    borderColor: '#FF6B6B',
    backgroundColor: '#FFF5F5',
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  premiumBadge: {
    position: 'absolute',
    top: -8,
    right: 8,
    backgroundColor: '#FF6B6B',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 6,
  },
  premiumBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  conclusionChapter: {
    borderLeftWidth: 4,
    borderLeftColor: '#2ECC71',
  },
  conclusionBadge: {
    position: 'absolute',
    top: -5,
    right: 10,
    backgroundColor: '#2ECC71',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  conclusionBadgeText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  extrasContainer: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    marginHorizontal: 15,
    marginBottom: 10,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#6C5CE7',
  },
  extrasDescription: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  extraModule: {
    borderLeftWidth: 4,
    borderLeftColor: '#6C5CE7',
    backgroundColor: '#fafbfc',
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
    color: COLORS.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  featureList: {
    marginTop: 5,
  },
  featureItem: {
    fontSize: 12,
    color: '#4ECDC4',
    marginBottom: 3,
    fontWeight: '500',
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
  premiumBanner: {
    backgroundColor: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
    backgroundColor: '#FF6B6B',
    borderRadius: 12,
    margin: 15,
    marginBottom: 20,
    shadowColor: '#FF6B6B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  premiumBannerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  premiumBannerIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  premiumBannerText: {
    flex: 1,
  },
  premiumBannerTitle: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  premiumBannerSubtitle: {
    color: '#FFE5E5',
    fontSize: 12,
    fontWeight: '500',
  },
  premiumBannerArrow: {
    color: '#FFF',
    fontSize: 18,
    opacity: 0.8,
  },
});

export default HomeScreen;
