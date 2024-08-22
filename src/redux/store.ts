import { configureStore } from '@reduxjs/toolkit';
import filterReducer from './slices/filter/slices';
import cartReducer from './slices/cart/slices';
import pizzaReducer from './slices/pizza/slices';
import { useDispatch } from 'react-redux';

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: cartReducer,
    pizza: pizzaReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
