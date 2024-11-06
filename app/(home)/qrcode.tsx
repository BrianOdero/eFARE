import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import React, { useState } from 'react';
import Animated, { FadeInLeft, FadeOutLeft } from 'react-native-reanimated';
import QRCode from 'react-native-qrcode-svg';



type ValueData = {
  amount: string;
  paybill: string;
}

const QrCodeScreen = () => {
  const [amount, setAmount] = useState("");
  const [paybill, setPaybill] = useState("");
  const [QRCodeString, setQRCodeString] = useState<string>("QRCode")


  const [value, setValue] = useState<ValueData>({
    amount: "",
    paybill: "",
  });

  



  const QrCodeUrl = "https://sandbox.safaricom.co.ke/mpesa/qrcode/v1/generate";
  const merchantName = "BusCar CompanyXLTD";
  const accountNumber = "BusCar";
  const defaultShortcode = 174379;

  // Retrieve the access token for the Safaricom API
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
  // Generate QR code

  const handleQRcode = async () =>{
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    headers.append("Authorization", `Bearer ${await getAccessToken()}`);

    if (!amount || !paybill) {
      console.log("Amount and Paybill must be provided");
      return;
    }

  

    try {
      const response = await fetch(QrCodeUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({
          "MerchantName": merchantName,
          "RefNo": "Invoice",
          "Amount": amount,
          "TrxCode": "BG",
          "CPI": paybill,
          "Size": "300"
        })
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      setQRCodeString(result.QRCode);
    } catch (error) {
      console.log("Error generating QR code:", error);
    }

    fetch(QrCodeUrl,{
      method: "POST",
      headers,
      body: JSON.stringify({
        "MerchantName":"eFARE",
        "RefNo":"Invoice",
        "Amount":100,
        "TrxCode":"BG",
        "CPI":paybill,
        "Size":"300"
    })
    })
    .then(response => response.json())
    .then(result => {
      console.log(result);
      setQRCodeString(result.QRCode);
    })
    .catch(error => console.log(error))
  }
 

  return (
    <View style={styles.container}>

      <Animated.Text entering={FadeInLeft.duration(500)} exiting={FadeOutLeft.duration(500)} style={{ fontWeight: 'bold', padding: 16, fontSize: 16 }}>
        Please Enter The Paybill to Be Paid To
      </Animated.Text>
      <TextInput
        style={styles.input}
        value={paybill}
        onChangeText={setPaybill}
        blurOnSubmit={false}
        placeholder="Enter Paybill"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={handleQRcode}
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <View style={styles.button}>
          <Text style={{ color: "white" }}>Generate QR code</Text>
        </View>
      </TouchableOpacity>

     <QRCode value={QRCodeString} size={240}/>

    </View>
  );
};

export default QrCodeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    paddingHorizontal: 20,
    paddingTop: 40,
    backgroundColor: "#f0f0f0",
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
  },
  qrContainer: {
    alignItems: "center",
    marginTop: 20,
  },
  qrCode: {
    width: 250,
    height: 250,
  },
});
