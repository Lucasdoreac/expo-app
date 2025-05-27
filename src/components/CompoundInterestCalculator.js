import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { COLORS, globalStyles } from '../styles/globalStyles';

const CompoundInterestCalculator = () => {
  // Estados para controlar os inputs e resultados
  const [initialValue, setInitialValue] = useState('0');
  const [monthlyValue, setMonthlyValue] = useState('100');
  const [interestRate, setInterestRate] = useState('0.8');
  const [period, setPeriod] = useState('10');
  const [result, setResult] = useState(null);
  const [totalInvested, setTotalInvested] = useState(0);
  const [interestEarned, setInterestEarned] = useState(0);

  // Calcula o resultado dos juros compostos
  const calculateCompoundInterest = () => {
    const initial = parseFloat(initialValue) || 0;
    const monthly = parseFloat(monthlyValue) || 0;
    const rate = (parseFloat(interestRate) || 0) / 100;
    const years = parseFloat(period) || 0;
    
    let futureValue = initial;
    let invested = initial;
    
    // Cálculo mensal ao longo dos anos
    for (let i = 0; i < years * 12; i++) {
      futureValue = futureValue * (1 + rate) + monthly;
      invested += monthly;
    }
    
    // Arredonda para 2 casas decimais
    futureValue = Math.round(futureValue * 100) / 100;
    invested = Math.round(invested * 100) / 100;
    
    setResult(futureValue);
    setTotalInvested(invested);
    setInterestEarned(futureValue - invested);
  };

  // Calcula o resultado sempre que os valores mudarem
  useEffect(() => {
    calculateCompoundInterest();
  }, [initialValue, monthlyValue, interestRate, period]);

  // Formata para exibição com R$ e pontuação
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={{paddingBottom: 50}}>
        <View style={styles.card}>
          <Text style={styles.title}>💰 Calculadora de Juros Compostos</Text>
          <Text style={styles.description}>
            Descubra como pequenos investimentos mensais podem se transformar em um patrimônio significativo ao longo do tempo.
          </Text>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Valor inicial (R$):</Text>
            <TextInput
              style={styles.input}
              value={initialValue}
              onChangeText={setInitialValue}
              keyboardType="numeric"
              placeholder="Ex: 500"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Investimento mensal (R$):</Text>
            <TextInput
              style={styles.input}
              value={monthlyValue}
              onChangeText={setMonthlyValue}
              keyboardType="numeric"
              placeholder="Ex: 100"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Taxa de juros mensal (%):</Text>
            <TextInput
              style={styles.input}
              value={interestRate}
              onChangeText={setInterestRate}
              keyboardType="numeric"
              placeholder="Ex: 0.8"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Período (anos):</Text>
            <TextInput
              style={styles.input}
              value={period}
              onChangeText={setPeriod}
              keyboardType="numeric"
              placeholder="Ex: 10"
            />
          </View>
          
          <TouchableOpacity 
            style={styles.calculateButton}
            onPress={calculateCompoundInterest}
          >
            <Text style={styles.calculateButtonText}>Calcular</Text>
          </TouchableOpacity>
          
          {result !== null && (
            <View style={styles.resultContainer}>
              <Text style={styles.resultTitle}>Resultados após {period} anos:</Text>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Total acumulado:</Text>
                <Text style={styles.resultValue}>{formatCurrency(result)}</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Total investido:</Text>
                <Text style={styles.resultValue}>{formatCurrency(totalInvested)}</Text>
              </View>
              
              <View style={styles.resultItem}>
                <Text style={styles.resultLabel}>Juros ganhos:</Text>
                <Text style={[styles.resultValue, styles.highlight]}>
                  {formatCurrency(interestEarned)}
                </Text>
              </View>
              
              <Text style={styles.tip}>
                <Text style={styles.tipHighlight}>💡 Dica:</Text> Lembre-se que a consistência é mais importante que o valor inicial. Comece com o quanto puder, mesmo que seja R$30 por mês.
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 8,
    padding: 15,
    margin: 15,
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
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    color: COLORS.primaryDark,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primaryLight,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
  },
  calculateButton: {
    backgroundColor: COLORS.primaryDark,
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  calculateButtonText: {
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  resultContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
  },
  resultTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  resultLabel: {
    fontSize: 16,
    color: COLORS.primaryDark,
  },
  resultValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  highlight: {
    color: COLORS.primaryDark,
  },
  tip: {
    marginTop: 15,
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.primaryDark,
  },
  tipHighlight: {
    fontWeight: 'bold',
  },
});

export default CompoundInterestCalculator;
