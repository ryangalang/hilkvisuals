
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function SignupScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedField, setFocusedField] = useState(null);

  const handleSignup = async () => {
    try {
      // Send the signup request to the backend
      const res = await axios.post('http://192.168.0.17:3000/api/signup', { username, email, password });

      
      console.log('Response:', res.data);

     
      if (res.data.message === 'User created successfully') {
        
        await AsyncStorage.setItem('userName', res.data.user.username);

        
        Toast.show({
          type: 'success',
          text1: 'Signup Successful!',
          text2: 'You have successfully signed up. Please login to continue.',
        });

        setTimeout(() => {
          navigation.navigate('Login'); 
        }, 2000);
      } else {
        throw new Error(res.data.message || 'Signup failed');
      }
    } catch (err) {
      
      console.error('Signup error:', err);

      
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: err.response?.data?.message || 'There was an issue during signup. Please try again.',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Hilk Visuals</Text>

        <TextInput
          placeholder="Enter your username"
          placeholderTextColor="#ccc"
          value={username}
          onChangeText={setUsername}
          onFocus={() => setFocusedField('username')}
          onBlur={() => setFocusedField(null)}
          style={[styles.input, focusedField === 'username' && styles.focusedInput]}
        />

        <TextInput
          placeholder="Enter your email"
          placeholderTextColor="#ccc"
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
          style={[styles.input, focusedField === 'email' && styles.focusedInput]}
        />

        <TextInput
          placeholder="Enter your password"
          placeholderTextColor="#ccc"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          onFocus={() => setFocusedField('password')}
          onBlur={() => setFocusedField(null)}
          style={[styles.input, focusedField === 'password' && styles.focusedInput]}
        />

        <TouchableOpacity onPress={handleSignup} style={styles.button}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.linkText}>
            Already have an account? <Text style={styles.underline}>Login</Text>
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
  buttonText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
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
