import { SafeAreaView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Dimensions, Button, TextInput } from 'react-native'
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import OrderDetail from './orderDetail';
import OrderTypeChoosing from './orderDetail/moreDetails/OrderType';
import TotalWeightChoosing from './orderDetail/moreDetails/TotalWeight';
import TotalDimensionChoosing from './orderDetail/moreDetails/TotalDimensionChoosing';
import NoteForDriver from './orderDetail/moreDetails/NoteForDriver';
import { useDispatch, useSelector } from 'react-redux';
import { addPackageDestination } from '../../redux-toolkit/slices/packageDestinationSlice';
import { fetchOrderDetail, cancelOrder } from '../../redux-toolkit/actions/order';
import {
  Box,
  FlatList,
  Flex,
  ScrollView,
  Text,
  View,
  useColorModeValue,
  Image,
} from 'native-base';
import { Img } from '../../utils/img';
import CancelOrderDialog from './CancelOrderDialog';

const { height, width } = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<any, any>;
}

const OrderDetailScreen = ({ navigation, route }) => {
  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const orderDetail = useSelector((stateRedux: any) => stateRedux.orderReducer);

  
  useEffect(() => {
    // @ts-ignore
    dispatch(fetchOrderDetail({ trackId: route.params.trackId }));
  }, []);

  

  const [collapse, setCollapse] = useState({
    isOrderTypeChoosingVisible: false,
    isTotalWeightVisible: false,
    isTotalDimensionVisible: false,
    isNoteVisible: false,
  });

  const [isCancelDialogVisible, setCancelDialogVisible] = useState(false);

  const showCancelDialog = () => {
    setCancelDialogVisible(true);
  };

  const hideCancelDialog = () => {
    setCancelDialogVisible(false);
  };
  
  const cancelOrderDetail = (reason) => {
    console.log('cancel order ', route.params.trackId);
    console.log('Cancelled with reason:', reason);
    hideCancelDialog();
    //@ts-ignore
    dispatch(cancelOrder({trackId: route.params.trackId}));
    navigation.goBack();
  }

  const goBack = () => {
    navigation.goBack();
  }


  const { height, width } = Dimensions.get('window');

  const renderOrderItem = ({ item }) => {
    return (
      <Flex mb="0">
        <TouchableWithoutFeedback>
          <Flex
            borderColor={'#F79E1B'}
            borderWidth={1}
            w="full"
            p="3"
            rounded={'xl'}
            direction="row"
            align="center"
            justify="space-between"
            mt={3}
            mb={3}
          >
            <Flex direction="row" align="center" style={{ gap: 10 }}>
              <Flex>
                <TouchableOpacity >
                  <Text color="#191D31" fontSize={'md'} fontWeight={'semibold'}>
                    {item?.address}
                  </Text>
                </TouchableOpacity>
                <Text color="#A7A9B7" fontSize={'md'}>
                  Type: {item?.type}
                </Text>
                <Text color="#A7A9B7" fontSize={'md'}>
                  Name: {item?.name}
                </Text>
                <Text color="#A7A9B7" fontSize={'md'}>
                  Phone: {item?.phone}
                </Text>
              </Flex>
            </Flex>
            {/* <Text color="#1D272F" fontWeight={'semibold'} fontSize={'md'}>
              {item?.name}
            </Text> */}
          </Flex>
        </TouchableWithoutFeedback>
      </Flex>
    );
  };

  return (
    <SafeAreaView style={styles.containerParent}>
      <ScrollView style={[styles.container, { marginTop: 0 }, {paddingLeft: 20}, {paddingRight: 20}]} showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View>
          <View style={styles.titleWrapper}>
            <Pressable style={styles.goBack} onPress={goBack}>
              <Image alt="icon" style={styles.imageBackground} source={require('../../public/images/Back.png')} />
            </Pressable>
            <View style={{ width: '85%' }}>
              <Text style={styles.header_1}>Order Detail</Text>
            </View>
          </View>
        </View>
        <View>
          <View style={styles.pickUpGroup}>
          <ScrollView horizontal mt="3" pb="2" nestedScrollEnabled >
            <Flex mt="0">
              <Text style={styles.header_4}>Pickup Location</Text>
              <FlatList
              nestedScrollEnabled
                data={orderDetail.orderDetail.pickUpLocation}
                renderItem={renderOrderItem}
                
              />
              <Text style={styles.header_4}>Destination Locations</Text>
              <FlatList
              nestedScrollEnabled
              style={{height: 300, width: width * 0.8}}
                data={orderDetail.orderDetail.destination}
                renderItem={renderOrderItem}
                
              />
              
            </Flex>
            </ScrollView>
            {/* <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <TextInput
                  placeholder="Pickup location"
                  value={value}
                  onChangeText={onChange}
                  style={styles.addressInput}
                />
              )}
              name="pickUpLocation"
              defaultValue=""
            />
            {packageDestinations.map((packageDestination, index) => (
              <View style={styles.packageDestination} key={index}>
                <TouchableOpacity onPress={() => goToDetailsScreen(index)} style={styles.viewContainer}>
                  {!packageDestination.address && <Text style={styles.fillAddressText}>{"Click to fill address"}</Text>}
                  {packageDestination.address && <View>
                    <Text style={styles.addressDestinationInput}>{packageDestination.address}</Text>
                    <View>
                      <Text>{packageDestination.receiver.name + ' | ' + packageDestination.receiver.phoneNumber}</Text>
                    </View>
                  </View>}
                </TouchableOpacity>
              </View>
            ))}
            <TouchableOpacity
              style={styles.buttonAddDestination}
              onPress={addNewPackageDestination}
            >
              <Text style={styles.buttonAddDestinationText}>Add destination</Text>
            </TouchableOpacity> */}
          </View>
          <Text style={styles.header_3}>More Details</Text>
          <View style={styles.orderDetailGroups}>
            <OrderDetail
              id={1}
              title={"Order Information"}
              subTitle={""}
              navigate={'OrderInformation'}
              collapse={collapse}
              setCollapse={setCollapse}
            />
            {collapse.isOrderTypeChoosingVisible && <OrderTypeChoosing valueSet={orderDetail.orderDetail.type} control={control} />}
            <OrderDetail
              id={2}
              title={"Total Weight"}
              subTitle={""}
              navigate={'Home'}
              collapse={collapse}
              setCollapse={setCollapse}
            />
            {collapse.isTotalWeightVisible && <TotalWeightChoosing valueSet={orderDetail.orderDetail.weight} control={control} />}
            <OrderDetail
              id={3}
              title={"Total dimension"}
              subTitle={""}
              navigate={'Home'}
              collapse={collapse}
              setCollapse={setCollapse}
            />
            {collapse.isTotalDimensionVisible && <TotalDimensionChoosing 
            dimWidth={orderDetail.orderDetail.dimensionX} 
            dimLength={orderDetail.orderDetail.dimensionY} 
            dimHeight={orderDetail.orderDetail.dimensionZ} 
            control={control} />}
            <OrderDetail
              id={4}
              title={"Note for driver"}
              subTitle={""}
              navigate={'Home'}
              collapse={collapse}
              setCollapse={setCollapse} />
            {collapse.isNoteVisible && <NoteForDriver valueSet={orderDetail.orderDetail.note} control={control} />}
          </View>
        </View>
      </ScrollView>
      <View style={[{padding: 20}, {display: 'flex'}, {flexDirection: 'row'}, {justifyContent: 'space-between'}]}>
        <TouchableOpacity
          style={[styles.button, {width: '30%'}, {backgroundColor: '#F3F3F3'}]}
          onPress={goBack}
        >
          <Text style={[styles.buttonText, {color: '#000000'}]}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={orderDetail.orderDetail.status != 'Rejected' ? [styles.button, {width: '65%'}] : [styles.buttonCanceled, {width: '65%'}]}
          onPress={orderDetail.orderDetail.status != 'Rejected' ? showCancelDialog : null}
        >
          <Text style={orderDetail.orderDetail.status != 'Rejected' ? styles.buttonText : styles.buttonTextCanceled}>
            {orderDetail.orderDetail.status != 'Rejected' ? 'Cancel Order' : 'Canceled'}
          </Text>
        </TouchableOpacity>
        <CancelOrderDialog
          isVisible={isCancelDialogVisible}
          onCancel={hideCancelDialog}
          onSubmit={cancelOrderDetail}
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  containerParent: {
    // marginLeft: 20,
    // marginRight: 20,
    // width: '100%',
    height: height,
    // paddingLeft: 20,
    // paddingRight: 20,
    backgroundColor: '#FFFFFF'
  },
  header_1: {
    // width: '100%',
    fontSize: 25,
    fontWeight: '700',
    // borderWidth: 1,
    textAlign: 'center',
    marginRight: width * 0.1,
    padding: 10
  },
  header_3: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 20,
    marginBottom: 20
  },
  header_2: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '200',
    //textAlign: 'center',
    marginTop: 10
  },
  titleWrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    // borderWidth: 1,
    // justifyContent: 'center'
    // float: 'right'
  },
  goBack: {
    width: '15%',
    backgroundColor: 'transparent'
  },
  imageBackground: {
    height: 50,
    width: 50,
    borderColor: '#F3F3F3'
  },
  container: {
    // marginLeft: 20,
    // marginRight: 20
    maxHeight: height * 0.8
  },
  pickUpGroup: {
    marginTop: 10,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    gap: 15,
    justifyContent: 'center',
  },
  addressInput: {
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    borderColor: '#000000',
    minHeight: 60,
    justifyContent: 'center',
    fontWeight: '600'
  },
  orderDetailGroups: {
    gap: 20,
    marginBottom: 150
  },
  button: {
    backgroundColor: '#F79E1B',
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  buttonCanceled: {
    backgroundColor: '#F3F3F3',
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700'
  },
  buttonTextCanceled: {
    color: '#000000',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700'
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
    justifyContent: 'center'
  },
  packageDestination: {
    borderColor: '#F79E1B',
    borderRadius: 10,
    borderWidth: 1
  },
  fillAddressText: {
    color: '#AAAAAA'
  },
  addressDestinationInput: {
    fontWeight: '600',
    color: '#F79E1B'
  },
  header_4: {
    fontSize: 20,
    fontWeight: "700",
  },
})

export default OrderDetailScreen