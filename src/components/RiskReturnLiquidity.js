import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform
} from 'react-native';
import CustomSlider from './CustomSlider';
import { COLORS } from '../styles/globalStyles';
import TriangleVisualizationResponsive from './TriangleVisualizationResponsive';

const RiskReturnLiquidity = () => {
  // Estados para os valores de cada dimensão
  const [risk, setRisk] = useState(30);
  const [return_, setReturn] = useState(30);
  const [liquidity, setLiquidity] = useState(70);

  // Estados para armazenar a classe de investimento recomendada
  const [recommendedClass, setRecommendedClass] = useState(null);
  const [otherOptions, setOtherOptions] = useState([]);

  // Classes de investimentos com seus perfis característicos
  const investmentClasses = [
    {
      name: "Poupança",
      risk: 10,
      return_: 15,
      liquidity: 90,
      description: "Investimento tradicional com segurança e liquidez, mas baixo retorno."
    },
    {
      name: "Tesouro Selic",
      risk: 15,
      return_: 30,
      liquidity: 85,
      description: "Título público de baixíssimo risco com retorno atrelado à taxa básica."
    },
    {
      name: "CDB de banco grande",
      risk: 20,
      return_: 35,
      liquidity: 75,
      description: "Certificados de depósito bancário com garantia do FGC até R$250 mil."
    },
    {
      name: "Tesouro IPCA+",
      risk: 25,
      return_: 45,
      liquidity: 60,
      description: "Título público que protege contra inflação, ideal para longo prazo."
    },
    {
      name: "Fundos DI",
      risk: 20,
      return_: 30,
      liquidity: 80,
      description: "Fundos que investem em títulos pós-fixados com baixa volatilidade."
    },
    {
      name: "Fundos Multimercado",
      risk: 50,
      return_: 60,
      liquidity: 55,
      description: "Fundos diversificados que investem em diferentes classes de ativos."
    },
    {
      name: "Fundos Imobiliários",
      risk: 60,
      return_: 65,
      liquidity: 60,
      description: "Investimento em empreendimentos imobiliários com distribuição de rendimentos."
    },
    {
      name: "ETFs de ações",
      risk: 65,
      return_: 75,
      liquidity: 85,
      description: "Fundos negociados em bolsa que acompanham índices de ações."
    },
    {
      name: "Ações Blue Chips",
      risk: 70,
      return_: 80,
      liquidity: 90,
      description: "Ações de empresas grandes e consolidadas no mercado."
    },
    {
      name: "Ações Small Caps",
      risk: 85,
      return_: 90,
      liquidity: 75,
      description: "Ações de empresas menores com maior potencial de crescimento e risco."
    }
  ];

  // Atualiza a recomendação quando os valores são alterados
  useEffect(() => {
    updateRecommendation();
  }, [risk, return_, liquidity]);

  // Encontra a classe de investimento mais adequada baseada nos valores do triângulo
  const updateRecommendation = () => {
    // Calcula a "distância" entre as preferências do usuário e cada classe de investimento
    const distances = investmentClasses.map(investClass => {
      const riskDiff = Math.abs(risk - investClass.risk);
      const returnDiff = Math.abs(return_ - investClass.return_);
      const liquidityDiff = Math.abs(liquidity - investClass.liquidity);

      // Pontuação total (menor é melhor)
      const totalDistance = riskDiff + returnDiff + liquidityDiff;

      return {
        ...investClass,
        distance: totalDistance
      };
    });

    // Ordena por distância (do menor para o maior)
    const sortedOptions = [...distances].sort((a, b) => a.distance - b.distance);

    // Define a classe mais adequada e outras opções
    setRecommendedClass(sortedOptions[0]);
    setOtherOptions(sortedOptions.slice(1, 4)); // Próximas 3 opções
  };

  // Templates pré-definidos para diferentes perfis
  const applyTemplate = (template) => {
    switch (template) {
      case 'conservador':
        setRisk(20);
        setReturn(30);
        setLiquidity(80);
        break;
      case 'moderado':
        setRisk(50);
        setReturn(60);
        setLiquidity(50);
        break;
      case 'arrojado':
        setRisk(80);
        setReturn(90);
        setLiquidity(40);
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔄 Triângulo Risco-Retorno-Liquidez</Text>
      <Text style={styles.description}>
        Ajuste os controles abaixo para encontrar investimentos que combinem com suas preferências.
      </Text>

      <View style={styles.templateButtons}>
        <TouchableOpacity
          style={[styles.templateButton, styles.conservativeButton]}
          onPress={() => applyTemplate('conservador')}
        >
          <Text style={styles.templateButtonText}>Conservador</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.templateButton, styles.moderateButton]}
          onPress={() => applyTemplate('moderado')}
        >
          <Text style={styles.templateButtonText}>Moderado</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.templateButton, styles.aggressiveButton]}
          onPress={() => applyTemplate('arrojado')}
        >
          <Text style={styles.templateButtonText}>Arrojado</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          Risco: <Text style={styles.sliderValue}>{risk}%</Text>
        </Text>
        <CustomSlider
          minimumValue={0}
          maximumValue={100}
          value={risk}
          onValueChange={setRisk}
          step={5}
          minimumTrackTintColor={COLORS.primaryDark}
          maximumTrackTintColor="#d1d5db"
          style={styles.slider}
        />
        <View style={styles.sliderLegend}>
          <Text style={styles.legendText}>🛡️ Baixo Risco</Text>
          <Text style={styles.legendText}>⚡ Alto Risco</Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          Potencial de retorno: <Text style={styles.sliderValue}>{return_}%</Text>
        </Text>
        <CustomSlider
          minimumValue={0}
          maximumValue={100}
          value={return_}
          onValueChange={setReturn}
          step={5}
          minimumTrackTintColor={COLORS.primaryDark}
          maximumTrackTintColor="#d1d5db"
          style={styles.slider}
        />
        <View style={styles.sliderLegend}>
          <Text style={styles.legendText}>📉 Menor Retorno</Text>
          <Text style={styles.legendText}>📈 Maior Retorno</Text>
        </View>
      </View>

      <View style={styles.sliderContainer}>
        <Text style={styles.sliderLabel}>
          Liquidez: <Text style={styles.sliderValue}>{liquidity}%</Text>
        </Text>
        <CustomSlider
          minimumValue={0}
          maximumValue={100}
          value={liquidity}
          onValueChange={setLiquidity}
          step={5}
          minimumTrackTintColor={COLORS.primaryDark}
          maximumTrackTintColor="#d1d5db"
          style={styles.slider}
        />
        <View style={styles.sliderLegend}>
          <Text style={styles.legendText}>🔒 Menos Líquido</Text>
          <Text style={styles.legendText}>💧 Mais Líquido</Text>
        </View>
      </View>

      {recommendedClass && (
        <View style={styles.recommendationContainer}>
          <Text style={styles.recommendationTitle}>Investimento recomendado:</Text>
          <Text style={styles.recommendedClass}>{recommendedClass.name}</Text>
          <Text style={styles.recommendationDescription}>{recommendedClass.description}</Text>

          <Text style={styles.otherOptionsTitle}>Outras Opções Compatíveis:</Text>
          {otherOptions.map((option, index) => (
            <Text key={index} style={styles.otherOption}>• {option.name}</Text>
          ))}
        </View>
      )}

      {/* Visualização do Triângulo Impossível */}
      <TriangleVisualizationResponsive 
        risk={risk}
        return={return_}
        liquidity={liquidity}
      />

      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>💡 Entendendo o Triângulo</Text>
        <Text style={styles.infoText}>
          <Text style={styles.highlight}>Risco:</Text> Chance de perder parte do capital investido{'\n'}
          <Text style={styles.highlight}>Retorno:</Text> Potencial de ganho financeiro{'\n'}
          <Text style={styles.highlight}>Liquidez:</Text> Facilidade de resgatar o investimento
        </Text>
        <Text style={styles.infoNote}>
          Geralmente, não é possível maximizar as três dimensões simultaneamente.
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
  templateButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  templateButton: {
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  conservativeButton: {
    backgroundColor: '#e6f7ff',
    borderWidth: 1,
    borderColor: '#91d5ff',
  },
  moderateButton: {
    backgroundColor: '#fff7e6',
    borderWidth: 1,
    borderColor: '#ffd591',
  },
  aggressiveButton: {
    backgroundColor: '#fff1f0',
    borderWidth: 1,
    borderColor: '#ffa39e',
  },
  templateButtonText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  sliderContainer: {
    marginBottom: 25,
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  sliderLabel: {
    fontSize: 16,
    marginBottom: 15,
    color: COLORS.primaryDark,
    fontWeight: '600',
  },
  sliderValue: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.primaryDark,
  },
  slider: {
    height: 50,
    marginVertical: 10,
  },
  sliderLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
    marginTop: 8,
  },
  legendText: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: '500',
  },
  recommendationContainer: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    marginVertical: 15,
  },
  recommendationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  recommendedClass: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 5,
  },
  recommendationDescription: {
    fontSize: 14,
    marginBottom: 15,
    lineHeight: 20,
  },
  otherOptionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
    marginTop: 5,
  },
  otherOption: {
    fontSize: 14,
    marginBottom: 5,
  },
  infoBox: {
    backgroundColor: '#f9f9f9',
    borderLeftWidth: 4,
    borderLeftColor: COLORS.primaryDark,
    padding: 15,
    marginTop: 10,
  },
  infoTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 5,
  },
  infoNote: {
    fontSize: 14,
    fontStyle: 'italic',
    marginTop: 5,
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  }
});

export default RiskReturnLiquidity;
