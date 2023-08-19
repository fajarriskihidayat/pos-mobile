import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import COLORS from '../../configs/COLORS';
import Icon from 'react-native-vector-icons/Feather';
import api from '../../api';

const ModalDetailTransaction = ({changeModalVisible, noOrder}) => {
  const [detail, setDetail] = useState({});

  const fetchDetailTransaction = async () => {
    try {
      const {data} = await api.get(`transactions/${noOrder}`);
      setDetail(data.payload);
    } catch (err) {
      console.log({error: err.message});
    }
  };

  useEffect(() => {
    fetchDetailTransaction();
  }, []);

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeModalVisible(false)}>
          <Icon name="x" size={20} color={COLORS.WHITE} />
        </TouchableOpacity>
        <Text style={styles.modalText}>Detail Transaksi</Text>
        <View style={styles.line} />
        <View style={styles.detail}>
          <View>
            <View>
              <Text style={styles.textTitle}>No Transaksi</Text>
              <Text>{detail.no_order}</Text>
            </View>
            <View>
              <Text style={styles.textTitle}>Total Harga</Text>
              <Text>Rp {detail.total_price}</Text>
            </View>
          </View>
          <View>
            <View>
              <Text style={styles.textTitle}>Pembayaran</Text>
              <Text>Rp {detail.paid_amount}</Text>
            </View>
            <View>
              <Text style={styles.textTitle}>Kembalian</Text>
              <Text>Rp {detail.paid_amount - detail.total_price}</Text>
            </View>
          </View>
        </View>
        <View style={{alignSelf: 'flex-start', marginLeft: 24}}>
          <Text style={styles.textTitle}>Daftar Belanja</Text>
        </View>
        <View style={styles.conProduct}>
          <ScrollView>
            {detail.products &&
              detail.products.map((product, i) => (
                <View style={styles.product} key={i}>
                  <Image
                    source={{uri: product.img_product}}
                    style={styles.img}
                  />
                  <View>
                    <Text
                      numberOfLines={1}
                      style={{fontWeight: 'bold', color: COLORS.LIGHT}}>
                      {product.product}
                    </Text>
                    <Text>Jumlah: {product.quantity}</Text>
                  </View>
                </View>
              ))}
          </ScrollView>
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
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalText: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 24,
    color: COLORS.DARK,
  },
  line: {
    width: 80,
    height: 4,
    borderRadius: 50,
    backgroundColor: COLORS.ORANGE,
    marginBottom: 15,
    marginTop: 8,
  },
  detail: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 200,
  },
  textTitle: {
    fontWeight: 'bold',
    color: COLORS.DARK,
    marginTop: 12,
  },
  conProduct: {
    maxHeight: 150,
    alignSelf: 'flex-start',
    marginLeft: 28,
  },
  product: {
    marginBottom: 12,
    flexDirection: 'row',
    paddingRight: 12,
  },
  img: {
    width: 30,
    height: 35,
    marginRight: 6,
  },
  button: {
    marginLeft: 180,
    paddingVertical: 8,
    borderRadius: 4,
    backgroundColor: COLORS.DANGER,
    paddingHorizontal: 12,
    marginBottom: 20,
  },
  textBtn: {
    fontWeight: 'bold',
    color: COLORS.WHITE,
    fontSize: 16,
  },
});

export default ModalDetailTransaction;
