import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import packageDestinationsReducer from '../slices/packageDestinationSlice';
import orderReducer from '../slices/orderSlice';
import userReducer from '../slices/userSlice';
import vehicleReducer from '../slices/vehicleSlice';
import vehicleTypeReducer from '../slices/vehicleTypeSlice';
import locationReducer from '../slices/locationSlice';
import serviceAdditionReducer from '../slices/serviceAdditionSlice';

export const store = configureStore({
  reducer: {
    authReducer: authReducer,
    packageDestinations: packageDestinationsReducer,
    orderReducer: orderReducer,
    userReducer: userReducer,
    vehicleReducer: vehicleReducer,
    vehicleTypeReducer: vehicleTypeReducer,
    serviceAdditionReducer: serviceAdditionReducer,
    location: locationReducer,
  },
});