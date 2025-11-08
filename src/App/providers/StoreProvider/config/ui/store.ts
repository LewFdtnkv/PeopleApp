import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import peopleReducer from '../../slice/PeopleSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['users', 'page', 'totalUsers'],
};


export const store = configureStore({
  reducer: {
    users: persistReducer(persistConfig, peopleReducer)
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE', 'persist/REGISTER'],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
