import { createSlice } from '@reduxjs/toolkit';
import { fetchVehicleType } from '../actions/vehicle-type';

const vehicleTypeSlice = createSlice({
  name: 'vehicle-type',
  initialState: {
    vehicleTypeCountItem: 0,
    vehicleType: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVehicleType.pending, (state, action) => {})
      .addCase(fetchVehicleType.fulfilled, (state, { payload }) => {
        state.vehicleType = payload.vehicleType;
        state.vehicleTypeCountItem = payload.countItem;
      })
      .addCase(fetchVehicleType.rejected, (state) => {})
  },
});

export default vehicleTypeSlice.reducer;
