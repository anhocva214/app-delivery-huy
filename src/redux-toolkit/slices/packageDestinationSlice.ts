// packageDestinationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const packageDestinationsSlice = createSlice({
  name: 'packageDestinations',
  initialState: [],
  reducers: {
    updatePackageDestination: (state, action) => {
      const { index, data } = action.payload;
      state[index] = action.payload.data;
    },
    addPackageDestination: (state, action) => {
      state.push(action.payload);
    },
    removePackageDestination: (state, action) => {
      const { index, data } = action.payload;
      state.splice(index, 1);
    },
  },
});

export const { addPackageDestination, updatePackageDestination, removePackageDestination } = packageDestinationsSlice.actions;
export default packageDestinationsSlice.reducer;
