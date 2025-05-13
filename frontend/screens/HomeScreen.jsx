import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Hilk Visuals</Text>
      </View>

      {/* Main Feed Section */}
      <ScrollView contentContainerStyle={styles.feedContainer}>
        {/* Example Post 1 */}
        <View style={styles.post}>
          <Image
            source={{ uri: 'https://your-image-url-here.com/photo1.jpg' }}
            style={styles.postImage}
          />
          <Text style={styles.postTitle}>Nature Photography</Text>
          <Text style={styles.postDescription}>Capturing the serene beauty of nature.</Text>
        </View>

        {/* Example Post 2 */}
        <View style={styles.post}>
          <Image
            source={{ uri: 'https://your-image-url-here.com/photo2.jpg' }}
            style={styles.postImage}
          />
          <Text style={styles.postTitle}>Portrait Photography</Text>
          <Text style={styles.postDescription}>A stunning portrait of an artist in the studio.</Text>
        </View>

        {/* Example Post 3 */}
        <View style={styles.post}>
          <Image
            source={{ uri: 'https://your-image-url-here.com/photo3.jpg' }}
            style={styles.postImage}
          />
          <Text style={styles.postTitle}>Urban Street Photography</Text>
          <Text style={styles.postDescription}>The vibrancy of city life captured in black and white.</Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for dark theme
  },
  header: {
    height: 70,
    backgroundColor: '#1a1a1a', // Dark header background
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: '#444', // Subtle border color
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  headerText: {
    fontSize: 28,
    color: '#fff', // White text for contrast
    fontWeight: '600',
  },
  feedContainer: {
    paddingHorizontal: 15,
    paddingTop: 20,
    paddingBottom: 10,
  },
  post: {
    marginBottom: 20,
    backgroundColor: '#1e1e1e', // Dark background for posts
    borderRadius: 12,
    overflow: 'hidden',
    padding: 15,
    borderWidth: 1,
    borderColor: '#333', // Subtle border color for dark theme
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  postImage: {
    width: '100%',
    height: 200,
    borderRadius: 12,
  },
  postTitle: {
    color: '#fff', // White text for post titles
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  postDescription: {
    color: '#ccc', // Lighter gray for description
    fontSize: 14,
    marginTop: 5,
  },
});
