import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

import COLORS from '../../configs/COLORS';
import {isIconHandler} from '../../configs/util';

import {useCartDispatch} from '../../contexts/CartContext';
import {useFavorite, useFavoriteDispatch} from '../../contexts/FavoriteContect';

const ProductList = ({products}) => {
  const {navigate} = useNavigation();

  const favorites = useFavorite();

  const dispatchCart = useCartDispatch();
  const dispatchFavorite = useFavoriteDispatch();

  const handleAddItem = async product => {
    const value = await AsyncStorage.getItem('username');
    if (!value) return navigate('Login');

    dispatchCart({
      type: 'add',
      payload: product,
    });
    ToastAndroid.show('Dimasukan ke keranjang', ToastAndroid.SHORT);
  };

  const handleFavorite = async product => {
    const value = await AsyncStorage.getItem('username');
    if (!value) return navigate('Login');

    // some untuk memeriksa ada ga item nya di state favorite
    // output some berupa boolean (true/false)
    const isFavorite = favorites.some(item => item.id === product.id);
    const actionType = isFavorite ? 'remove' : 'add';
    dispatchFavorite({
      type: actionType,
      payload: product,
    });
  };

  return (
    <View style={styles.container}>
      {products.map((product, i) => (
        <View style={styles.card} key={i}>
          <View style={styles.conIcon}>
            <Icon
              name={
                isIconHandler(favorites, product) ? 'heart' : 'heart-outline'
              }
              size={24}
              color={
                isIconHandler(favorites, product) ? COLORS.DANGER : COLORS.WHITE
              }
              onPress={() => handleFavorite(product)}
            />
          </View>
          <Image source={{uri: `${product.img_product}`}} style={styles.img} />
          <View style={styles.bodyCard}>
            <View style={{width: '74%'}}>
              <Text style={styles.name} numberOfLines={1}>
                {product.name}
              </Text>
              <Text style={styles.price}>Rp {product.price}</Text>
            </View>
            <TouchableOpacity
              style={styles.btnAdd}
              onPress={() => handleAddItem(product)}>
              <Icon name="plus" size={18} color={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    borderWidth: 1,
    borderColor: COLORS.LIGHT,
    width: '48%',
    borderRadius: 4,
    marginBottom: 12,
  },
  conIcon: {
    position: 'absolute',
    zIndex: 1,
    backgroundColor: '#d9dddc',
    padding: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    alignSelf: 'flex-end',
    right: 6,
    top: 6,
  },
  img: {
    width: '100%',
    height: 200,
    position: 'relative',
  },
  bodyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  name: {
    fontWeight: 'bold',
    color: COLORS.DARK,
  },
  price: {
    color: COLORS.LIGHT,
  },
  btnAdd: {
    padding: 8,
    backgroundColor: COLORS.ORANGE,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 4,
  },
});

export default ProductList;
