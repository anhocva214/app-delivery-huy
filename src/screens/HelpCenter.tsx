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
import { checkTokenExpired, getTokenFromAsyncStorage } from '../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrderList } from '../redux-toolkit/actions/order';
import { ThunkDispatch } from '@reduxjs/toolkit';

const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<any>; // Use the NavigationProp type
}

const HelpCenterScreen: React.FC<Props> = ({ navigation }) => {
  const [hasNoti, setHasNoti] = useState(false);
  const [orders, setOrders] = useState('23');

  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const order = useSelector((stateRedux: any) => stateRedux.orderReducer);

  useEffect(() => {
    const checkToken = checkTokenExpired()
    if (!checkToken) {
      alert("Hết phiên đăng nhập")
      navigation.navigate('SignUpScreen', {tab: 1})
    }
  }, [])

  useEffect(() => {
    dispatch(fetchOrderList());
  }, [dispatch]);

  const goBack = () => {
    navigation.goBack();
  };

  const goToNoti = async () => {
    const token = await getTokenFromAsyncStorage();
    console.log(token);
  };

  const goToTopUp = () => {
    console.log('Go to Order list');
  };

  const goToScan = () => {
    console.log('Go to Scan');
  };

  const goToCreateOrder = () => {
    console.log('Go to Check Rate');
    navigation.navigate('CreateOrder');
  };

  const goToOrder = () => {
    console.log('Go to Order');
    navigation.navigate('BottomTabs', { screen: 'My Order' });
  };

  const goToHelpCenter = () => {
    console.log('Go to Help Center');
  };

  return (
    <SafeAreaView style={styles.containerParent}>
      <ScrollView
        style={[styles.container, { marginTop: 20 }]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.titleWrapper}>
          <Pressable style={styles.goBack} onPress={goBack}>
            <Image
              style={styles.imageBackground}
              source={require('../public/images/Back.png')}
            />
          </Pressable>
          <View style={{ width: '85%' }}>
            <Text style={styles.header_1}>Help Center</Text>
          </View>
        </View>
        <View>
          {/* <Text style={styles.subTitle}>
            Anytime, Anywhere with Diverse Transportations
          </Text> */}
          <View style={styles.containerHeaderTrackNumber}>
            <Box alignItems="center" style={styles.inputHeaderRow}>
              <Input
                borderRadius={12}
                backgroundColor={'#F9F9F9'}
                _focus={styles.inputTrack}
                isFocused={false}
                style={styles.inputTrackNumber}
                InputLeftElement={
                  <Image
                    style={styles.imageInput}
                    source={require('../public/images/search-normal-grey.png')}
                  />
                }
                // InputRightElement={
                //   <Pressable onPress={goToScan}>
                //     <Image
                //       style={styles.imageInputRight}
                //       source={require('../public/images/scan.png')}
                //     />
                //   </Pressable>
                // }
                placeholder="Tap to search FAQ"
                placeholderTextColor={'#A7A9B7'}
              />
            </Box>
          </View>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.featureTitle}>Category </Text>
          <VStack space={0} alignItems="center" marginBottom={3}>
            <HStack space={5} style={styles.featureItems}>
              <View style={styles.featureItem}>
                <Pressable
                  style={[
                    { width: '100%' },
                    { display: 'flex' },
                    { flexDirection: 'row' },
                    { alignItems: 'center' },
                  ]}
                  onPress={goToCreateOrder}
                >
                  <Image
                    style={styles.featureIcon}
                    source={require('../public/images/Insurance.png')}
                  />
                  <Text style={styles.titleFeatureItem}>Insurance</Text>
                </Pressable>
              </View>
              <View style={styles.featureItem}>
                <Pressable
                  style={[
                    { width: '100%' },
                    { display: 'flex' },
                    { flexDirection: 'row' },
                    { alignItems: 'center' },
                  ]}
                  onPress={goToHelpCenter}
                >
                  <Image
                    style={styles.featureIcon}
                    source={require('../public/images/Mobile.png')}
                  />
                  <Text style={styles.titleFeatureItem}>App Guide</Text>
                </Pressable>
              </View>
            </HStack>
            <HStack space={5} style={styles.featureItems}>
              <View style={styles.featureItem}>
                <Pressable
                  style={[
                    { width: '100%' },
                    { display: 'flex' },
                    { flexDirection: 'row' },
                    { alignItems: 'center' },
                  ]}
                  onPress={goToCreateOrder}
                >
                  <Image
                    style={styles.featureIcon}
                    source={require('../public/images/Dimension.png')}
                  />
                  <Text style={styles.titleFeatureItem}>Track</Text>
                </Pressable>
              </View>
              <View style={styles.featureItem}>
                <Pressable
                  style={[
                    { width: '100%' },
                    { display: 'flex' },
                    { flexDirection: 'row' },
                    { alignItems: 'center' },
                  ]}
                  onPress={goToOrder}
                >
                  <Image
                    style={styles.featureIcon}
                    source={require('../public/images/dollar.png')}
                  />
                  <Text style={styles.titleFeatureItem}>Create Order</Text>
                </Pressable>
              </View>
            </HStack>
          </VStack>
          <Text style={styles.title}>Popular Searched </Text>
          <VStack space={3} alignItems="center" marginTop={15} marginBottom={3}>
            <View style={styles.orderListItem}>
              <HStack
                space={1}
                padding={1}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text style={styles.orderDetail}>
                  Why my track is not showing
                </Text>
                {/* <View style={styles.wrapOrderIcon}>
                  <Image
                    style={styles.orderIcon}
                    source={require('../public/images/box.png')}
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
                <Text style={styles.orderDetailHour}> 20Hrs</Text> */}
                <View>
                  <Image
                    style={styles.orderIcon}
                    source={require('../public/images/add.png')}
                  />
                </View>
              </HStack>
            </View>
            <View style={styles.orderListItem}>
              <HStack
                space={1}
                padding={1}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text style={styles.orderDetail}>Tracky insurance terms</Text>
                <View>
                  <Image
                    style={styles.orderIcon}
                    source={require('../public/images/add.png')}
                  />
                </View>
              </HStack>
            </View>
            <View style={styles.orderListItem}>
              <HStack
                space={1}
                padding={1}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text style={styles.orderDetail}>How to place order</Text>
                <View>
                  <Image
                    style={styles.orderIcon}
                    source={require('../public/images/add.png')}
                  />
                </View>
              </HStack>
            </View>
            <View style={styles.orderListItem}>
              <HStack
                space={1}
                padding={1}
                width="100%"
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Text style={styles.orderDetail}>How to do track</Text>
                <View>
                  <Image
                    style={styles.orderIcon}
                    source={require('../public/images/add.png')}
                  />
                </View>
              </HStack>
            </View>
          </VStack>
          <View style={{marginBottom: 100}}>
            <Text style={styles.title}>Contact Customer Service </Text>
            <TouchableOpacity
                style={[styles.button, {display: 'flex'}, {flexDirection: 'row'}, {alignItems: 'center'}, {gap: 10}]}
                // onPress={handleSubmit(onSubmitScreen1)}
            >
                <Image
                    style={[{height: 30}, {width: 30}]}
                    source={require('../public/images/message.png')}
                />
                <Text style={styles.buttonText}>
                    Contact Via Email
                </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerParent: {
    // marginLeft: 20,
    // marginRight: 20,
    backgroundColor: '#FFFFFF',
    // paddingLeft: 20,
    // paddingRight: 20
  },
  header_1: {
    // width: '100%',
    fontSize: 25,
    fontWeight: '700',
    // borderWidth: 1,
    textAlign: 'center',
    marginRight: width * 0.1,
  },
  header_3: {
    fontSize: 20,
    fontWeight: '700',
    marginTop: 20,
    marginBottom: 20,
  },
  header_2: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '200',
    //textAlign: 'center',
    marginTop: 10,
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
    // height: 50,
    backgroundColor: 'transparent',
    // borderWidth: 1,
    // float: 'left'
  },
  imageBackground: {
    height: 50,
    width: 50,
    borderColor: '#F3F3F3',
    // borderWidth: 1,
    // borderRadius: 30,
    // padding: 30
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
    height: height,
  },
  button: {
    backgroundColor: '#FFFFFF',
    height: 60,
    marginTop: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 30,
    justifyContent: 'center',
    borderColor: '#A7A9B7',
    borderWidth: 1
    // marginLeft: 20,
    // marginRight: 20,
  },
  buttonText: {
    color: '#191D31',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
  viewContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#000000',
    minHeight: 60,
    justifyContent: 'center',
  },
  inputHeaderRow: {
    width: width * 0.9,
    height: height * 0.06,
    // borderBlockColor: '#FFFFFF'
    //backgroundColor: '#F79E1B',
  },
  inputTrackNumber: {
    // width: width,
    height: height * 0.07,
    backgroundColor: '#F9F9F9',
    borderWidth: 0,
    // padding: 8,
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    fontFamily: 'Abel',
    // backgroundColor: "#FFFFFF"
  },
  inputTrack: {
    // backgroundColor: '#F9F9F9',
    borderColor: '#1D272F',
    borderWidth: 1,
  },
  containerHeaderTrackNumber: {
    marginTop: 20,
    alignItems: 'center',
    marginBottom: 20,
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
    // color: '#A7A9B7'
  },
  containerContent: {
    // marginTop: 10,
    paddingTop: 20,
    // paddingLeft: 20,
    // paddingRight: 20,
    backgroundColor: '#FFFFFF',
    // height: height * 0.7,
    // borderWidth: 1
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    //textAlign: "center",
    marginTop: 20,
  },
  inputHover: {
    backgroundColor: '#fff',
    borderColor: '#1D272F',
  },
  inputHover1: {
    backgroundColor: '#fff',
    borderColor: '#1D272F',
  },
  featureTitle: {
    fontFamily: 'Outfit',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  featureItems: {
    marginTop: 15,
    // marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  featureItem: {
    // marginTop: 100,
    width: '47%',
    height: height * 0.06,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    padding: 4,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  titleFeatureItem: {
    fontSize: 15,
    fontWeight: '700',
    //textAlign: "center",
    color: 'black',
    textAlign: 'center',
    marginLeft: 15,
    // borderWidth: 1
    // marginBottom: 10,
  },
  featureIcon: {
    // marginLeft: width * 0.001,
    height: 35,
    width: 35,
    marginLeft: 5,
    // marginRight: 'auto',
    marginBottom: 5,
    // borderWidth: 1
    // tintColor: '#F79E1B',
  },
  orderListItem: {
    // marginTop: 10,
    width: '100%',
    height: height * 0.07,
    borderWidth: 1,
    borderRadius: 12,
    borderColor: '#F3F3F3',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
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
    // borderWidth: 1
    // marginTop: 10,
    // marginLeft: -width * 0.05,
  },
  orderDetail: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '500',
    marginRight: 10,
    // borderWidth: 1
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

export default HelpCenterScreen;
