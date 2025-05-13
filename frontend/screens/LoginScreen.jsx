import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message'; // ✅ Import toast

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://192.168.0.17:3000/api/login', { email, password });
      setSuccessMessage(res.data.message);

      await AsyncStorage.setItem('userName', res.data.user.name);

      Toast.show({
        type: 'success',
        text1: 'Login Successful',
        text2: res.data.message,
      });

      setTimeout(() => {
        navigation.replace('Main');
      }, 1500);
    } catch (err) {
      Toast.show({
        type: 'error',
        text1: 'Login Failed',
        text2: err.response?.data?.message || 'Please try again.',
      });
      setSuccessMessage('');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Hilk Visuals</Text>

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          style={[
            styles.input,
            focusedField === 'email' && styles.focusedInput,
          ]}
        />

        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
          style={[
            styles.input,
            focusedField === 'password' && styles.focusedInput,
          ]}
        />

        <TouchableOpacity
          onPress={handleLogin}
          style={[styles.button, loading && styles.buttonDisabled]}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Logging In...' : 'Login'}
          </Text>
        </TouchableOpacity>

        {successMessage !== '' && (
          <Text style={styles.successText}>{successMessage}</Text>
        )}

        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.linkText}>
            Don't have an account?{' '}
            <Text style={styles.underline}>Sign Up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: '90%',
    backgroundColor: '#111',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1.5,
    borderColor: '#00f0ff',
    shadowColor: '#00f0ff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.9,
    shadowRadius: 10,
    elevation: 10,
  },
  title: {
    fontSize: 28,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 20,
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
    borderWidth: 1,
    borderColor: '#00f0ff99',
    marginBottom: 15,
  },
  focusedInput: {
    borderColor: '#00f0ff',
  },
  button: {
    backgroundColor: '#00f0ff',
    paddingVertical: 14,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 15,
  },
  buttonDisabled: {
    backgroundColor: '#00a3cc',
  },
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
  },
  successText: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  linkText: {
    color: '#ccc',
    textAlign: 'center',
    marginTop: 10,
  },
  underline: {
    color: '#00f0ff',
    textDecorationLine: 'underline',
  },
});
