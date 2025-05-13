import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, Picker } from 'react-native';

const SearchScreen = () => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    // Simulated search results based on query and category
    const mockResults = [
      { id: '1', title: 'Nature Photography', description: 'Capturing the beauty of nature in photos' },
      { id: '2', title: 'Portrait Photography', description: 'Stunning portraits of individuals and groups' },
      { id: '3', title: 'Photography Tutorials', description: 'Learn how to master photography techniques' },
    ];

    // Filter by selected category (mock example)
    const filteredResults = mockResults.filter(item => 
      item.title.toLowerCase().includes(query.toLowerCase()) &&
      (selectedCategory === 'all' || item.title.toLowerCase().includes(selectedCategory))
    );

    setResults(filteredResults);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photography Search</Text>

      <TextInput
        style={styles.searchBar}
        placeholder="Search for photos, photographers, or articles"
        placeholderTextColor="#bbb" // Updated placeholder color
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={handleSearch}
      />

      <Picker
        selectedValue={selectedCategory}
        onValueChange={itemValue => setSelectedCategory(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="All Categories" value="all" />
        <Picker.Item label="Portrait Photography" value="portrait" />
        <Picker.Item label="Landscape Photography" value="landscape" />
        <Picker.Item label="Street Photography" value="street" />
        <Picker.Item label="Photography Tutorials" value="tutorials" />
      </Picker>

      <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search</Text>
      </TouchableOpacity>

      <FlatList
        data={results}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.resultItem}>
            <Text style={styles.resultTitle}>{item.title}</Text>
            <Text style={styles.resultDescription}>{item.description}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No results found</Text>}
      />
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0a0a',
    padding: 20,
  },
  title: {
    color: '#fff', // Neutral white for title
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  searchBar: {
    backgroundColor: '#222',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    color: '#fff',
    width: '100%',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444', // Subtle border color
  },
  picker: {
    height: 50,
    width: '100%',
    backgroundColor: '#222',
    color: '#fff',
    borderRadius: 10,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#444', // Subtle border color
  },
  searchButton: {
    backgroundColor: '#00f0ff', // Neon color for button
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 30,
    width: '100%',
    borderWidth: 1,
    borderColor: '#00f0ff', // Neon border effect
    shadowColor: '#00f0ff', // Neon shadow effect
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  searchButtonText: {
    color: '#000', // Black text for the button
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultItem: {
    backgroundColor: '#222',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#444', // Subtle border color
  },
  resultTitle: {
    color: '#fff', // White text for title
    fontSize: 18,
    fontWeight: 'bold',
  },
  resultDescription: {
    color: '#bbb', // Lighter gray for description
    fontSize: 14,
    marginTop: 5,
  },
  emptyText: {
    color: '#fff', // White text for empty results
    textAlign: 'center',
    marginTop: 20,
  },
});
