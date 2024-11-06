import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

import { useState } from "react";
import { Appearance, FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {

 


  const pages = [
    {id: 1, title: "STK push payment", icon: "wallet", link: "/(home)/stkpush"},
    {id: 2, title: "QR code payment", icon: "qr-code", link: "/(home)/qrcode"},
    {id: 3, title: "Customer refunds", icon: "refresh", link: "/(home)/refunds"},
  ]

  return (
    <SafeAreaView style={styles.safeArea}>

      <View style={styles.welcomeSec}>
        <Text style={styles.welcomeSecHeader}>WELCOME TO EPAY</Text>
        <Text style={styles.welcomeSecText}>Your one time digital fare payment solution</Text>
      </View>


      <View style={styles.container}>
        <Text style={styles.title}>PAYMENT OPTIONS</Text>
        <FlatList
          data={pages}
          renderItem={({item}) => (
            <Link href={item.link as any} asChild>
              <TouchableOpacity style={styles.paymentOption}>
                <Ionicons name={item.icon as any} size={28} color="blue" />
                <Text style={styles.optionText}>{item.title}</Text>
              </TouchableOpacity>
            </Link>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  welcomeSec: {
    height: 180,
    backgroundColor: "blue",
    marginTop: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30
  },
  welcomeSecHeader: {
    color: "white",
    fontWeight: "bold",
    margin: 20,
    fontSize: 24
  },
  welcomeSecText: {
    color: "white",
    margin: 20
  },
  safeArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
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
  }
});
