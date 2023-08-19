import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../api';

import COLORS from '../../configs/COLORS';

const ModalEditPassword = props => {
  const {replace} = useNavigation();
  const [data, setData] = useState({
    passwordLama: '',
    passwordBaru: '',
    confirmPassword: '',
  });

  const resetPassword = async value => {
    const username = await AsyncStorage.getItem('username');
    const name = await AsyncStorage.getItem('name');
    try {
      const res = await api.put('users', {
        name: name,
        username: username,
        password: value.passwordLama,
        newPassword: value.passwordBaru,
      });

      if (res.data.statusCode === 200) {
        ToastAndroid.show('Password berhasil diubah !', ToastAndroid.SHORT);
        replace('Homepage');
        setData({
          passwordLama: '',
          passwordBaru: '',
          confirmPassword: '',
        });
      }
    } catch (err) {
      console.log(err.message);
      ToastAndroid.show('Edit Password Gagal !', ToastAndroid.SHORT);
    }
  };

  const handleEdit = async () => {
    const password = await AsyncStorage.getItem('password');

    if (
      data.passwordLama == '' ||
      data.passwordBaru == '' ||
      data.confirmPassword == ''
    ) {
      ToastAndroid.show(
        'Data tidak boleh ada yang kosong !',
        ToastAndroid.SHORT,
      );
    } else if (data.passwordLama !== password) {
      ToastAndroid.show('Password salah !', ToastAndroid.SHORT);
    } else if (data.passwordBaru !== data.confirmPassword) {
      ToastAndroid.show(
        'Password Baru dan Konfirmasi Password tidak sesuai !',
        ToastAndroid.SHORT,
      );
    } else {
      resetPassword({
        passwordLama: data.passwordLama,
        passwordBaru: data.passwordBaru,
      });
    }
  };

  const closeModal = bool => {
    props.changeModalVisible(bool);
  };

  return (
    <View style={styles.centeredView}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Edit Password</Text>
          <View style={styles.containerInput}>
            <Text style={styles.textInput}>Password Lama</Text>
            <TextInput
              placeholder="Masukan Password"
              placeholderTextColor={COLORS.secondary}
              onChangeText={password =>
                setData({...data, passwordLama: password})
              }
              value={data.passwordLama}
              secureTextEntry
              style={styles.input}
            />
            <Text style={styles.textInput}>Password Baru</Text>
            <TextInput
              placeholder="Masukan Password"
              placeholderTextColor={COLORS.secondary}
              onChangeText={password =>
                setData({...data, passwordBaru: password})
              }
              value={data.passwordBaru}
              secureTextEntry
              style={styles.input}
            />
            <Text style={styles.textInput}>Konfirmasi Password</Text>
            <TextInput
              placeholder="Masukan Password"
              placeholderTextColor={COLORS.secondary}
              onChangeText={confirmPwd =>
                setData({...data, confirmPassword: confirmPwd})
              }
              value={data.confirmPassword}
              secureTextEntry
              style={styles.input}
            />
          </View>
          <View style={styles.conBtn}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleEdit()}>
              <Text style={styles.textBtn}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, {backgroundColor: COLORS.DANGER}]}
              onPress={() => closeModal(false)}>
              <Text style={styles.textBtn}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.ORANGE,
    marginBottom: 12,
  },
  containerInput: {
    width: 250,
    marginBottom: 8,
  },
  textInput: {
    color: COLORS.ORANGE,
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
    marginTop: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.ORANGE,
    marginVertical: 4,
    padding: 10,
    borderRadius: 8,
    color: COLORS.dark,
  },
  conBtn: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    width: 250,
  },
  button: {
    // margin: 20,
    marginLeft: 4,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: COLORS.SUCCESS,
    paddingHorizontal: 12,
  },
  textBtn: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontSize: 16,
  },
});

export default ModalEditPassword;
