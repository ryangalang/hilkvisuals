import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary } from 'react-native-image-picker'; // For image picker

export default function ProfileScreen({ navigation }) {
  const [userName, setUserName] = useState(null);
  const [loading, setLoading] = useState(true);
  const [profilePic, setProfilePic] = useState(null);  // To hold the selected image

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const storedUserName = await AsyncStorage.getItem('userName');
        const storedProfilePic = await AsyncStorage.getItem('profilePic');  // Retrieve profilePic from AsyncStorage
        if (storedUserName) {
          setUserName(storedUserName);
        } else {
          setUserName('Guest');
        }
        if (storedProfilePic) {
          setProfilePic(storedProfilePic); // Set stored profile picture
        }
      } catch (e) {
        console.warn('Failed to load user data');
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userName');
      await AsyncStorage.removeItem('profilePic');  // Remove profilePic from AsyncStorage
    } catch (e) {
      console.warn('Failed to clear async storage.');
    } finally {
      navigation.replace('Login');
    }
  };

  // Handle image picking
  const pickImage = () => {
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response) => {
      if (response.assets && response.assets.length > 0) {
        setProfilePic(response.assets[0].uri); // Set selected image URI
        AsyncStorage.setItem('profilePic', response.assets[0].uri); // Save the profile picture URI to AsyncStorage
      }
    });
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {/* Profile Picture */}
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={profilePic ? { uri: profilePic } : { uri: 'https://www.example.com/default-avatar.jpg' }}  // Default profile picture or selected one
            style={styles.profilePicture}
          />
        </TouchableOpacity>

        <Text style={styles.text}>Ryan {userName}</Text>
        <Text style={styles.detailsText}>Email: ryang@gmail.com</Text>

        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>Logout</Text>
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
  profileContainer: {
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicture: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderWidth: 3,
    borderColor: '#00f0ff',  // Neon Blue Border
  },
  text: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  detailsText: {
    color: '#ccc',
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00f0ff',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#0a0a0a',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
