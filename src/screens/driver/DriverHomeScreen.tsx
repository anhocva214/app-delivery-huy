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
  Toast
} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import image from '../public/images/backgroundProfile.png';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { updatePickupLocation } from '../../redux-toolkit/slices/locationSlice';
import { getUserInfo, submitUserInfo } from '../../redux-toolkit/actions/user';
import io from 'socket.io-client';
const socket = io(process.env.EXPO_PUBLIC_API_URL);
const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<any>; // Use the NavigationProp type
}

const DriverHomeScreen: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();

  const order = useSelector((state: any) => state.orderReducer);
  const [orderCount, setOrderCount] = useState('25');
  const {authUser} = useSelector((stateRedux: any) => stateRedux.userReducer);

  useEffect(() => {
    // @ts-ignore
    dispatch(getUserInfo());
  }, []);

  useEffect(() => {
    setOrderCount(order?.orderCountItem?.toString());
  }, [order.orderCountItem]);

  const [hasNoti, setHasNoti] = useState(false);

  useEffect(() => {

    socket.on('connect', () => {
      // console.log('Driver connected to Socket.IO server');
    });
    const listOrder = order.orderDriver;
    if (authUser?.id) {
      socket.on(`driver-${authUser.id}`, (data) => {
        // Toast.show({ description: "Bạn có đơn cần giao" });
        alert("Bạn có đơn cần giao");
      });
    }

    return () => {
     // socket.disconnect();
    };
  }, [authUser]);

  useEffect(() => {
    // const checkToken = checkTokenExpired()
    // if (!checkToken) {
    //   navigation.navigate('SignUpScreen', {tab: 1})
    // } else {
    //   navigation.navigate('BottomTabs',{screen: 'HomeScreen'})
    // }
    axios.interceptors.request.use(async function (config) {
      const token = await AsyncStorage.getItem('token');
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      dispatch(updatePickupLocation(location));
    })();
  }, []);

  const currentPickupLocation = useSelector(
    (state: any) => state.location.pickupLocation
  );

  const goToNoti = async () => {
    console.log('--------', currentPickupLocation);
  };

  const goToTopUp = () => {
    console.log('Go to Order list');
  };

  const goToScan = () => {
    console.log('Go to Scan');
  };

  const goToOrder = () => {
    console.log('Go to Order');
    navigation.navigate('DriverBottomTabs', { screen: 'My Order' });
  };

  const goToTrackingLog = () => {
    console.log('Go to Tracking Log');
    navigation.navigate('DriverBottomTabs', { screen: 'Tracking Log' });
  };

  return (
    // <View>
    <ScrollView>
      {/* <SafeAreaView> */}
      <ImageBackground
        source={require('../../public/images/backgroundProfile.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.containerHeader}>
          <View style={styles.containerHeaderRow1}>
            <View style={styles.logo}>
              <Image
                style={styles.imageBackgroundHeader}
                source={require('../../public/images/logoCseDeli.png')}
              />
              <Text style={styles.titleHeader}>CSEDeli</Text>
            </View>
            <Pressable style={styles.noti} onPress={goToNoti}>
              <Image
                style={styles.notiIcon}
                source={
                  hasNoti
                    ? require('../../public/images/noti.png')
                    : require('../../public/images/noti1.png')
                }
              />
            </Pressable>
          </View>
          <View>
            <View style={styles.containerHeaderMyOrder}>
              <View style={styles.containerMyOrder}>
                <Text style={styles.titleHeaderMyOrder}>My Orders</Text>
                <View style={styles.containerInputMyOrder}>
                  <Box alignItems="center" style={styles.inputHeaderRow}>
                    <Input
                      borderRadius={12}
                      borderWidth={0}
                      paddingLeft={5}
                      _focus={styles.inputHover}
                      isFocused={true}
                      isReadOnly={true}
                      style={styles.inputHeader}
                      value={orderCount}
                    />
                  </Box>
                </View>
              </View>
            </View>
            <View style={styles.containerHeaderTrackNumber}>
              <Box alignItems="center" style={styles.inputHeaderRow}>
                <Input
                  borderRadius={12}
                  _focus={styles.inputTrack}
                  isFocused={true}
                  style={styles.inputTrackNumber}
                  InputLeftElement={
                    <Image
                      style={styles.imageInput}
                      source={require('../../public/images/search-normal.png')}
                    />
                  }
                  InputRightElement={
                    <Pressable onPress={goToScan}>
                      <Image
                        style={styles.imageInputRight}
                        source={require('../../public/images/scan.png')}
                      />
                    </Pressable>
                  }
                  placeholder="Enter track number"
                  placeholderTextColor={'#1D272F'}
                />
              </Box>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.containerContent}>
        <Text style={styles.featureTitle}>Features </Text>
        <VStack space={5} alignItems="center">
          <HStack space={6} style={styles.featureItems}>
            <View style={styles.featureItem}>
              <Pressable onPress={goToOrder}>
                <Image
                  style={styles.featureIcon}
                  source={require('../../public/images/box.png')}
                />
                <Text style={styles.titleFeatureItem}>My Orders</Text>
              </Pressable>
            </View>
            <View style={styles.featureItem}>
              <Pressable onPress={goToTrackingLog}>
                <Image
                  style={styles.featureIcon}
                  source={require('../../public/images/sms-tracking.png')}
                />
                <Text style={styles.titleFeatureItem}>Tracking Log</Text>
              </Pressable>
            </View>
          </HStack>
        </VStack>
        <Text style={styles.title}>Recently Orders </Text>
        <VStack space={5} alignItems="center" marginTop={15}>
          <View style={styles.orderListItem}>
            <HStack space={1} justifyContent="center">
              <View style={styles.wrapOrderIcon}>
                <Image
                  style={styles.orderIcon}
                  source={require('../../public/images/box.png')}
                />
              </View>
              <VStack
                space={0.05}
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-around'}
              >
                <Text style={styles.orderDetail}>MM09132005 </Text>
                <Text style={styles.orderDetailNotBold}>
                  Processed at sort facility
                </Text>
              </VStack>
              <Text style={styles.orderDetailHour}> 20Hrs</Text>
            </HStack>
          </View>
          <View style={styles.orderListItem}>
            <HStack space={1} justifyContent="center">
              <View style={styles.wrapOrderIcon}>
                <Image
                  style={styles.orderIcon}
                  source={require('../../public/images/box.png')}
                />
              </View>
              <VStack
                space={0.05}
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-around'}
              >
                <Text style={styles.orderDetail}>MM09132005 </Text>
                <Text style={styles.orderDetailNotBold}>
                  Processed at sort facility
                </Text>
              </VStack>
              <Text style={styles.orderDetailHour}> 20Hrs</Text>
            </HStack>
          </View>
          <View style={styles.orderListItem}>
            <HStack space={1} justifyContent="center">
              <View style={styles.wrapOrderIcon}>
                <Image
                  style={styles.orderIcon}
                  source={require('../../public/images/box.png')}
                />
              </View>
              <VStack
                space={0.05}
                height={'100%'}
                display={'flex'}
                flexDirection={'column'}
                justifyContent={'space-around'}
              >
                <Text style={styles.orderDetail}>MM09132005 </Text>
                <Text style={styles.orderDetailNotBold}>
                  Processed at sort facility
                </Text>
              </VStack>
              <Text style={styles.orderDetailHour}>20Hrs</Text>
            </HStack>
          </View>
        </VStack>
      </View>
      {/* <View
        style={{
          borderBottomColor: '#A7A9B7',
          marginTop: 40,
          borderBottomWidth: StyleSheet.hairlineWidth,
        }}
      /> */}
      {/* </SafeAreaView> */}
    </ScrollView>
    // </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundImage: `../public/images/backgroundProfile.png`,
    backgroundSize: 'contain',
    height: 300,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    height: height * 0.45,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    //textAlign: "center",
    marginTop: 20,
  },

  subTitle: {
    fontSize: 15,
    fontWeight: '200',
    //textAlign: 'center',
    marginTop: 10,
  },

  background: {
    flex: 1,
    resizeMode: 'cover', // You can adjust the resizeMode as needed
  },
  button: {
    backgroundColor: '#F79E1B',
    width: '100%',
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonNotSignIn: {
    color: '#FF5733',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 2,
    width: '100%',
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonNotSignInText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonGroup: {
    marginTop: 30,
  },
  switchSelector: {
    marginTop: 30,
  },
  goBack: {
    left: width * 0.05,
    width: 100,
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  input: {
    width: width * 0.8,
    height: height * 0.06,
    //backgroundColor: '#F79E1B',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 30,
    fontSize: 18,
    fontWeight: '500',
  },
  boxInput: {
    borderRadius: 30,
  },
  imageInputSuccess: {
    height: height * 0.04,
    marginLeft: width * 0.03,
    width: width * 0.08,
    tintColor: '#F79E1B',
  },
  textNormal: {
    fontSize: 14,
    fontWeight: '500',
    //textAlign: "center",
    color: '#A7A9B7',
  },
  googleIcon: {
    height: 20,
  },
  buttonGoogle: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  buttonTextGoogle: {
    color: '#191D31',
    fontSize: 16,
    fontWeight: '700',
  },
  imageBackground: {
    height: 100,
    borderColor: '#F3F3F3',
  },

  containerHeader: {
    // marginLeft: 20,
    // marginRight: 20,
    // backgroundColor: '#1D272F',
    // height: height * 0.4,
    flex: 1,
    // padding: 20,
    marginTop: height * 0.1,
  },
  titleHeader: {
    fontSize: 23,
    fontWeight: '700',
    //textAlign: "center",
    // marginTop: height * 0.1,
    marginLeft: width * 0.02,
    color: '#FFFFFF',
  },
  imageBackgroundHeader: {
    // marginTop: height * 0.1,
    height: height * 0.04,
    width: width * 0.05,
    // marginLeft: width * 0.1,
    // borderColor: '#F3F3F3',
    // marginBottom: height * 0.03,
  },
  containerHeaderRow1: {
    // alignItems: "center",
    // display: "flex",
    // flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between"
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 35,
    paddingLeft: 25,
    paddingRight: 25,
  },
  logo: {
    // width: 100,
    // height: 100,
    // borderRadius: 63,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: "white",
    // marginBottom: 10,
    // float: "left"
    // height: height * 0.04,
    // width: width * 0.05,
  },
  noti: {
    // left: width * 0.43,
    // width: width * 0.5,
    backgroundColor: 'transparent',
    // marginTop: height * 0.09,
    // marginRight: height * 0.05,
    // borderColor: "white",
    // width: 10,
    // height: 10,
    // float: "right",
    // alignItems: 'center'
  },
  notiIcon: {
    width: 50,
    height: 50,
  },
  containerMyOrder: {
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // marginBottom: 35,
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerHeaderMyOrder: {
    backgroundColor: '#FFFFFF',
    width: width * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 12,
    marginBottom: 30,
  },
  titleHeaderMyOrder: {
    fontFamily: 'Abel',
    fontSize: 16,
    fontWeight: '400',
    // textAlign: "center",
    color: '#A7A9B7',
    textAlign: 'left',
    // marginLeft: width * 0.1,
    // marginBottom: 10,
    paddingTop: 15,
  },
  containerInputMyOrder: {
    alignItems: 'center',
  },
  inputHeader: {
    // width: width * 0.4,
    height: height * 0.06,
    //backgroundColor: '#F79E1B',
    // margin: 10,
    padding: 8,
    color: '#191D31',
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Outfit',
    // backgroundColor: "#FFFFFF"
  },
  inputHeaderRow: {
    width: width * 0.9,
    height: height * 0.06,
    // borderBlockColor: '#FFFFFF'
    //backgroundColor: '#F79E1B',
  },
  inputTrackNumber: {
    // width: width * 0.4,
    height: height * 0.08,
    backgroundColor: '#F79E1B',
    // padding: 8,
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    fontFamily: 'Abel',
    // backgroundColor: "#FFFFFF"
  },
  inputTrack: {
    backgroundColor: '#F79E1B',
    borderColor: '#1D272F',
  },
  containerHeaderTrackNumber: {
    // marginTop: 30,
    alignItems: 'center',
  },
  containerContent: {
    paddingTop: 40,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#FFFFFF',
    height: height * 0.7,
  },
  inputHover: {
    backgroundColor: '#fff',
    borderColor: '#1D272F',
  },
  inputHover1: {
    backgroundColor: '#fff',
    borderColor: '#1D272F',
  },
  topUp: {
    left: width * 0.25,
    // width: width * 0.5,
    flexDirection: 'row',
  },
  topUpIcon: {
    marginLeft: 10,
    marginBottom: 10,
    tintColor: '#FFFFFF',
  },
  imageInputRight: {
    height: height * 0.04,
    marginRight: width * 0.04,
    width: width * 0.08,
  },
  imageInput: {
    height: height * 0.04,
    marginLeft: width * 0.04,
    width: width * 0.08,
  },
  featureTitle: {
    fontFamily: 'Outfit',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  featureItems: {
    marginTop: 15,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  featureItem: {
    // marginTop: 100,
    width: '30%',
    height: height * 0.12,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleFeatureItem: {
    fontSize: 15,
    fontWeight: '700',
    //textAlign: "center",
    color: 'black',
    textAlign: 'center',
    // marginBottom: 10,
  },
  featureIcon: {
    // marginLeft: width * 0.001,
    height: 35,
    width: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
    // tintColor: '#F79E1B',
  },
  orderListItem: {
    // marginTop: 10,
    width: '100%',
    height: height * 0.09,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#F3F3F3',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    // justifyContent: 'space-around'
  },
  wrapOrderIcon: {
    borderColor: '#F2F4F9',
    backgroundColor: '#F2F4F9',
    borderWidth: 1,
    borderRadius: 12,
    marginRight: width * 0.04,
    // padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: width * 0.15,
  },
  orderIcon: {
    height: 35,
    width: 35,
    marginTop: 10,
    // marginLeft: -width * 0.05,
  },
  orderDetail: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    //textAlign: "center",
  },
  orderDetailNotBold: {
    // float: 'right',
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'right',
    fontWeight: '500',
    //textAlign: "center",
    color: '#A7A9B7',
  },
  orderDetailHour: {
    width: '20%',
    // height: '100%',
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'right',
    fontWeight: '500',
    //textAlign: "center",
    color: '#A7A9B7',
  },
  containerFooter: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
});

export default DriverHomeScreen;
