import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LogoutScreen from './LogoutScreen';
import JounisScreen from './JounisScreen';

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator initialRouteName="Home" tabBarOptions={{activeTintColor: '#e91e63',}}>
      <Tab.Screen name="Home" component={JounisScreen} options={{tabBarLabel: 'Home',tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="image" color={color} size={size} />),}}/>
      <Tab.Screen name="Logout"component={LogoutScreen} options={{tabBarLabel: 'Logout',tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="logout" color={color} size={size} />),}}/>
    </Tab.Navigator>
  );
}

export default MyTabs;