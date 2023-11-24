import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { saveTokenToAsyncStorage } from "../../service/auth";
import addTokenToAxiosInterceptor from "../../config/axios/interceptor";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const fetchServiceAddition = createAsyncThunk(
  'service-addition/fetchServiceAddition',
  async () => {
    // console.log('hiiiiii');
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/service-addition', {
        headers: {
          // 'Authorization': 'Bearer ' + AsyncStorage.getItem('token'),
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "application/json"
        }
      })

    //   console.log(response);

      if (response.status == 200) {
        let serviceAdditionList = response.data.data.serviceAddition;
        // console.log(vehicleList.length);
        let dataServiceAddition = [];
        for (let i = 0; i < serviceAdditionList.length; i++) {
          dataServiceAddition.push({
            id: serviceAdditionList[i].id,
            trackId: serviceAdditionList[i].id,
            name: serviceAdditionList[i].name,
            // isActive: serviceAdditionList[i].isActive,
            price: serviceAdditionList[i].price,
            image: serviceAdditionList[i].image,
            description: serviceAdditionList[i].description,
          });
        }
        return {
          serviceAddition: dataServiceAddition,
          countItem: dataServiceAddition.length
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

