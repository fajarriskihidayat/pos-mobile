import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../api';
import TransactionList from '../components/lists/TransactionList';
import COLORS from '../configs/COLORS';

const Transaction = () => {
  const [transactions, setTransactions] = useState([]);

  const fetchTransactions = async () => {
    try {
      const {data} = await api.get('transactions');
      setTransactions(data.payload.transactions);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <View style={{padding: 20}}>
      <Text
        style={{
          color: COLORS.DARK,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 12,
        }}>
        Daftar Transaksi
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <TransactionList transactions={transactions} />
      </ScrollView>
    </View>
  );
};

export default Transaction;
