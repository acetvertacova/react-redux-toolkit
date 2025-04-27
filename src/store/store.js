import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cart/slice';
import menuReducer from './menu/slice';

const store = configureStore({
    reducer: {
        cart: cartReducer,
        menu: menuReducer,
    },
});

export default store;