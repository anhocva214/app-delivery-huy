import AsyncStorage from '@react-native-async-storage/async-storage';
// import jwt_decode from 'jwt-decode';

const saveTokenToAsyncStorage = async (token) => {
  try {
    const result = await AsyncStorage.setItem('token', token);
    console.log(1);
    return result
  } catch (error) {
    console.error('Error when save token to AsyncStorage:', error);
  }
}

const getTokenFromAsyncStorage = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      return token;
    } catch (error) {
      console.error('Error when get token from AsyncStorage:', error);
      return null;
    }
  }

const checkTokenExpired = async () => {
    // const token = await AsyncStorage.getItem('token');
    // if (token) {
    //   const decoded: any = jwt_decode(token);
    //   const currentTime = Date.now() / 1000;
    //   return decoded.exp > currentTime; // Kiểm tra thời gian hết hạn
    // } 
    // else return false;
}

export { getTokenFromAsyncStorage, saveTokenToAsyncStorage, checkTokenExpired };