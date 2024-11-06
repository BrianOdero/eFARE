import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface OrderHistoryItemProps {
  name: string;
  date: string;
  amount: number;
}

function OrderHistoryItem({ name, date, amount }: OrderHistoryItemProps) {
  const formattedAmount = new Intl.NumberFormat('en-KE', {
    style: 'currency',
    currency: 'KES',
    minimumFractionDigits: 2,
  }).format(amount);

  return (
    <View style={styles.itemContainer}>
      <View style={styles.leftContent}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Text style={styles.amount}>{formattedAmount}</Text>
    </View>
  );
}

const orderData = [
  { id: '1', name: 'John Kamau', date: 'Feb 02, 2024 at 8:32 PM', amount: 35432.50 },
  { id: '2', name: 'Aisha Wanjiru', date: 'Feb 01, 2024 at 2:15 PM', amount: 12500.75 },
  { id: '3', name: 'David Ochieng', date: 'Jan 30, 2024 at 11:45 AM', amount: 8750.25 },
  { id: '4', name: 'Grace Muthoni', date: 'Jan 28, 2024 at 9:20 AM', amount: 22100.00 },
  { id: '5', name: 'Peter Njoroge', date: 'Jan 25, 2024 at 4:55 PM', amount: 5600.50 },
];

export default function OrderHistory() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment History</Text>
      </View>
      <FlatList
        data={orderData}
        renderItem={({ item }) => (
          <OrderHistoryItem
            name={item.name}
            date={item.date}
            amount={item.amount}
          />
        )}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.trashButton} onPress={() => console.log('Clear records')}>
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
    color: '#1F2937',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#6B7280',
  },
  amount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981', // Green color
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
