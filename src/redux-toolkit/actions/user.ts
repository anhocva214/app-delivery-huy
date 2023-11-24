import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { saveTokenToAsyncStorage } from "../../service/auth";
import addTokenToAxiosInterceptor from "../../config/axios/interceptor";
import AsyncStorage from '@react-native-async-storage/async-storage';


export const getUserInfo = createAsyncThunk(
  'user/getUserInformation',
  async () => {
    // const response = await fetch('https://example.com/api/users');
    // const data = await response.json();
    try {
      const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + '/api/users/get-auth', {
        headers: {
          "Accept": "application/json"
        }
      })

      if (response.status == 200) {
        let user = response.data.data.user;
        return {
          user: user
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

export const submitUserInfo = createAsyncThunk(
  'user/submitUserInfo',
  async (data) => {
    try {
      const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/users/edit',
        data
        , {
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        })
    
      if (response.data.status == 200) {
        let result = response.data.data;
        saveTokenToAsyncStorage(response.data.data.accessToken)
        alert(response.data.message);
        return {
          newAuth: result.user,
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