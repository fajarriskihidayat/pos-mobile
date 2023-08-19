import {ToastAndroid} from 'react-native';
import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';

import SignLayout from '../components/layouts/SignLayout';
import FormLogin from '../components/forms/FormLogin';

const Login = ({navigation}) => {
  const handleLogin = async value => {
    try {
      const {data} = await api.post('users/login', {
        username: value.username,
        password: value.password,
      });

      if (data.statusCode === 200) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        await AsyncStorage.setItem('name', data.payload.name);
        await AsyncStorage.setItem('username', data.payload.username);
        await AsyncStorage.setItem('password', value.password);
        navigation.replace('Homepage');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <SignLayout title="Daftar" rute="Register">
        <FormLogin handleLogin={handleLogin} />
      </SignLayout>
    </>
  );
};

export default Login;
