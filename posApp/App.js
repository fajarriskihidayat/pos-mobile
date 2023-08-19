import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import COLORS from './src/configs/COLORS';

import SplashScreen from './src/screens/SplashScreen';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import Homepage from './src/screens/Homepage';
import Transaction from './src/screens/Transaction';
import Account from './src/screens/Account';
import Cart from './src/screens/Cart';
import ProductCategory from './src/screens/ProductCategory';
import Favorite from './src/screens/Favorite';
import Search from './src/screens/Search';
import {Button} from 'react-native';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const isCheckUser = async () => {
  return await AsyncStorage.getItem('username');
};

const RootHome = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      screenOptions={{
        tabBarActiveTintColor: COLORS.DARK,
        tabBarInactiveTintColor: COLORS.LIGHT,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#fff',
          height: 64,
          borderTopWidth: 0,
        },
        tabBarItemStyle: {
          paddingVertical: 10,
        },
        tabBarHideOnKeyboard: true,
      }}>
      <Tab.Screen
        name="HomeScreen"
        component={Homepage}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: ({color}) => (
            <Icon name="home-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Transaction"
        component={Transaction}
        options={{
          tabBarLabel: 'Transaksi',
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: ({color}) => (
            <Icon name="clipboard-text-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Favorite"
        component={Favorite}
        options={{
          tabBarLabel: 'Favorite',
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: ({color}) => (
            <Icon name="cards-heart-outline" color={color} size={28} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Akun',
          tabBarLabelStyle: {
            fontSize: 12,
          },
          tabBarIcon: ({color}) => (
            <Icon name="account-outline" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTintColor: COLORS.WHITE,
          headerStyle: {backgroundColor: COLORS.DARK},
        }}>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Homepage"
          component={RootHome}
          options={{
            headerTitle: 'Market App',
            headerTitleAlign: 'center',
            headerTintColor: COLORS.WHITE,
            headerStyle: {
              backgroundColor: COLORS.DARK,
            },
            headerLeft: null,
          }}
        />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{headerTitle: 'Keranjang'}}
        />
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen
          name="ProductCategory"
          component={ProductCategory}
          options={{headerTitle: 'Daftar Produk'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
