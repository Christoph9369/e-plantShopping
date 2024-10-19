import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [], // Initialize items as an empty array
    },
    reducers: {
        // Add item to the cart or update its quantity if it already exists
        addItem: (state, action) => {
            const item = action.payload;
            const existingItem = state.items.find(i => i.name === item.name);

            if (existingItem) {
                // If the item is already in the cart, just update the quantity
                existingItem.quantity += item.quantity;
            } else {
                // Otherwise, add the item to the cart with an initial quantity
                state.items.push({ ...item, quantity: 1 });
            }
        },
        // Remove item from the cart

        removeItem: (state, action) => {
            const itemName = action.payload;
            state.items = state.items.filter(item => item.name !== itemName);
        },
        // Update the quantity of an item in the cart
        updateQuantity: (state, action) => {      
            const { name, quantity } = action.payload;
            const existingItem = state.items.find(item => item.name === name);

            if (existingItem) {
                existingItem.quantity = quantity;
            }
        },
    },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
