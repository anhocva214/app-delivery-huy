import { createSlice } from '@reduxjs/toolkit';
import { fetchOrderList, fetchOrderDetail, createOrder, cancelOrder, fetchOrderDriver, trackingOrder } from '../actions/order';

const orderSlice = createSlice({
  name: 'order',
  initialState: {
    orderFromMe: [],
    orderToMe: [],
    orderCountItem: 0,
    orderDetail: {},
    createOrder: {
      loading: false,
      order: {}
    },
    orderDriver: [],
    orderTracking: {
      loading: false,
      orderSuggestions: {}
    },
  },
  reducers: {
    resetCreateOrder: (state, action) => {
      state.createOrder.loading = false;
      state.createOrder.order = {}
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrderList.pending, (state, action) => {})
      .addCase(fetchOrderList.fulfilled, (state, { payload }) => {
        state.orderFromMe = payload.fromMe;
        state.orderToMe = payload.toMe;
        state.orderCountItem = payload.countItem;
      })
      .addCase(fetchOrderList.rejected, (state) => {})
      .addCase(fetchOrderDetail.pending, (state, action) => {})
      .addCase(fetchOrderDetail.fulfilled, (state, { payload }) => {
        state.orderDetail = payload.detail;
      })
      .addCase(fetchOrderDetail.rejected, (state) => {})
      .addCase(createOrder.pending, (state, action) => {
        state.createOrder.loading = true
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.createOrder.loading = false,
        state.createOrder.order = action.payload
      })
      .addCase(fetchOrderDriver.pending, (state, action) => {})
      .addCase(fetchOrderDriver.fulfilled, (state, { payload }) => {
        console.log(payload)
        state.orderDriver = payload.fromMe;
      })
      .addCase(fetchOrderDriver.rejected, (state) => {})
      .addCase(trackingOrder.rejected, (state) => {})
      .addCase(trackingOrder.pending, (state) => {
        state.orderTracking.loading = true;
      })
      .addCase(trackingOrder.fulfilled, (state, action) => {
        state.orderTracking.loading = false;
        state.orderTracking.orderSuggestions = action.payload;
      })
  },
});

export const { resetCreateOrder } = orderSlice.actions;
export default orderSlice.reducer;
