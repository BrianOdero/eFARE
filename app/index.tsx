import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { useState } from "react";
import { Appearance, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import Animated, { FadeIn, FadeInLeft, FadeOut, FadeOutLeft, useAnimatedStyle } from "react-native-reanimated";
import { AnimatedText } from "react-native-reanimated/lib/typescript/reanimated2/component/Text";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

    const [phoneNumber, setPhoneNumber] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [paybill, setPaybill] = useState<string>("");
  

 


  const pages = [
    {id: 1, title: "STK push payment", icon: "wallet", link: "/(home)/stkpush"},
    {id: 2, title: "QR code payment", icon: "qr-code", link: "/(home)/qrcode"},
    {id: 3, title: "Customer refunds", icon: "refresh", link: "/(home)/refunds"},
  ]

  const getAccessToken = async () => {
    try {
      let headers = new Headers();
      headers.append("Authorization", "Basic eGdwSHBNN3BHblowWUwySGVSUVVuRlNzWGhvV0JXUm1od0NWZ01VcTJxRzI0bFd0OnZjanBoQTlCQTJHQmU0NmpHRDBRM1JZODV4aEZiZEI3Rmw1U2RkOVBlcmY3OFdjdmdHZlRXVWxrV3VNaWRmckQ=");
      
      const response = await fetch("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", { headers });
      const result = await response.json();
      return result.access_token;
    } catch (error) {
      console.log("Error getting access token:", error);
      return null;
    }
  }

  const handleSendSTKpush = async () => {
    
    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Authorization", `Bearer ${await getAccessToken()}`);
    
    fetch("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", {
      method: 'POST',
      headers,
      body: JSON.stringify({
        "BusinessShortCode": 174379,
        "Password": btoa("174379" + "bfb279f9aa9bdbcf158e97dd71a467cd2e0c893059b10f78e6b72ada1ed2c919" + new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3)),
        "Timestamp": new Date().toISOString().replace(/[^0-9]/g, '').slice(0, -3),
        "TransactionType": "CustomerPayBillOnline", 
        "Amount": amount,
        "PartyA": phoneNumber,
    "PartyB": paybill,
    "PhoneNumber": phoneNumber,
    "CallBackURL": "https://mydomain.com/path",
        "AccountReference": "BusCar CompanyXLTD",
        "TransactionDesc": "Payment of Bus Fare" 
      })
    })
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log(error));
    alert("STK push sent successfully.Please check your phone for confirmation");
    setPhoneNumber("");
    setAmount("");
    setPaybill("");
  }

   const AnimatedText = useAnimatedStyle(() => {
      return {
        fontSize: 16,
        padding: 16,
        fontWeight: "bold",
      };
    });

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.welcomeSec}>
        <Text style={styles.welcomeSecHeader}>WELCOME TO EPAY</Text>
        <Text style={styles.welcomeSecText}>Your one time digital fare payment solution</Text>
      </View>

      <Animated.View style={styles.container} entering={FadeIn} exiting={FadeOut}>
            <Animated.Text entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(500)} style={AnimatedText} >Please Enter The Phone Number Of Recepient Receiving STK push</Animated.Text>
            <TextInput 
              style={styles.input}
              value={phoneNumber}
              onChangeText={setPhoneNumber}
              keyboardType={"numeric"}
              blurOnSubmit={false}
              placeholder='Enter Phone Number'
            />
            <Animated.Text entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(500)} style={AnimatedText}  >Please Enter The Amount To Be Paid</Animated.Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              blurOnSubmit={false}
              placeholder='Enter Amount'
            />
            <Animated.Text entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(500)} style={AnimatedText} >Please Enter The Paybillt To Be Paid To</Animated.Text>
            <TextInput
              style={styles.input}
              value={paybill}
              onChangeText={setPaybill}
              blurOnSubmit={false}
              placeholder='Enter Paybill'
            />
            <TouchableOpacity style={{alignItems: "center", justifyContent: "center",}} onPress={handleSendSTKpush}>
              <View style={styles.button}>
                <Text style={{color: "white"}}>Send STK push</Text>
              </View>
            </TouchableOpacity>
          </Animated.View>


      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeSec: {
    height: 200,
    backgroundColor: "blue",
    marginTop: 30,
    borderBottomRightRadius: 40,
    borderTopLeftRadius: 40
  },
  welcomeSecHeader: {
    color: "white",
    fontWeight: "bold",
    margin: 20,
    fontSize: 32,
    textAlign: "center"
  },
  welcomeSecText: {
    color: "white",
    margin: 20,
    fontSize: 16,
    textAlign: "center"
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
 
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  paymentOption: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    backgroundColor: "white",
    marginBottom: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  optionText: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "500",
  },
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
});
