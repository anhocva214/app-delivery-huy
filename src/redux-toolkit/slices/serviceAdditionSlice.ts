import { createSlice } from '@reduxjs/toolkit';
import { fetchServiceAddition } from '../actions/service-addition';

const serviceAdditionSlice = createSlice({
  name: 'service-addition',
  initialState: {
    serviceAdditionCountItem: 0,
    serviceAddition: {}
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchServiceAddition.pending, (state, action) => {})
      .addCase(fetchServiceAddition.fulfilled, (state, { payload }) => {
        state.serviceAddition = payload.serviceAddition;
        state.serviceAdditionCountItem = payload.countItem;
      })
      .addCase(fetchServiceAddition.rejected, (state) => {})
  },
});

export default serviceAdditionSlice.reducer;
