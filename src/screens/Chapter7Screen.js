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
import TaxCalculator from '../components/TaxCalculator';

const Chapter7Screen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}} style={{flex: 1, width: '100%'}}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Capítulo 7</Text>
          <Text style={styles.headerSubtitle}>Impostos e Tributação</Text>
        </View>
        
        <View style={styles.contentContainer}>
          <Text style={styles.paragraph}>
            Entender a <Text style={styles.highlight}>tributação dos investimentos</Text> é essencial 
            para calcular seus ganhos reais e tomar decisões mais inteligentes sobre onde aplicar 
            seu dinheiro.
          </Text>
          
          <View style={styles.infoBox}>
            <Text style={styles.infoTitle}>💰 Por que Importa?</Text>
            <Text style={styles.infoText}>
              Um investimento com <Text style={styles.highlight}>12% de rentabilidade bruta</Text> pode 
              se tornar 9,6% ou 10,2% líquida, dependendo do prazo e tipo de aplicação. 
              Essa diferença pode representar milhares de reais ao longo dos anos.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>📋 Imposto de Renda (IR)</Text>
          
          <Text style={styles.paragraph}>
            O IR incide sobre o <Text style={styles.highlight}>ganho</Text> (rendimento) dos seus investimentos, 
            não sobre o valor total aplicado. A alíquota varia conforme o tipo de investimento e prazo.
          </Text>
          
          <View style={styles.taxTableContainer}>
            <Text style={styles.tableTitle}>🗓️ Tabela Regressiva - Renda Fixa e Fundos</Text>
            
            <View style={styles.taxTable}>
              <View style={styles.tableHeader}>
                <Text style={styles.tableHeaderText}>Prazo</Text>
                <Text style={styles.tableHeaderText}>Alíquota</Text>
              </View>
              
              <View style={styles.tableRow}>
                <Text style={styles.tablePeriod}>Até 180 dias</Text>
                <Text style={[styles.tableRate, styles.highRate]}>22,5%</Text>
              </View>
              
              <View style={styles.tableRow}>
                <Text style={styles.tablePeriod}>181 a 360 dias</Text>
                <Text style={[styles.tableRate, styles.mediumHighRate]}>20,0%</Text>
              </View>
              
              <View style={styles.tableRow}>
                <Text style={styles.tablePeriod}>361 a 720 dias</Text>
                <Text style={[styles.tableRate, styles.mediumRate]}>17,5%</Text>
              </View>
              
              <View style={styles.tableRow}>
                <Text style={styles.tablePeriod}>Acima de 720 dias</Text>
                <Text style={[styles.tableRate, styles.lowRate]}>15,0%</Text>
              </View>
            </View>
            
            <Text style={styles.tableNote}>
              💡 <Text style={styles.highlight}>Dica:</Text> Investimentos com prazo superior a 2 anos 
              têm a menor alíquota de IR!
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>⏱️ IOF (Imposto sobre Operações Financeiras)</Text>
          
          <Text style={styles.paragraph}>
            O IOF é um <Text style={styles.highlight}>"imposto da pressa"</Text> - quanto mais rápido você 
            resgatar, mais paga. É aplicado sobre o rendimento e tem alíquota regressiva diária.
          </Text>
          
          <View style={styles.iofContainer}>
            <View style={styles.iofCard}>
              <Text style={styles.iofTitle}>📅 Primeiros 30 dias</Text>
              <Text style={styles.iofDescription}>
                IOF varia de 96% no 1º dia até 0% no 30º dia. 
                <Text style={styles.highlight}> Por isso, evite resgates antes de 30 dias!</Text>
              </Text>
            </View>
            
            <View style={styles.iofCard}>
              <Text style={styles.iofTitle}>✅ Após 30 dias</Text>
              <Text style={styles.iofDescription}>
                IOF = 0%. Não há cobrança de IOF para resgates após 30 dias da aplicação.
              </Text>
            </View>
          </View>
          
          <Text style={styles.sectionTitle}>🎯 Tributação por Tipo de Investimento</Text>
          
          <View style={styles.investmentTypeCard}>
            <Text style={styles.typeTitle}>💳 Poupança</Text>
            <Text style={styles.typeDescription}>
              <Text style={styles.highlight}>IR:</Text> Isenta{'\n'}
              <Text style={styles.highlight}>IOF:</Text> Isento{'\n'}
              <Text style={styles.highlight}>Observação:</Text> Única aplicação com isenção total
            </Text>
          </View>
          
          <View style={styles.investmentTypeCard}>
            <Text style={styles.typeTitle}>🏛️ Tesouro Direto</Text>
            <Text style={styles.typeDescription}>
              <Text style={styles.highlight}>IR:</Text> Tabela regressiva{'\n'}
              <Text style={styles.highlight}>IOF:</Text> Primeiros 30 dias{'\n'}
              <Text style={styles.highlight}>Come-cotas:</Text> Sim (maio e novembro)
            </Text>
          </View>
          
          <View style={styles.investmentTypeCard}>
            <Text style={styles.typeTitle}>🏦 CDB, LCI, LCA</Text>
            <Text style={styles.typeDescription}>
              <Text style={styles.highlight}>CDB:</Text> IR tabela regressiva + IOF{'\n'}
              <Text style={styles.highlight}>LCI/LCA:</Text> Isentos de IR{'\n'}
              <Text style={styles.highlight}>Todos:</Text> Garantidos pelo FGC
            </Text>
          </View>
          
          <View style={styles.investmentTypeCard}>
            <Text style={styles.typeTitle}>📈 Ações</Text>
            <Text style={styles.typeDescription}>
              <Text style={styles.highlight}>IR:</Text> 15% sobre ganho de capital{'\n'}
              <Text style={styles.highlight}>Isenção:</Text> Vendas até R$ 20.000/mês{'\n'}
              <Text style={styles.highlight}>Dividendos:</Text> Isentos para pessoa física
            </Text>
          </View>
          
          <View style={styles.investmentTypeCard}>
            <Text style={styles.typeTitle}>🏢 Fundos Imobiliários</Text>
            <Text style={styles.typeDescription}>
              <Text style={styles.highlight}>Rendimentos:</Text> Isentos de IR{'\n'}
              <Text style={styles.highlight}>Ganho capital:</Text> 20% sobre a venda{'\n'}
              <Text style={styles.highlight}>Isenção:</Text> Vendas até R$ 20.000/mês
            </Text>
          </View>
          
          <View style={styles.investmentTypeCard}>
            <Text style={styles.typeTitle}>🎭 Fundos de Investimento</Text>
            <Text style={styles.typeDescription}>
              <Text style={styles.highlight}>IR:</Text> Tabela regressiva{'\n'}
              <Text style={styles.highlight}>Come-cotas:</Text> Sim (maio e novembro){'\n'}
              <Text style={styles.highlight}>IOF:</Text> Primeiros 30 dias
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>🧮 Calculadora de Impostos</Text>
          
          <Text style={styles.paragraph}>
            Use a calculadora abaixo para simular o impacto dos impostos nos seus investimentos:
          </Text>
          
          <TaxCalculator />
          
          <Text style={styles.sectionTitle}>📊 Estratégias de Otimização Fiscal</Text>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>1. ⏳ Planeje o Prazo</Text>
            <Text style={styles.strategyDescription}>
              Para investimentos em renda fixa, considere deixar o dinheiro pelo menos 2 anos 
              para aproveitar a menor alíquota de IR (15%). A diferença entre 22,5% e 15% 
              é significativa no longo prazo.
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>2. 🎯 Diversifique Tributação</Text>
            <Text style={styles.strategyDescription}>
              Combine investimentos isentos (LCI/LCA, FIIs, dividendos) com tributados. 
              Isso oferece flexibilidade para resgates estratégicos conforme a necessidade.
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>3. 📅 Evite Resgates Rápidos</Text>
            <Text style={styles.strategyDescription}>
              Nunca resgate investimentos antes de 30 dias, exceto em emergências. 
              O IOF pode "comer" uma parte significativa do seu rendimento.
            </Text>
          </View>
          
          <View style={styles.strategyCard}>
            <Text style={styles.strategyTitle}>4. 💰 Aproveite Isenções</Text>
            <Text style={styles.strategyDescription}>
              Para ações e FIIs, mantenha vendas abaixo de R$ 20.000 por mês para 
              aproveitar a isenção. Distribua vendas ao longo do tempo se necessário.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>📋 Come-Cotas: O que É?</Text>
          
          <View style={styles.comeCotas}>
            <Text style={styles.comeCotasTitle}>🗓️ O que acontece?</Text>
            <Text style={styles.comeCotasText}>
              Em maio e novembro, fundos de <Text style={styles.highlight}>longo prazo</Text> têm 
              IR antecipado descontado automaticamente das cotas.
            </Text>
            
            <Text style={styles.comeCotasTitle}>🧮 Como funciona?</Text>
            <Text style={styles.comeCotasText}>
              • O fundo "vende" parte das suas cotas para pagar o IR{'\n'}
              • Você mantém o valor líquido na conta{'\n'}
              • No resgate final, o IR já pago é descontado{'\n'}
              • Se ficou mais tempo, pode até ter restituição
            </Text>
            
            <Text style={styles.comeCotasTitle}>💡 Impacto prático</Text>
            <Text style={styles.comeCotasText}>
              É uma <Text style={styles.highlight}>antecipação</Text>, não um custo extra. 
              Pense como "desconto na fonte" - você pagará esse IR de qualquer forma.
            </Text>
          </View>
          
          <View style={styles.comparisonContainer}>
            <Text style={styles.comparisonTitle}>📊 Comparação: Tributado vs Isento</Text>
            
            <Text style={styles.comparisonScenario}>
              Cenário: R$ 10.000 investidos por 2 anos com rentabilidade de 12% a.a.
            </Text>
            
            <View style={styles.comparisonRow}>
              <View style={styles.comparisonCard}>
                <Text style={styles.comparisonType}>CDB 12% a.a.</Text>
                <Text style={styles.comparisonGross}>Bruto: R$ 12.544</Text>
                <Text style={styles.comparisonTax}>IR: R$ 382 (15%)</Text>
                <Text style={styles.comparisonNet}>Líquido: R$ 12.162</Text>
              </View>
              
              <View style={styles.comparisonCard}>
                <Text style={styles.comparisonType}>LCI 11% a.a.</Text>
                <Text style={styles.comparisonGross}>Bruto: R$ 12.321</Text>
                <Text style={styles.comparisonTax}>IR: R$ 0 (isento)</Text>
                <Text style={styles.comparisonNet}>Líquido: R$ 12.321</Text>
              </View>
            </View>
            
            <Text style={styles.comparisonNote}>
              💡 Mesmo com 1% a menos de rentabilidade, a LCI rende mais líquido!
            </Text>
          </View>
          
          <View style={styles.warningBox}>
            <Text style={styles.warningTitle}>⚠️ Cuidados Importantes</Text>
            <Text style={styles.warningText}>
              • Guarde comprovantes de todas as aplicações{'\n'}
              • Declare investimentos na declaração anual{'\n'}
              • Para ações, mantenha controle de preço médio{'\n'}
              • Fique atento aos prazos de carência{'\n'}
              • Considere sempre o retorno líquido, não bruto
            </Text>
          </View>
          
          <View style={styles.tipContainer}>
            <Text style={styles.tipTitle}>💡 Sabedoria Financeira</Text>
            <Text style={styles.tipText}>
              <Text style={styles.highlight}>Impostos são como pedágios em uma viagem:</Text> você 
              precisa pagá-los para chegar ao destino, mas pode escolher rotas mais eficientes. 
              
              O segredo não é evitar totalmente os impostos (o que é impossível), mas sim 
              planejá-los de forma inteligente. Às vezes, um investimento com menor rentabilidade 
              bruta, mas isento de IR, pode ser mais vantajoso que um com alta rentabilidade tributada.
              
              Lembre-se: <Text style={styles.highlight}>o que importa é quanto fica no seu bolso</Text>, 
              não quanto o investimento rende antes dos impostos.
            </Text>
          </View>
          
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={() => navigation.navigate('Chapter6')}
            >
              <Text style={styles.prevButtonText}>← Capítulo 6</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={() => navigation.navigate('Chapter8')}
            >
              <Text style={styles.nextButtonText}>Conclusão →</Text>
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
  taxTableContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  tableTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  taxTable: {
    backgroundColor: 'white',
    borderRadius: 6,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: COLORS.primaryDark,
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  tableHeaderText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
    flex: 1,
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tablePeriod: {
    fontSize: 15,
    flex: 1,
    textAlign: 'center',
    color: '#333',
  },
  tableRate: {
    fontSize: 15,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  highRate: {
    color: '#e74c3c',
  },
  mediumHighRate: {
    color: '#f39c12',
  },
  mediumRate: {
    color: '#f1c40f',
  },
  lowRate: {
    color: '#27ae60',
  },
  tableNote: {
    fontSize: 14,
    marginTop: 10,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  iofContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  iofCard: {
    backgroundColor: '#fff1f0',
    borderRadius: 8,
    padding: 12,
    flex: 1,
    marginHorizontal: 5,
    borderLeftWidth: 3,
    borderLeftColor: '#e74c3c',
  },
  iofTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#c0392b',
    marginBottom: 5,
  },
  iofDescription: {
    fontSize: 13,
    lineHeight: 18,
  },
  investmentTypeCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  typeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  typeDescription: {
    fontSize: 14,
    lineHeight: 20,
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
  comeCotas: {
    backgroundColor: '#f5f9ff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    borderLeftWidth: 4,
    borderLeftColor: '#3498db',
  },
  comeCotasTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 5,
    marginTop: 8,
  },
  comeCotasText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 5,
  },
  comparisonContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  comparisonTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  comparisonScenario: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 15,
    fontStyle: 'italic',
    color: '#666',
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  comparisonCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 6,
    padding: 12,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  comparisonType: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  comparisonGross: {
    fontSize: 13,
    color: '#333',
    marginBottom: 3,
  },
  comparisonTax: {
    fontSize: 13,
    color: '#e74c3c',
    marginBottom: 3,
  },
  comparisonNet: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  comparisonNote: {
    fontSize: 14,
    textAlign: 'center',
    fontStyle: 'italic',
    color: COLORS.primaryDark,
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

export default Chapter7Screen;