import React from 'react';
import {ToastAndroid} from 'react-native';
import api from '../api';

import SignLayout from '../components/layouts/SignLayout';
import FormRegister from '../components/forms/FormRegister';

const Register = ({navigation}) => {
  const handleRegister = async value => {
    if (value.data.kodeAkses !== 'admin123' && value.value === 'Kurir') {
      ToastAndroid.show('Kode akses salah', ToastAndroid.SHORT);
      return;
    }

    try {
      const {data} = await api.post('users', {
        name: value.data.name,
        username: value.data.username,
        password: value.data.password,
        role: value.value === 'Kurir' ? 1 : 2,
      });

      if (data.statusCode === 200) {
        ToastAndroid.show(data.message, ToastAndroid.SHORT);
        navigation.navigate('Login');
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <SignLayout title="Login" rute="Login">
        <FormRegister handleRegister={handleRegister} />
      </SignLayout>
    </>
  );
};

export default Register;
