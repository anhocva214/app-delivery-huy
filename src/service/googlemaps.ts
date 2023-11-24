import axios from "axios";
import * as Location from 'expo-location';
import { GOOGLE_API_KEY } from "../config/env/env";

const getCoordinatesFromAddress = async (address) => {
    try {
      const response = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          address: address,
          key: GOOGLE_API_KEY,
        },
      });
  
      if (response.data.results.length > 0) {
        const { lat, lng } = response.data.results[0].geometry.location;
        return { latitude: lat, longitude: lng };
      }
    } catch (error) {
      console.error('Lỗi khi lấy tọa độ từ địa chỉ:', error);
    }
    return null;
  };

const getAddressFromCoordinate = async (coord) => {
    const API_KEY = GOOGLE_API_KEY; // Thay YOUR_GOOGLE_MAPS_API_KEY bằng API key của bạn
      let response;
      if (coord != undefined) {
        const API_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coord.latitude},${coord.longitude}&key=${API_KEY}`;
        response = await fetch(API_URL);
      }
      if (response?.status === 200) {
        const data = await response.json();
        if (data.status === 'OK') {
          const address = data.results[0];
          return address;
        } else {
          // Xử lý lỗi khi không tìm thấy địa chỉ
          console.error('Không tìm thấy địa chỉ.');
          return null;
        }
  }
}

export {getCoordinatesFromAddress, getAddressFromCoordinate};