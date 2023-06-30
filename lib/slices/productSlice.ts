import { createSlice } from '@reduxjs/toolkit';
import productType from '@/types/productType';

interface StateType {
  products: productType[];
}
const initialState: StateType = {
  products: [],
};

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    loadProducts: (state, action) => {
      return action.payload;
    },
  },
});

export default productSlice.reducer;

export const { loadProducts } = productSlice.actions;
