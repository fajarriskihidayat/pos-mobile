import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import {category} from '../../configs/datas';
import COLORS from '../../configs/COLORS';

const CategoryList = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      {category.map((item, i) => (
        <TouchableOpacity
          style={styles.categoryItem}
          key={i}
          onPress={() =>
            navigation.navigate('ProductCategory', {category_item: item.name})
          }>
          <Image source={{uri: item.img_url}} style={styles.img} />
          <Text style={styles.name}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    elevation: 3,
  },
  categoryItem: {
    width: '25%',
    alignItems: 'center',
    marginVertical: 8,
  },
  img: {
    width: 40,
    height: 40,
  },
});

export default CategoryList;
