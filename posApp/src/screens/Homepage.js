import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../api/index';
import Icon from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';

import COLORS from '../configs/COLORS';

import ProductList from '../components/lists/ProductList';
import CategoryList from '../components/lists/CategoryList';

const Homepage = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');

  const fetchProduct = async () => {
    const {data} = await api.get('products');
    setProducts(data.payload);
  };

  const searchProduct = async () => {
    const {data} = await api.get(`products/search?query=${search}`);
    setSearch('');
    navigation.navigate('Search', {products: data.payload, value: search});
  };

  const getStorageuser = async () => {
    try {
      const value = await AsyncStorage.getItem('username');
      value !== null
        ? navigation.navigate('Cart')
        : navigation.navigate('Login');
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={styles.search}>
          <Icon
            name="search"
            size={20}
            color={COLORS.LIGHT}
            style={styles.icon}
          />
          <TextInput
            placeholder="Search..."
            style={styles.input}
            onChangeText={e => setSearch(e)}
            value={search}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Icon
                name="x"
                size={20}
                color={COLORS.LIGHT}
                style={styles.iconClear}
              />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={[styles.iconSearch, search.length === 0 && {opacity: 0.7}]}
            disabled={search.length === 0 ? true : false}
            onPress={() => searchProduct()}>
            <Icon name="search" size={24} color={COLORS.WHITE} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={async () => await getStorageuser()}>
          <Icon name="shopping-cart" size={32} color={COLORS.ORANGE} />
        </TouchableOpacity>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 12}}>
          <Text style={styles.title}>Kategori</Text>
          <CategoryList />
        </View>
        <View>
          <Text style={styles.title}>Rekomendasi</Text>
          <ProductList products={products} />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    position: 'absolute',
    left: 8,
  },
  search: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    width: '75%',
  },
  input: {
    height: 40,
    width: '100%',
    paddingHorizontal: 32,
    borderWidth: 2,
    borderColor: COLORS.ORANGE,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
  },
  iconClear: {
    position: 'absolute',
    left: -30,
    top: -10,
  },
  iconSearch: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.ORANGE,
    borderWidth: 2,
    borderColor: COLORS.ORANGE,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.DARK,
    marginBottom: 8,
  },
});

export default Homepage;
