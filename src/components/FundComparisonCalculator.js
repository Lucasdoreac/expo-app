import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity,
  ScrollView 
} from 'react-native';
import { COLORS } from '../styles/globalStyles';

const FundComparisonCalculator = () => {
  const [fund1, setFund1] = useState({
    name: 'Fundo DI',
    investedAmount: '10000',
    adminFee: '1.0',
    performanceFee: '0',
    expectedReturn: '12.5'
  });
  
  const [fund2, setFund2] = useState({
    name: 'Fundo Multimercado',
    investedAmount: '10000',
    adminFee: '2.0',
    performanceFee: '20',
    expectedReturn: '15.0'
  });
  
  const [timeFrame, setTimeFrame] = useState('12');
  const [results, setResults] = useState(null);

  const calculateComparison = () => {
    const months = parseInt(timeFrame);
    
    const calcFundReturn = (fund) => {
      const initial = parseFloat(fund.investedAmount);
      const adminFeeRate = parseFloat(fund.adminFee) / 100 / 12; // Taxa mensal
      const grossReturn = parseFloat(fund.expectedReturn) / 100 / 12; // Retorno mensal bruto
      
      let balance = initial;
      let totalAdminFees = 0;
      let totalPerformanceFees = 0;
      
      for (let i = 0; i < months; i++) {
        // Aplicar retorno bruto
        const monthlyReturn = balance * grossReturn;
        balance += monthlyReturn;
        
        // Descontar taxa de administração
        const adminFee = balance * adminFeeRate;
        balance -= adminFee;
        totalAdminFees += adminFee;
        
        // Taxa de performance (aplicada sobre o retorno)
        if (parseFloat(fund.performanceFee) > 0) {
          const perfFee = monthlyReturn * (parseFloat(fund.performanceFee) / 100);
          balance -= perfFee;
          totalPerformanceFees += perfFee;
        }
      }
      
      return {
        finalAmount: balance,
        totalReturn: balance - initial,
        totalAdminFees,
        totalPerformanceFees,
        netReturnRate: ((balance - initial) / initial) * 100
      };
    };
    
    const result1 = calcFundReturn(fund1);
    const result2 = calcFundReturn(fund2);
    
    setResults({
      fund1: result1,
      fund2: result2,
      months: months
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const InputField = ({ label, value, onChangeText, keyboardType = 'default' }) => (
    <View style={styles.inputContainer}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        placeholder="0"
        placeholderTextColor="#999"
      />
    </View>
  );

  const FundCard = ({ title, fund, setFund, color }) => (
    <View style={[styles.fundCard, { borderLeftColor: color }]}>
      <Text style={[styles.fundTitle, { color }]}>{title}</Text>
      
      <InputField
        label="Nome do Fundo"
        value={fund.name}
        onChangeText={(text) => setFund({...fund, name: text})}
      />
      
      <InputField
        label="Valor Investido (R$)"
        value={fund.investedAmount}
        onChangeText={(text) => setFund({...fund, investedAmount: text})}
        keyboardType="numeric"
      />
      
      <InputField
        label="Taxa de Administração (% a.a.)"
        value={fund.adminFee}
        onChangeText={(text) => setFund({...fund, adminFee: text})}
        keyboardType="numeric"
      />
      
      <InputField
        label="Taxa de Performance (%)"
        value={fund.performanceFee}
        onChangeText={(text) => setFund({...fund, performanceFee: text})}
        keyboardType="numeric"
      />
      
      <InputField
        label="Retorno Esperado (% a.a.)"
        value={fund.expectedReturn}
        onChangeText={(text) => setFund({...fund, expectedReturn: text})}
        keyboardType="numeric"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧮 Comparador de Fundos</Text>
      
      <ScrollView style={styles.scrollContainer}>
        <FundCard 
          title="Fundo 1" 
          fund={fund1} 
          setFund={setFund1} 
          color={COLORS.primaryDark} 
        />
        
        <FundCard 
          title="Fundo 2" 
          fund={fund2} 
          setFund={setFund2} 
          color="#e74c3c" 
        />
        
        <View style={styles.timeContainer}>
          <Text style={styles.inputLabel}>Período da Simulação (meses)</Text>
          <TextInput
            style={styles.input}
            value={timeFrame}
            onChangeText={setTimeFrame}
            keyboardType="numeric"
            placeholder="12"
            placeholderTextColor="#999"
          />
        </View>
        
        <TouchableOpacity style={styles.calculateButton} onPress={calculateComparison}>
          <Text style={styles.calculateButtonText}>Comparar Fundos</Text>
        </TouchableOpacity>
        
        {results && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>📊 Resultados da Comparação</Text>
            
            <View style={styles.comparisonRow}>
              <View style={[styles.resultCard, { borderTopColor: COLORS.primaryDark }]}>
                <Text style={[styles.resultFundName, { color: COLORS.primaryDark }]}>
                  {fund1.name}
                </Text>
                <Text style={styles.resultAmount}>
                  {formatCurrency(results.fund1.finalAmount)}
                </Text>
                <Text style={styles.resultLabel}>Valor Final</Text>
                
                <Text style={styles.resultReturn}>
                  {formatCurrency(results.fund1.totalReturn)}
                </Text>
                <Text style={styles.resultLabel}>Retorno Total</Text>
                
                <Text style={styles.resultPercentage}>
                  {results.fund1.netReturnRate.toFixed(2)}%
                </Text>
                <Text style={styles.resultLabel}>Rentabilidade</Text>
                
                <Text style={styles.feeText}>
                  Taxa Admin: {formatCurrency(results.fund1.totalAdminFees)}
                </Text>
                <Text style={styles.feeText}>
                  Taxa Perf: {formatCurrency(results.fund1.totalPerformanceFees)}
                </Text>
              </View>
              
              <View style={[styles.resultCard, { borderTopColor: '#e74c3c' }]}>
                <Text style={[styles.resultFundName, { color: '#e74c3c' }]}>
                  {fund2.name}
                </Text>
                <Text style={styles.resultAmount}>
                  {formatCurrency(results.fund2.finalAmount)}
                </Text>
                <Text style={styles.resultLabel}>Valor Final</Text>
                
                <Text style={styles.resultReturn}>
                  {formatCurrency(results.fund2.totalReturn)}
                </Text>
                <Text style={styles.resultLabel}>Retorno Total</Text>
                
                <Text style={styles.resultPercentage}>
                  {results.fund2.netReturnRate.toFixed(2)}%
                </Text>
                <Text style={styles.resultLabel}>Rentabilidade</Text>
                
                <Text style={styles.feeText}>
                  Taxa Admin: {formatCurrency(results.fund2.totalAdminFees)}
                </Text>
                <Text style={styles.feeText}>
                  Taxa Perf: {formatCurrency(results.fund2.totalPerformanceFees)}
                </Text>
              </View>
            </View>
            
            <View style={styles.winnerContainer}>
              <Text style={styles.winnerTitle}>🏆 Melhor Opção</Text>
              <Text style={styles.winnerText}>
                {results.fund1.finalAmount > results.fund2.finalAmount ? fund1.name : fund2.name} 
                {' '}gerou {' '}
                {formatCurrency(Math.abs(results.fund1.finalAmount - results.fund2.finalAmount))}
                {' '}a mais em {results.months} meses.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginVertical: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  scrollContainer: {
    maxHeight: 600,
  },
  fundCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
  },
  fundTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputLabel: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: 'white',
  },
  timeContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  calculateButton: {
    backgroundColor: COLORS.primaryDark,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  calculateButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultsContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
  },
  resultsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  comparisonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  resultCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 5,
    borderTopWidth: 4,
    alignItems: 'center',
  },
  resultFundName: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 3,
  },
  resultReturn: {
    fontSize: 16,
    fontWeight: '600',
    color: '#27ae60',
    marginBottom: 3,
  },
  resultPercentage: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.primaryDark,
    marginBottom: 3,
  },
  resultLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 8,
  },
  feeText: {
    fontSize: 11,
    color: '#999',
    marginTop: 2,
  },
  winnerContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  winnerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  winnerText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default FundComparisonCalculator;