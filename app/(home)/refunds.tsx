import { View, Text, StyleSheet, TextInput, Button, Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated'

const refunds = () => {


  const AnimatedInput = Animated.createAnimatedComponent(TextInput)






  return (
    <View style={styles.container}>
      <Animated.Text entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(500)} style={{fontWeight: 'bold',padding: 16, fontSize: 16}} >Please Enter The Phone Number Of Recepient</Animated.Text>
      <AnimatedInput entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(500)} style={styles.input} placeholder='Enter Phone Number' />
      <Animated.Text entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(500)} style={{fontWeight: 'bold',padding: 16, fontSize: 16}} >Please Enter The Amount To Be Paid</Animated.Text>
      <AnimatedInput entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(500)} style={styles.input} placeholder='Enter Amount' />
      <TouchableOpacity style={{alignItems: "center", justifyContent: "center",}}>
        <View style={styles.button}>
          <Text style={{color: "white"}}>Initiate Refund</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default refunds

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f0f0f0"
  },
  input: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 5,
    marginHorizontal: 16,
    borderRadius: 5,
  },
  button: {
    borderWidth: 1,
    borderColor: "gray",
    padding: 10,
    marginHorizontal: 16,
    marginVertical: 16,
    borderRadius: 5,
    width: 120,
    backgroundColor: "green",
    
  }
})