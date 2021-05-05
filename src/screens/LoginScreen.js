import React,{useState} from 'react'
import {TouchableOpacity, StyleSheet, View, ToastAndroid} from 'react-native';
import { Text } from 'react-native-paper';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import { theme } from '../core/theme';
import { emailValidator } from '../validation/emailValidator';
import { passwordValidator } from '../validation/passwordValidator';
import firebaseConfig from '../firebase/firebaseConfig.js';

const LoginScreen = ({navigation}) => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const onLoginPressed = async(email, password) => {
        await firebaseConfig
        .auth().signInWithEmailAndPassword(email, password).then((user) =>{
          console.log('Login success !');
          navigation.navigate('MainScreen');
          return true;
        }).catch((error) =>{
          const {code, message} = error;
          console.log('Error :'+message);
          return false;
        });
    }
    return (
        
        <View style={styles.container}>
            <BackButton goBack={navigation.goBack}/>
            <Logo/>
            <Header>Welcom To Explore International Android Application</Header>
            <TextInput
                label="Email"
                returnKeyType="next"
                value={email}
                onChangeText={(text) => setEmail(text)}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"/>
            <TextInput 
                label="Password"
                returnKeyType="done"
                value={password}
                onChangeText={(text) => setPassword(text)}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry={true}/>
            <View style={styles.forgotPassword}>
                <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')}>
                    <Text style={styles.forgot}>Forgot your password?</Text>
                </TouchableOpacity>
            </View>
            <Button mode="contained" onPress={() => onLoginPressed(email,password)}>Login</Button>
            <View style={styles.row}>
                <Text>Don’t have an account? </Text>
                <TouchableOpacity onPress={() => navigation.replace('RegisterScreen')}>
                    <Text style={styles.link}>Sign up</Text>
                </TouchableOpacity>
            </View>

        </View>

    );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding:10,
      justifyContent:'center',
      alignItems:'center'
    },
    forgotPassword: {
      width: '100%',
      alignItems: 'flex-end',
      marginBottom: 24,
    },
    row: {
      flexDirection: 'row',
      marginTop: 4,
    },
    forgot: {
      fontSize: 13,
      color: theme.colors.secondary,
    },
    link: {
      fontWeight: 'bold',
      color: theme.colors.primary,
    },
  })

export default LoginScreen;