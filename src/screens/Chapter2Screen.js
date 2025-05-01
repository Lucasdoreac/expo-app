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

const Chapter2Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 50}}
        style={{flex: 1, width: '100%'}}
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Capítulo 2</Text>
          <Text style={styles.headerSubtitle}>Ativos Financeiros - Fundamentos</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            Ativos financeiros são investimentos que você faz com a expectativa de 
            obter retorno no futuro. Diferente de bens físicos como imóveis ou carros, 
            eles são contratos ou títulos que representam um valor.
          </Text>
          
          <Text style={styles.sectionTitle}>💹 Tipos de Ativos Financeiros</Text>
          
          <View style={styles.assetTypeCard}>
            <Text style={styles.assetTypeTitle}>Renda Fixa</Text>
            <Text style={styles.assetTypeDescription}>
              São investimentos onde você empresta dinheiro para alguém (governo, 
              banco ou empresa) e recebe juros por isso. O retorno é previsível.
            </Text>
            <Text style={styles.assetTypeExamples}>
              Exemplos: Tesouro Direto, CDBs, LCIs, LCAs
            </Text>
          </View>
          
          <View style={styles.assetTypeCard}>
            <Text style={styles.assetTypeTitle}>Renda Variável</Text>
            <Text style={styles.assetTypeDescription}>
              São investimentos onde você se torna sócio de empresas ou 
              empreendimentos. O retorno varia conforme o desempenho do negócio.
            </Text>
            <Text style={styles.assetTypeExamples}>
              Exemplos: Ações, Fundos Imobiliários, ETFs
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>🏦 Comparativo com a Poupança</Text>
          
          <View style={styles.table}>
            <View style={styles.tableHeader}>
              <Text style={[styles.tableHeaderCell, { flex: 2 }]}>Característica</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Poupança</Text>
              <Text style={[styles.tableHeaderCell, { flex: 1 }]}>Outros Ativos</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Rentabilidade Média</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>2-3% a.a.</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>8-12% a.a.</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Proteção Contra Inflação</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Baixa</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Média-Alta</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Imposto de Renda</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Isento</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Varia</Text>
            </View>
            
            <View style={styles.tableRow}>
              <Text style={[styles.tableCell, { flex: 2 }]}>Liquidez</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Alta</Text>
              <Text style={[styles.tableCell, { flex: 1 }]}>Varia</Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>💰 Conceito de Renda Passiva</Text>
          
          <Text style={styles.paragraph}>
            <Text style={styles.highlight}>Renda passiva é aquela que você recebe sem precisar trabalhar ativamente por ela.</Text> 
            Seus investimentos geram dinheiro mesmo enquanto você dorme, trabalha ou curte a vida.
          </Text>
          
          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>Exemplo Prático:</Text>
            <Text style={styles.exampleText}>
              Juliana investe R$200 mensais em uma carteira diversificada. Após 10 anos, ela 
              acumulou R$40.000 e seus investimentos geram cerca de R$300 por mês em dividendos 
              e juros. Essa renda de R$300 é passiva - ela recebe mesmo sem trabalhar por ela.
            </Text>
          </View>
          
          <Text style={styles.paragraph}>
            O objetivo ao construir um patrimônio é eventualmente ter ativos suficientes para 
            gerar uma renda passiva que cubra suas despesas, dando a você maior liberdade financeira.
          </Text>
          
          <Text style={styles.sectionTitle}>📊 Escolhendo seus Primeiros Ativos</Text>
          
          <Text style={styles.paragraph}>
            Como iniciante, é recomendável começar com ativos mais simples e seguros:
          </Text>
          
          <View style={styles.bulletContainer}>
            <Text style={styles.bullet}>• Tesouro Direto (especialmente Tesouro Selic)</Text>
            <Text style={styles.bullet}>• CDBs de bancos grandes com liquidez diária</Text>
            <Text style={styles.bullet}>• ETFs que seguem o Ibovespa (para pequena exposição à renda variável)</Text>
            <Text style={styles.bullet}>• Fundos DI de baixo custo</Text>
          </View>
          
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>💡 Dica Importante</Text>
            <Text style={styles.tipText}>
              <Text style={styles.highlight}>Diversificação é essencial,</Text> mas não precisa ser complicada. 
              Começar com 80% em renda fixa e 20% em um ETF já é uma boa estratégia inicial para quem 
              investe entre R$30 e R$500 por mês.
            </Text>
          </View>
          
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={() => navigation.navigate('Chapter1')}
            >
              <Text style={styles.navButtonText}>← Capítulo 1</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={() => navigation.navigate('Chapter3')}
            >
              <Text style={styles.nextButtonText}>Capítulo 3 →</Text>
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
  assetTypeCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
  },
  assetTypeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  assetTypeDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 8,
  },
  assetTypeExamples: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  table: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryDark,
  },
  tableHeaderCell: {
    padding: 10,
    color: COLORS.white,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  tableCell: {
    padding: 10,
    textAlign: 'center',
  },
  exampleBox: {
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
    padding: 15,
    marginBottom: 20,
  },
  exampleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  exampleText: {
    fontSize: 15,
    lineHeight: 22,
  },
  bulletContainer: {
    marginLeft: 10,
    marginBottom: 20,
  },
  bullet: {
    fontSize: 15,
    lineHeight: 24,
    marginBottom: 8,
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
  navButtonText: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  nextButtonText: {
    fontWeight: 'bold',
    color: COLORS.white,
  },
});

export default Chapter2Screen;
