import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../api';
import COLORS from '../configs/COLORS';

import ModalEditPassword from '../components/modals/ModalEditPassword';

const Account = ({navigation}) => {
  const [data, setData] = useState({});
  const [id, setId] = useState('');
  const [modalEditPw, setModalEditPw] = useState(false);

  const changeModalEditPw = bool => {
    setModalEditPw(bool);
  };

  const fetchUserLogin = async () => {
    const user = await AsyncStorage.getItem('username');
    try {
      const {data} = await api.get(`users/${user}`);
      setData(data.payload[0]);
    } catch (err) {
      console.log(err);
    }
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

  const handleLogout = async () => {
    await AsyncStorage.clear();
    navigation.replace('Homepage');
  };

  useEffect(() => {
    fetchUserLogin();
  }, []);

  return (
    <>
      <View style={styles.container}>
        <View style={styles.conImg}>
          <Image
            source={{uri: 'https://reqres.in/img/faces/4-image.jpg'}}
            style={styles.img}
          />
        </View>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.name}>{data ? data.name : 'No user login'}</Text>
          <Text style={styles.username}>
            {data ? data.username : 'No user login'}
          </Text>
        </View>
        <View style={styles.action}>
          <View style={styles.conItem}>
            <View style={styles.leftItem}>
              <View style={styles.conIcon}>
                <Icon name="cart" size={24} color={COLORS.GREY} />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.WHITE,
                  }}>
                  Pesanan saya
                </Text>
                <Text style={{color: COLORS.GREY}}>Informasi pesanan</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnRow}
              onPress={async () => await getStorageuser()}>
              <Icon name="chevron-forward" size={24} color={COLORS.GREY} />
            </TouchableOpacity>
          </View>
          <View style={styles.conItem}>
            <View style={styles.leftItem}>
              <View style={styles.conIcon}>
                <Icon name="lock-open-sharp" size={24} color={COLORS.GREY} />
              </View>
              <View>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: COLORS.WHITE,
                  }}>
                  Edit password
                </Text>
                <Text style={{color: COLORS.GREY}}>Setting akun</Text>
              </View>
            </View>
            <TouchableOpacity
              style={styles.btnRow}
              onPress={() => {
                changeModalEditPw(true);
                setId(data.id);
              }}>
              <Icon name="chevron-forward" size={24} color={COLORS.GREY} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.btnLogout} onPress={() => handleLogout()}>
        <Text style={styles.textBtn}>Keluar</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalEditPw}
        onRequestClose={() => {
          changeModalEditPw(false);
        }}>
        <ModalEditPassword changeModalVisible={changeModalEditPw} id={id} />
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  conImg: {
    padding: 4,
    borderWidth: 3,
    borderColor: COLORS.ORANGE,
    alignSelf: 'center',
    borderRadius: 100,
    marginTop: 40,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 100,
  },
  name: {
    fontSize: 20,
    color: COLORS.DARK,
    fontWeight: 'bold',
    marginTop: 8,
  },
  action: {
    backgroundColor: COLORS.LIGHT,
    padding: 16,
    marginVertical: 20,
    borderRadius: 12,
  },
  conItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  leftItem: {
    flexDirection: 'row',
  },
  conIcon: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 100,
    marginRight: 8,
  },
  btnRow: {
    backgroundColor: 'grey',
    padding: 8,
    borderRadius: 8,
  },
  btnLogout: {
    backgroundColor: COLORS.ORANGE,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 20,
    marginBottom: 12,
  },
  textBtn: {
    color: COLORS.WHITE,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Account;
