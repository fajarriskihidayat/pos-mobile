import {View, Text, ScrollView} from 'react-native';
import React from 'react';

import COLORS from '../configs/COLORS';
import {useFavorite} from '../contexts/FavoriteContect';

import ProductList from '../components/lists/ProductList';

const Favorite = () => {
  const favorites = useFavorite();

  return (
    <View style={{padding: 20}}>
      <Text
        style={{
          color: COLORS.DARK,
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 12,
        }}>
        Daftar Favorite
      </Text>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{paddingBottom: 20}}>
          <ProductList products={favorites} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Favorite;
