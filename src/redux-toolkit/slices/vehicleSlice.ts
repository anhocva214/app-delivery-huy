import { createSlice } from '@reduxjs/toolkit';
import { fetchVehicle } from '../actions/vehicle';

const vehicleSlice = createSlice({
  name: 'vehicle',
  initialState: {
    vehicleCountItem: 0,
    vehicle: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicle.pending, (state, action) => {})
      .addCase(fetchVehicle.fulfilled, (state, { payload }) => {
        state.vehicle = payload.vehicle;
        state.vehicleCountItem = payload.countItem;
      })
      .addCase(fetchVehicle.rejected, (state) => {})
  },
});

export default vehicleSlice.reducer;
