import {View, Text, Image, StyleSheet} from 'react-native';
import React, {useEffect} from 'react';
import COLORS from '../configs/COLORS';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Homepage');
    }, 1500);
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://cdn.kibrispdr.org/data/1110/logo-shopee-png-52.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.text}>Somey</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 150,
    height: 150,
  },
  text: {
    color: COLORS.DARK,
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: 8,
  },
});

export default SplashScreen;
