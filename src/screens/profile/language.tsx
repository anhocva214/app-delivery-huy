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

export default function LanguageScreen() {
  const window = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <ArrowLayout title="Language" hiddenIconRight>
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
          <Flex
            direction="row"
            alignItems={'center'}
            borderColor={'#1D272F'}
            borderWidth={1}
            p="3"
            rounded={'xl'}
            style={{ gap: 8 }}
            justify="space-between"
          >
            <Flex direction="row" align="center" style={{ gap: 8 }}>
              <Image source={Img.icFlagEn} size={26} alt="icon" />
              <Text fontWeight={'semibold'}>English</Text>
            </Flex>
            <Image source={Img.icTick} w={52 / 3} h={37 / 3} />
          </Flex>
          <Flex
            direction="row"
            alignItems={'center'}
            borderColor={'#F3F3F3'}
            borderWidth={1}
            p="3"
            rounded={'xl'}
            style={{ gap: 8 }}
            justify="space-between"
          >
            <Flex direction="row" align="center" style={{ gap: 8 }}>
              <Image source={Img.icFlagPo} size={26} alt="icon" />
              <Text fontWeight={'semibold'}>Portuguese</Text>
            </Flex>
          </Flex>
          <Flex
            direction="row"
            alignItems={'center'}
            borderColor={'#F3F3F3'}
            borderWidth={1}
            p="3"
            rounded={'xl'}
            style={{ gap: 8 }}
            justify="space-between"
          >
            <Flex direction="row" align="center" style={{ gap: 8 }}>
              <Image source={Img.icFlagJp} size={26} alt="icon" />
              <Text fontWeight={'semibold'}>Japanese</Text>
            </Flex>
          </Flex>
          <Flex
            direction="row"
            alignItems={'center'}
            borderColor={'#F3F3F3'}
            borderWidth={1}
            p="3"
            rounded={'xl'}
            style={{ gap: 8 }}
            justify="space-between"
          >
            <Flex direction="row" align="center" style={{ gap: 8 }}>
              <Image source={Img.icFlagFr} size={26} alt="icon" />
              <Text fontWeight={'semibold'}>French</Text>
            </Flex>
          </Flex>

        </Flex>
      </Box>
    </ArrowLayout>
  );
}
