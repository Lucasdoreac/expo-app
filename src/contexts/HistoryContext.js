import React, { createContext, useContext, useState, useCallback } from 'react';

// Context para gerenciar histórico de todas as ferramentas
const HistoryContext = createContext();

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) {
    throw new Error('useHistory deve ser usado dentro de HistoryProvider');
  }
  return context;
};

export const HistoryProvider = ({ children }) => {
  const [history, setHistory] = useState([]);

  // Adicionar item ao histórico
  const addToHistory = useCallback((data) => {
    const historyItem = {
      id: Date.now() + Math.random(),
      timestamp: new Date().toISOString(),
      ...data
    };
    
    setHistory(prev => [historyItem, ...prev].slice(0, 100)); // Manter apenas 100 itens
    return historyItem.id;
  }, []);

  // Remover item do histórico
  const removeFromHistory = useCallback((id) => {
    setHistory(prev => prev.filter(item => item.id !== id));
  }, []);

  // Limpar histórico
  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  // Obter histórico por tipo de ferramenta
  const getHistoryByType = useCallback((toolType) => {
    return history.filter(item => item.toolType === toolType);
  }, [history]);

  // Exportar dados como JSON
  const exportToJSON = useCallback((items = history) => {
    const dataStr = JSON.stringify(items, null, 2);
    return dataStr;
  }, [history]);

  // Exportar como CSV
  const exportToCSV = useCallback((items = history) => {
    if (items.length === 0) return '';
    
    const headers = ['Data/Hora', 'Ferramenta', 'Descrição', 'Valores'];
    const csvContent = [
      headers.join(','),
      ...items.map(item => [
        item.timestamp,
        item.toolType,
        item.description || '',
        JSON.stringify(item.data).replace(/,/g, ';')
      ].map(field => `"${field}"`).join(','))
    ].join('\n');
    
    return csvContent;
  }, [history]);

  // Copiar para clipboard  
  const copyToClipboard = useCallback(async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      const success = document.execCommand('copy');
      document.body.removeChild(textArea);
      return success;
    }
  }, []);

  const value = {
    history,
    addToHistory,
    removeFromHistory,
    clearHistory,
    getHistoryByType,
    exportToJSON,
    exportToCSV,
    copyToClipboard,
  };

  return (
    <HistoryContext.Provider value={value}>
      {children}
    </HistoryContext.Provider>
  );
};
