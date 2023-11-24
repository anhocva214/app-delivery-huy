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

export default function ChangePasswordScreen() {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <ArrowLayout title="Edit Profile" hiddenIconRight>
      <Box
        px="5"
        mt="6"
        position={'relative'}
        h={window.height - insets.bottom - insets.top - 70}
      >
        <Flex alignItems={'center'}>
          <Flex style={{ gap: 10 }}>
            <View>
              <Text color="#191D31" fontSize={'lg'} fontWeight={'bold'} mb="3">
              Current Password
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
                <Image source={Img.icLock} size={26} alt="icon" />
                <TextInput value="Micheal Sam" style={{ width: '100%' }} secureTextEntry />
              </Flex>
            </View>
            <Flex direction='row' justify='flex-end' >
                <Text color="#A7A9B7">
                Forgot Password
                </Text>
            </Flex>
          </Flex>

          <Flex alignItems={'center'}>
          <Flex style={{ gap: 20 }} mt="8">
            <View>
              <Text color="#191D31" fontSize={'lg'} fontWeight={'bold'} mb="3">
              New Password
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
                <Image source={Img.icLock} size={26} alt="icon" />
                <TextInput placeholder='Confirm your password' style={{ width: '100%' }} secureTextEntry />
              </Flex>
            </View>
            <View>
              <Text color="#191D31" fontSize={'lg'} fontWeight={'bold'} mb="3">
              Confirm Password
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
                <Image source={Img.icLock} size={26} alt="icon" />
                <TextInput placeholder='Repeat your new password' style={{ width: '100%' }} secureTextEntry />
              </Flex>
            </View>
          </Flex>
        </Flex>

        </Flex>

        <Box position={'absolute'} w={window.width} left={0} bottom={0}>
          <Flex alignItems={'center'} w="full" maxW="full">
            <ButtonCus active title='Change Password' />
          </Flex>
        </Box>
      </Box>
    </ArrowLayout>
  );
}
