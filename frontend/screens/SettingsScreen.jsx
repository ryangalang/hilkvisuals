import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SettingsScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchDarkModeSetting = async () => {
      try {
        const storedDarkMode = await AsyncStorage.getItem('isDarkMode');
        if (storedDarkMode !== null) {
          setIsDarkMode(JSON.parse(storedDarkMode));
        }
      } catch (e) {
        console.warn('Failed to load dark mode setting.');
      }
    };

    fetchDarkModeSetting();
  }, []);

  const toggleDarkMode = async () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    try {
      await AsyncStorage.setItem('isDarkMode', JSON.stringify(newDarkMode));
    } catch (e) {
      console.warn('Failed to save dark mode setting.');
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
      navigation.replace('Login');
    } catch (e) {
      console.warn('Failed to clear async storage.');
    }
  };

  const backgroundColor = isDarkMode ? '#121212' : '#ffffff';
  const textColor = isDarkMode ? '#ffffff' : '#000000';
  const cardColor = isDarkMode ? '#1e1e1e' : '#f0f0f0';

  return (
    <ScrollView style={[styles.scroll, { backgroundColor }]}>
      <View style={styles.container}>
        <Text style={[styles.header, { color: textColor }]}>Settings</Text>

        <TouchableOpacity style={[styles.option, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionText, { color: textColor }]}>Profile Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionText, { color: textColor }]}>Notifications</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.option, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionText, { color: textColor }]}>Privacy & Security</Text>
        </TouchableOpacity>

        <View style={[styles.option, { backgroundColor: cardColor }]}>
          <Text style={[styles.optionText, { color: textColor }]}>Dark Mode</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            thumbColor={isDarkMode ? '#888' : '#fff'}
            trackColor={{ false: '#ccc', true: '#666' }}
          />
        </View>

        <TouchableOpacity style={[styles.option, { backgroundColor: cardColor }]} onPress={handleLogout}>
          <Text style={[styles.optionText, { color: 'red' }]}>Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  optionText: {
    fontSize: 16,
  },
});
