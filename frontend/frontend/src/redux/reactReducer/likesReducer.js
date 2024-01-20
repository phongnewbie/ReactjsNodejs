const initialState = {
  likes: 0,
  dislikes: 0,
};

const likesReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INCREMENT_LIKES':
      return { ...state, likes: state.likes + 1 };
    case 'INCREMENT_DISLIKES':
      return { ...state, dislikes: state.dislikes + 1 };
    default:
      return state;
  }
};

export default likesReducer;