import React from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HistoryViewer from '../components/HistoryViewer';
import { COLORS } from '../styles/globalStyles';

const HistoryScreen = ({ navigation, route }) => {
  const { filterByTool } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <HistoryViewer filterByTool={filterByTool} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background || '#f5f5f5',
  },
});

export default HistoryScreen;
