// persistConfig.js
import storage from 'redux-persist/lib/storage'; // Use local storage as the storage engine

const persistConfig = {
  key: 'cart',
  storage,
  // Optionally, you can blacklist certain reducers that shouldn't be persisted
  blacklist: ['cart'],
};

export default persistConfig;
