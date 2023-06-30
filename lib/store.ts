import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import products from './slices/productSlice';
import category from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    cart,
    products,
    filters: category,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
