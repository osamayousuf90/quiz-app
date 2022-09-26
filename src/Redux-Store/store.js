import { configureStore } from '@reduxjs/toolkit'
import pointsSlice from './pointsSlice';

const store = configureStore({
  reducer: {
    points : pointsSlice
  },
})



export default store;