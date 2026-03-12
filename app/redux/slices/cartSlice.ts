import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { CartItem } from '~/types/ServiceType';
import { MOCK_CART_ITEMS } from '~/constants/mock-data';

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: MOCK_CART_ITEMS,
  isOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    updateQuantity: (state, action: PayloadAction<{ id: string; quantity: number }>) => {
      const { id, quantity } = action.payload;
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity = quantity;
      }
    },
    removeItem: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.items = state.items.filter(item => item.id !== id && item.parentId !== id);
    },
    addItem: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload);
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { setCartOpen, updateQuantity, removeItem, addItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
