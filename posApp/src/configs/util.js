import COLORS from './COLORS';

export const isDIsableButton = data => {
  const styles = {
    btnLogin: {
      width: '100%',
      backgroundColor: COLORS.ORANGE,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
    btnDisable: {
      width: '100%',
      backgroundColor: COLORS.LIGHT,
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 4,
    },
  };

  return data == 1 ? styles.btnLogin : styles.btnDisable;
};

export const isIconHandler = (favorites, product) => {
  return favorites.some(item => item.id === product.id);
};
