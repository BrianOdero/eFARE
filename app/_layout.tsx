import { Ionicons } from "@expo/vector-icons";
import { Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return (
   <Tabs screenOptions={{headerShown: false}}>
    <Tabs.Screen name="index" options={{
      tabBarIcon: ({size,color}) => (<Ionicons size={size} color={color} name="home"/>),
      title: "Home"
    }}/>
    <Tabs.Screen name="records" options={{
      tabBarIcon: ({size,color}) => (<Ionicons name="list" size={size} color={color}/>),
      title: "Records"
    }}/>
    <Tabs.Screen name="settings" options={{
      tabBarIcon: ({size,color}) => (<Ionicons name="settings" size={size} color={color}/>),
      title: "Settings"
    }}/>
   </Tabs>
  );
}
