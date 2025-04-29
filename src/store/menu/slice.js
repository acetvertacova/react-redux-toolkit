import { createSlice } from '@reduxjs/toolkit';
import { fetchMenu } from './actions';

const menuSlice = createSlice({
    name: 'menu',
    initialState: {
        menu: [],
        status: null,
        error: null,
    },
    reducers: {
        addItem(state, action) {
            state.menu.push(action.payload);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchMenu.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(fetchMenu.fulfilled, (state, action) => {
                state.status = 'resolved';
                state.menu = action.payload;
            })
            .addCase(fetchMenu.rejected, (state, action) => {
                state.status = 'rejected';
                state.error = action.payload;
            })
    },
});

export default menuSlice.reducer;