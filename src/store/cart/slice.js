import { createSlice } from '@reduxjs/toolkit';

const items = localStorage.getItem('items') != null ? JSON.parse(localStorage.getItem('items')) : [];

const setItem = (item) => {
    localStorage.setItem('items', JSON.stringify(item));
}

const initialState = {
    items: items,
    totalQuantity: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(
                (item) => item.id === newItem.id && item.size === newItem.size
            );
            if (existingItem) {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.price * existingItem.quantity;
            } else {
                state.items.push({
                    id: action.payload.id,
                    name: action.payload.name,
                    price: action.payload.price,
                    size: newItem.size,
                    totalPrice: action.payload.totalPrice,
                    quantity: 1,
                });
            }

            setItem(state.items.map(item => item));
        },
        removeFromCart(state, action) {
            const findItemToDelete = state.items.find(
                (item) => item.id === action.payload.id && item.size === action.payload.size
            );

            state.items = state.items.filter(
                (item) => item.id != action.payload.id || item.size != action.payload.size
            );

            setItem(state.items.map(item => item));
        },
        updateQuantity(state, action) {
            const findItem = state.items.find((item) => item.id === action.payload.id && item.size === action.payload.size);

            if (findItem) {
                findItem.quantity = action.payload.quantity;
                findItem.totalPrice = findItem.price * findItem.quantity;
            }
            setItem(state.items.map(item => item));
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;
export default cartSlice.reducer;