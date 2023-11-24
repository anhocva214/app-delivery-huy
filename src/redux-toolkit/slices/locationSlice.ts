import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
  name: 'location',
  initialState: {
    pickupLocation: null,
  },
  reducers: {
    updatePickupLocation: (state, action) => {
        state.pickupLocation = action.payload;
      },
  },
  extraReducers: () => {},
});

export const { updatePickupLocation } = locationSlice.actions;
export default locationSlice.reducer;
