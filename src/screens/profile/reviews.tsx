import React from 'react';
import ArrowLayout from '../../components/arrow-layout';
import { Avatar, Box, FlatList, Flex, Image, Text, View } from 'native-base';
import { Img } from '../../utils/img';
import {
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import ButtonCus from '../../components/button/button-cus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


const FakeData = [
    {
      orderId: 1,
      trackId: 'MM09132005',
      status: 'Delivered',
      weight: 1000,
      dimensionX: 10,
      dimensionY: 20,
      dimensionZ: 30,
      type: 'Cosmetic',
      subStatus: 'On transit area',
    },
    {
      orderId: 2,
      trackId: 'MA84561259',
      status: 'Pending',
      weight: 1000,
      dimensionX: 10,
      dimensionY: 20,
      dimensionZ: 30,
      type: 'Food',
      subStatus: 'Returned to sender',
    },
    {
      orderId: 3,
      trackId: 'FU84593276',
      status: 'On Process',
      weight: 1000,
      dimensionX: 10,
      dimensionY: 20,
      dimensionZ: 30,
      type: 'Drink',
      subStatus: 'Waiting to picked up',
    },
  ];

export default function ReviewsScreen() {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();


  const renderOrderItem = ({ item }) => {
    return (
      <Flex mb="4">
        <TouchableWithoutFeedback>
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
              <Image source={Img.imgOrder1} size={65} alt="image" />
              <Flex>
                <Text color="#191D31" fontSize={'md'} fontWeight={'semibold'}>
                  {item?.trackId}
                </Text>
                <Text color="#A7A9B7" fontSize={'md'}>
                  {item?.subStatus}
                </Text>
              </Flex>
            </Flex>
            <Text color="#1D272F" fontWeight={'semibold'} fontSize={'md'}>
              {item?.status}
            </Text>
          </Flex>
        </TouchableWithoutFeedback>
      </Flex>
    );
  };

  return (
    <ArrowLayout title="Reviews" hiddenIconRight>
      <Box
        px="5"
        mt="6"
        position={'relative'}
        h={window.height - insets.bottom - insets.top - 70}
      >
        <Flex
          px="3"
          py="3"
          direction="row"
          justify="space-between"
          bgColor={'#F9F9F9'}
          rounded={'lg'}
        >
          <Flex direction="row" style={{ gap: 10 }}>
            <Image source={Img.icSearch} alt="icon" size={5} />
            <TextInput placeholder="Search language" style={{ width: 250 }} />
          </Flex>
        </Flex>

        <Flex style={{gap: 10}} mt="7">
        
 <FlatList
              data={FakeData}
              renderItem={renderOrderItem}
              keyExtractor={(item) => item.id}
              ListFooterComponent={() => <View h={200} />}
            />
        </Flex>
      </Box>
    </ArrowLayout>
  );
}
