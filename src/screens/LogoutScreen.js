import React from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'

const LogoutScreen = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Wish you a good experience</Header>
    <Paragraph>
    Thank you for using our app. You are the driving force for us to develop better and better apps. We hope you will continue to use our app.
    </Paragraph>
    <Button
      mode="outlined"
      onPress={() => navigation.reset({index: 0,routes: [{ name: 'StartScreen' }],})}>Logout
    </Button>
  </Background>
);

export default LogoutScreen;
