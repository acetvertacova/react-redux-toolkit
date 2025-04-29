import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchMenu = createAsyncThunk('menu/fetchMenu',
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch('https://67f7f21a2466325443eb595e.mockapi.io/api/menu');
            const data = await response.json();

            if (!response.ok) {
                throw new Error('Server Error!');
            }

            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const addMenuItem = createAsyncThunk('menu/addMenuItem',
    async (item, { rejectWithValue, dispatch }) => {
        try {
            const menuItem = {
                name: item.name,
                description: item.description,
                price: item.price,
                image: item.image,
                category: item.category,
                sizes: item.sizes,
            };

            const response = await fetch('https://67f7f21a2466325443eb595e.mockapi.io/api/menu', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(menuItem)
            });

            if (!response.ok) {
                throw new Error("Can't add menu item. Server Error!");
            }

            const data = await response.json();
            dispatch(addItem(data));

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

export const selectMenu = state => state.menu.menu;