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

const TaxCalculator = () => {
  const [investment, setInvestment] = useState({
    initialAmount: '10000',
    finalAmount: '12000',
    days: '365',
    investmentType: 'rendaFixa' // rendaFixa, fundos, acoes
  });
  
  const [results, setResults] = useState(null);

  // Tabela regressiva de IR para renda fixa
  const getIRRate = (days, type) => {
    if (type === 'acoes') return 0; // Ações são isentas para pessoa física (até determinado valor)
    
    if (days <= 180) return 0.225; // 22,5%
    if (days <= 360) return 0.20;  // 20%
    if (days <= 720) return 0.175; // 17,5%
    return 0.15; // 15%
  };

  // Tabela de IOF
  const getIOFRate = (days) => {
    if (days >= 30) return 0;
    
    const iofTable = [
      96, 93, 90, 86, 83, 80, 76, 73, 70, 66, // 1-10 dias
      63, 60, 56, 53, 50, 46, 43, 40, 36, 33, // 11-20 dias
      30, 26, 23, 20, 16, 13, 10, 6, 3, 0     // 21-30 dias
    ];
    
    if (days <= 30) {
      return (iofTable[days - 1] || 0) / 100;
    }
    return 0;
  };

  const calculateTaxes = () => {
    const initial = parseFloat(investment.initialAmount);
    const final = parseFloat(investment.finalAmount);
    const days = parseInt(investment.days);
    const profit = final - initial;
    
    if (profit <= 0) {
      setResults({
        profit: 0,
        irRate: 0,
        iofRate: 0,
        irAmount: 0,
        iofAmount: 0,
        totalTaxes: 0,
        netAmount: final,
        netProfit: profit
      });
      return;
    }
    
    const irRate = getIRRate(days, investment.investmentType);
    const iofRate = getIOFRate(days);
    
    const irAmount = profit * irRate;
    const iofAmount = profit * iofRate;
    const totalTaxes = irAmount + iofAmount;
    
    const netAmount = final - totalTaxes;
    const netProfit = profit - totalTaxes;
    
    setResults({
      profit,
      irRate: irRate * 100,
      iofRate: iofRate * 100,
      irAmount,
      iofAmount,
      totalTaxes,
      netAmount,
      netProfit,
      days
    });
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const InvestmentTypeButton = ({ type, label, isSelected, onPress }) => (
    <TouchableOpacity
      style={[
        styles.typeButton,
        isSelected && styles.typeButtonSelected
      ]}
      onPress={onPress}
    >
      <Text style={[
        styles.typeButtonText,
        isSelected && styles.typeButtonTextSelected
      ]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧾 Calculadora de Impostos</Text>
      
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.inputSection}>
          <Text style={styles.sectionTitle}>Tipo de Investimento</Text>
          <View style={styles.typeContainer}>
            <InvestmentTypeButton
              type="rendaFixa"
              label="Renda Fixa"
              isSelected={investment.investmentType === 'rendaFixa'}
              onPress={() => setInvestment({...investment, investmentType: 'rendaFixa'})}
            />
            <InvestmentTypeButton
              type="fundos"
              label="Fundos"
              isSelected={investment.investmentType === 'fundos'}
              onPress={() => setInvestment({...investment, investmentType: 'fundos'})}
            />
            <InvestmentTypeButton
              type="acoes"
              label="Ações"
              isSelected={investment.investmentType === 'acoes'}
              onPress={() => setInvestment({...investment, investmentType: 'acoes'})}
            />
          </View>
        </View>
        
        <View style={styles.inputCard}>
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Valor Inicial Investido (R$)</Text>
            <TextInput
              style={styles.input}
              value={investment.initialAmount}
              onChangeText={(text) => setInvestment({...investment, initialAmount: text})}
              keyboardType="numeric"
              placeholder="10000"
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Valor Final do Investimento (R$)</Text>
            <TextInput
              style={styles.input}
              value={investment.finalAmount}
              onChangeText={(text) => setInvestment({...investment, finalAmount: text})}
              keyboardType="numeric"
              placeholder="12000"
              placeholderTextColor="#999"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.inputLabel}>Período do Investimento (dias)</Text>
            <TextInput
              style={styles.input}
              value={investment.days}
              onChangeText={(text) => setInvestment({...investment, days: text})}
              keyboardType="numeric"
              placeholder="365"
              placeholderTextColor="#999"
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.calculateButton} onPress={calculateTaxes}>
          <Text style={styles.calculateButtonText}>Calcular Impostos</Text>
        </TouchableOpacity>
        
        {results && (
          <View style={styles.resultsContainer}>
            <Text style={styles.resultsTitle}>📊 Resultado da Tributação</Text>
            
            <View style={styles.profitCard}>
              <Text style={styles.profitAmount}>
                {formatCurrency(results.profit)}
              </Text>
              <Text style={styles.profitLabel}>Lucro Bruto</Text>
            </View>
            
            <View style={styles.taxBreakdown}>
              <View style={styles.taxRow}>
                <Text style={styles.taxLabel}>💰 Imposto de Renda ({results.irRate.toFixed(1)}%)</Text>
                <Text style={styles.taxAmount}>{formatCurrency(results.irAmount)}</Text>
              </View>
              
              <View style={styles.taxRow}>
                <Text style={styles.taxLabel}>⏱️ IOF ({results.iofRate.toFixed(1)}%)</Text>
                <Text style={styles.taxAmount}>{formatCurrency(results.iofAmount)}</Text>
              </View>
              
              <View style={[styles.taxRow, styles.totalTaxRow]}>
                <Text style={styles.totalTaxLabel}>Total de Impostos</Text>
                <Text style={styles.totalTaxAmount}>{formatCurrency(results.totalTaxes)}</Text>
              </View>
            </View>
            
            <View style={styles.finalResults}>
              <View style={styles.finalCard}>
                <Text style={styles.finalAmount}>{formatCurrency(results.netAmount)}</Text>
                <Text style={styles.finalLabel}>Valor Líquido Final</Text>
              </View>
              
              <View style={styles.finalCard}>
                <Text style={styles.finalProfit}>{formatCurrency(results.netProfit)}</Text>
                <Text style={styles.finalLabel}>Lucro Líquido</Text>
              </View>
            </View>
            
            <View style={styles.infoBox}>
              <Text style={styles.infoTitle}>📅 Informações sobre o Prazo</Text>
              {results.days <= 30 && (
                <Text style={styles.infoText}>
                  ⚠️ <Text style={styles.highlight}>IOF aplicável!</Text> Investimentos com prazo inferior a 30 dias são tributados pelo IOF regressivo.
                </Text>
              )}
              {results.days > 30 && results.days <= 180 && (
                <Text style={styles.infoText}>
                  📈 <Text style={styles.highlight}>IR de 22,5%</Text> aplicável para investimentos de até 180 dias.
                </Text>
              )}
              {results.days > 180 && results.days <= 720 && (
                <Text style={styles.infoText}>
                  📉 <Text style={styles.highlight}>IR regressivo</Text> - quanto maior o prazo, menor a alíquota!
                </Text>
              )}
              {results.days > 720 && (
                <Text style={styles.infoText}>
                  🎯 <Text style={styles.highlight}>Menor alíquota (15%)</Text> para investimentos acima de 2 anos!
                </Text>
              )}
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
  inputSection: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  typeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  typeButton: {
    flex: 1,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 2,
  },
  typeButtonSelected: {
    backgroundColor: COLORS.primaryDark,
    borderColor: COLORS.primaryDark,
  },
  typeButtonText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
  },
  typeButtonTextSelected: {
    color: 'white',
    fontWeight: 'bold',
  },
  inputCard: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
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
  profitCard: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  profitAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  profitLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  taxBreakdown: {
    marginBottom: 15,
  },
  taxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  totalTaxRow: {
    borderBottomWidth: 2,
    borderBottomColor: COLORS.primaryDark,
    marginTop: 5,
  },
  taxLabel: {
    fontSize: 14,
    color: '#333',
  },
  taxAmount: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e74c3c',
  },
  totalTaxLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
  totalTaxAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
  finalResults: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  finalCard: {
    flex: 1,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  finalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  finalProfit: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#27ae60',
  },
  finalLabel: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  infoBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 13,
    lineHeight: 18,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
});

export default TaxCalculator;