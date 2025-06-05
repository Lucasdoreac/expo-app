import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  SafeAreaView,
  Image
} from 'react-native';
import { COLORS, globalStyles } from '../styles/globalStyles';
import { useLegacyColors } from '../contexts/ThemeContext';
import ProductComparisonRendaFixa from '../components/ProductComparisonRendaFixa';
import InvestmentGrowthChartResponsive from '../components/InvestmentGrowthChartResponsive';

const Chapter4Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}} style={{flex: 1, width: '100%'}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Capítulo 4</Text>
          <Text style={styles.headerSubtitle}>Renda Fixa - O Ponto de Partida</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            Para a maioria dos investidores iniciantes, a <Text style={styles.highlight}>renda fixa é o ponto de partida ideal</Text>. 
            São investimentos com menor volatilidade, maior previsibilidade e adequados para reserva de emergência e objetivos de curto e médio prazo.
          </Text>
          
          <View style={[styles.infoBox, { backgroundColor: COLORS.surface }]}>
            <Text style={styles.infoTitle}>💰 O que é Renda Fixa?</Text>
            <Text style={styles.infoText}>
              Renda fixa são investimentos nos quais você empresta dinheiro para alguém (governo, banco ou empresa) 
              e recebe em troca juros previamente estabelecidos, que podem ser:
            </Text>
            <View style={styles.infoList}>
              <Text style={styles.infoListItem}>• <Text style={styles.highlight}>Prefixados:</Text> taxa de juros definida no momento do investimento</Text>
              <Text style={styles.infoListItem}>• <Text style={styles.highlight}>Pós-fixados:</Text> taxa de juros atrelada a um indexador (Selic, CDI, IPCA)</Text>
              <Text style={styles.infoListItem}>• <Text style={styles.highlight}>Híbridos:</Text> combinação de indexador + taxa prefixada (IPCA + taxa fixa)</Text>
            </View>
          </View>
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>🛡️ Segurança na Renda Fixa</Text>
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            Ao contrário do que muitos pensam, <Text style={styles.highlight}>investimentos em renda fixa também possuem riscos</Text>, 
            embora geralmente menores que renda variável. Os principais riscos são:
          </Text>
          
          <View style={styles.riskTable}>
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, styles.tableHeader, { flex: 1.5 }]}>Tipo de Risco</Text>
              <Text style={[styles.tableCell, styles.tableHeader, { flex: 2.5 }]}>Descrição</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>Risco de Crédito</Text>
              <Text style={[styles.tableCell, { flex: 2.5 }]}>Possibilidade do emissor não pagar o valor devido</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>Risco de Mercado</Text>
              <Text style={[styles.tableCell, { flex: 2.5 }]}>Oscilações no preço do título antes do vencimento</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>Risco de Liquidez</Text>
              <Text style={[styles.tableCell, { flex: 2.5 }]}>Dificuldade de vender o título antes do vencimento</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 1.5 }]}>Risco de Inflação</Text>
              <Text style={[styles.tableCell, { flex: 2.5 }]}>Rendimento real abaixo da inflação, perdendo poder de compra</Text>
            </View>
          </View>
          
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            Para mitigar esses riscos, existem <Text style={styles.highlight}>mecanismos de proteção</Text> como o Fundo Garantidor de Créditos (FGC), 
            que cobre até R$ 250 mil por CPF/instituição em caso de quebra do banco, ou a solidez do governo federal para títulos do Tesouro Direto.
          </Text>
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>📋 Produtos de Renda Fixa para Iniciantes</Text>
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            Existem diversos produtos de renda fixa, cada um com suas características específicas.
            Abaixo você encontra um comparativo dos mais recomendados para investidores iniciantes.
          </Text>
          
          <ProductComparisonRendaFixa />
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>📈 A Magia da Renda Fixa a Longo Prazo</Text>
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            Mesmo investimentos conservadores podem gerar resultados expressivos a longo prazo, graças ao
            poder dos juros compostos. Veja como pequenos aportes mensais podem crescer:
          </Text>
          
          <InvestmentGrowthChartResponsive />
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>🧠 Estratégias de Renda Fixa para Objetivos Diferentes</Text>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Reserva de Emergência</Text>
            <Text style={styles.strategyDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Ter dinheiro disponível para imprevistos{'\n'}
              <Text style={styles.highlight}>Tamanho ideal:</Text> 3 a 6 vezes suas despesas mensais{'\n'}
              <Text style={styles.highlight}>Recomendação:</Text> Tesouro Selic, CDBs de liquidez diária
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Objetivos de Curto Prazo (até 2 anos)</Text>
            <Text style={styles.strategyDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Viagens, compra de bens, estudos{'\n'}
              <Text style={styles.highlight}>Recomendação:</Text> CDBs, LCIs e LCAs com vencimento alinhado
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Objetivos de Médio Prazo (2-5 anos)</Text>
            <Text style={styles.strategyDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Entrada de imóvel, casamento, pós-graduação{'\n'}
              <Text style={styles.highlight}>Recomendação:</Text> Tesouro IPCA+, CDBs prefixados
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>Construção de Patrimônio (5+ anos)</Text>
            <Text style={styles.strategyDescription}>
              <Text style={styles.highlight}>Objetivo:</Text> Aposentadoria, independência financeira{'\n'}
              <Text style={styles.highlight}>Recomendação:</Text> Diversificação entre Tesouro IPCA+, CDBs, debêntures
            </Text>
          </View>
          
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>💡 Dica Valiosa</Text>
            <Text style={styles.tipText}>
              <Text style={styles.highlight}>Pense na renda fixa como a fundação da sua casa financeira.</Text> Ela proporciona 
              estabilidade e segurança para que você possa construir em cima com investimentos mais arrojados à medida 
              que ganha experiência. Para iniciantes, recomenda-se manter 80-90% do patrimônio em renda fixa.
            </Text>
          </View>
          
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={() => navigation.navigate('Chapter3')}
            >
              <Text style={styles.prevButtonText}>← Capítulo 3</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={() => navigation.navigate('Chapter5')}
            >
              <Text style={styles.nextButtonText}>Capítulo 5 →</Text>
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
  riskTable: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tableCell: {
    padding: 10,
    fontSize: 14,
  },
  tableHeader: {
    backgroundColor: COLORS.primaryDark,
    color: COLORS.white,
    fontWeight: 'bold',
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

export default Chapter4Screen;