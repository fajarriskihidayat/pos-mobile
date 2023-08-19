import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

import COLORS from '../../configs/COLORS';

const SignLayout = ({children, title, rute}) => {
  const {navigate} = useNavigation();

  return (
    <>
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://cdn.kibrispdr.org/data/1110/logo-shopee-png-52.png',
          }}
          style={styles.logo}
        />
        {children}
        <View style={styles.or}>
          <View style={styles.line} />
          <Text style={styles.textOr}>Atau</Text>
          <View style={styles.line} />
        </View>
        <TouchableOpacity style={styles.btnAkun}>
          <Text style={styles.textAkun}>Log In dengan Google</Text>
          <Image
            source={{
              uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png',
            }}
            style={styles.imgAkun}
          />
        </TouchableOpacity>
        <View style={styles.footer}>
          <Text style={styles.text}>
            {rute === 'Login' ? 'Sudah punya akun ? ' : 'Belum punya akun ? '}
          </Text>
          <TouchableOpacity onPress={() => navigate(rute)}>
            <Text style={[styles.text, {color: COLORS.ORANGE}]}>{title}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 28,
    backgroundColor: COLORS.WHITE,
  },
  logo: {
    width: 60,
    height: 60,
    marginBottom: 30,
  },
  or: {
    marginVertical: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    height: 1,
    width: '35%',
    backgroundColor: COLORS.LIGHT,
  },
  textOr: {
    color: COLORS.LIGHT,
    marginHorizontal: 4,
    fontSize: 16,
  },
  btnAkun: {
    width: '100%',
    backgroundColor: COLORS.WHITE,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: COLORS.LIGHT,
  },
  textAkun: {
    color: COLORS.DARK,
  },
  imgAkun: {
    position: 'absolute',
    width: 20,
    height: 20,
    alignSelf: 'flex-start',
    marginLeft: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
    bottom: 0,
  },
  text: {
    fontSize: 16,
    color: COLORS.LIGHT,
  },
});

export default SignLayout;
