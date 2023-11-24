import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { saveTokenToAsyncStorage } from "../../service/auth";
import addTokenToAxiosInterceptor from "../../config/axios/interceptor";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const trackingOrder = createAsyncThunk('order/tracking', async (id) => {
  try {
    const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + `/api/order/tracking/${id}`,
    {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (err) {
    if (err.response) {
      const { data } = err.response;
      if (data && data.message) {
        alert(data.message);
      } else {
        console.error('Server error:', data);
      }
    } else {
      console.error('No response:', err);
    }
  }
});

export const createOrder = createAsyncThunk('order/create', async (data) => {
  try {
    const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/order',
      data
    , {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return response.data
  } catch (err) {
    if (err.response) {
      const { data } = err.response;
      if (data && data.message) {
        alert(data.message);
      } else {
        console.error('Server error:', data);
      }
    } else {
      console.error('No response:', err);
    }
  }
});

export const fetchOrderList = createAsyncThunk(
  'user/fetchOrderList',
  async () => {
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/order', {
        headers: {
          // 'Authorization': 'Bearer ' + AsyncStorage.getItem('token'),
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      })


      if (response.status == 200) {
        let orderList = response.data.data.order;
        let dataOrder = [];
        for (let i = 0; i < orderList.length; i++) {
          dataOrder.push({
            orderId: orderList[i].id,
            trackId: orderList[i].id,
            status: orderList[i].status?.status,
            subStatus: orderList[i].noteForDriver
          });
        }
        return {
          fromMe: dataOrder,
          toMe: dataOrder,
          countItem: dataOrder.length
        };
      }
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        if (data && data.message) {
          alert(data.message);
        } else {
          console.error('Server error:', data);
        }
      } else {
        console.error('No response:', err);
      }
    }
  }
);

export const fetchOrderDetail = createAsyncThunk(
  'user/fetchOrderDetail',
  async (data: any) => {
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/order/' + data.trackId, {
        headers: {
          // 'Authorization': 'Bearer ' + AsyncStorage.getItem('token'),
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      })


      if (response.status == 200) {
        let orderDetail = response.data.data.order[0];
        let orderDestination = orderDetail.orderDestination;
        let orderUser = response.data.data.user;
        let weight = 1;
        if(orderDetail.estWeight <= 1000 && orderDetail.estWeight >= 501) {
          weight = 2;
        }
        else if(orderDetail.estWeight <= 1500 && orderDetail.estWeight >= 1001) {
          weight = 3;
        }
        else if(orderDetail.estWeight >= 1501) {
          weight = 4;
        }
        let dataOrderDesti = [];
        let dataDetail = {};
        for (let i = 0; i < orderDestination.length; i++) {
          dataOrderDesti.push({
            address: orderDestination[i]?.packageDestination,
            type: orderDestination[i]?.driverNote,
            name: orderDestination[i]?.receiver?.name,
            phone: orderDestination[i]?.receiver?.phoneNumber
          });
        }

        dataDetail = {
          trackId: orderDetail.id,
          status: orderDetail.status?.status,
          pickUpLocation: [{
            address: orderDetail.pickupLocation,
            type: '',
            name: orderUser.fullName,
            phone: orderUser.phoneNumber
          }],
          destination: dataOrderDesti,
          weight: weight,
          dimensionX: orderDetail.orderDimension?.width,
          dimensionY: orderDetail.orderDimension?.length,
          dimensionZ: orderDetail.orderDimension?.height,
          type: orderDetail.typeOrder,
          note: orderDetail.noteForDriver,
        }
        return {
          detail: dataDetail
        };
      }
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        if (data && data.message) {
          alert(data.message);
        } else {
          console.error('Server error:', data);
        }
      } else {
        console.error('No response:', err);
      }
    }
  }
);

export const cancelOrder = createAsyncThunk('order/cancel', async (data: any) => {
  console.log('hiii');
  
  try {
    const response = await axios.patch(process.env.EXPO_PUBLIC_API_URL + '/api/order/cancel/' + data.trackId,
    {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    console.log('hiiiii', response);
    
    return response.data;
  } catch (err) {
    if (err.response) {
      const { data } = err.response;
      if (data && data.message) {
        alert(data.message);
      } else {
        console.error('Server error:', data);
      }
    } else {
      console.error('No response:', err);
    }
  }
});

export const fetchOrderDriver = createAsyncThunk(
  'user/fetchOrderDriver',
  async () => {
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/order-driver-vehicle/driver', {
        headers: {
          // 'Authorization': 'Bearer ' + AsyncStorage.getItem('token'),
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      })


      if (response.status == 200) {
        let orderList = response.data.orderDriverVehicle;
        let dataOrder = [];
      
        for (let i = 0; i < orderList.length; i++) {
          dataOrder.push({
            orderId: orderList[i].order.id,
            trackId: orderList[i].order.id,
            // status: orderList[i].order.status?.status,
            status: orderList[i].order.status?.status,
            subStatus: orderList[i].order.noteForDriver,
            userId: orderList[i].order.userId
          });
        }
        // console.log(dataOrder)
        return {
          fromMe: dataOrder
        };
      }
    } catch (err) {
      if (err.response) {
        const { data } = err.response;
        if (data && data.message) {
          alert(data.message);
        } else {
          console.error('Server error:', data);
        }
      } else {
        console.error('No response:', err);
      }
    }
  }
);