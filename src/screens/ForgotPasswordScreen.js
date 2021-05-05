import React, { useState } from 'react'
import { View, StyleSheet, Text} from 'react-native'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import Logo from '../components/Logo'
import Header from '../components/Header'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import { emailValidator } from '../validation/emailValidator'
import firebaseConfig from '../firebase/firebaseConfig.js';
import {ToastAndroid} from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
  const[email, setEmail] = useState('');

  const sendResetPasswordEmail = async(email) => {
    await firebaseConfig.auth().sendPasswordResetEmail(email).then(function (user){
      ToastAndroid.show('Pleas check your email...', ToastAndroid.SHORT); 
      LoginScreen();
    }).catch(function (e) {
      console.log(e)
    })
  }

  const LoginScreen = () => {
    navigation.navigate("LoginScreen")
  }

  return (
    <View style={styles.container}>
      <Logo/>
      <Header>Forgot Password</Header>
      <TextInput
        label="E-mail address" returnKeyType="done"
        onChangeText={(text) => setEmail(text)}
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
        description="You will receive email with password reset link."/>
      <Button mode="contained" onPress={()=> sendResetPasswordEmail(email)} style={{ marginTop: 16 }}>Send Instructions</Button>
      <Button mode="contained" onPress={()=> LoginScreen()}>Login</Button>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    justifyContent:'center',
    alignItems:'center'
  }
});
export default ForgotPasswordScreen;
