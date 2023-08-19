import {
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Feather';

import COLORS from '../../configs/COLORS';
import {isDIsableButton} from '../../configs/util';

const FormLogin = ({handleLogin}) => {
  const [secureText, setSecureText] = useState(true);
  const [data, seData] = useState({
    username: '',
    password: '',
  });

  const dataCheck = () => {
    if (data.username && data.password) {
      return 1;
    }
    return 0;
  };

  return (
    <>
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
          secureTextEntry={secureText ? true : false}
          style={styles.textInput}
          onChangeText={e => seData({...data, password: e})}
        />
        <Icon
          name={secureText ? 'eye-off' : 'eye'}
          size={20}
          color={COLORS.DARK}
          style={styles.iconRight}
          onPress={() => setSecureText(!secureText)}
        />
      </View>
      <TouchableOpacity
        style={isDIsableButton(dataCheck())}
        disabled={
          isDIsableButton(dataCheck()).backgroundColor === '#FF7F00'
            ? false
            : true
        }
        onPress={async () => await handleLogin(data)}>
        <Text style={styles.btnText}>Log In</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
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

export default FormLogin;
