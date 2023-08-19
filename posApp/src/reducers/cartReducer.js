const cartReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const index = state.findIndex(obj => obj.id === action.payload.id);
      if (index === -1) {
        return [...state, {...action.payload, quantity: 1}];
      } else {
        return state.map(obj => {
          if (obj.id === action.payload.id) {
            return {...obj, quantity: obj.quantity + 1};
          } else {
            return obj;
          }
        });
      }
    }
    case 'decrease': {
      const index = state.findIndex(obj => obj.id === action.payload.id);
      if (index !== -1) {
        if (state[index].quantity === 1) {
          return state.filter(obj => obj.id !== action.payload.id);
        } else {
          return state.map(obj => {
            if (obj.id === action.payload.id) {
              return {...obj, quantity: obj.quantity - 1};
            } else {
              return obj;
            }
          });
        }
      }
    }
    case 'delete': {
      return state.filter(obj => obj.id !== action.payload.id);
    }
    case 'clear': {
      return [];
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export default cartReducer;
