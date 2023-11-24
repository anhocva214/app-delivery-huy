import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from 'axios';
import { saveTokenToAsyncStorage } from "../../service/auth";
import addTokenToAxiosInterceptor from "../../config/axios/interceptor";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const fetchUserList = createAsyncThunk('user/fetchUserList', async () => {
    const response = await fetch('https://example.com/api/users');
    const data = await response.json();
    return data;
});

export const fetchUserById = createAsyncThunk('user/fetchUserById', async (userId) => {
    const response = await fetch(`https://example.com/api/users/${userId}`);
    const data = await response.json();
    return data;
});

export const signUp = createAsyncThunk('auth/register', async ({fullName, email, phoneNumber, password}: {fullName: string, email: string, phoneNumber: string, password: string}) => {
    try {
        const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/users/register', {
            fullName,
            email,
            password,
            phoneNumber
        }, {
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

export const signIn = createAsyncThunk('auth/signin', async ({phoneNumber, password}: {phoneNumber: string, password: string}) => {
    try {
        const response: any = await axios.post(process.env.EXPO_PUBLIC_API_URL + '/api/users/login', {
            password,
            phoneNumber
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        if (response.data.statusCode == 200) {
            await AsyncStorage.setItem('token', response.data.data.accessToken)
        }
        return response.data
    } catch (err) {        
        if (err.response) {
            const { data } = err.response;
            if (data && data.message) {
                return {
                    statusCode: 401,
                    message: data.message
                }
            } else {
                console.error('Server error:', data);
            }
        } else {
            console.error('No response:', err);
        }
    }
});