import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet,
  TouchableOpacity
} from 'react-native';
import { COLORS } from '../styles/globalStyles';

// Componentes para visualizar os meses de investimento
const MonthsVisualizer = ({ months, investedMonths, skippedMonths }) => {
  // Divide os meses em linhas para melhor visualização
  const rows = [];
  const monthsPerRow = 12;
  
  for (let i = 0; i < months; i += monthsPerRow) {
    const rowMonths = [];
    for (let j = 0; j < monthsPerRow && i + j < months; j++) {
      const monthIndex = i + j;
      const isInvested = investedMonths.includes(monthIndex);
      const isSkipped = skippedMonths.includes(monthIndex);
      
      rowMonths.push({
        index: monthIndex,
        isInvested,
        isSkipped
      });
    }
    rows.push(rowMonths);
  }
  
  return (
    <View style={styles.monthsContainer}>
      {rows.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.monthsRow}>
          {row.map((month) => (
            <View 
              key={month.index} 
              style={[
                styles.monthBox,
                month.isInvested && styles.investedMonth,
                month.isSkipped && styles.skippedMonth
              ]}
            >
              <Text style={styles.monthText}>{month.index + 1}</Text>
            </View>
          ))}
        </View>
      ))}
      <View style={styles.monthsLegend}>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: COLORS.primaryDark }]} />
          <Text style={styles.legendText}>Investido</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: '#f0f0f0' }]} />
          <Text style={styles.legendText}>Não investido</Text>
        </View>
        <View style={styles.legendItem}>
          <View style={[styles.legendIcon, { backgroundColor: '#ff9999', borderWidth: 1, borderColor: '#e74c3c' }]} />
          <Text style={styles.legendText}>Aporte esquecido</Text>
        </View>
      </View>
    </View>
  );
};

const AutomatedInvestmentSimulator = () => {
  // Estados para os parâmetros da simulação
  const [monthlyAmount, setMonthlyAmount] = useState(100);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [simulationYears, setSimulationYears] = useState(5);
  const [isAutomated, setIsAutomated] = useState(true);
  const [consistency, setConsistency] = useState(100);
  
  // Resultado da simulação
  const [simulationResult, setSimulationResult] = useState({
    totalMonths: 0,
    investedMonths: [],
    skippedMonths: [],
    totalInvested: 0,
    finalBalance: 0,
    totalReturns: 0,
    lostOpportunity: 0
  });
  
  // Executa a simulação quando os parâmetros mudam
  useEffect(() => {
    runSimulation();
  }, [monthlyAmount, annualReturn, simulationYears, isAutomated, consistency]);
  
  // Função auxiliar para determinar se o investimento deve ser feito em um mês específico
  // Esta implementação é mais robusta e funciona com todos os níveis de disciplina
  const shouldInvest = (monthIndex, level, seedValue) => {
    // Implementação simplificada e robusta
    if (level >= 100) return true;  // Sempre investe com 100%
    if (level <= 0) return false;   // Nunca investe com 0%
    
    // Usar números primos grandes para melhor distribuição
    // 73 é um número primo que ajuda a distribuir os valores
    const hash = (monthIndex * 73 + seedValue) % 100;
    
    // Retorna true para valores abaixo do nível de consistência
    return hash < level;
  };
  
  // Simula o processo de investimento
  const runSimulation = () => {
    const totalMonths = simulationYears * 12;
    const monthlyRate = annualReturn / 100 / 12;
    const investedMonths = [];
    const skippedMonths = [];
    let totalInvested = 0;
    let finalBalance = 0;
    
    // Semente para consistência nos resultados
    const seed = consistency + simulationYears + monthlyAmount;
    
    // Simula cada mês
    for (let i = 0; i < totalMonths; i++) {
      // Acumula os juros do mês
      finalBalance = finalBalance * (1 + monthlyRate);
      
      // Decide se o aporte será feito neste mês
      let makeInvestment = true;
      
      if (!isAutomated) {
        makeInvestment = shouldInvest(i, consistency, seed);
      }
      
      if (makeInvestment) {
        finalBalance += monthlyAmount;
        totalInvested += monthlyAmount;
        investedMonths.push(i);
      } else {
        skippedMonths.push(i);
      }
    }
    
    // Calcula o retorno total
    const totalReturns = finalBalance - totalInvested;
    
    // Calcula a oportunidade perdida (comparada com 100% de consistência)
    let perfectBalance = 0;
    for (let i = 0; i < totalMonths; i++) {
      perfectBalance = perfectBalance * (1 + monthlyRate) + monthlyAmount;
    }
    const lostOpportunity = perfectBalance - finalBalance;
    
    setSimulationResult({
      totalMonths,
      investedMonths,
      skippedMonths,
      totalInvested,
      finalBalance,
      totalReturns,
      lostOpportunity
    });
  };
  
  // Formatação de valores monetários
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🤖 Simulador de Investimento Automatizado</Text>
      <Text style={styles.description}>
        Compare o impacto de automatizar seus investimentos versus depender da sua disciplina mensal.
      </Text>
      
      <View style={styles.optionsContainer}>
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Aporte Mensal:</Text>
          <View style={styles.buttonGroup}>
            {[50, 100, 200, 500].map((amount) => (
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
        
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Período:</Text>
          <View style={styles.buttonGroup}>
            {[1, 3, 5, 10].map((years) => (
              <TouchableOpacity
                key={years}
                style={[
                  styles.optionButton,
                  simulationYears === years && styles.optionButtonSelected
                ]}
                onPress={() => setSimulationYears(years)}
              >
                <Text 
                  style={[
                    styles.optionButtonText,
                    simulationYears === years && styles.optionButtonTextSelected
                  ]}
                >
                  {years} {years === 1 ? 'ano' : 'anos'}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.optionRow}>
          <Text style={styles.optionLabel}>Método:</Text>
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                styles.toggleButtonLeft,
                isAutomated && styles.toggleButtonSelected
              ]}
              onPress={() => {
                setIsAutomated(true);
                setConsistency(100);
              }}
            >
              <Text 
                style={[
                  styles.toggleButtonText,
                  isAutomated && styles.toggleButtonTextSelected
                ]}
              >
                Automatizado
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                styles.toggleButtonRight,
                !isAutomated && styles.toggleButtonSelected
              ]}
              onPress={() => {
                setIsAutomated(false);
                // Definir um valor padrão ao mudar para manual
                if (consistency === 100) {
                  setConsistency(90);
                }
              }}
            >
              <Text 
                style={[
                  styles.toggleButtonText,
                  !isAutomated && styles.toggleButtonTextSelected
                ]}
              >
                Manual
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
        {!isAutomated && (
          <View style={styles.consistencyContainer}>
            <Text style={styles.consistencyLabel}>
              Nível de Disciplina: {consistency}%
            </Text>
            <View style={styles.consistencyButtons}>
              {[50, 70, 90, 100].map((level) => (
                <TouchableOpacity
                  key={level}
                  style={[
                    styles.consistencyButton,
                    consistency === level && styles.consistencyButtonSelected
                  ]}
                  onPress={() => setConsistency(level)}
                  activeOpacity={0.7}
                >
                  <Text style={[
                    styles.consistencyButtonText,
                    consistency === level && styles.consistencyButtonTextSelected
                  ]}>
                    {level}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.consistencyDescription}>
              {consistency === 100 && 'Perfeito! Você nunca esquece de investir.'}
              {consistency === 90 && 'Muito bom. Você esquece de investir apenas em alguns meses.'}
              {consistency === 70 && 'Razoável. Você esquece de investir com certa frequência.'}
              {consistency === 50 && 'Baixo. Você investe apenas na metade dos meses.'}
            </Text>
          </View>
        )}
      </View>
      
      <View style={styles.resultsContainer}>
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Distribuição dos Aportes</Text>
          <MonthsVisualizer 
            months={simulationResult.totalMonths}
            investedMonths={simulationResult.investedMonths}
            skippedMonths={simulationResult.skippedMonths}
          />
        </View>
        
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Resultado da Simulação</Text>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Total investido:</Text>
            <Text style={styles.resultValue}>
              {formatCurrency(simulationResult.totalInvested)}
            </Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Saldo final:</Text>
            <Text style={[styles.resultValue, styles.highlightValue]}>
              {formatCurrency(simulationResult.finalBalance)}
            </Text>
          </View>
          
          <View style={styles.resultRow}>
            <Text style={styles.resultLabel}>Retorno gerado:</Text>
            <Text style={styles.resultValue}>
              {formatCurrency(simulationResult.totalReturns)}
            </Text>
          </View>
          
          {!isAutomated && consistency < 100 && (
            <View style={styles.resultRow}>
              <Text style={styles.resultLabel}>Oportunidade perdida:</Text>
              <Text style={[styles.resultValue, styles.negativeValue]}>
                {formatCurrency(simulationResult.lostOpportunity)}
              </Text>
            </View>
          )}
        </View>
        
        <View style={styles.insightBox}>
          <Text style={styles.insightTitle}>💡 Lições da Simulação</Text>
          
          <Text style={styles.insightText}>
            <Text style={styles.highlight}>A automação elimina a dependência da sua força de vontade.</Text> Quando o investimento é automático, você nunca "esquece" ou gasta o dinheiro que deveria ser investido.
          </Text>
          
          <Text style={styles.insightText}>
            <Text style={styles.highlight}>Pequenas falhas na consistência têm grande impacto no longo prazo.</Text> Cada mês sem investir não é apenas uma perda do valor não investido, mas também de todos os juros que aquele valor geraria ao longo dos anos.
          </Text>
          
          <Text style={styles.insightText}>
            <Text style={styles.highlight}>Investir mensalmente é como plantar uma semente por mês.</Text> Quando o processo é automatizado, você garante que seu "jardim financeiro" receba novas sementes regularmente, sem depender da sua memória ou disciplina.
          </Text>
        </View>
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
  optionRow: {
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
  },
  optionButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    minWidth: 70,
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
  toggleContainer: {
    flexDirection: 'row',
    borderRadius: 5,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: COLORS.primaryDark,
  },
  toggleButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    backgroundColor: '#f0f0f0',
    flex: 1,
    alignItems: 'center',
  },
  toggleButtonLeft: {
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  toggleButtonRight: {
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  toggleButtonSelected: {
    backgroundColor: COLORS.primaryDark,
  },
  toggleButtonText: {
    fontSize: 14,
    color: '#444',
  },
  toggleButtonTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  consistencyContainer: {
    marginTop: 10,
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
  },
  consistencyLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  consistencyButtons: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  consistencyButton: {
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginRight: 8,
    minWidth: 50,
    alignItems: 'center',
  },
  consistencyButtonSelected: {
    backgroundColor: COLORS.primaryDark,
  },
  consistencyButtonText: {
    fontSize: 14,
    color: '#444',
  },
  consistencyButtonTextSelected: {
    color: COLORS.white,
    fontWeight: 'bold',
  },
  consistencyDescription: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#555',
  },
  resultsContainer: {
    marginBottom: 10,
    maxHeight: 500,
  },
  resultSection: {
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 15,
    textAlign: 'center',
  },
  monthsContainer: {
    marginBottom: 10,
  },
  monthsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 5,
    justifyContent: 'center',
  },
  monthBox: {
    width: 22,
    height: 22,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  investedMonth: {
    backgroundColor: COLORS.primaryDark,
  },
  skippedMonth: {
    backgroundColor: '#ff9999',
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  monthText: {
    fontSize: 10,
    color: '#333',
  },
  monthsLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  legendIcon: {
    width: 12,
    height: 12,
    borderRadius: 3,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: '#555',
  },
  resultRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    paddingHorizontal: 10,
  },
  resultLabel: {
    fontSize: 14,
    color: '#555',
  },
  resultValue: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#444',
  },
  highlightValue: {
    color: COLORS.primaryDark,
    fontSize: 16,
  },
  negativeValue: {
    color: '#e74c3c',
  },
  insightBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    marginBottom: 40, // Aumentado de 10 para 40 - mais espaço após card azul
  },
  insightTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  insightText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 10,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
});

export default AutomatedInvestmentSimulator;