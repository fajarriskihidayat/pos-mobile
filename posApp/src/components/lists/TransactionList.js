import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import COLORS from '../../configs/COLORS';

import ModalDetailTransaction from '../modals/ModalDetailTransaction';

const TransactionList = ({transactions}) => {
  const [noOrder, setNoOrder] = useState('');
  const [modal, setModal] = useState(false);

  return (
    <View style={styles.history}>
      {transactions.map((item, i) => (
        <TouchableOpacity
          style={styles.card}
          key={i}
          onPress={() => {
            setModal(true), setNoOrder(item.no_order);
          }}>
          <View>
            <Text style={styles.no_order}>{item.no_order}</Text>
            <Text style={styles.pay}>Total: Rp {item.total_price}</Text>
            <Text style={styles.pay}>Bayar: Rp {item.paid_amount}</Text>
          </View>
        </TouchableOpacity>
      ))}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <ModalDetailTransaction
          changeModalVisible={setModal}
          noOrder={noOrder}
        />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  history: {
    marginBottom: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    marginBottom: 8,
    padding: 12,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    width: '49%',
  },
  no_order: {
    fontWeight: 'bold',
    fontSize: 18,
    color: COLORS.DARK,
  },
  pay: {
    marginTop: 4,
  },
});

export default TransactionList;
