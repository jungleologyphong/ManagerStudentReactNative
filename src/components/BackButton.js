import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'
import { getStatusBarHeight } from 'react-native-status-bar-height'

const BackButton = ({ goBack }) => (
  <TouchableOpacity onPress={goBack} style={styles.container}>
    <Image style={styles.image} source={require('../assets/back.png')} />
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    top: -5 + getStatusBarHeight(),
    left: -135
  },
  image: {
    width: 24,
    height: 24,
  },
})

export default BackButton
