import {
    Box,
    FlatList,
    Flex,
    Image,
    ScrollView,
    Text,
    View,
    useColorModeValue,
    Button
  } from 'native-base';
  import React, { useEffect } from 'react';
  import {
    ImageBackground,
    Pressable,
    TextInput,
    TouchableWithoutFeedback,
    useWindowDimensions,
    TouchableOpacity,
    SafeAreaView
  } from 'react-native';
  // import { SafeAreaView } from 'react-native-safe-area-context';
  import { Img } from '../../utils/img';
  import { StatusBar } from 'expo-status-bar';
  import { TabView, SceneMap, SceneRendererProps } from 'react-native-tab-view';
  import Animated from 'react-native-reanimated';
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchOrderList, cancelOrder, fetchOrderDriver } from '../../redux-toolkit/actions/order';
  import { useNavigation } from '@react-navigation/native';
  
  export default function DriverOrderScreen() {
    const layout = useWindowDimensions();
    const dispatch = useDispatch();
    const order = useSelector((stateRedux: any) => stateRedux.orderReducer);
    const navigation = useNavigation();
  
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
      { key: 'first', title: 'From Me' },
      { key: 'second', title: 'To Me' },
    ]);
    const goToOrderDetail = (trackId) => {
      console.log(trackId);
      // @ts-ignore
      navigation.navigate("OrderDetailScreen", { trackId: trackId })
    }
  
    const cancelOrder = (trackId) => {
      console.log('cancel order', trackId);
      // @ts-ignore
      dispatch(cancelOrder(trackId));
    }
  
    const FirstRoute = () => <View></View>;
  
    const SecondRoute = () => <View></View>;
  
    const renderScene = SceneMap({
      first: FirstRoute,
      second: SecondRoute,
    });
  
  
    useEffect(() => {
      // @ts-ignore
      dispatch(fetchOrderDriver());
    }, []);
  
    useEffect(() => {
      console.log('index: ', index);
    }, [index]);
  
    const renderOrderItem = ({ item }) => {
      return (
        <Flex mb="4">
          <TouchableOpacity onPress={() => goToOrderDetail(item?.trackId)}>
            <Flex
              borderColor={'#F3F3F3'}
              borderWidth={1}
              w="full"
              p="3"
              rounded={'xl'}
              direction="row"
              align="center"
              justify="space-between"
            >
              <Flex direction="row" align="center" style={{ gap: 10 }}>
                <TouchableOpacity onPress={() => goToOrderDetail(item?.trackId)}>
                  <Image source={Img.imgOrder1} size={65} alt="image" />
                </TouchableOpacity>
                <Flex flexShrink={1} w="full">
                  <TouchableOpacity onPress={() => goToOrderDetail(item?.trackId)}>
                    <Text color="#191D31" fontSize={'md'} fontWeight={'semibold'}>
                      Order ID: {item?.trackId}
                    </Text>
                  </TouchableOpacity>
                  <Text color="#1D272F" fontWeight={'semibold'} fontSize={'md'}>
                    Status: {item?.status}
                  </Text>
                  <Text flex='1' color="#A7A9B7" fontSize={'md'}>
                    Note: {item?.subStatus}
                  </Text>
                </Flex>
                {/* <TouchableOpacity style={[{backgroundColor: '#F79E1B'}, {padding: 7}, {borderRadius: 30}]}
                                  onPress={() => cancelOrder(item?.trackId)}>
                  <Text style={[{color: '#FFFFFF'}, {fontSize: 15}, {fontWeight: '600'}]}>Cancel Order</Text>
                </TouchableOpacity> */}
                <TouchableOpacity style={[{width: '20%'}, {backgroundColor: '#F79E1B'}, {padding: 7}, {borderRadius: 30}]}
                                  onPress={() => goToOrderDetail(item?.trackId)}>
                  <Text style={[{color: '#FFFFFF'}, {fontSize: 15}, {fontWeight: '600'}, {textAlign: 'center'}]}>View</Text>
                </TouchableOpacity>
              </Flex>
            </Flex>
          </TouchableOpacity>
        </Flex>
      );
    };
  
    return (
      <>
        <StatusBar animated={true} style="light" />
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
          <ImageBackground source={Img.bgHeader} style={{ paddingBottom: 10 }}>
            <SafeAreaView>
              <Box px="5">
                <Flex
                  mt="3"
                  justify="space-between"
                  align="center"
                  direction="row"
                >
                  <Text color="#fff" fontSize={'2xl'} fontWeight={'bold'}>
                    My Order
                  </Text>
                </Flex>
  
                <Flex
                  mt="8"
                  px="3"
                  py="3"
                  direction="row"
                  justify="space-between"
                  borderColor={'#F79E1B'}
                  borderWidth={1}
                  rounded={'lg'}
                  bgColor={'#F79E1B'}
                >
                  <Flex direction="row" style={{ gap: 10 }}>
                    <Image source={Img.icSearch} alt="icon" size={5} />
                    <TextInput
                      placeholder="Enter number"
                      style={{ width: 250 }}
                      placeholderTextColor={'#1D272F'}
                    />
                  </Flex>
                  <Image source={Img.icScanDark} alt="icon" size={5} />
                </Flex>
              </Box>
            </SafeAreaView>
          </ImageBackground>
  
          <Box px="5" flex={1} mt="3">
  
            <Flex mt="2">
              <Text
                color={'#191D31'}
                fontSize={'lg'}
                fontWeight={'semibold'}
                mb="3"
              >
                {order.orderCountItem} Results
              </Text>
  
              <View>
  
              </View>
  
              <FlatList
                data={order.orderDriver}
                renderItem={renderOrderItem}
                keyExtractor={(item) => item.trackId}
                ListFooterComponent={() => <View h={200} />}
              />
            </Flex>
          </Box>
        </View>
      </>
    );
  }
  