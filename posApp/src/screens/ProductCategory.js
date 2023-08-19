import {View, Text, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import api from '../api';

import COLORS from '../configs/COLORS';

import ProductList from '../components/lists/ProductList';

const ProductCategory = ({route}) => {
  const {category_item} = route.params;
  const [products, setProducts] = useState([]);

  const fetchProductByCategory = async () => {
    try {
      const {data} = await api.get(`products/category?query=${category_item}`);
      setProducts(data.payload);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchProductByCategory();
  }, []);

  return (
    <View style={{padding: 20}}>
      <Text
        style={{
          fontWeight: 'bold',
          fontSize: 20,
          color: COLORS.DARK,
          marginBottom: 12,
        }}>
        {category_item}
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginBottom: 20}}>
          <ProductList products={products} />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProductCategory;
