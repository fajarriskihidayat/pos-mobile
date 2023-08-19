import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import api from '../../api';
import COLORS from '../../configs/COLORS';
import {useNavigation} from '@react-navigation/native';

import {useCart} from '../../contexts/CartContext';

const ModalCheckout = ({changeModalVisible, fetchTotal}) => {
  const {replace} = useNavigation();
  const [pay, setPay] = useState(0);

  const carts = useCart();

  const handleCheckout = async () => {
    const products = carts.map(item => {
      return {
        id: item.id,
        quantity: item.quantity,
      };
    });

    try {
      const payload = {
        total_price: +fetchTotal(),
        paid_amount: +pay,
        products,
      };

      await api.post('transactions', payload);
      ToastAndroid.show('Transaction success!', ToastAndroid.SHORT);
      replace('Homepage');
      setPay('');
    } catch (err) {
      console.log({message: err.message});
    }
  };

  return (
    <>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Payment</Text>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Pembayaran :</Text>
            <TextInput
              placeholder="Masukan jumlah bayar"
              placeholderTextColor={COLORS.secondary}
              keyboardType="numeric"
              style={styles.input}
              onChangeText={e => setPay(e)}
            />
          </View>
          <View style={styles.conBtn}>
            <TouchableOpacity
              style={[styles.button, pay < fetchTotal() && {opacity: 0.7}]}
              disabled={pay < fetchTotal() && true}
              onPress={async () => await handleCheckout()}>
              <Text style={styles.textBtn}>Bayar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: COLORS.DANGER}]}
              onPress={() => changeModalVisible(false)}>
              <Text style={styles.textBtn}>Batal</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.DARK,
  },
  containerInput: {
    width: 250,
    marginBottom: 8,
  },
  textInput: {
    color: COLORS.DARK,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.DARK,
    marginVertical: 4,
    padding: 10,
    borderRadius: 8,
    color: COLORS.DARK,
  },
  conBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 250,
    marginTop: 8,
  },
  button: {
    marginLeft: 4,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: COLORS.ORANGE,
    paddingHorizontal: 12,
  },
  textBtn: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontSize: 16,
  },
});

export default ModalCheckout;
