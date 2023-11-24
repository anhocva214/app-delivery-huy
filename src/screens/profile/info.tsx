import React from 'react';
import ArrowLayout from '../../components/arrow-layout';
import { Avatar, Box, Flex, Image, Text, View } from 'native-base';
import { Img } from '../../utils/img';
import {
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
} from 'react-native';
import ButtonCus from '../../components/button/button-cus';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useState } from 'react';


export default function ProfileInfoScreen({navigation,route}) {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();
  const [name, setName] = useState(route.params?.user.fullName);
  const [phoneNumber, setPhoneNumber] = useState(route.params?.user.phoneNumber);
  return (
    <ArrowLayout title="Edit Profile" hiddenIconRight>
      <Box
        px="10"
        mt="6"
        position={'relative'}
        h={window.height - insets.bottom - insets.top - 70}
      >
        <Flex alignItems={'center'}>
          <Flex position={'relative'} w={100} alignItems={'center'}>
            <Avatar source={Img.avatar} size={100} />
            <Image
              position={'absolute'}
              bottom={0}
              right={0}
              source={Img.icCamera1}
              alt="icon"
              size={43}
            />
          </Flex>

          <Flex style={{ gap: 20 }} mt="8">
            <View>
              <Text color="#191D31" fontSize={'lg'} fontWeight={'bold'} mb="3">
                Full Name
              </Text>
              <Flex
                direction="row"
                alignItems={'center'}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
                style={{ gap: 8 }}
              >
                <Image source={Img.icProfile} size={26} alt="icon" />
                <TextInput onChangeText={(val) => setName(val)} value={name} style={{ width: '100%' }} />
              </Flex>
            </View>
            <View>
              <Text color="#191D31" fontSize={'lg'} fontWeight={'bold'} mb="3">
                Phone Number
              </Text>
              <Flex
                direction="row"
                alignItems={'center'}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
                style={{ gap: 8 }}
              >
                <Image source={Img.icCall2} size={26} alt="icon" />
                <TextInput onChangeText={(val) => setPhoneNumber(val)} value={phoneNumber} style={{ width: '100%' }} />
              </Flex>
            </View>
          </Flex>
        </Flex>

        <Box position={'absolute'} w={window.width} left={0} bottom={0}>
          <Flex alignItems={'center'} w="full" maxW="full">
            <ButtonCus pageTitle='Submit Edit Info' active title='Save Changes' data={{ name: name, phone: phoneNumber, id: route.params?.user.id}} />
          </Flex>
        </Box>
      </Box>
    </ArrowLayout>
  );
}
