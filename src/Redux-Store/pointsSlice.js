import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    points : 0
}
  
  export const pointsSlice = createSlice({
    name: 'points',
    initialState,
    reducers: {
        increase: (state, action) => {
        state.points = (action.payload);
      },
    }
    }
  )
  export const { increase } = pointsSlice.actions
  export default pointsSlice.reducer