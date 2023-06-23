import { configureStore } from '@reduxjs/toolkit';
import { billSlice } from '../Features/bills/billSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { combineReducers } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['billState'],
};

const rootReducer = combineReducers({
  billState: billSlice.reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});
