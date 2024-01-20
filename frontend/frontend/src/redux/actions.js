export const incrementLikes = () => ({ type: 'INCREMENT_LIKES' });
export const incrementDislikes = () => ({ type: 'INCREMENT_DISLIKES' });
export const addToCart = (product) => {
    return {
      type: 'ADD_TO_CART',
      payload: product,
    };
  };