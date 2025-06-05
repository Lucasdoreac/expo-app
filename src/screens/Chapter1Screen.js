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
import { useColors } from '../contexts/ThemeContext';
import CompoundInterestCalculator from '../components/CompoundInterestCalculator';
import ExportButtons from '../components/ExportButtons';

const Chapter1Screen = ({ navigation }) => {
  const colors = useColors(); // 🔧 CORREÇÃO: Usa cores dinâmicas baseadas no tema
  
  // 🎨 Estilos dinâmicos que respondem ao tema atual
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background, // Fundo dinâmico
    },
    headerContainer: {
      backgroundColor: colors.primaryDark,
      padding: 15,
      alignItems: 'center',
      justifyContent: 'center',
    },
    headerTitle: {
      color: colors.white,
      fontSize: 20,
      fontWeight: 'bold',
      textTransform: 'uppercase',
    },
    headerSubtitle: {
      color: colors.white,
      fontSize: 16,
      marginTop: 5,
    },
    contentContainer: {
      paddingHorizontal: 15,
      paddingVertical: 20,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: 'bold',
      color: colors.text, // 🔧 CORREÇÃO: Texto dinâmico (branco no escuro, preto no claro)
      marginVertical: 10,
    },
    paragraph: {
      fontSize: 16,
      color: colors.text, // 🔧 CORREÇÃO: Texto dinâmico 
      lineHeight: 24,
      marginBottom: 15,
    },
    highlight: {
      fontWeight: 'bold',
      color: colors.primary, // 🔧 CORREÇÃO: Destaque dinâmico
    },
    infoBox: {
      backgroundColor: colors.surface, // 🔧 CORREÇÃO: Fundo de card dinâmico
      borderRadius: 8,
      padding: 15,
      marginVertical: 15,
      borderLeftWidth: 4,
      borderLeftColor: colors.accent,
    },
    infoTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      color: colors.text, // 🔧 CORREÇÃO: Título dinâmico
      marginBottom: 8,
    },
    infoText: {
      fontSize: 14,
      color: colors.textSecondary, // 🔧 CORREÇÃO: Texto secundário dinâmico
      lineHeight: 20,
    },
    calculatorContainer: {
      marginTop: 20,
    },
  });

  return (
    <SafeAreaView style={dynamicStyles.container}>
      <ScrollView 
        contentContainerStyle={{paddingBottom: 50}}
        style={{flex: 1, width: '100%'}}
      >
        <View style={dynamicStyles.headerContainer}>
          <Text style={dynamicStyles.headerTitle}>Capítulo 1</Text>
          <Text style={dynamicStyles.headerSubtitle}>A Importância de Investir aos Poucos</Text>
        </View>
        
        <View style={dynamicStyles.contentContainer}>
          <Text style={dynamicStyles.paragraph}>
            Você não precisa ser rico para começar a investir. Na verdade, é exatamente o oposto: 
            <Text style={dynamicStyles.highlight}> investir consistentemente é o caminho para construir riqueza</Text>, 
            mesmo começando com pequenas quantias.
          </Text>
          
          <View style={dynamicStyles.infoBox}>
            <Text style={dynamicStyles.infoTitle}>💰 Comece com o que você tem</Text>
            <Text style={dynamicStyles.infoText}>
              Investir R$30, R$50 ou R$100 por mês pode parecer insignificante, mas o 
              <Text style={dynamicStyles.highlight}> poder dos juros compostos</Text> transforma pequenos 
              valores em somas consideráveis ao longo do tempo.
            </Text>
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>🎓 Juros Compostos: A Oitava Maravilha</Text>
          <Text style={dynamicStyles.paragraph}>
            Albert Einstein chamou os juros compostos de "a oitava maravilha do mundo". É como plantar uma semente
            que não apenas cresce, mas também produz novas sementes que crescem simultaneamente.
          </Text>
          
          <Text style={dynamicStyles.paragraph}>
            <Text style={dynamicStyles.highlight}>Os juros compostos são magia disfarçada de matemática.</Text> Eles 
            fazem seu dinheiro trabalhar para você enquanto você dorme, cresce enquanto você trabalha, e se 
            multiplica enquanto você vive sua vida.
          </Text>
          
          {/* Calculadora de Juros Compostos */}
          <View style={dynamicStyles.calculatorContainer}>
            <CompoundInterestCalculator />
            
            {/* Botões de Exportação - EXEMPLO DE INTEGRAÇÃO */}
            <ExportButtons
              data={{
                ferramenta: 'Calculadora de Juros Compostos',
                capitulo: 'Capítulo 1 - Investir aos Poucos',
                conceito: 'Poder dos juros compostos',
                exemplo: 'R$100/mês por 10 anos = R$15.917'
              }}
              toolType="Juros Compostos"
              description="Cálculo do poder dos juros compostos - Capítulo 1"
              customStyle={{marginTop: 15}}
            />
          </View>
          
          <Text style={dynamicStyles.sectionTitle}>🤖 Automatize seus Investimentos</Text>
          <Text style={dynamicStyles.paragraph}>
            Um dos maiores segredos para o sucesso financeiro é a automação. Ao configurar transferências 
            automáticas para suas contas de investimento, você:
          </Text>
          
          <View style={dynamicStyles.bulletContainer}>
            <Text style={dynamicStyles.bullet}>• Elimina a necessidade de tomar decisões repetitivas</Text>
            <Text style={dynamicStyles.bullet}>• Reduz a tentação de gastar o dinheiro</Text>
            <Text style={dynamicStyles.bullet}>• Mantém a consistência mesmo nos meses mais ocupados</Text>
            <Text style={dynamicStyles.bullet}>• Aproveita o custo médio em dólar (para investimentos variáveis)</Text>
          </View>
          
          <View style={dynamicStyles.exampleBox}>
            <Text style={styles.exampleTitle}>Exemplo Prático:</Text>
            <Text style={styles.exampleText}>
              Ana começou investindo apenas R$50 por mês aos 25 anos. Ela configurou um débito automático 
              que transferia esse valor para um fundo indexado no dia seguinte ao recebimento do salário. 
              
              Depois de 30 anos, considerando um retorno médio anual de 8%, Ana acumulou R$91.473,90 - 
              tendo investido apenas R$18.000,00 no total.
            </Text>
          </View>
          
          <Text style={styles.sectionTitle}>🔄 Aumente Gradualmente</Text>
          <Text style={styles.paragraph}>
            À medida que sua carreira avança e sua renda aumenta, considere aumentar o valor do seu 
            investimento mensal. Mesmo pequenos aumentos, como R$10 ou R$20 adicionais por mês, 
            podem ter um impacto significativo a longo prazo.
          </Text>
          
          <View style={styles.navigationButtons}>
            <TouchableOpacity 
              style={[styles.navButton, styles.prevButton]}
              onPress={() => navigation.navigate('Home')}
            >
              <Text style={styles.prevButtonText}>← Voltar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.navButton, styles.nextButton]}
              onPress={() => navigation.navigate('Chapter2')}
            >
              <Text style={styles.nextButtonText}>Capítulo 2 →</Text>
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
  bulletContainer: {
    marginLeft: 10,
    marginBottom: 20,
  },
  bullet: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
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
    fontSize: 16,
    lineHeight: 24,
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
  calculatorContainer: {
    marginVertical: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    padding: 15,
  },
});

export default Chapter1Screen;
