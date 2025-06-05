import { Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * 🌐 Web-Safe Storage Wrapper
 * Evita travamentos do AsyncStorage no ambiente web
 */
class WebSafeStorage {
  static async getItem(key) {
    try {
      if (Platform.OS === 'web') {
        // Para web, usa localStorage ou retorna null
        return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
      }
      return await AsyncStorage.getItem(key);
    } catch (error) {
      console.log(`⚠️ WebSafeStorage.getItem(${key}) failed:`, error);
      return null;
    }
  }

  static async setItem(key, value) {
    try {
      if (Platform.OS === 'web') {
        // Para web, usa localStorage ou ignora
        if (typeof localStorage !== 'undefined') {
          localStorage.setItem(key, value);
        }
        return;
      }
      await AsyncStorage.setItem(key, value);
    } catch (error) {
      console.log(`⚠️ WebSafeStorage.setItem(${key}) failed:`, error);
    }
  }

  static async removeItem(key) {
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          localStorage.removeItem(key);
        }
        return;
      }
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(`⚠️ WebSafeStorage.removeItem(${key}) failed:`, error);
    }
  }

  static async getAllKeys() {
    try {
      if (Platform.OS === 'web') {
        if (typeof localStorage !== 'undefined') {
          return Object.keys(localStorage);
        }
        return [];
      }
      return await AsyncStorage.getAllKeys();
    } catch (error) {
      console.log('⚠️ WebSafeStorage.getAllKeys() failed:', error);
      return [];
    }
  }
}

export default WebSafeStorage;
