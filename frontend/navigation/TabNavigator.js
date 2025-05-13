import React from 'react';
import { Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import BookingScreen from '../screens/BookingScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ProfileScreen from '../screens/ProfileScreen';

// Custom icons
import HomeIcon from '../assets/icons/home.png';
import SearchIcon from '../assets/icons/search.png';
import BookingIcon from '../assets/icons/booking.png';
import SettingsIcon from '../assets/icons/settings.png';
import ProfileIcon from '../assets/icons/profile1.png';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let icon;

          switch (route.name) {
            case 'Home':
              icon = HomeIcon;
              break;
            case 'Search':
              icon = SearchIcon;
              break;
            case 'Booking':
              icon = BookingIcon;
              break;
            case 'Settings':
              icon = SettingsIcon;
              break;
            case 'Profile':
              icon = ProfileIcon;
              break;
            default:
              icon = HomeIcon;
          }

          return (
            <Image
              source={icon}
              style={{
                width: 24,
                height: 24,
                tintColor: focused ? '#00f0ff' : 'gray', // neon effect
              }}
              resizeMode="contain"
            />
          );
        },
        tabBarStyle: {
          backgroundColor: '#000',
          borderTopColor: '#00f0ff',
        },
        tabBarActiveTintColor: '#00f0ff',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Search" component={SearchScreen} />
      <Tab.Screen name="Booking" component={BookingScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}