import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import IntroScreen from './screens/Intro';
import MainScreen from './screens/MainApp';

import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { globalStyles } from './public/scss/style';
import { NativeBaseProvider, Toast } from 'native-base';
import SignUpScreen from './screens/SignUp';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { store } from './redux-toolkit/store/store';
import BottomTabs from './screens/partials/BottomTabs';
import CreateOrder from './screens/home/CreateOrder';
import Screen2 from './screens/home/test2';
import OrderInformation from './screens/home/orderDetail/moreDetails/OrderType';
import DestinationInfo from './screens/home/orderDetail/moreDetails/DestinationInfo';
import HomeScreen from './screens/Home';

import OrderDetailScreen from './screens/order/OrderDetailScreen';
import OrderScreen from './screens/order';
import ProfileInfoScreen from './screens/profile/info';
import ChangePasswordScreen from './screens/profile/change-password';
import LanguageScreen from './screens/profile/language';
import ReviewsScreen from './screens/profile/reviews';
import HelpCenterScreen from './screens/HelpCenter';
import ChooseVehicleScreen from './screens/home/ChooseVehicle';
import DetailPickupPage from './screens/home/orderDetail/moreDetails/DetailPickupInfo';
import PaymentScreen from './screens/home/Payment';
import TrackingLogScreen from './screens/driver/TrackingLog/TrackingLogScreen';
import DriverOrderScreen from './screens/driver/DriverOrder';
import DriverBottomTabs from './screens/driver/DriverBottomTabs';
import DriverHomeScreen from './screens/driver/DriverHomeScreen';
import TrackingLogDetailScreen from './screens/driver/TrackingLog/TrackingLogDetail';
import { useDispatch, useSelector } from 'react-redux';
import { getUserInfo, submitUserInfo } from './redux-toolkit/actions/user';

import io from 'socket.io-client';
import MessageDetailScreen from './screens/home/messages/MessageDetail';
const socket = io(process.env.EXPO_PUBLIC_API_URL as string);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const { height, width } = Dimensions.get('window');



const App = () => {

  

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to Socket.IO server');
    });
  
    // Xử lý các sự kiện khác từ server
    socket.on('alert', (data) => {
      // console.log('Received data:', data);
      // Toast.show({description: data})
      // console.log("Socket listener: " + {description: data});
    });
  
    return () => {
      socket.disconnect();
    };
  }, []);

  

  return (
    <View style={globalStyles.container}>
      <Provider store={store}>
        <NativeBaseProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Intro" component={IntroScreen} />
              <Stack.Screen name="MainScreen" component={MainScreen} />
              <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
              <Stack.Screen name="BottomTabs" component={BottomTabs} />
              <Stack.Screen name="CreateOrder" component={CreateOrder} />
              <Stack.Screen name="test2" component={Screen2} />
              <Stack.Screen
                name="DestinationInfo"
                component={DestinationInfo}
              />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen
                name="OrderDetailScreen"
                component={OrderDetailScreen}
              />
              <Stack.Screen name="OrderScreen" component={OrderScreen} />
              <Stack.Screen
                name="ProfileInfoScreen"
                component={ProfileInfoScreen}
              />
              <Stack.Screen
                name="ChangePasswordScreen"
                component={ChangePasswordScreen}
              />
              <Stack.Screen name="LanguageScreen" component={LanguageScreen} />
              <Stack.Screen name="ReviewsScreen" component={ReviewsScreen} />
              <Stack.Screen
                name="HelpCenterScreen"
                component={HelpCenterScreen}
              />
              <Stack.Screen
                name="ChooseVehicleScreen"
                component={ChooseVehicleScreen}
              />
              <Stack.Screen
                name="DetailPickupPage"
                component={DetailPickupPage}
              />
              <Stack.Screen
                name="DriverHomeScreen"
                component={DriverHomeScreen}
              />
              <Stack.Screen name="PaymentScreen" component={PaymentScreen} />
              <Stack.Screen
                name="DriverBottomTabs"
                component={DriverBottomTabs}
              />
              <Stack.Screen
                name="TrackingLogScreen"
                component={TrackingLogScreen}
              />
              <Stack.Screen
                name="TrackingLogDetailScreen"
                component={TrackingLogDetailScreen}
              />
              <Stack.Screen
                name="DriverOrderScreen"
                component={DriverOrderScreen}
              />
              <Stack.Screen
                name="MessageDetailScreen"
                component={MessageDetailScreen}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </NativeBaseProvider>
      </Provider>
    </View>
  );
};

const appStyles = StyleSheet.create({
  bottomNavTabIcon: {
    height: 20,
    width: 20,
  },
});

export default App;
