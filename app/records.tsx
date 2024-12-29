import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import supabase from '@/DBconfig/supabaseClient';
import { Timestamp } from 'react-native-reanimated/lib/typescript/reanimated2/commonTypes';

type Records = {
  id: number;
  created_at: Timestamp;
  amount: number;
  phone_number: number;
  payment_status: string;
};

interface OrderHistoryItemProps {
  date: string;
  amount: number;
  paymentStatus: string;
  phoneNumber: number;
}

function OrderHistoryItem({
  date,
  amount,
  paymentStatus,
  phoneNumber,
}: OrderHistoryItemProps) {
  const formattedAmount = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
  }).format(amount);

  const statusStyle =
    paymentStatus === 'PENDING'
      ? styles.pendingStatus
      : styles.successStatus;

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContent}>
        <Text style={styles.phoneNumber}>Phone: {phoneNumber}</Text>
        <Text style={[styles.name, statusStyle]}>{paymentStatus}</Text>
        <Text style={styles.date}>Date: {date}</Text>
      </View>
      <Text style={styles.amount}>{formattedAmount}</Text>
    </View>
  );
}

export default function OrderHistory() {
  const [recordData, setRecordData] = useState<Records[]>([]);

  const fetchRecords = async () => {
    const { data, error } = await supabase
      .from('records')
      .select('*')
      .order('id', { ascending: false });

    if (error) {
      console.log(error.message);
    }

    if (data) {
      setRecordData(data);
    }
  };

  const deleteRecords = async () => {
    Alert.alert(
      "Delete All Records",
      "Are you sure you want to delete all payment records?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const { data, error } = await supabase.from('records').delete().gt('id', 0);
            if (error) {
              console.error("Error deleting records:", error);
              Alert.alert("Error", `Failed to delete records: ${error.message}`);
            } else {
              Alert.alert("Success", "Records deleted successfully.");
              fetchRecords(); // Refresh the data
            }
          },
        },
      ]
    );
  };
  
  

  useEffect(() => {
    fetchRecords();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment History</Text>
      </View>
      <FlatList
        data={recordData}
        renderItem={({ item }) => (
          <OrderHistoryItem
            date={new Date(item.created_at).toLocaleString()} // Convert timestamp to human-readable format
            amount={item.amount}
            paymentStatus={item.payment_status}
            phoneNumber={item.phone_number}
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <TouchableOpacity
        style={styles.trashButton}
        onPress={() => deleteRecords()}
      >
        <Ionicons name="trash-outline" size={20} color="#FFFFFF" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1F2937',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  leftContent: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  phoneNumber: {
    fontSize: 20,
    color: 'black', // Gray color for phone number
    marginBottom: 4,
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: 'black',
    marginTop: 8,
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981', // Green color for amount
  },
  pendingStatus: {
    color: '#EF4444', // Red for PENDING
    fontWeight: 'bold',
    fontSize: 16,
  },
  successStatus: {
    color: '#10B981', // Green for SUCCESS
    fontWeight: 'bold',
  },
  trashButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#EF4444', // Red color
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5, // for Android shadow
    shadowColor: '#000', // for iOS shadow
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});
