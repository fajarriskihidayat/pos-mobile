import {View, Text, ScrollView} from 'react-native';
import React from 'react';
import ProductList from '../components/lists/ProductList';
import COLORS from '../configs/COLORS';

const Search = ({route}) => {
  const {products, value} = route.params;

  return (
    <View style={{flex: 1, padding: 20}}>
      <Text style={{fontSize: 18, color: COLORS.LIGHT, marginBottom: 12}}>
        Search: {value}
      </Text>
      <View style={{flex: 1, position: 'relative'}}>
        {products.length === 0 && (
          <View style={{position: 'absolute', top: '50%', left: 0, right: 0}}>
            <Text style={{fontSize: 16, textAlign: 'center'}}>
              Produk tidak ditemukan
            </Text>
          </View>
        )}
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{paddingBottom: 20}}>
            <ProductList products={products} />
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default Search;
