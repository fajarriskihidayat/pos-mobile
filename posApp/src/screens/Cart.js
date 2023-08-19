import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import React, {useState} from 'react';

import COLORS from '../configs/COLORS';

import {useCart} from '../contexts/CartContext';

import ModalCheckout from '../components/modals/ModalCheckout';
import CartList from '../components/lists/CartList';

const Cart = () => {
  const [modal, setModal] = useState(false);

  const carts = useCart();

  const getTotalPrice = () => {
    let totalPrice = 0;

    carts.map(item => {
      return (totalPrice += item.price * item.quantity);
    });

    return totalPrice;
  };

  return (
    <>
      <ScrollView style={styles.container}>
        <CartList carts={carts} />
      </ScrollView>
      <View style={styles.checkout}>
        <View style={styles.total}>
          <Text style={styles.titlePrice}>Total Price</Text>
          <Text style={styles.tPrice}>Rp {getTotalPrice()}</Text>
        </View>
        <TouchableOpacity
          style={[styles.btnCheckout, carts.length === 0 && {opacity: 0.7}]}
          disabled={carts.length === 0 ? true : false}
          onPress={() => setModal(true)}>
          <Text style={{color: COLORS.WHITE, fontWeight: 'bold'}}>
            Checkout
          </Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modal}
        onRequestClose={() => {
          setModal(false);
        }}>
        <ModalCheckout
          changeModalVisible={setModal}
          fetchTotal={getTotalPrice}
        />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  checkout: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 10,
  },
  btnCheckout: {
    backgroundColor: COLORS.ORANGE,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
  },
  titlePrice: {
    fontWeight: 'bold',
    fontSize: 20,
    color: COLORS.DARK,
    marginBottom: 6,
  },
  tPrice: {
    color: COLORS.DARK,
    fontSize: 16,
  },
});

export default Cart;
