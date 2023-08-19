import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Feather';

import COLORS from '../../configs/COLORS';

import {useCartDispatch} from '../../contexts/CartContext';

const CartList = ({carts}) => {
  const dispatch = useCartDispatch();

  const handleAddItem = product => {
    dispatch({
      type: 'add',
      payload: product,
    });
  };

  const handleDecreaseItem = product => {
    dispatch({
      type: 'decrease',
      payload: product,
    });
  };

  const handleDeleteItem = product => {
    dispatch({
      type: 'delete',
      payload: product,
    });
  };

  return (
    <View style={{marginBottom: 20}}>
      {carts.map((item, i) => (
        <View key={i}>
          <View style={styles.cart}>
            <View style={styles.item}>
              <Image
                source={{
                  uri: item.img_product,
                }}
                style={styles.imgCart}
              />
              <View style={styles.desc}>
                <View style={[styles.conItem, {alignItems: 'flex-start'}]}>
                  <Text style={styles.name} numberOfLines={1}>
                    {item.name}
                  </Text>
                  <TouchableOpacity onPress={() => handleDeleteItem(item)}>
                    <Icon name="x" size={16} color={COLORS.LIGHT} />
                  </TouchableOpacity>
                </View>
                <View style={styles.conItem}>
                  <Text style={styles.price}>Rp {item.price}</Text>
                  <View style={styles.action}>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => handleDecreaseItem(item)}>
                      <Icon name="minus" size={18} color={COLORS.WHITE} />
                    </TouchableOpacity>
                    <Text style={styles.qty}>{item.quantity}</Text>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => handleAddItem(item)}>
                      <Icon name="plus" size={18} color={COLORS.WHITE} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {/* <View style={styles.line} /> */}
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  cart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    elevation: 2,
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
  },
  conItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  imgCart: {
    width: 60,
    height: 60,
  },
  desc: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  name: {
    flex: 1,
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.DARK,
    marginRight: 4,
  },
  price: {
    color: COLORS.LIGHT,
  },
  action: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    padding: 4,
    backgroundColor: COLORS.ORANGE,
    borderRadius: 20,
  },
  qty: {
    paddingHorizontal: 8,
    fontSize: 16,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: COLORS.LIGHT,
    borderRadius: 50,
    marginVertical: 20,
  },
});

export default CartList;
