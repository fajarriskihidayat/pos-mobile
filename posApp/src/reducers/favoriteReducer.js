const favoriteReducer = (state, action) => {
  switch (action.type) {
    case 'add': {
      const index = state.findIndex(obj => obj.id === action.payload.id);
      if (index === -1) {
        return [...state, {...action.payload}];
      } else {
        return state;
      }
    }
    case 'remove': {
      return state.filter(obj => obj.id !== action.payload.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
};

export default favoriteReducer;
