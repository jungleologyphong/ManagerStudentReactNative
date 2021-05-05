import React, {useContext} from "react";
import {Button,Image,View,Text,StyleSheet} from 'react-native'
import { createStackNavigator } from "@react-navigation/stack";
import { Home } from "../screens/Home";
import { Detail } from "../screens/Detail";
import { AuthContext } from "../navigation/AuthProvider";


function LogoTitle() {
    const { user } = useContext(AuthContext);
    return (
        <View style={styles.container}>
            
            <Image
                style={{ width: 30, height: 30 }}
                source={{uri: 'https://reactjs.org/logo-og.png'}}
            />
            <Text style={styles.text}>Hi {user.username}!</Text>

        </View>
      
    );
  }
//create a stack

const Stack = createStackNavigator();
export const AppStack = () => {
    const { logout } = useContext(AuthContext);
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={Home} options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => logout()}
                title="Logout"
                color="#00cc00"
              />
              
            ),
          }}/>
      <Stack.Screen name="Detail" component={Detail} options={{
            headerTitle: props => <LogoTitle {...props} />,
            headerRight: () => (
              <Button
                onPress={() => logout()}
                title="Logout"
                color="#00cc00"
              />
            ),
          }}/>
    </Stack.Navigator>
  );
};
const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'row',
        
    },
    text: {
        fontSize: 20,
        color: "green",
      },
    })