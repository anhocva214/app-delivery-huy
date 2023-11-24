import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { saveTokenToAsyncStorage } from "../../service/auth";
import addTokenToAxiosInterceptor from "../../config/axios/interceptor";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchVehicle = createAsyncThunk(
  'vehicle/fetchVehicle',
  async () => {
    // console.log('hiiiiii');
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/vehicle', {
        headers: {
          // 'Authorization': 'Bearer ' + AsyncStorage.getItem('token'),
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      })

    //   console.log(response);

      if (response.status == 200) {
        let vehicleList = response.data.data.vehicle;
        let dataVehicle = [];
        for (let i = 0; i < vehicleList.length; i++) {
          dataVehicle.push({
            id: vehicleList[i].id,
            trackId: vehicleList[i].id,
            name: vehicleList[i].name,
            weight: vehicleList[i].weight,
            isActive: vehicleList[i].isActive,
            price: vehicleList[i].price,
            image: vehicleList[i].image,
            description: vehicleList[i].description,
            status: vehicleList[i].status?.status,
          });
        }
        return {
          vehicle: dataVehicle,
          countItem: dataVehicle.length
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
