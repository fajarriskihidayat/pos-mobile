import React, {createContext, useContext, useReducer} from 'react';
import favoriteReducer from '../reducers/favoriteReducer';

const FavoriteContext = createContext(null);
const FavoriteDispatchContext = createContext(null);

const initialState = [];

const FavoriteProvider = ({children}) => {
  const [favorites, dispatch] = useReducer(favoriteReducer, initialState);

  return (
    <FavoriteContext.Provider value={favorites}>
      <FavoriteDispatchContext.Provider value={dispatch}>
        {children}
      </FavoriteDispatchContext.Provider>
    </FavoriteContext.Provider>
  );
};

export default FavoriteProvider;

export function useFavorite() {
  return useContext(FavoriteContext);
}

export function useFavoriteDispatch() {
  return useContext(FavoriteDispatchContext);
}
