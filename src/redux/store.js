import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import bikesReducer from './bikes/bikes-reducer';
import logger from 'redux-logger';
import storage from 'redux-persist/lib/storage';
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

const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
  logger,
];

const bikesPersistConfig = {
  key: 'bikes',
  storage,
  whitelist: ['bikesData'],
};

const store = configureStore({
  reducer: {
    bikes: persistReducer(bikesPersistConfig, bikesReducer),
  },
  middleware,
  devTools: process.env.NODE_ENV === 'development',
});

const persistor = persistStore(store);

export default { persistor, store };
