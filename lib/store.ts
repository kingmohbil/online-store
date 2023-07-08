import { configureStore } from '@reduxjs/toolkit';
import cart from './slices/cartSlice';
import products from './slices/productSlice';
import category from './slices/filterSlice';

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import persistConfig from './persistConfig';

const persistedReducer = persistReducer(persistConfig, cart);

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    products,
    filters: category,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistedStore = persistStore(store);
