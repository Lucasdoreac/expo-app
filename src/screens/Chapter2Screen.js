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
import RiskReturnLiquidityImproved from '../components/RiskReturnLiquidityImproved';
import PremiumGate from '../components/PremiumGate';

const Chapter2Screen = ({ navigation }) => {
  const COLORS = useLegacyColors(); // 🎨 Cores dinâmicas para modo dark
  
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: COLORS.background }]}>
      <PremiumGate 
        chapterName="Chapter2" 
        source="chapter2_screen"
      >
        <ScrollView 
          contentContainerStyle={{paddingBottom: 50}}
          style={{flex: 1, width: '100%'}}
        >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Capítulo 2</Text>
          <Text style={styles.headerSubtitle}>Ativos Financeiros - Fundamentos</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            Ativos financeiros são investimentos que você faz com a expectativa de 
            obter retorno no futuro. Diferente de bens físicos como imóveis ou carros, 
            eles são contratos ou títulos que representam um valor.
          </Text>
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>💹 Tipos de Ativos Financeiros</Text>
          
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
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>🏦 Comparativo com a Poupança</Text>
          
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
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>💰 Conceito de Renda Passiva</Text>
          
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
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
          
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            O objetivo ao construir um patrimônio é eventualmente ter ativos suficientes para 
            gerar uma renda passiva que cubra suas despesas, dando a você maior liberdade financeira.
          </Text>
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>📊 Escolhendo seus Primeiros Ativos</Text>
          
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
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
          
          <Text style={[styles.sectionTitle, { color: COLORS.text }]}>⚖️ 2.7 - A Tríade Impossível dos Investimentos</Text>
          
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            <Text style={styles.highlight}>Um dos conceitos mais importantes em investimentos:</Text> é impossível 
            ter simultaneamente alta segurança, alta liquidez e alta rentabilidade em um único investimento. 
            Esta é conhecida como a "Tríade Impossível".
          </Text>
          
          <View style={styles.exampleBox}>
            <Text style={styles.exampleTitle}>🔺 O Triângulo Impossível</Text>
            <Text style={styles.exampleText}>
              Você sempre precisa abrir mão de pelo menos uma dessas características:
              • <Text style={styles.highlight}>Segurança + Liquidez</Text> = Menor rentabilidade (ex: poupança)
              • <Text style={styles.highlight}>Segurança + Rentabilidade</Text> = Menor liquidez (ex: Tesouro IPCA+ longo prazo)
              • <Text style={styles.highlight}>Liquidez + Rentabilidade</Text> = Maior risco (ex: ações)</Text>
          </View>
          
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            Use a ferramenta interativa abaixo para entender como diferentes combinações de risco, 
            retorno e liquidez se traduzem em diferentes tipos de investimentos:
          </Text>
          
          {/* Componente Triângulo Impossível */}
          <RiskReturnLiquidityImproved />
          
          <Text style={[styles.paragraph, { color: COLORS.text }]}>
            Compreender este conceito é fundamental para fazer escolhas conscientes e construir uma 
            carteira diversificada que atenda seus diferentes objetivos e prazos.
          </Text>
          
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
      </PremiumGate>
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
