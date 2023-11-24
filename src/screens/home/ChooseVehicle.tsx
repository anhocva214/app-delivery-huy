// SignUp.js
import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  BackHandler,
  Alert,
  Image,
  SafeAreaView,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {
  Box,
  Button,
  Input,
  Icon,
  VStack,
  HStack,
  Divider,
  Center,
} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import image from '../public/images/backgroundProfile.png';
import { checkTokenExpired, getTokenFromAsyncStorage } from '../../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import VehicleList from './VehicleList';
import { fetchVehicle } from '../../redux-toolkit/actions/vehicle';
import { fetchVehicleType } from '../../redux-toolkit/actions/vehicle-type';
import { resetCreateOrder } from '../../redux-toolkit/slices/orderSlice';
import { createOrder } from '../../redux-toolkit/actions/order';

const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window');

const ChooseVehicleScreen = ({ route, navigation }) => {
    const [selectedVehicle, setSelectedVehicle] = useState(null);

    const handleSelectVehicle = (vehicle) => {
        setSelectedVehicle(vehicle);
    };

  const dispatch = useDispatch();
  const {vehicleTypeCountNumber, vehicleType} = useSelector((stateRedux: any) => stateRedux.vehicleTypeReducer);  
  const { data } = route.params;

  const order = useSelector((stateRedux: any) => stateRedux.orderReducer);

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchVehicleType());
    // @ts-ignore
    // console.log(dispatch(fetchVehicle()));
  }, []);

  useEffect(() => {
    const checkToken = checkTokenExpired()
    if (!checkToken) {
      alert("Hết phiên đăng nhập")
      navigation.navigate('SignUpScreen', {tab: 1})
    }
  }, [])

  // const handleSubmit = () => {
  //   data.vehicle = selectedVehicle;
  //   // @ts-ignore
  //   dispatch(createOrder(data));
  // }

  useEffect(() => {
    if (order.createOrder?.order?.statusCode == 200) {
      // @ts-ignore
      dispatch(resetCreateOrder())
      alert(order.createOrder.order.message);
      navigation.navigate('HomeScreen');
    }
  }, [order.createOrder.loading])

  const goBack = () => {
    navigation.goBack();
  };
  
  const handleSubmitVehicle = () => {
    if(selectedVehicle == null){
      alert('Please select 1 vehicle type!');
    }
    else {
      data.vehicle = selectedVehicle;
      console.log("🚀 ~ file: ChooseVehicle.tsx:70 ~ handleSubmit ~ data:", data)
      // @ts-ignore
      dispatch(createOrder(data));
      navigation.navigate('PaymentScreen');
    }
  };

  return (
    <SafeAreaView style={styles.containerParent}>
      <View
        style={[styles.container, { marginTop: 20 }]}
        // showsVerticalScrollIndicator={false}
        // showsHorizontalScrollIndicator={false}
      >
        <View style={styles.titleWrapper}>
          <Pressable style={styles.goBack} onPress={goBack}>
            <Image
              style={styles.imageBack}
              source={require('../../public/images/Back.png')}
            />
          </Pressable>
          <View style={{ width: '85%' }}>
            <Text style={styles.headerTitle}>Choose Vehicle</Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.title}>All Options </Text>
          <VStack space={3} alignItems="center" marginTop={15} marginBottom={3}>
            {/* {console.log(vehicle)} */}
            <VehicleList vehicle={vehicleType} onSelectVehicle={handleSelectVehicle}/>
            {selectedVehicle && (
                <View>
                    <Text>Selected Vehicle: {selectedVehicle.name}</Text>
                </View>
            )}
          </VStack>
          <View style={{marginBottom: 100}}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmitVehicle}
            >
                <Text style={styles.buttonText}>
                    Continue
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerParent: {
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    // width: '100%',
    fontSize: 25,
    fontWeight: '700',
    // borderWidth: 1,
    textAlign: 'center',
    marginRight: width * 0.1,
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    // justifyContent: 'center'
    // float: 'right'
  },
  goBack: {
    width: '15%',
    backgroundColor: 'transparent',
  },
  imageBack: {
    height: 50,
    width: 50,
    borderColor: '#F3F3F3',
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    height: height,
  },
  button: {
    backgroundColor: '#F79E1B',
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 30,
    justifyContent: 'center',
    borderColor: '#F79E1B',
    borderWidth: 1,
  },
  buttonText: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
  containerContent: {
    // paddingTop: 10,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    //textAlign: "center",
    marginTop: 20,
  },
});

export default ChooseVehicleScreen;
