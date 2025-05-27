import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Polygon, Circle, Text as SvgText, Defs, LinearGradient, Stop } from 'react-native-svg';
import { COLORS } from '../styles/globalStyles';

const TriangleVisualization = ({ risk, return: returnValue, liquidity }) => {
  const [userPosition, setUserPosition] = useState({ x: 0, y: 0 });
  const [recommendedInvestments, setRecommendedInvestments] = useState([]);
  const [activeRegion, setActiveRegion] = useState(null);

  // Dimensões do triângulo
  const triangleSize = 280;
  const center = triangleSize / 2;
  const height = (Math.sqrt(3) / 2) * triangleSize * 0.8;

  // Vértices do triângulo (Segurança-topo, Liquidez-esquerda, Rentabilidade-direita)
  const vertices = {
    security: { x: center, y: 30 }, // Topo (Segurança)
    liquidity: { x: 50, y: height + 30 }, // Esquerda (Liquidez)  
    profitability: { x: triangleSize - 50, y: height + 30 } // Direita (Rentabilidade)
  };

  // Base de dados dos investimentos baseada no livro da Luciana
  const investmentDatabase = [
    {
      region: 'security-liquidity',
      name: 'Segurança + Liquidez',
      investments: [
        'Tesouro Selic',
        'CDB Liquidez Diária',
        'Poupança',
        'Fundos DI'
      ],
      description: 'Ideal para reserva de emergência',
      tradeoff: 'Baixa rentabilidade',
      risk: [0, 30],
      return: [0, 35],
      liquidity: [70, 100]
    },
    {
      region: 'security-profitability', 
      name: 'Segurança + Rentabilidade',
      investments: [
        'CDB Prefixado 2+ anos',
        'LCI/LCA',
        'Tesouro IPCA+',
        'Debêntures Incentivadas'
      ],
      description: 'Objetivos com prazo definido',
      tradeoff: 'Baixa liquidez',
      risk: [0, 30],
      return: [60, 100],
      liquidity: [0, 40]
    },
    {
      region: 'liquidity-profitability',
      name: 'Liquidez + Rentabilidade', 
      investments: [
        'Ações Blue Chips',
        'ETFs',
        'Fundos de Ações',
        'Fundos Multimercado'
      ],
      description: 'Crescimento de longo prazo',
      tradeoff: 'Maior risco',
      risk: [60, 100],
      return: [70, 100], 
      liquidity: [70, 100]
    },
    {
      region: 'balanced',
      name: 'Equilibrio Moderado',
      investments: [
        'Fundos Multimercado Conservadores',
        'CDBs Híbridos',
        'Mix Renda Fixa/Variável'
      ],
      description: 'Perfil moderado equilibrado',
      tradeoff: 'Moderado em tudo',
      risk: [30, 60],
      return: [40, 70],
      liquidity: [40, 70]
    }
  ];

  // Calcular posição do usuário no triângulo baseado nos sliders
  useEffect(() => {
    calculateUserPosition();
    determineRecommendations();
  }, [risk, returnValue, liquidity]);

  const calculateUserPosition = () => {
    // Normalizar valores (0-100 para 0-1)
    const s = risk / 100; // segurança (baixo risco = alta segurança)
    const l = liquidity / 100; // liquidez
    const r = returnValue / 100; // rentabilidade

    // Converter para coordenadas do triângulo
    // Usar coordenadas baricêntricas
    const securityWeight = (100 - risk) / 100; // Inverter risco para segurança
    const liquidityWeight = liquidity / 100;
    const profitabilityWeight = returnValue / 100;

    // Normalizar pesos para que somem 1
    const total = securityWeight + liquidityWeight + profitabilityWeight;
    const normalizedSecurity = securityWeight / total;
    const normalizedLiquidity = liquidityWeight / total;
    const normalizedProfitability = profitabilityWeight / total;

    // Calcular posição
    const x = 
      normalizedSecurity * vertices.security.x +
      normalizedLiquidity * vertices.liquidity.x +
      normalizedProfitability * vertices.profitability.x;
      
    const y = 
      normalizedSecurity * vertices.security.y +
      normalizedLiquidity * vertices.liquidity.y +
      normalizedProfitability * vertices.profitability.y;

    setUserPosition({ x, y });
  };

  const determineRecommendations = () => {
    // Encontrar qual região melhor se adequa aos valores atuais
    const matchingRegions = investmentDatabase.filter(region => {
      const riskMatch = risk >= region.risk[0] && risk <= region.risk[1];
      const returnMatch = returnValue >= region.return[0] && returnValue <= region.return[1];
      const liquidityMatch = liquidity >= region.liquidity[0] && liquidity <= region.liquidity[1];
      
      return riskMatch && returnMatch && liquidityMatch;
    });

    if (matchingRegions.length > 0) {
      setActiveRegion(matchingRegions[0]);
      setRecommendedInvestments(matchingRegions[0].investments);
    } else {
      // Se não há match exato, usar a região mais próxima
      const distances = investmentDatabase.map(region => {
        const riskDist = Math.min(
          Math.abs(risk - region.risk[0]),
          Math.abs(risk - region.risk[1]),
          risk >= region.risk[0] && risk <= region.risk[1] ? 0 : Infinity
        );
        const returnDist = Math.min(
          Math.abs(returnValue - region.return[0]),
          Math.abs(returnValue - region.return[1]),
          returnValue >= region.return[0] && returnValue <= region.return[1] ? 0 : Infinity
        );
        const liquidityDist = Math.min(
          Math.abs(liquidity - region.liquidity[0]),
          Math.abs(liquidity - region.liquidity[1]),
          liquidity >= region.liquidity[0] && liquidity <= region.liquidity[1] ? 0 : Infinity
        );
        
        return {
          region,
          distance: riskDist + returnDist + liquidityDist
        };
      });

      const closest = distances.reduce((min, curr) => 
        curr.distance < min.distance ? curr : min
      );

      setActiveRegion(closest.region);
      setRecommendedInvestments(closest.region.investments);
    }
  };

  // Definir cores para as regiões
  const getRegionColor = (regionName) => {
    switch (regionName) {
      case 'security-liquidity': return '#e3f2fd'; // Azul claro
      case 'security-profitability': return '#e8f5e8'; // Verde claro
      case 'liquidity-profitability': return '#fff3e0'; // Laranja claro
      case 'balanced': return '#f3e5f5'; // Roxo claro
      default: return '#f5f5f5';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔺 Triângulo Impossível dos Investimentos</Text>
      <Text style={styles.subtitle}>
        "É impossível maximizar as três características simultaneamente"
      </Text>

      <View style={styles.triangleContainer}>
        <Svg width={triangleSize} height={height + 60} viewBox={`0 0 ${triangleSize} ${height + 60}`}>
          <Defs>
            <LinearGradient id="triangleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <Stop offset="0%" stopColor="#f8f9fa" stopOpacity="0.8" />
              <Stop offset="100%" stopColor="#e9ecef" stopOpacity="0.8" />
            </LinearGradient>
          </Defs>

          {/* Triângulo principal */}
          <Polygon
            points={`${vertices.security.x},${vertices.security.y} ${vertices.liquidity.x},${vertices.liquidity.y} ${vertices.profitability.x},${vertices.profitability.y}`}
            fill="url(#triangleGradient)"
            stroke={COLORS.primaryDark}
            strokeWidth="2"
          />

          {/* Região ativa destacada */}
          {activeRegion && (
            <Polygon
              points={`${vertices.security.x},${vertices.security.y} ${vertices.liquidity.x},${vertices.liquidity.y} ${vertices.profitability.x},${vertices.profitability.y}`}
              fill={getRegionColor(activeRegion.region)}
              fillOpacity="0.6"
              stroke={COLORS.primaryDark}
              strokeWidth="1"
              strokeDasharray="5,5"
            />
          )}

          {/* Labels dos vértices */}
          <SvgText
            x={vertices.security.x}
            y={vertices.security.y - 10}
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            fill={COLORS.primaryDark}
          >
            🛡️ SEGURANÇA
          </SvgText>

          <SvgText
            x={vertices.liquidity.x - 20}
            y={vertices.liquidity.y + 20}
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            fill={COLORS.primaryDark}
          >
            💧 LIQUIDEZ
          </SvgText>

          <SvgText
            x={vertices.profitability.x + 20}
            y={vertices.profitability.y + 20}
            fontSize="14"
            fontWeight="bold"
            textAnchor="middle"
            fill={COLORS.primaryDark}
          >
            📈 RENTABILIDADE
          </SvgText>

          {/* Posição do usuário */}
          <Circle
            cx={userPosition.x}
            cy={userPosition.y}
            r="8"
            fill={COLORS.primaryDark}
            stroke="#ffffff"
            strokeWidth="2"
          />
          
          {/* Indicador pulsante */}
          <Circle
            cx={userPosition.x}
            cy={userPosition.y}
            r="12"
            fill={COLORS.primaryDark}
            fillOpacity="0.3"
          >
          </Circle>
        </Svg>
      </View>

      {/* Informações da região ativa */}
      {activeRegion && (
        <View style={styles.infoContainer}>
          <View style={styles.regionInfo}>
            <Text style={styles.regionTitle}>📍 {activeRegion.name}</Text>
            <Text style={styles.regionDescription}>{activeRegion.description}</Text>
            <Text style={styles.tradeoff}>
              <Text style={styles.tradeoffLabel}>Limitação:</Text> {activeRegion.tradeoff}
            </Text>
          </View>

          <View style={styles.investmentsContainer}>
            <Text style={styles.investmentsTitle}>💼 Investimentos Recomendados:</Text>
            {recommendedInvestments.map((investment, index) => (
              <View key={index} style={styles.investmentItem}>
                <Text style={styles.investmentText}>• {investment}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View style={styles.conceptBox}>
        <Text style={styles.conceptTitle}>💡 Conceito Fundamental</Text>
        <Text style={styles.conceptText}>
          Baseado no livro "Investindo com Sabedoria" de Luciana Araújo: você deve escolher 
          apenas <Text style={styles.highlight}>duas das três características</Text>. 
          O triângulo mostra qual combinação você priorizou e quais investimentos se adequam 
          ao seu perfil.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: 12,
    padding: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    textAlign: 'center',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  triangleContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  infoContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  regionInfo: {
    marginBottom: 15,
  },
  regionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 5,
  },
  regionDescription: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  tradeoff: {
    fontSize: 13,
    color: '#666',
  },
  tradeoffLabel: {
    fontWeight: 'bold',
  },
  investmentsContainer: {
    borderTopWidth: 1,
    borderTopColor: '#e9ecef',
    paddingTop: 15,
  },
  investmentsTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 10,
  },
  investmentItem: {
    marginBottom: 5,
  },
  investmentText: {
    fontSize: 14,
    color: '#333',
  },
  conceptBox: {
    backgroundColor: COLORS.primaryLight,
    borderRadius: 8,
    padding: 15,
    marginTop: 20,
  },
  conceptTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.primaryDark,
    marginBottom: 8,
  },
  conceptText: {
    fontSize: 13,
    lineHeight: 20,
    color: '#333',
  },
  highlight: {
    fontWeight: 'bold',
    color: COLORS.primaryDark,
  },
});

export default TriangleVisualization;
