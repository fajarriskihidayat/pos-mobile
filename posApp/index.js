/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import CartProvider from './src/contexts/CartContext';
import FavoriteProvider from './src/contexts/FavoriteContect';

const index = () => {
  return (
    <CartProvider>
      <FavoriteProvider>
        <App />
      </FavoriteProvider>
    </CartProvider>
  );
};

AppRegistry.registerComponent(appName, () => index);
