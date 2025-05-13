import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';

const BookingScreen = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');

  const handleBooking = () => {
    // For now just log, you can later send to server
    console.log({
      name,
      phone,
      email,
      date,
      time,
      location,
      type,
      notes,
    });
    alert('Booking request sent!');
  };

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <Text style={styles.title}>Book a Photography Session</Text>

        <TextInput
          placeholder="Full Name"
          placeholderTextColor="#999"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        <TextInput
          placeholder="Phone Number"
          placeholderTextColor="#999"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />
        <TextInput
          placeholder="Email Address"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          style={styles.input}
        />
        <TextInput
          placeholder="Booking Date (YYYY-MM-DD)"
          placeholderTextColor="#999"
          value={date}
          onChangeText={setDate}
          style={styles.input}
        />
        <TextInput
          placeholder="Time (e.g., 2:00 PM)"
          placeholderTextColor="#999"
          value={time}
          onChangeText={setTime}
          style={styles.input}
        />
        <TextInput
          placeholder="Location / Address"
          placeholderTextColor="#999"
          value={location}
          onChangeText={setLocation}
          style={styles.input}
        />
        <TextInput
          placeholder="Type of Photography (Wedding, Portrait, etc.)"
          placeholderTextColor="#999"
          value={type}
          onChangeText={setType}
          style={styles.input}
        />
        <TextInput
          placeholder="Special Instructions (optional)"
          placeholderTextColor="#999"
          value={notes}
          onChangeText={setNotes}
          multiline
          style={[styles.input, { height: 80 }]}
        />

        <TouchableOpacity onPress={handleBooking} style={styles.button}>
          <Text style={styles.buttonText}>Submit Booking</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default BookingScreen;

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
    backgroundColor: '#0a0a0a',
  },
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 22,
    color: '#fff',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#1a1a1a',
    color: '#fff',
    borderWidth: 1,
    borderColor: '#333',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#00f0ff',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
