export const selectCart = (state) => state.cart.items;

export const selectCartItemsCount = (state) => state.cart.items.reduce((currentSum, item) =>
    currentSum + item.quantity
    , 0);

