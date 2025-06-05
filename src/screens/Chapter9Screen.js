// 🚨 DEBUG: Chapter9Screen carregando...
console.log("🚀 DEBUG: Chapter9Screen sendo importado");
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  StyleSheet
} from 'react-native';
import PersonalGoalsTracker from '../components/PersonalGoalsTracker';
import PortfolioTracker from '../components/PortfolioTracker';
import ReportGenerator from '../components/ReportGenerator';
import PremiumIntegration from '../components/PremiumIntegration';
import { useTheme } from '../contexts/ThemeContext';

const { width } = Dimensions.get('window');

const Chapter9Screen = ({ navigation }) => {
  console.log('🚀 Chapter9Screen carregado!', new Date().toISOString());
  const { colors } = useTheme();
  
  // 🎨 Estilos dinâmicos baseados no tema
  const dynamicStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    text: {
      color: colors.text,
    },
    button: {
      backgroundColor: colors.primary,
    },
    buttonText: {
      color: colors.buttonText,
    },
  });
  
  const [activeComponent, setActiveComponent] = useState('overview');
  const [userData, setUserData] = useState({
    goals: [],
    investments: [],
    preferences: {}
  });

  const components = [
    {
      id: 'overview',
      title: '📊 Visão Geral',
      description: 'Resumo das ferramentas avançadas',
      icon: '🏠'
    },
    {
      id: 'goals',
      title: '🎯 Metas Pessoais',
      description: 'Sistema avançado de metas financeiras',
      icon: '🎯'
    },
    {
      id: 'portfolio',
      title: '💼 Carteira',
      description: 'Acompanhamento de investimentos',
      icon: '💼'
    },
    {
      id: 'reports',
      title: '📋 Relatórios',
      description: 'Gerador de relatórios personalizados',
      icon: '📋'
    },
    {
      id: 'premium',
      title: '⭐ Hub Premium',
      description: 'Integração com plataforma premium',
      icon: '⭐'
    }
  ];

  const handleDataSync = (newData) => {
    setUserData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  const renderNavigation = () => (
    <View style={[styles.card, { marginBottom: 20 }]}>
      {/* Navegação com ScrollView horizontal para mobile */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 10 }}
      >
        {components.map((comp, index) => (
          <TouchableOpacity
            key={comp.id}
            style={[
              {
                paddingHorizontal: 15,
                paddingVertical: 10,
                marginRight: 10,
                borderRadius: 25,
                backgroundColor: activeComponent === comp.id ? '#4ECDC4' : '#F8F9FA',
                borderWidth: 1,
                borderColor: activeComponent === comp.id ? '#4ECDC4' : '#E9ECEF',
                minWidth: 90,
                alignItems: 'center',
                justifyContent: 'center'
              }
            ]}
            onPress={() => setActiveComponent(comp.id)}
          >
            <Text style={{ 
              fontSize: 16, 
              marginBottom: 2 
            }}>
              {comp.icon}
            </Text>
            <Text style={{
              fontSize: 9,
              fontWeight: 'bold',
              textAlign: 'center',
              color: activeComponent === comp.id ? colors.buttonText : colors.text,
              numberOfLines: 1
            }}>
              {comp.title.replace(/[🎯💼📋⭐📊]/g, '').trim()}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderOverview = () => (
    <View>
      <Text style={styles.title}>🚀 Ferramentas Avançadas</Text>
      <Text style={styles.subtitle}>
        Fase 3 - Calculadoras e funcionalidades premium para gestão financeira completa
      </Text>

      {/* Estatísticas Gerais */}
      <View style={[styles.card, { marginBottom: 20, backgroundColor: '#F8F9FA' }]}>
        <Text style={[styles.cardTitle, { textAlign: 'center', marginBottom: 15 }]}>
          📊 Resumo das Suas Finanças
        </Text>
        
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 15 }}>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#4ECDC4' }}>
              {userData.goals?.length || 0}
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Metas</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#54A0FF' }}>
              {userData.investments?.length || 0}
            </Text>
            <Text style={{ color: colors.textSecondary, fontSize: 12 }}>Investimentos</Text>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#FF6B6B' }}>
              {userData.reports?.length || 0}
            </Text>
            <Text style={{ color: COLORS.textSecondary, fontSize: 12 }}>Relatórios</Text>
          </View>
        </View>
      </View>

      {/* Menu de Ferramentas */}
      <Text style={[styles.cardTitle, { marginBottom: 15 }]}>🛠️ Suas Ferramentas:</Text>
      
      {components.slice(1).map((comp) => (
        <TouchableOpacity
          key={comp.id}
          style={[styles.card, { 
            marginBottom: 15,
            flexDirection: 'row',
            alignItems: 'center',
            borderLeftWidth: 4,
            borderLeftColor: comp.id === 'goals' ? '#4ECDC4' : 
                            comp.id === 'portfolio' ? '#54A0FF' :
                            comp.id === 'reports' ? '#FF9FF3' : '#FF6B6B'
          }]}
          onPress={() => setActiveComponent(comp.id)}
        >
          <Text style={{ fontSize: 40, marginRight: 15 }}>{comp.icon}</Text>
          <View style={{ flex: 1 }}>
            <Text style={[styles.cardTitle, { marginBottom: 5 }]}>
              {comp.title}
            </Text>
            <Text style={{ color: colors.textSecondary, lineHeight: 18 }}>
              {comp.description}
            </Text>
          </View>
          <Text style={{ fontSize: 20, color: '#4ECDC4' }}>▶️</Text>
        </TouchableOpacity>
      ))}

      {/* Dicas de Uso */}
      <View style={[styles.card, { backgroundColor: '#E8F4FD', marginBottom: 20 }]}>
        <Text style={[styles.cardTitle, { color: '#2C5282', marginBottom: 15 }]}>
          💡 Como Aproveitar ao Máximo:
        </Text>
        <Text style={{ color: '#2C5282', lineHeight: 22 }}>
          <Text style={{ fontWeight: 'bold' }}>1. Comece pelas Metas:</Text> Defina seus objetivos financeiros claros{'\n\n'}
          
          <Text style={{ fontWeight: 'bold' }}>2. Organize sua Carteira:</Text> Cadastre todos os seus investimentos{'\n\n'}
          
          <Text style={{ fontWeight: 'bold' }}>3. Gere Relatórios:</Text> Acompanhe seu progresso mensalmente{'\n\n'}
          
          <Text style={{ fontWeight: 'bold' }}>4. Conecte ao Premium:</Text> Acesse funcionalidades avançadas
        </Text>
      </View>

      {/* Conquistas */}
      <View style={[styles.card, { backgroundColor: '#FFF3CD' }]}>
        <Text style={[styles.cardTitle, { color: '#856404', marginBottom: 15 }]}>
          🏆 Suas Conquistas
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <View style={{ 
            backgroundColor: '#FFC107', 
            paddingHorizontal: 12, 
            paddingVertical: 6, 
            borderRadius: 15, 
            margin: 5 
          }}>
            <Text style={{ color: colors.buttonText, fontWeight: 'bold', fontSize: 12 }}>
              🎓 Chegou na Fase 3
            </Text>
          </View>
          {userData.goals?.length > 0 && (
            <View style={{ 
              backgroundColor: '#4ECDC4', 
              paddingHorizontal: 12, 
              paddingVertical: 6, 
              borderRadius: 15, 
              margin: 5 
            }}>
              <Text style={{ color: colors.buttonText, fontWeight: 'bold', fontSize: 12 }}>
                🎯 Primeira Meta
              </Text>
            </View>
          )}
          {userData.investments?.length > 0 && (
            <View style={{ 
              backgroundColor: '#54A0FF', 
              paddingHorizontal: 12, 
              paddingVertical: 6, 
              borderRadius: 15, 
              margin: 5 
            }}>
              <Text style={{ color: colors.buttonText, fontWeight: 'bold', fontSize: 12 }}>
                💼 Primeiro Investimento
              </Text>
            </View>
          )}
        </View>
      </View>
    </View>
  );

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case 'overview':
        return renderOverview();
      case 'goals':
        return <PersonalGoalsTracker />;
      case 'portfolio':
        return <PortfolioTracker />;
      case 'reports':
        return (
          <View>
            {/* Botão para Histórico de Relatórios */}
            <TouchableOpacity
              onPress={() => navigation.navigate('ReportsHistory')}
              style={{
                backgroundColor: '#9B59B6',
                padding: 15,
                borderRadius: 10,
                marginBottom: 20,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: colors.buttonText, fontSize: 18, fontWeight: 'bold', marginRight: 10 }}>
                📊 Ver Histórico de Relatórios
              </Text>
              <Text style={{ color: colors.buttonText, fontSize: 16 }}>→</Text>
            </TouchableOpacity>
            
            <ReportGenerator goals={userData.goals} investments={userData.investments} />
          </View>
        );
      case 'premium':
        return <PremiumIntegration userData={userData} onSync={handleDataSync} />;
      default:
        return renderOverview();
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={{ 
        flexDirection: 'row', 
        alignItems: 'center', 
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10
      }}>
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
          style={{ marginRight: 15 }}
        >
          <Text style={{ fontSize: 24 }}>⬅️</Text>
        </TouchableOpacity>
        <View style={{ flex: 1 }}>
          <Text style={{ 
            fontSize: 18, 
            fontWeight: 'bold',
            color: colors.text
          }}>
            Capítulo 9 - Ferramentas Avançadas
          </Text>
          <Text style={{ 
            fontSize: 12, 
            color: colors.textSecondary 
          }}>
            Fase 3 • Calculadoras Premium
          </Text>
        </View>
      </View>

      {/* Navigation */}
      <View style={{ paddingHorizontal: 20 }}>
        {renderNavigation()}
      </View>

      {/* Content */}
      <ScrollView 
        style={{ flex: 1, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}
      >
        {renderActiveComponent()}
      </ScrollView>
    </View>
  );
};

export default Chapter9Screen;