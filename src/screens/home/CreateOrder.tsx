import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  Image,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import OrderDetail from './orderDetail';
import OrderTypeChoosing from './orderDetail/moreDetails/OrderType';
import TotalWeightChoosing from './orderDetail/moreDetails/TotalWeight';
import TotalDimensionChoosing from './orderDetail/moreDetails/TotalDimensionChoosing';
import NoteForDriver from './orderDetail/moreDetails/NoteForDriver';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPackageDestination,
  removePackageDestination,
} from '../../redux-toolkit/slices/packageDestinationSlice';
import { createOrder } from '../../redux-toolkit/actions/order';
import { checkTokenExpired } from '../../service/auth';
import * as Location from 'expo-location';
import { GOOGLE_API_KEY } from '../../config/env/env';
import { getAddressFromCoordinate } from '../../service/googlemaps';
import { getUserInfo, submitUserInfo } from '../../redux-toolkit/actions/user';

import io from 'socket.io-client';
const socket = io(process.env.EXPO_PUBLIC_API_URL);
const { height, width } = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<any, any>;
}

const CreateOrder = ({ route, navigation }) => {
  const { control, handleSubmit, formState, setValue, getValues } = useForm();
  const dispatch = useDispatch();

  const [pickupLocation, setPickupLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(false);

  let packageDestinations = useSelector(
    (state: any) => state.packageDestinations
  );

  const currentPickupLocation = useSelector((state: any) => state.location);
  const {authUser} = useSelector((stateRedux: any) => stateRedux.userReducer);

  useEffect(() => {
    // @ts-ignore
    dispatch(getUserInfo());
  }, []);
  useEffect(() => {
    (async () => {
      const defaultPickupLocation = await getAddressFromCoordinate(
        currentPickupLocation.pickupLocation
      );
      setPickupLocation(defaultPickupLocation?.formatted_address);
      setValue('pickupLocation', defaultPickupLocation);
    })();
  }, [currentPickupLocation]);

  useEffect(() => {
    setValue('packageDestinations', packageDestinations);
  }, [packageDestinations]);

  const addNewPackageDestination = () => {
    dispatch(
      addPackageDestination({
        address: '',
        typeAccomodation: '',
        receiver: {
          name: '',
          phoneNumber: '',
        },
      })
    );
  };

  const removeDestination = (index) => {
    // console.log(index);
    dispatch(removePackageDestination({index}));
  };

  const [collapse, setCollapse] = useState({
    isOrderTypeChoosingVisible: false,
    isTotalWeightVisible: false,
    isTotalDimensionVisible: false,
    isNoteVisible: false,
  });

  const onSubmitScreen1 = (data) => {
    // console.log(data);
    if (data.pickupLocation && data.packageDestinations.length > 0) {
      // console.log(data.packageDestinations.length);
      let isFilled = true;
      if (!data.orderType || !data.estWeight || !data.dimension) {
        isFilled = false;
        setCollapse({
          isOrderTypeChoosingVisible: true,
          isTotalWeightVisible: true,
          isTotalDimensionVisible: true,
          isNoteVisible: true,
        });
      }
      data.packageDestinations.forEach((element) => {
        if (element.address == '' || element.address == null) isFilled = false;
      });
      if (isFilled) {
        navigation.navigate('ChooseVehicleScreen', { data });
      } else {
        setErrorMsg(true);
        alert('Please fill in all informations...');
      }
    }
    // navigation.navigate('test2', { data });
    // @ts-ignore
    // dispatch(createOrder(data));
    
    navigation.navigate('ChooseVehicleScreen', {data});
  };

  const order = useSelector((stateRedux: any) => stateRedux.orderReducer);

  useEffect(() => {
    if (order.createOrder.order?.statusCode == 200) {
      console.log("🚀 ~ file: CreateOrder.tsx:88 ~ useEffect ~ order.createOrder:", order.createOrder.message)
      // @ts-ignore
      // dispatch(resetCreateOrder());
      // socket send data to driver
      socket.emit("user/create_order_success", JSON.stringify({...order.createOrder.order?.order, userId: authUser?.id}))
      // alert(order.createOrder.order.message);
      navigation.navigate('HomeScreen');
    }
  }, [order.createOrder.loading]);

  const goBack = () => {
    navigation.goBack();
  };

  const goToDetailsScreen = (index) => {
    navigation.navigate('DestinationInfo', { index: index });
  };

  const goToDetailsPickupScreen = () => {
    navigation.navigate('DetailPickupPage');
  };

  // const { height, width } = Dimensions.get('window');

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
              source={require('../../public/images/Back.png')}
            />
          </Pressable>
          <View style={{ width: '85%' }}>
            <Text style={styles.header_1}>High Load Delivery</Text>
          </View>
        </View>
        <View>
          <Text style={styles.subTitle}>
            Anytime, Anywhere with Diverse Transportations
          </Text>
        </View>
        <View>
          <View style={styles.pickUpGroup}>
            <TouchableOpacity
              onPress={() => goToDetailsPickupScreen()}
              style={styles.viewContainerPickup}
            >
              {!pickupLocation && (
                <Text style={styles.fillAddressText}>
                  {'Click to fill pickup address...'}
                </Text>
              )}
              {pickupLocation && (
                <View>
                  <Text style={styles.addressInput}>{pickupLocation}</Text>
                </View>
              )}
            </TouchableOpacity>
            {packageDestinations.map((packageDestination, index) => (
              <View>
                <View
                  style={[
                    { display: 'flex' },
                    { flexDirection: 'row' },
                    { justifyContent: 'space-between' },
                    { alignItems: 'center' },
                  ]}
                  key={index}
                >
                  <View
                    style={
                      packageDestination.address
                        ? styles.packageDestination
                        : styles.packageDestinationBlank
                    }
                  >
                    <TouchableOpacity
                      onPress={() => goToDetailsScreen(index)}
                      style={styles.viewContainer}
                    >
                      {!packageDestination.address && (
                        <Text style={styles.fillAddressText}>
                          {'Click to fill destination...'}
                        </Text>
                      )}
                      {packageDestination.address && (
                        <View>
                          <Text style={styles.addressDestinationInput}>
                            {packageDestination.address}
                          </Text>
                          <View>
                            <Text>
                              {packageDestination.receiver.name +
                                ' | ' +
                                packageDestination.receiver.phoneNumber}
                            </Text>
                          </View>
                        </View>
                      )}
                    </TouchableOpacity>
                  </View>
                  <View style={{ width: '10%' }}>
                    <TouchableOpacity
                      style={styles.buttonDelete}
                      onPress={() => removeDestination(index)}
                    >
                      <Text style={styles.buttonTextDelete}>X</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {errorMsg && !packageDestination.address && (
                  <View style={{ marginTop: 5 }}>
                    <Text style={{ color: '#F72D2D' }}>
                      Please fill in all informations...
                    </Text>
                  </View>
                )}
              </View>
            ))}
            <TouchableOpacity
              style={styles.buttonAddDestination}
              onPress={addNewPackageDestination}
            >
              <Text style={styles.buttonAddDestinationText}>
                Add Destination
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.header_3}>More Details</Text>
          <View style={styles.orderDetailGroups}>
            <OrderDetail
              id={1}
              title={'Order Information'}
              subTitle={'Add description for your order'}
              navigate={'OrderInformation'}
              collapse={collapse}
              setCollapse={setCollapse}
            />
            {collapse.isOrderTypeChoosingVisible && (
              <OrderTypeChoosing control={control} errorMsg={errorMsg} />
            )}
            <OrderDetail
              id={2}
              title={'Total Weight'}
              subTitle={'Estimate total weight'}
              navigate={'Home'}
              collapse={collapse}
              setCollapse={setCollapse}
            />
            {collapse.isTotalWeightVisible && (
              <TotalWeightChoosing control={control} errorMsg={errorMsg}/>
            )}
            <OrderDetail
              id={3}
              title={'Total Dimension'}
              subTitle={'Est total dimension'}
              navigate={'Home'}
              collapse={collapse}
              setCollapse={setCollapse}
            />
            {collapse.isTotalDimensionVisible && (
              <TotalDimensionChoosing control={control} errorMsg={errorMsg}/>
            )}
            <OrderDetail
              id={4}
              title={'Note for Driver'}
              subTitle={'Add your important note for a driver'}
              navigate={'Home'}
              collapse={collapse}
              setCollapse={setCollapse}
            />
            {collapse.isNoteVisible && <NoteForDriver control={control} />}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.button}
        onPress={handleSubmit(onSubmitScreen1)}
      >
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
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
    maxHeight: height * 0.8,
  },
  pickUpGroup: {
    marginTop: 20,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#EEEEEE',
    gap: 15,
    justifyContent: 'center',
  },
  viewContainerPickup: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: '#000000',
    minHeight: 60,
    justifyContent: 'center',
  },
  addressInput: {
    // borderWidth: 1,
    // padding: 10,
    // backgroundColor: '#FFFFFF',
    // borderRadius: 10,
    // borderColor: '#000000',
    // minHeight: 60,
    justifyContent: 'center',
    fontWeight: '600',
  },
  orderDetailGroups: {
    gap: 20,
    marginBottom: 150,
  },
  button: {
    backgroundColor: '#F79E1B',
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
    marginLeft: 20,
    marginRight: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonAddDestination: {
    backgroundColor: '#F79E1B',
    padding: 15,
    borderRadius: 16,
    width: width * 0.4,
  },
  buttonAddDestinationText: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  viewContainer: {
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#000000',
    minHeight: 60,
    justifyContent: 'center',
  },
  packageDestination: {
    width: '88%',
    borderColor: '#F79E1B',
    borderRadius: 10,
    borderWidth: 1,
  },
  packageDestinationBlank: {
    width: '88%',
    borderColor: '#F72D2D',
    borderRadius: 10,
    borderWidth: 1,
  },
  fillAddressText: {
    color: '#AAAAAA',
  },
  addressDestinationInput: {
    fontWeight: '600',
    color: '#F79E1B',
  },
  buttonDelete: {
    backgroundColor: '#F72D2D',
    // height: 50,
    // marginTop: 20,
    // marginBottom: 20,
    padding: 6,
    borderRadius: 5,
    justifyContent: 'center',
    borderColor: '#F72D2D',
    borderWidth: 1,
  },
  buttonTextDelete: {
    color: '#FFFFFF',
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
  },
});

export default CreateOrder;
