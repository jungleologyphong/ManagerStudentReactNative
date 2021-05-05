import React from 'react';
import { Provider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { theme } from './src/core/theme';
import {StartScreen,LoginScreen,RegisterScreen,ForgotPasswordScreen,LogoutScreen,JounisScreen,MainScreen,AboutScreen,WikipediaScreen,BookScreen} from './src/screens';
import { createDrawerNavigator } from '@react-navigation/drawer';
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://10.82.131.126:3000";
const socket = socketIOClient(ENDPOINT);

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

const App = () => {
  socket.emit("join", "AppClient: EMIT FROM CLIENT ON ENDPOINT:"+ENDPOINT);
  return (
    <Provider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="StartScreen" screenOptions={{headerShown: false,}}>
          <Stack.Screen name="StartScreen" component={StartScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
          <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen}/>
          <Stack.Screen name="MainScreen" component={DrawerNavigator}/>
          <Stack.Screen name="LogoutScreen" component={LogoutScreen}/>
          <Stack.Screen name="JounisScreen" component={JounisScreen}/>
          <Stack.Screen name="AboutScreen" component={AboutScreen}/>
          <Stack.Screen name="WikipediaScreen" component={WikipediaScreen}/>
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const DrawerNavigator = () =>{
  return(
    <Drawer.Navigator> 
      <Drawer.Screen name="MainScreen" component={MainScreen} options={{ title: 'International' }}/>
      <Drawer.Screen name="AboutScreen" component={AboutScreen} options={{ title: 'About' }}/>         
    </Drawer.Navigator>
  );
}

export default App;
