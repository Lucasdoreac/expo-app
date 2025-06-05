import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { useLegacyColors } from '../contexts/ThemeContext';
import RealTimeRates from '../components/RealTimeRates';
import SimpleDarkModeToggle from '../components/SimpleDarkModeToggle';

const HomeScreenSimple = ({ navigation }) => {
  const COLORS = useLegacyColors(); // Hook dinâmico para cores
  
  const chapters = [
    { id: 1, title: 'Importância de Investir aos Poucos', icon: '💰', screen: 'Chapter1' },
    { id: 2, title: 'Ativos Financeiros + Triângulo Impossível', icon: '📊', screen: 'Chapter2' },
    { id: 3, title: 'Perfil de Investidor', icon: '👤', screen: 'Chapter3' },
    { id: 4, title: 'Renda Fixa', icon: '📈', screen: 'Chapter4' },
    { id: 5, title: 'Renda Variável', icon: '📉', screen: 'Chapter5' },
    { id: 6, title: 'Fundos + 20 Dicas Práticas', icon: '🎯', screen: 'Chapter6' },
    { id: 7, title: '🎓 Módulo 1: Impostos e Tributação', icon: '💼', screen: 'Chapter7' },
    { id: 8, title: '🎓 Módulo 2: Estratégias Práticas', icon: '🛠️', screen: 'Chapter8' },
    { id: 9, title: '🎓 Módulo 3: Ferramentas Avançadas', icon: '⚡', screen: 'Chapter9' },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.background }}>
      {/* Header */}
      <View style={{ 
        backgroundColor: COLORS.primaryDark, 
        padding: 20, 
        paddingTop: 50 
      }}>
        <Text style={{ 
          fontSize: 24, 
          fontWeight: 'bold', 
          color: 'white',
          textAlign: 'center' 
        }}>
          📚 Investindo com Sabedoria
        </Text>
        <Text style={{ 
          fontSize: 16, 
          color: 'white', 
          textAlign: 'center',
          marginTop: 5
        }}>
          por Luciana Araújo
        </Text>
      </View>

      {/* Lista de Capítulos */}
      <ScrollView style={{ flex: 1, padding: 15 }}>
        {/* Taxas em Tempo Real */}
        <RealTimeRates style={{ marginBottom: 20 }} />
        
        {/* Dark Mode Toggle */}
        <SimpleDarkModeToggle style={{ marginBottom: 20 }} />
        
        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          marginBottom: 15,
          color: COLORS.text // Cor dinâmica para acessibilidade
        }}>
          📖 Livro Base (6 capítulos)
        </Text>
        
        {chapters.slice(0, 6).map((chapter) => (
          <TouchableOpacity
            key={chapter.id}
            style={{
              backgroundColor: COLORS.cardBackground || COLORS.surface,
              padding: 20,
              marginBottom: 10,
              borderRadius: 10,
              shadowColor: COLORS.shadow || '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => navigation.navigate(chapter.screen)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 32, marginRight: 15 }}>{chapter.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 18, 
                  fontWeight: 'bold',
                  color: COLORS.text // Cor dinâmica para acessibilidade
                }}>
                  Cap. {chapter.id}
                </Text>
                <Text style={{ 
                  fontSize: 16, 
                  color: COLORS.textSecondary, // Cor dinâmica para acessibilidade
                  marginTop: 2 
                }}>
                  {chapter.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}

        <Text style={{ 
          fontSize: 18, 
          fontWeight: 'bold', 
          marginTop: 20,
          marginBottom: 15,
          color: COLORS.text // Cor dinâmica para acessibilidade
        }}>
          🎓 Módulos Extras
        </Text>
        
        {chapters.slice(6).map((chapter) => (
          <TouchableOpacity
            key={chapter.id}
            style={{
              backgroundColor: COLORS.cardBackground || COLORS.surface,
              padding: 20,
              marginBottom: 10,
              borderRadius: 10,
              borderLeftWidth: 4,
              borderLeftColor: COLORS.accent,
              shadowColor: COLORS.shadow || '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 4,
              elevation: 3,
            }}
            onPress={() => navigation.navigate(chapter.screen)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontSize: 32, marginRight: 15 }}>{chapter.icon}</Text>
              <View style={{ flex: 1 }}>
                <Text style={{ 
                  fontSize: 16, 
                  color: COLORS.textSecondary, // 🔧 CORREÇÃO: Cor dinâmica para modo escuro
                  marginTop: 2 
                }}>
                  {chapter.title}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
        
        {/* Histórico de Relatórios */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.accent,
            padding: 20,
            marginTop: 20,
            marginBottom: 30,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={() => navigation.navigate('History')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginRight: 15 }}>📊</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold',
                color: 'white' 
              }}>
                Histórico de Ferramentas
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: 'white',
                opacity: 0.9,
                marginTop: 2 
              }}>
                Acesse o histórico de todas as suas atividades
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Botão Notificações */}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.accent,
            padding: 20,
            marginHorizontal: 20,
            marginBottom: 30,
            borderRadius: 10,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
          onPress={() => navigation.navigate('Notifications')}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 32, marginRight: 15 }}>🔔</Text>
            <View style={{ flex: 1 }}>
              <Text style={{ 
                fontSize: 18, 
                fontWeight: 'bold',
                color: 'white' 
              }}>
                Configurar Notificações
              </Text>
              <Text style={{ 
                fontSize: 14, 
                color: 'white',
                opacity: 0.9,
                marginTop: 2 
              }}>
                Personalize seus lembretes e notificações
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomeScreenSimple;
