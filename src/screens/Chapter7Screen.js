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
import TaxCalculator from '../components/TaxCalculator';

const Chapter7Screen = ({ navigation }) => {
  const { colors } = useTheme();
  
  // 🎨 Estilos dinâmicos baseados no tema
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    headerContainer: {
      backgroundColor: colors.primaryDark,
      padding: 20,
      alignItems: 'center',
    },
    headerTitle: {
      color: colors.white,
      fontSize: 24,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerSubtitle: {
      color: colors.white,
      fontSize: 18,
      marginTop: 5,
    },
    contentContainer: {
      paddingHorizontal: 20,
      paddingVertical: 15,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text,
      marginVertical: 15,
    },
    paragraph: {
      fontSize: 16,
      lineHeight: 24,
      color: colors.text,
      marginBottom: 15,
      textAlign: 'justify',
    },
    highlight: {
      fontWeight: 'bold',
      color: colors.primary,
    },
    tableContainer: {
      backgroundColor: colors.surface,
      borderRadius: 8,
      marginVertical: 15,
      overflow: 'hidden',
      borderWidth: 1,
      borderColor: colors.lightGray,
    },
    tableHeader: {
      backgroundColor: colors.primaryDark,
      padding: 12,
    },
    tableHeaderText: {
      color: colors.white,
      fontWeight: 'bold',
      fontSize: 16,
      textAlign: 'center',
    },
    tableRow: {
      flexDirection: 'row',
      backgroundColor: colors.background,
      borderBottomWidth: 1,
      borderBottomColor: colors.lightGray,
    },
    tableCell: {
      flex: 1,
      padding: 12,
      justifyContent: 'center',
    },
    tableCellText: {
      color: colors.text,
      textAlign: 'center',
      fontSize: 14,
    },
    calculatorContainer: {
      backgroundColor: colors.surface,
      borderRadius: 12,
      marginVertical: 20,
      padding: 15,
      borderWidth: 1,
      borderColor: colors.lightGray,
    },
    navigationContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 30,
      paddingHorizontal: 20,
    },
    navButton: {
      backgroundColor: colors.primary,
      paddingVertical: 12,
      paddingHorizontal: 24,
      borderRadius: 8,
      flex: 1,
      marginHorizontal: 5,
    },
    navButtonText: {
      color: colors.white,
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: 16,
    },
    tipBox: {
      backgroundColor: colors.surface,
      borderLeftWidth: 4,
      borderLeftColor: colors.warning,
      padding: 15,
      marginVertical: 15,
      borderRadius: 8,
    },
    tipText: {
      color: colors.text,
      fontSize: 16,
      lineHeight: 22,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView contentContainerStyle={{paddingBottom: 50}} style={{flex: 1, width: '100%'}}>
        <View style={dynamicStyles.headerContainer}>
          <Text style={dynamicStyles.headerTitle}>Capítulo 7</Text>
          <Text style={dynamicStyles.headerSubtitle}>Impostos e Tributação</Text>
        </View>
        
        <View style={dynamicStyles.contentContainer}>
          <Text style={dynamicStyles.paragraph}>
            Entender a <Text style={dynamicStyles.highlight}>tributação dos investimentos</Text> é essencial 
            para calcular seus ganhos reais e tomar decisões mais inteligentes sobre onde aplicar 
            seu dinheiro.
          </Text>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>💰 Por que Importa?</Text>
            <Text style={dynamicStyles.tipText}>
              Um investimento com <Text style={dynamicStyles.highlight}>12% de rentabilidade bruta</Text> pode 
              se tornar 9,6% ou 10,2% líquida, dependendo do prazo e tipo de aplicação. 
              Essa diferença pode representar milhares de reais ao longo dos anos.
            </Text>
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>📋 Imposto de Renda (IR)</Text>
          
          <Text style={dynamicStyles.paragraph}>
            O IR incide sobre o <Text style={dynamicStyles.highlight}>ganho</Text> (rendimento) dos seus investimentos, 
            não sobre o valor total aplicado. A alíquota varia conforme o tipo de investimento e prazo.
          </Text>
          
          <View style={dynamicStyles.tableContainer}>
            <View style={dynamicStyles.tableHeader}>
              <Text style={dynamicStyles.tableHeaderText}>🗓️ Tabela Regressiva - Renda Fixa e Fundos</Text>
            </View>
            
            <View style={dynamicStyles.tableRow}>
              <View style={dynamicStyles.tableCell}>
                <Text style={dynamicStyles.tableCellText}>Prazo</Text>
              </View>
              <View style={dynamicStyles.tableCell}>
                <Text style={dynamicStyles.tableCellText}>Alíquota</Text>
              </View>
            </View>
            
            <View style={dynamicStyles.tableRow}>
              <View style={dynamicStyles.tableCell}>
                <Text style={dynamicStyles.tableCellText}>Até 180 dias</Text>
              </View>
              <View style={dynamicStyles.tableCell}>
                <Text style={[dynamicStyles.tableCellText, {color: colors.danger}]}>22,5%</Text>
              </View>
            </View>
            
            <View style={dynamicStyles.tableRow}>
              <View style={dynamicStyles.tableCell}>
                <Text style={dynamicStyles.tableCellText}>181 a 360 dias</Text>
              </View>
              <View style={dynamicStyles.tableCell}>
                <Text style={[dynamicStyles.tableCellText, {color: colors.warning}]}>20,0%</Text>
              </View>
            </View>
            
            <View style={dynamicStyles.tableRow}>
              <View style={dynamicStyles.tableCell}>
                <Text style={dynamicStyles.tableCellText}>361 a 720 dias</Text>
              </View>
              <View style={dynamicStyles.tableCell}>
                <Text style={[dynamicStyles.tableCellText, {color: colors.warning}]}>17,5%</Text>
              </View>
            </View>
            
            <View style={dynamicStyles.tableRow}>
              <View style={dynamicStyles.tableCell}>
                <Text style={dynamicStyles.tableCellText}>Acima de 720 dias</Text>
              </View>
              <View style={dynamicStyles.tableCell}>
                <Text style={[dynamicStyles.tableCellText, {color: colors.success}]}>15,0%</Text>
              </View>
            </View>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={dynamicStyles.tipText}>
              💡 <Text style={dynamicStyles.highlight}>Dica:</Text> Investimentos com prazo superior a 2 anos 
              têm a menor alíquota de IR!
            </Text>
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>⏱️ IOF (Imposto sobre Operações Financeiras)</Text>
          
          <Text style={dynamicStyles.paragraph}>
            O IOF é um <Text style={dynamicStyles.highlight}>"imposto da pressa"</Text> - quanto mais rápido você 
            resgatar, mais paga. É aplicado sobre o rendimento e tem alíquota regressiva diária.
          </Text>
          
          <View style={dynamicStyles.tableContainer}>
            <View style={dynamicStyles.tipBox}>
              <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>📅 Primeiros 30 dias</Text>
              <Text style={dynamicStyles.tipText}>
                IOF varia de 96% no 1º dia até 0% no 30º dia. 
                <Text style={dynamicStyles.highlight}> Por isso, evite resgates antes de 30 dias!</Text>
              </Text>
            </View>
            
            <View style={dynamicStyles.tipBox}>
              <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>✅ Após 30 dias</Text>
              <Text style={dynamicStyles.tipText}>
                IOF = 0%. Não há cobrança de IOF para resgates após 30 dias da aplicação.
              </Text>
            </View>
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>🎯 Tributação por Tipo de Investimento</Text>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>💳 Poupança</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>IR:</Text> Isenta{'\n'}
              <Text style={dynamicStyles.highlight}>IOF:</Text> Isento{'\n'}
              <Text style={styles.highlight}>Observação:</Text> Única aplicação com isenção total
            </Text>
          </View>
          
          <View style={styles.investmentTypeCard}>
            <Text style={dynamicStyles.text}>
              <Text style={dynamicStyles.highlight}>Vantagem:</Text> Liquidez imediata e segurança
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>🏛️ Tesouro Direto</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>IR:</Text> Tabela regressiva{'\n'}
              <Text style={dynamicStyles.highlight}>IOF:</Text> Primeiros 30 dias{'\n'}
              <Text style={dynamicStyles.highlight}>Come-cotas:</Text> Sim (maio e novembro)
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>🏦 CDB, LCI, LCA</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>CDB:</Text> IR tabela regressiva + IOF{'\n'}
              <Text style={dynamicStyles.highlight}>LCI/LCA:</Text> Isentos de IR{'\n'}
              <Text style={dynamicStyles.highlight}>Todos:</Text> Garantidos pelo FGC
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>📈 Ações</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>IR:</Text> 15% sobre ganho de capital{'\n'}
              <Text style={dynamicStyles.highlight}>Isenção:</Text> Vendas até R$ 20.000/mês{'\n'}
              <Text style={dynamicStyles.highlight}>Dividendos:</Text> Isentos para pessoa física
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>🏢 Fundos Imobiliários</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>Rendimentos:</Text> Isentos de IR{'\n'}
              <Text style={dynamicStyles.highlight}>Ganho capital:</Text> 20% sobre a venda{'\n'}
              <Text style={dynamicStyles.highlight}>Isenção:</Text> Vendas até R$ 20.000/mês
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>🎭 Fundos de Investimento</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>IR:</Text> Tabela regressiva{'\n'}
              <Text style={dynamicStyles.highlight}>Come-cotas:</Text> Sim (maio e novembro){'\n'}
              <Text style={dynamicStyles.highlight}>IOF:</Text> Primeiros 30 dias
            </Text>
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>🧮 Calculadora de Impostos</Text>
          
          <Text style={dynamicStyles.paragraph}>
            Use a calculadora abaixo para simular o impacto dos impostos nos seus investimentos:
          </Text>
          
          <View style={dynamicStyles.calculatorContainer}>
            <TaxCalculator />
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>📊 Estratégias de Otimização Fiscal</Text>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>1. ⏳ Planeje o Prazo</Text>
            <Text style={dynamicStyles.tipText}>
              Para investimentos em renda fixa, considere deixar o dinheiro pelo menos 2 anos 
              para aproveitar a menor alíquota de IR (15%). A diferença entre 22,5% e 15% 
              é significativa no longo prazo.
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>2. 🎯 Diversifique Tributação</Text>
            <Text style={dynamicStyles.tipText}>
              Combine investimentos isentos (LCI/LCA, FIIs, dividendos) com tributados. 
              Isso oferece flexibilidade para resgates estratégicos conforme a necessidade.
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>3. 📅 Evite Resgates Rápidos</Text>
            <Text style={dynamicStyles.tipText}>
              Nunca resgate investimentos antes de 30 dias, exceto em emergências. 
              O IOF pode "comer" uma parte significativa do seu rendimento.
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>4. 💰 Aproveite Isenções</Text>
            <Text style={dynamicStyles.tipText}>
              Para ações e FIIs, mantenha vendas abaixo de R$ 20.000 por mês para 
              aproveitar a isenção. Distribua vendas ao longo do tempo se necessário.
            </Text>
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>📋 Come-Cotas: O que É?</Text>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>🗓️ O que acontece?</Text>
            <Text style={dynamicStyles.tipText}>
              Em maio e novembro, fundos de <Text style={dynamicStyles.highlight}>longo prazo</Text> têm 
              IR antecipado descontado automaticamente das cotas.
            </Text>
            
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16, marginTop: 10}]}>🧮 Como funciona?</Text>
            <Text style={dynamicStyles.tipText}>
              • O fundo "vende" parte das suas cotas para pagar o IR{'\n'}
              • Você mantém o valor líquido na conta{'\n'}
              • No resgate final, o IR já pago é descontado{'\n'}
              • Se ficou mais tempo, pode até ter restituição
            </Text>
            
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16, marginTop: 10}]}>💡 Impacto prático</Text>
            <Text style={dynamicStyles.tipText}>
              É uma <Text style={dynamicStyles.highlight}>antecipação</Text>, não um custo extra. 
              Pense como "desconto na fonte" - você pagará esse IR de qualquer forma.
            </Text>
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>📊 Comparação: Tributado vs Isento</Text>
            
          
          <View style={dynamicStyles.tipBox}>
            <Text style={dynamicStyles.tipText}>
              Cenário: R$ 10.000 investidos por 2 anos com rentabilidade de 12% a.a.
            </Text>
            
            <View style={dynamicStyles.tableContainer}>
              <View style={dynamicStyles.tableRow}>
                <View style={dynamicStyles.tableCell}>
                  <Text style={[dynamicStyles.tableCellText, {fontWeight: 'bold'}]}>CDB 12% a.a.</Text>
                  <Text style={dynamicStyles.tableCellText}>Bruto: R$ 12.544</Text>
                  <Text style={[dynamicStyles.tableCellText, {color: colors.danger}]}>IR: R$ 382 (15%)</Text>
                  <Text style={[dynamicStyles.tableCellText, {fontWeight: 'bold'}]}>Líquido: R$ 12.162</Text>
                </View>
                
                <View style={dynamicStyles.tableCell}>
                  <Text style={[dynamicStyles.tableCellText, {fontWeight: 'bold'}]}>LCI 11% a.a.</Text>
                  <Text style={dynamicStyles.tableCellText}>Bruto: R$ 12.321</Text>
                  <Text style={[dynamicStyles.tableCellText, {color: colors.success}]}>IR: R$ 0 (isento)</Text>
                  <Text style={[dynamicStyles.tableCellText, {fontWeight: 'bold', color: colors.success}]}>Líquido: R$ 12.321</Text>
                </View>
              </View>
            </View>
            
            <Text style={dynamicStyles.tipText}>
              💡 Mesmo com 1% a menos de rentabilidade, a LCI rende mais líquido!
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>⚠️ Cuidados Importantes</Text>
            <Text style={dynamicStyles.tipText}>
              • Guarde comprovantes de todas as aplicações{'\n'}
              • Declare investimentos na declaração anual{'\n'}
              • Para ações, mantenha controle de preço médio{'\n'}
              • Fique atento aos prazos de carência{'\n'}
              • Considere sempre o retorno líquido, não bruto
            </Text>
          </View>
          
          <View style={dynamicStyles.tipBox}>
            <Text style={[dynamicStyles.sectionTitle, {fontSize: 16}]}>💡 Sabedoria Financeira</Text>
            <Text style={dynamicStyles.tipText}>
              <Text style={dynamicStyles.highlight}>Impostos são como pedágios em uma viagem:</Text> você 
              precisa pagá-los para chegar ao destino, mas pode escolher rotas mais eficientes. 
              
              O segredo não é evitar totalmente os impostos (o que é impossível), mas sim 
              planejá-los de forma inteligente. Às vezes, um investimento com menor rentabilidade 
              bruta, mas isento de IR, pode ser mais vantajoso que um com alta rentabilidade tributada.
              
              Lembre-se: <Text style={dynamicStyles.highlight}>o que importa é quanto fica no seu bolso</Text>, 
              não quanto o investimento rende antes dos impostos.
            </Text>
          </View>
          
          <View style={dynamicStyles.navigationContainer}>
            <TouchableOpacity 
              style={dynamicStyles.navButton}
              onPress={() => navigation.navigate('Chapter6')}
            >
              <Text style={dynamicStyles.navButtonText}>← Capítulo 6</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={dynamicStyles.navButton}
              onPress={() => navigation.navigate('Chapter8')}
            >
              <Text style={dynamicStyles.navButtonText}>Capítulo 8 →</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Chapter7Screen;
