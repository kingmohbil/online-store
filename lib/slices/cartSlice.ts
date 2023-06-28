import { createSlice } from '@reduxjs/toolkit';
import CartItem from '@/types/cartType';

const initialState: CartType = {
  items: [],
  total: 0,
};

interface CartType {
  items: CartItem[];
  total: number;
}
interface ActionType {
  payload: CartItem;
}

interface RemovalPayload {
  payload: {
    id: string;
  };
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, { payload }: ActionType) => {
      // searching for the existence of the product
      const index = state.items.findIndex(
        (product) => product.id === payload.id
      );
      // if the product isn't found the item is added to the array
      if (index === -1) {
        state.items.push({ ...payload, count: 1 });
        state.total += payload.price;
      } else {
        const count = state.items[index].count || 1;
        state.items[index].count = count + 1;
        state.total += payload.price;
      }
    },
    removeItem: (state, { payload }: RemovalPayload) => {
      const index = state.items.findIndex((item) => item.id === payload.id);
      if (index !== -1) {
        const count = state.items[index].count || 1;
        if (count > 1) {
          state.items[index].count = count - 1;
          state.total -= state.items[index].price;
        } else if (count === 1) {
          state.total -= state.items[index].price;
          state.items = state.items.filter((item) => item.id !== payload.id);
        }
      }
    },
  },
});

export default cartSlice.reducer;

export const { addItem, removeItem } = cartSlice.actions;
