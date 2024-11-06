import { Ionicons } from "@expo/vector-icons";
import { Stack, useRouter } from "expo-router";

export default function HomeLayout() {

  const router = useRouter();


  return (
   <Stack
   screenOptions={{
    headerLeft: () => <Ionicons style={{marginRight: 10}} name="arrow-back" size={24} color="black" onPress={() => router.push("/")} />,
   }}>
    <Stack.Screen name="stkpush" options={{
      headerTitle: "STK push payment",
    }} />
    <Stack.Screen name="qrcode" options={{
      headerTitle: "QR code payment",
    }} />
    <Stack.Screen name="refunds" options={{
      headerTitle: "Customer refunds",
    }}/>
   </Stack>
  )
}