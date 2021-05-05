import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Register } from "../screens/Register";
import { Login } from "../screens/Login";
 
//create a stack
const Stack = createStackNavigator();
export const AuthStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};