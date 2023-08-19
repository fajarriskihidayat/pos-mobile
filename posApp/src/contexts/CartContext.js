import React, {createContext, useContext, useReducer} from 'react';
import cartReducer from '../reducers/cartReducer';

const CartContext = createContext(null);
const CartDispatchContext = createContext(null);

const initialState = [];

const CartProvider = ({children}) => {
  const [carts, dispatch] = useReducer(cartReducer, initialState);

  return (
    <CartContext.Provider value={carts}>
      <CartDispatchContext.Provider value={dispatch}>
        {children}
      </CartDispatchContext.Provider>
    </CartContext.Provider>
  );
};

export default CartProvider;

export function useCart() {
  return useContext(CartContext);
}

export function useCartDispatch() {
  return useContext(CartDispatchContext);
}
