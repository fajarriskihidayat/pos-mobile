import {
  View,
  StyleSheet,
  TextInput,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../../configs/COLORS';
import Icon from 'react-native-vector-icons/Feather';
import DropDownPicker from 'react-native-dropdown-picker';

import {isDIsableButton} from '../../configs/util';

const FormRegister = ({handleRegister}) => {
  const [secureText, setSecureText] = useState({
    password: true,
    confirmPw: true,
    kodeAkses: true,
  });
  const [data, seData] = useState({
    name: '',
    username: '',
    password: '',
    kodeAkses: '',
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Member', value: 'Member'},
    {label: 'Kurir', value: 'Kurir'},
  ]);

  const dataCheck = () => {
    if (data.name && data.username && data.password && value === 'Member') {
      return 1;
    } else if (
      data.name &&
      data.username &&
      data.password &&
      data.kodeAkses &&
      value === 'Kurir'
    ) {
      return 1;
    } else {
      return 0;
    }
  };

  useEffect(() => {
    seData({
      name: '',
      username: '',
      password: '',
      kodeAkses: '',
    });
    setSecureText({
      password: true,
      confirmPw: true,
      kodeAkses: true,
    });
  }, [value]);

  return (
    <View style={{width: '100%'}}>
      <DropDownPicker
        open={open}
        value={value}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        style={styles.dropdown}
        dropDownContainerStyle={{borderColor: COLORS.LIGHT}}
        placeholder="Pilih jenis akun"
        placeholderStyle={{color: COLORS.LIGHT}}
      />
      {value !== null && (
        <>
          <View style={styles.input}>
            <Icon
              name="edit"
              size={28}
              color={COLORS.DARK}
              style={styles.iconLeft}
            />
            <TextInput
              placeholder="Nama Lengkap"
              placeholderTextColor={COLORS.LIGHT}
              style={styles.textInput}
              onChangeText={e => seData({...data, name: e})}
              value={data.name}
            />
          </View>
          <View style={styles.input}>
            <Icon
              name="user"
              size={28}
              color={COLORS.DARK}
              style={styles.iconLeft}
            />
            <TextInput
              placeholder="Username"
              placeholderTextColor={COLORS.LIGHT}
              style={styles.textInput}
              onChangeText={e => seData({...data, username: e})}
              value={data.username}
            />
          </View>
          <View style={styles.input}>
            <Icon
              name="lock"
              size={28}
              color={COLORS.DARK}
              style={styles.iconLeft}
            />
            <TextInput
              placeholder="Password"
              placeholderTextColor={COLORS.LIGHT}
              secureTextEntry={secureText.password ? true : false}
              style={styles.textInput}
              onChangeText={e => seData({...data, password: e})}
              value={data.password}
            />
            <Icon
              name={secureText.password ? 'eye-off' : 'eye'}
              size={20}
              color={COLORS.DARK}
              style={styles.iconRight}
              onPress={() =>
                setSecureText({...secureText, password: !secureText.password})
              }
            />
          </View>
        </>
      )}
      {value === 'Kurir' && (
        <View style={styles.input}>
          <Icon
            name="unlock"
            size={28}
            color={COLORS.DARK}
            style={styles.iconLeft}
          />
          <TextInput
            placeholder="Kode Akses Kurir"
            placeholderTextColor={COLORS.LIGHT}
            secureTextEntry={secureText.kodeAkses ? true : false}
            style={styles.textInput}
            onChangeText={e => seData({...data, kodeAkses: e})}
            value={data.kodeAkses}
          />
          <Icon
            name={secureText.kodeAkses ? 'eye-off' : 'eye'}
            size={20}
            color={COLORS.DARK}
            style={styles.iconRight}
            onPress={() =>
              setSecureText({...secureText, kodeAkses: !secureText.kodeAkses})
            }
          />
        </View>
      )}
      {value !== null && (
        <TouchableOpacity
          style={isDIsableButton(dataCheck())}
          disabled={
            isDIsableButton(dataCheck()).backgroundColor === '#FF7F00'
              ? false
              : true
          }
          onPress={async () => await handleRegister({data, value})}>
          <Text style={styles.btnText}>Daftar</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  dropdown: {
    borderColor: COLORS.LIGHT,
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
    width: '100%',
    justifyContent: 'center',
  },
  textInput: {
    borderBottomWidth: 1,
    borderColor: COLORS.LIGHT,
    padding: 4,
    paddingLeft: 48,
    width: '100%',
  },
  iconLeft: {
    position: 'absolute',
    marginHorizontal: 8,
  },
  iconRight: {
    alignSelf: 'flex-end',
    position: 'absolute',
    right: 12,
  },
  btnText: {
    fontSize: 16,
    color: COLORS.WHITE,
  },
});

export default FormRegister;
