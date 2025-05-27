import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity,
  Dimensions,
  ScrollView
} from 'react-native';
import { COLORS } from '../styles/globalStyles';

// Componente para renderizar barras de gráfico
const BarChart = ({ data, maxValue, barColor, barWidth }) => {
  return (
    <View style={styles.barChartContainer}>
      {data.map((item, index) => {
        // Calcula a altura relativa da barra (mínimo 5% para visibilidade)
        const barHeight = Math.max((item.value / maxValue) * 100, 5);
        
        return (
          <View key={index} style={styles.barContainer}>
            {/* Valor acima da barra */}
            <View style={styles.barValueContainer}>
              <Text style={styles.barValue}>
                {item.displayValue}
              </Text>
            </View>
            
            {/* Barra do gráfico */}
            <View style={styles.barWrapper}>
              <View 
                style={[
                  styles.bar, 
                  { 
                    height: `${barHeight}%`,
                    backgroundColor: barColor,
                    width: barWidth || 30,
                  }
                ]} 
              />
            </View>
            
            {/* Label abaixo da barra */}
            <View style={styles.barLabelContainer}>
              <Text style={styles.barLabel}>
                {item.label}
              </Text>
            </View>
          </View>
        );
      })}
    </View>
  );
};

// Componente principal para visualizar crescimento
const InvestmentGrowthChart = () => {
  // Estados para os parâmetros de investimento
  const [monthlyAmount, setMonthlyAmount] = useState(100);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [initialAmount, setInitialAmount] = useState(0);
  const [years, setYears] = useState(20);
  const [growthData, setGrowthData] = useState([]);
  
  // Opções pré-definidas
  const monthlyOptions = [30, 50, 100, 200, 500];
  const returnOptions = [6, 8, 10, 12];
  const yearOptions = [5, 10, 20, 30, 40];
  
  // Calcula os dados de crescimento
  useEffect(() => {
    calculateGrowthData();
  }, [monthlyAmount, annualReturn, initialAmount, years]);
  
  const calculateGrowthData = () => {
    const data = [];
    const monthlyRate = annualReturn / 100 / 12;
    const totalMonths = years * 12;
    
    // Calcula o valor ao final de cada período de 5 anos
    const intervals = [1, 5, 10, 15, 20, 30, 40];
    intervals.filter(interval => interval <= years).forEach(interval => {
      const months = interval * 12;
      let futureValue = initialAmount;
      let totalInvested = initialAmount;
      
      for (let i = 0; i < months; i++) {
        futureValue = futureValue * (1 + monthlyRate) + monthlyAmount;
        totalInvested += monthlyAmount;
      }
      
      const returns = futureValue - totalInvested;
      
      data.push({
        label: `${interval} ${interval === 1 ? 'ano' : 'anos'}`,
        value: futureValue,
        displayValue: formatCurrency(futureValue),
        totalInvested: formatCurrency(totalInvested),
        returns: formatCurrency(returns),
        returnsPercentage: ((returns / totalInvested) * 100).toFixed(0)
      });
    });
    
    setGrowthData(data);
  };
  
  // Formata valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  // Encontra o maior valor para dimensionar o gráfico
  const maxValue = growthData.length > 0 
    ? Math.max(...growthData.map(item => item.value)) 
    : 0;
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>📈 Visualizador de Crescimento</Text>
      <Text style={styles.description}>
        Explore como seus investimentos podem crescer ao longo do tempo com o poder dos juros compostos.
      </Text>
      
      <View style={styles.optionsContainer}>
        <View style={styles.optionGroup}>
          <Text style={styles.optionLabel}>Investimento Mensal:</Text>
          <View style={styles.buttonGroup}>
            {monthlyOptions.map((amount) => (
              <TouchableOpacity
                key={amount}
                style={[
                  styles.optionButton,
                  monthlyAmount === amount && styles.optionButtonSelected
                ]}
                onPress={() => setMonthlyAmount(amount)}
              >
                <Text 
                  style={[
                    styles.optionButtonText,
                    monthlyAmount === amount && styles.optionButtonTextSelected
                  ]}
                >
                  R${amount}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.optionGroup}>
          <Text style={styles.optionLabel}>Retorno Anual (%):</Text>
          <View style={styles.buttonGroup}>
            {returnOptions.map((rate) => (
              <TouchableOpacity
                key={rate}
                style={[
                  styles.optionButton,
                  annualReturn === rate && styles.optionButtonSelected
                ]}
                onPress={() => setAnnualReturn(rate)}
              >
                <Text 
                  style={[
                    styles.optionButtonText,
                    annualReturn === rate && styles.optionButtonTextSelected
                  ]}
                >
                  {rate}%
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.optionGroup}>
          <Text style={styles.optionLabel}>Tempo de Investimento:</Text>
          <View style={styles.buttonGroup}>
            {yearOptions.map((period) => (
              <TouchableOpacity
                key={period}
                style={[
                  styles.optionButton,
                  years === period && styles.optionButtonSelected
                ]}
                onPress={() => setYears(period)}
              >
                <Text 
                  style={[
                    styles.optionButtonText,
                    years === period && styles.optionButtonTextSelected
                  ]}
                >
                  {period} anos
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      
      {growthData.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.chartContainer}>
            <BarChart 
              data={growthData} 
              maxValue={maxValue} 
              barColor={COLORS.primaryDark}
              barWidth={50}
            />
          </View>
        </ScrollView>
      )}
      
      {growthData.length > 0 && (
        <View style={styles.detailContainer}>
          <Text style={styles.detailTitle}>
            Resultado após {years} anos:
          </Text>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Investimento mensal:</Text>
            <Text style={styles.detailValue}>R${monthlyAmount}</Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Total investido:</Text>
            <Text style={styles.detailValue}>
              {growthData[growthData.length - 1].totalInvested}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Resultado final:</Text>
            <Text style={[styles.detailValue, styles.highlightValue]}>
              {growthData[growthData.length - 1].displayValue}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Retorno (juros):</Text>
            <Text style={styles.detailValue}>
              {growthData[growthData.length - 1].returns}
            </Text>
          </View>
          
          <View style={styles.detailRow}>
            <Text style={styles.detailLabel}>Retorno percentual:</Text>
            <Text style={styles.detailValue}>
              {growthData[growthData.length - 1].returnsPercentage}%
            </Text>
          </View>
        </View>
      )}
      
      <View style={styles.insightBox}>
        <Text style={styles.insightTitle}>💡 Por que isso é importante?</Text>
        <Text style={styles.insightText}>
          <Text style={styles.highlight}>Os juros compostos são seu melhor aliado.</Text> Quanto mais tempo seu dinheiro fica investido, maior é o efeito "bola de neve", onde os juros geram ainda mais juros.
        </Text>
        <Text style={styles.insightText}>
          <Text style={styles.highlight}>Começar cedo é mais importante que o valor inicial.</Text> Mesmo pequenos valores, investidos regularmente durante muitos anos, podem gerar resultados surpreendentes.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    marginVertical: 15,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: COLORS.black,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionGroup: {
    marginBottom: 15,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -5,
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    margin: 5,
    minWidth: 60,
    alignItems: 'center',
  },
  optionButtonSelected: {
    backgroundColor: COLORS.primaryDark,
  },
  optionButtonText: {
    fontSize: 14,
    color: '#444',
  },
  optionButtonTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  chartContainer: {
    height: 300,
    marginVertical: 20,
    paddingBottom: 40,
    paddingTop: 30,
  },
  barChartContainer: {
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 15,
  },
  barContainer: {
    alignItems: 'center',
    marginHorizontal: 5,
    height: '100%',
    justifyContent: 'space-between',
  },
  barWrapper: {
    height: '70%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'relative',
  },
  bar: {
    width: 30,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    minHeight: 5,
  },
  barLabelContainer: {
    width: 70,
    alignItems: 'center',
    marginTop: 10,
  },
  barLabel: {
    fontSize: 11,
    color: '#666',
    textAlign: 'center',
    fontWeight: '500',
  },
  barValueContainer: {
    width: 80,
    alignItems: 'center',
    marginBottom: 8,
    minHeight: 20,
  },
  barValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    textAlign: 'center',
    lineHeight: 12,
  },
  detailContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
  },
  detailTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 15,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 15,
    color: '#555',
  },
  detailValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444',
  },
  highlightValue: {
    color: COLORS.primaryDark,
    fontSize: 16,
  },
  insightBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  insightText: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
});

export default InvestmentGrowthChart;