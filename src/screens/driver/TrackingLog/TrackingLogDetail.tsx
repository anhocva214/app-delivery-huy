import {
  SafeAreaView,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  Pressable,
  StyleSheet,
  Dimensions,
  Button,
  TextInput,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import OrderDetail from '../../order/orderDetail';
import OrderTypeChoosing from '../../order/orderDetail/moreDetails/OrderType';
import TotalWeightChoosing from '../../order/orderDetail/moreDetails/TotalWeight';
import TotalDimensionChoosing from '../../order/orderDetail/moreDetails/TotalDimensionChoosing';
import NoteForDriver from '../../order/orderDetail/moreDetails/NoteForDriver';
import { useDispatch, useSelector } from 'react-redux';
import { addPackageDestination } from '../../../redux-toolkit/slices/packageDestinationSlice';
import {
  fetchOrderDetail,
  cancelOrder,
} from '../../../redux-toolkit/actions/order';
import {
  Box,
  FlatList,
  Flex,
  ScrollView,
  Text,
  View,
  useColorModeValue,
  Image,
  VStack,
  HStack,
} from 'native-base';
import { Img } from '../../../utils/img';
import UpdateOrderStatusDialog from './UpdateStatusOrderDialog';

const { height, width } = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<any, any>;
}

const TrackingLogDetailScreen = ({ navigation, route }) => {
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
    dispatch(cancelOrder({ trackId: route.params.trackId }));
    navigation.goBack();
  };

  const goBack = () => {
    navigation.goBack();
  };

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
                <TouchableOpacity>
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
      <ScrollView
        style={[
          styles.container,
          { marginTop: 10 },
          { paddingLeft: 20 },
          { paddingRight: 20 },
        ]}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View>
          <View style={styles.titleWrapper}>
            <Pressable style={styles.goBack} onPress={goBack}>
              <Image
                alt="icon"
                style={styles.imageBackground}
                source={require('../../../public/images/Back.png')}
              />
            </Pressable>
            <View style={{ width: '80%' }}>
              <Text style={styles.header_1}>Tracking Log Detail</Text>
            </View>
          </View>
        </View>
        <View>
          {/* <View style={styles.pickUpGroup}>
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
          </View> */}
          <Text style={styles.header_3}>Order Status Log</Text>
          {/* <View style={styles.orderDetailGroups}>
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
          </View> */}
          <VStack space={5} alignItems="center" marginTop={15}>
            <View style={styles.orderListItem}>
              <HStack space={1} justifyContent="center">
                <View style={styles.wrapOrderIcon}>
                  <Image
                    style={styles.orderIcon}
                    source={require('../../../public/images/box.png')}
                  />
                </View>
                <VStack
                  space={0.05}
                  paddingLeft={1}
                  height={'100%'}
                  width={'56%'}
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-around'}
                >
                  <Text style={styles.orderDetail}>
                    Order
                    <Text style={{ fontWeight: '700' }}> A1B2C3D4E5 </Text>
                    has been placed
                  </Text>
                </VStack>
                <Text style={styles.orderDetailPending}>Pending </Text>
              </HStack>
            </View>
            <View>
              <Image
                style={[{top: -10}, {left: 25}, { height: 25 }, { width: 25 }]}
                source={require('../../../public/images/stroke-line.png')}
              />
              <View style={[styles.orderListItem]}>
                <HStack space={1} justifyContent="center">
                  <View style={styles.wrapOrderIcon}>
                    <Image
                      style={styles.orderIcon}
                      source={require('../../../public/images/box.png')}
                    />
                  </View>
                  <VStack
                    space={0.05}
                    paddingLeft={1}
                    height={'100%'}
                    width={'56%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-around'}
                  >
                    <Text style={styles.orderDetail}>
                      Driver 
                      <Text style={{ fontWeight: '700' }}> Tester </Text>
                      has received the order
                      <Text style={{ fontWeight: '700' }}> A1B2C3D4E5 </Text>
                    </Text>
                  </VStack>
                  <Text style={styles.orderDetailOnProcess}>On Process </Text>
                </HStack>
              </View>
            </View>
            <View>
              <Image
                style={[{top: -10}, {left: 25}, { height: 25 }, { width: 25 }]}
                source={require('../../../public/images/stroke-line.png')}
              />
              <View style={[styles.orderListItem]}>
                <HStack space={1} justifyContent="center">
                  <View style={styles.wrapOrderIcon}>
                    <Image
                      style={styles.orderIcon}
                      source={require('../../../public/images/box.png')}
                    />
                  </View>
                  <VStack
                    space={0.05}
                    paddingLeft={1}
                    height={'100%'}
                    width={'56%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-around'}
                  >
                    <Text style={styles.orderDetail}>
                      Order
                      <Text style={{ fontWeight: '700' }}> A1B2C3D4E5 </Text>
                      is on the way
                    </Text>
                  </VStack>
                  <Text style={styles.orderDetailOnProcess}>On Process </Text>
                </HStack>
              </View>
            </View>
            <View>
              <Image
                style={[{top: -10}, {left: 25}, { height: 25 }, { width: 25 }]}
                source={require('../../../public/images/stroke-line.png')}
              />
              <View style={[styles.orderListItem]}>
                <HStack space={1} justifyContent="center">
                  <View style={styles.wrapOrderIcon}>
                    <Image
                      style={styles.orderIcon}
                      source={require('../../../public/images/box.png')}
                    />
                  </View>
                  <VStack
                    space={0.05}
                    paddingLeft={1}
                    height={'100%'}
                    width={'56%'}
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'space-around'}
                  >
                    <Text style={styles.orderDetail}>
                      Order
                      <Text style={{ fontWeight: '700' }}> A1B2C3D4E5 </Text>
                      has arrived
                    </Text>
                  </VStack>
                  <Text style={styles.orderDetailCompleted}>Completed </Text>
                </HStack>
              </View>
            </View>
          </VStack>
        </View>
      </ScrollView>
      <View
        style={[
          { padding: 20 },
          { display: 'flex' },
          { flexDirection: 'row' },
          { justifyContent: 'space-between' },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.button,
            { width: '30%' },
            { backgroundColor: '#F3F3F3' },
          ]}
          onPress={goBack}
        >
          <Text style={[styles.buttonText, { color: '#000000' }]}>Go Back</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={
            (orderDetail.orderDetail.status != 'Rejected' && orderDetail.orderDetail.status != 'Completed')
              ? [styles.button, { width: '65%' }]
              : (orderDetail.orderDetail.status != 'Rejected' ? [styles.buttonCompleted, { width: '65%' }] : [styles.buttonCanceled, { width: '65%' }])
          }
          onPress={
            (orderDetail.orderDetail.status != 'Rejected' && orderDetail.orderDetail.status != 'Completed')
              ? showCancelDialog
              : null
          }
        >
          <Text
            style={
              (orderDetail.orderDetail.status != 'Rejected')
                ? styles.buttonText
                : styles.buttonTextCanceled
            }
          >
            {(orderDetail.orderDetail.status != 'Rejected' && orderDetail.orderDetail.status != 'Completed')
              ? 'Update Status'
              : (orderDetail.orderDetail.status != 'Rejected' ? 'Completed' : 'Canceled')}
          </Text>
        </TouchableOpacity>
        <UpdateOrderStatusDialog
          isVisible={isCancelDialogVisible}
          onCancel={hideCancelDialog}
          onSubmit={cancelOrderDetail}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerParent: {
    // marginLeft: 20,
    // marginRight: 20,
    // width: '100%',
    height: height,
    // paddingLeft: 20,
    // paddingRight: 20,
    backgroundColor: '#FFFFFF',
  },
  header_1: {
    // width: '100%',
    fontSize: 25,
    fontWeight: '700',
    // borderWidth: 1,
    textAlign: 'center',
    marginRight: width * 0.1,
    padding: 10,
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
    // borderWidth: 1,
    // justifyContent: 'center'
    // float: 'right'
  },
  goBack: {
    width: '15%',
    backgroundColor: 'transparent',
  },
  imageBackground: {
    height: 50,
    width: 50,
    borderColor: '#F3F3F3',
  },
  container: {
    // marginLeft: 20,
    // marginRight: 20
    maxHeight: height * 0.8,
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
  },
  buttonCanceled: {
    backgroundColor: '#F3F3F3',
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  buttonCompleted: {
    backgroundColor: '#13AA37',
    marginTop: 20,
    padding: 20,
    borderRadius: 16,
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonTextCanceled: {
    color: '#000000',
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
    borderColor: '#F79E1B',
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
  header_4: {
    fontSize: 20,
    fontWeight: '700',
  },
  orderListItem: {
    // marginTop: 10,
    width: '100%',
    height: height * 0.1,
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
    // marginRight: width * 0.04,
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
  orderDetailPending: {
    width: '25%',
    // height: '100%',
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    // textAlign: 'right',
    fontWeight: '700',
    //textAlign: "center",
    color: '#A7A9B7',
    textTransform: 'uppercase',
  },
  orderDetailOnProcess: {
    width: '25%',
    // height: '100%',
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    // textAlign: 'right',
    fontWeight: '700',
    //textAlign: "center",
    color: '#0052B4',
    textTransform: 'uppercase',
  },
  orderDetailCompleted: {
    width: '25%',
    // height: '100%',
    // borderWidth: 1,
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    textAlignVertical: 'center',
    fontSize: 14,
    fontStyle: 'normal',
    // textAlign: 'right',
    fontWeight: '700',
    //textAlign: "center",
    color: '#13AA37',
    textTransform: 'uppercase',
  },
});

export default TrackingLogDetailScreen;
