import React from 'react'
import { Image, StyleSheet } from 'react-native'

const Logo = () => (
  <Image source={require('../assets/logo.png')} style={styles.image} />
)

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    borderRadius: 10,
  },
})

export default Logo
