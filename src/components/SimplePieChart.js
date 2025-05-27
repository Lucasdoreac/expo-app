import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

const SimplePieChart = ({ data, size = 200 }) => {
  // Calcular o total para percentuais
  const total = data.reduce((sum, item) => sum + item.value, 0);
  
  // Criar segmentos para o gráfico
  const segments = data.map((item, index) => {
    const percentage = (item.value / total) * 100;
    return {
      ...item,
      percentage: percentage.toFixed(1),
      color: item.color || item.svg?.fill || '#cccccc'
    };
  });

  // Para web, usar conic-gradient
  if (Platform.OS === 'web') {
    let gradientStops = [];
    let currentAngle = 0;
    
    segments.forEach((segment) => {
      const anglePercent = (segment.value / total) * 100;
      gradientStops.push(`${segment.color} ${currentAngle}% ${currentAngle + anglePercent}%`);
      currentAngle += anglePercent;
    });
    
    const conicGradient = `conic-gradient(${gradientStops.join(', ')})`;
    
    return (
      <View style={[styles.container, { width: size, height: size }]}>
        <View
          style={[
            styles.pieChart,
            {
              width: size,
              height: size,
              background: conicGradient,
            }
          ]}
        >
          <View style={styles.innerCircle} />
        </View>
        
        {/* Remover labels internos - apenas manter o gráfico limpo */}
      </View>
    );
  }

  // Para mobile, usar View com bordas (implementação simplificada)
  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.mobilePieChart, { width: size, height: size }]}>
        {/* Renderização simplificada para mobile */}
        <View style={[styles.innerCircle, { width: size * 0.6, height: size * 0.6 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pieChart: {
    borderRadius: 9999,
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircle: {
    position: 'absolute',
    width: '45%',
    height: '45%',
    borderRadius: 9999,
    backgroundColor: 'white',
    top: '27.5%',
    left: '27.5%',
  },
  label: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
    textAlign: 'center',
    ...(Platform.OS === 'web' ? {
      textShadow: '1px 1px 2px rgba(0, 0, 0, 0.8)',
    } : {}),
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 4,
    width: 30,
    height: 20,
  },
  // Estilos para mobile (implementação simplificada)
  mobilePieChart: {
    borderRadius: 9999,
    backgroundColor: '#f0f0f0',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileSegment: {
    opacity: 0.8,
  },
  mobileLabelsContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mobileCenterLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
});

export default SimplePieChart;
