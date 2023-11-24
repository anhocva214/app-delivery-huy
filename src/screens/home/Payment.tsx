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
import {
  checkTokenExpired,
  getTokenFromAsyncStorage,
} from '../../service/auth';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from '@reduxjs/toolkit';
import ServiceAdditionList from './ServiceAdditionList';
import { fetchServiceAddition } from '../../redux-toolkit/actions/service-addition';

const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<any>; // Use the NavigationProp type
}

const PaymentScreen: React.FC<Props> = ({ navigation }) => {
  const [cost, setCost] = useState(0);
  const [selectedServiceAddition, setSelectedServiceAddition] = useState([]);

  // const handleSelectServiceAddition = (serviceAddition) => {
  //   setSelectedServiceAddition(serviceAddition);
  // };

  const handleSelectServiceAddition = (serviceAddition) => {
    // Toggle the selection state of the item
    setSelectedServiceAddition((prevSelectedServiceAddition) => {
      if (prevSelectedServiceAddition.includes(serviceAddition)) {
        setCost((prevCost) => prevCost - serviceAddition.price);
        return prevSelectedServiceAddition.filter(
          (servAdd) => servAdd !== serviceAddition
        );
      } else {
        setCost((prevCost) => prevCost + serviceAddition.price);
        return [...prevSelectedServiceAddition, serviceAddition];
      }
    });
  };

  const dispatch = useDispatch();
  const { serviceAdditionNumber, serviceAddition } = useSelector(
    (stateRedux: any) => stateRedux.serviceAdditionReducer
  );

  useEffect(() => {
    // @ts-ignore
    dispatch(fetchServiceAddition());
  }, []);

  useEffect(() => {
    // const checkToken = checkTokenExpired()
    // if (!checkToken) {
    //   alert("Hết phiên đăng nhập")
    //   navigation.navigate('SignUpScreen', {tab: 1})
    // }
  }, []);

  const goBack = () => {
    navigation.goBack();
  };

  const handleConfirmPayment = () => {
    console.log(selectedServiceAddition);
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
              style={styles.imageBack}
              source={require('../../public/images/Back.png')}
            />
          </Pressable>
          <View style={{ width: '85%' }}>
            <Text style={styles.headerTitle}>Confirm Payment</Text>
          </View>
        </View>
        <View style={styles.containerContent}>
          <Text style={styles.title}>Order Detail </Text>
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
                <Text style={styles.orderDetail}>Preview My Order</Text>
                <View>
                  <Image
                    style={styles.orderIcon}
                    source={require('../../public/images/add.png')}
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
                <Text style={styles.orderDetail}>Order Detail</Text>
                <View>
                  <Image
                    style={styles.orderIcon}
                    source={require('../../public/images/add.png')}
                  />
                </View>
              </HStack>
            </View>
          </VStack>
          <Text style={styles.title}>Additions </Text>
          <VStack space={3} alignItems="center" marginTop={15} marginBottom={3}>
            <ServiceAdditionList
              serviceAddition={serviceAddition}
              onSelectServiceAddition={handleSelectServiceAddition}
            />
            {/* <View style={styles.orderListItem}>
              <HStack space={1} justifyContent="center">
                <View style={styles.wrapIcon}>
                  <Image
                    style={styles.icon}
                    source={require('../../public/images/delivery.png')}
                  />
                </View>
                <VStack
                  space={0.05}
                  width={'45%'}
                  height={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                >
                  <Text style={styles.detail}>
                    House Moving Support (Basic)
                  </Text>
                  <Text style={styles.detailNotBold}>đ300.000</Text>
                </VStack>
                <TouchableOpacity
                  style={[styles.button, {height: 60}]}
                  // onPress={handleSubmit(onSubmitScreen1)}
                >
                  <Text style={[styles.buttonText]}>Add</Text>
                </TouchableOpacity>
              </HStack>
            </View>
            <View style={styles.orderListItem}>
              <HStack space={1} justifyContent="center">
                <View style={styles.wrapIcon}>
                  <Image
                    style={styles.icon}
                    source={require('../../public/images/delivery.png')}
                  />
                </View>
                <VStack
                  space={0.05}
                  width={'45%'}
                  height={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                >
                  <Text style={styles.detail}>
                    House Moving Support (Basic)
                  </Text>
                  <Text style={styles.detailNotBold}>đ300.000</Text>
                </VStack>
                <TouchableOpacity
                  style={[styles.button, {height: 60}]}
                  // onPress={handleSubmit(onSubmitScreen1)}
                >
                  <Text style={[styles.buttonText]}>Add</Text>
                </TouchableOpacity>
              </HStack>
            </View>
            <View style={styles.orderListItem}>
              <HStack space={1} justifyContent="center">
                <View style={styles.wrapIcon}>
                  <Image
                    style={styles.icon}
                    source={require('../../public/images/delivery.png')}
                  />
                </View>
                <VStack
                  space={0.05}
                  width={'45%'}
                  height={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                >
                  <Text style={styles.detail}>
                    House Moving Support (Basic)
                  </Text>
                  <Text style={styles.detailNotBold}>đ300.000</Text>
                </VStack>
                <TouchableOpacity
                  style={[styles.button, {height: 60}]}
                  // onPress={handleSubmit(onSubmitScreen1)}
                >
                  <Text style={[styles.buttonText]}>Add</Text>
                </TouchableOpacity>
              </HStack>
            </View>
            <View style={styles.orderListItem}>
              <HStack space={1} justifyContent="center">
                <View style={styles.wrapIcon}>
                  <Image
                    style={styles.icon}
                    source={require('../../public/images/delivery.png')}
                  />
                </View>
                <VStack
                  space={0.05}
                  width={'45%'}
                  height={'100%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                >
                  <Text style={styles.detail}>
                    House Moving Support (Basic)
                  </Text>
                  <Text style={styles.detailNotBold}>đ300.000</Text>
                </VStack>
                <TouchableOpacity
                  style={[styles.button, {height: 60}]}
                  // onPress={handleSubmit(onSubmitScreen1)}
                >
                  <Text style={[styles.buttonText]}>Add</Text>
                </TouchableOpacity>
              </HStack>
            </View> */}
          </VStack>
        </View>
      </ScrollView>
      <View
        style={[
          { height: height * 0.25 },
          { padding: 20 },
          { marginBottom: 100 },
          { borderRadius: 20 },
          { borderWidth: 1 },
          { borderColor: '#F3F3F3' },
          { backgroundColor: '#F3F3F3' },
        ]}
      >
        <View
          style={[
            { display: 'flex', flexDirection: 'row' },
            { justifyContent: 'space-between' },
            { alignItems: 'center' },
          ]}
        >
          <Text style={[{ fontSize: 16 }, { fontWeight: '600' }]}>
            Total Cost
          </Text>
          <Text
            style={[
              { fontSize: 25 },
              { fontWeight: '700' },
              { color: '#F79E1B' },
            ]}
          >
            {cost}đ
          </Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {handleConfirmPayment()}}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
      </View>
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
    height: height * 0.75,
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
  orderListItem: {
    // marginTop: 10,
    width: '100%',
    height: height * 0.12,
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

  wrapIcon: {
    borderColor: '#F2F4F9',
    backgroundColor: '#F2F4F9',
    borderWidth: 1,
    borderRadius: 12,
    marginRight: width * 0.04,
    // padding: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: '25%',
  },
  icon: {
    height: 35,
    width: 35,
    marginTop: 10,
    // marginLeft: -width * 0.05,
  },
  detail: {
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    //textAlign: "center",
  },
  detailNotBold: {
    // float: 'right',
    fontSize: 16,
    fontStyle: 'normal',
    // textAlign: 'right',
    fontWeight: '500',
    //textAlign: "center",
    color: '#191D31',
  },
  detailPrice: {
    // width: '30%',
    // height: '100%',
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    // alignSelf: 'center',
    // textAlignVertical: 'center',
    fontSize: 16,
    fontStyle: 'normal',
    textAlign: 'right',
    fontWeight: '700',
    //textAlign: "center",
    color: '#191D31',
  },
});

export default PaymentScreen;
