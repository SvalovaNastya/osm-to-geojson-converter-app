import { configureStore } from '@reduxjs/toolkit';
import coordinatesReducer from '../components/coordinates/coordinatesSlice';

const store = configureStore({
  reducer:
    { coordinates: coordinatesReducer },
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
