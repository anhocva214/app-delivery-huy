import {
  Avatar,
  Box,
  FlatList,
  Flex,
  Image,
  ScrollView,
  Text,
  View,
  useColorModeValue,
  useToast,
} from 'native-base';
import React, { useEffect } from 'react';
import {
  ImageBackground,
  Pressable,
  TextInput,
  TouchableWithoutFeedback,
  useWindowDimensions,
  TouchableOpacity
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Img } from '../../utils/img';
import { StatusBar } from 'expo-status-bar';
import { useDispatch, useSelector} from 'react-redux';
import { getUserInfo } from '../../redux-toolkit/actions/user';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default function ProfileScreen() {
  const layout = useWindowDimensions();
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const user = useSelector((stateRedux: any) => stateRedux.userReducer);
  const toast = useToast();
  // console.log(user)
  useEffect(() => {
    // @ts-ignore
    dispatch(getUserInfo());
  }, []);
  const goToEditInfo = (user) => {
    // @ts-ignore
    navigation.navigate("ProfileInfoScreen", { user: user});
  }

  const handleLogOut = async () => {
    try {
      const token = await AsyncStorage.removeItem('token');
      axios.interceptors.request.use(
        (config) => {
          // Remove the 'Authorization' header to clear the token
          delete config.headers['Authorization'];
          // Alternatively, set it to null or an empty string
          // config.headers['Authorization'] = null; // or config.headers['Authorization'] = '';
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
      );
      await toast.show({
        placement: "top",
        render: () => {
          return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                  Đăng xuất thành công
                </Box>;
        }
      });
      // @ts-ignore
      navigation.navigate('SignUpScreen', {tab: 1})
    } catch (error) {
      toast.show({
        placement: "top",
        render: () => {
          return <Box bg="#eb4034" px="2" py="1" rounded="sm" mb={5}>
                  { error.message }
                </Box>;
        }
      });
    }
  }

  return (
    <>
      <StatusBar animated={true} style="light" />
      <ImageBackground source={Img.bgHeader} style={{ paddingBottom: 30 }}>
        <SafeAreaView edges={['top']}>
          <Box px="5">
            <Flex mt="3" justify="space-between" align="center" direction="row">
              <Text color="#fff" fontSize={'2xl'} fontWeight={'bold'}>
                My Profile
              </Text>
              <TouchableWithoutFeedback onPress={handleLogOut}>
                <Flex
                  rounded={'full'}
                  justify="center"
                  align="center"
                  bgColor={'#F79E1B'}
                  px="5"
                  py={'2'}
                >
                  <Text color="#fff" fontSize={'lg'} fontWeight={'bold'}>
                    Log out
                  </Text>
                </Flex>
              </TouchableWithoutFeedback>
            </Flex>

            <Flex
              direction="row"
              alignItems={'center'}
              justify="space-between"
              mt="10"
            >
              <Flex direction="row" alignItems={'center'} style={{ gap: 10 }}>
                <Avatar source={Img.avatar} size={60} />
                <Flex style={{ gap: 5 }}>
                  <Text color="#fff" fontWeight={'semibold'} fontSize={'md'}>
                   { user?.authUser?.fullName }
                  </Text>
                  <Text color="#fff">{ user?.authUser?.phoneNumber }</Text>
                </Flex>
              </Flex>
              <TouchableOpacity onPress={() => goToEditInfo(user?.authUser)}>
                <Flex
                  rounded={'full'}
                  justify="center"
                  align="center"
                  bgColor={'#FFFFFF26'}
                  py={'2'}
                  w={120}
                >
                  <Text color="#fff" fontSize={'md'} fontWeight={'semibold'}>
                    Edit Profile
                  </Text>
                </Flex>
              </TouchableOpacity>
            </Flex>
          </Box>
        </SafeAreaView>
      </ImageBackground>
      <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
        <Box px="5" flex={1} mt="6">
          <Flex mb="8">
            <Text color="#191D31" fontSize={'lg'} fontWeight={'bold'} mb="5">
              Settings
            </Text>

            <Flex style={{ gap: 20 }}>
              <Flex
                direction="row"
                alignItems={'center'}
                style={{ gap: 10 }}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
              >
                <Image source={Img.icLock} size={26} alt="image" />
                <Text color="#191D31" fontWeight={'semibold'} fontSize={'md'}>
                  Change Password
                </Text>
              </Flex>
              <Flex
                direction="row"
                alignItems={'center'}
                style={{ gap: 10 }}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
              >
                <Image source={Img.icGlobe} size={26} alt="image" />
                <Text color="#191D31" fontWeight={'semibold'} fontSize={'md'}>
                  Language
                </Text>
              </Flex>
              <Flex
                direction="row"
                alignItems={'center'}
                style={{ gap: 10 }}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
              >
                <Image source={Img.icNotification} size={26} alt="image" />
                <Text color="#191D31" fontWeight={'semibold'} fontSize={'md'}>
                  Notification
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex mb="8">
            <Text color="#191D31" fontSize={'lg'} fontWeight={'bold'} mb="5">
              About Us
            </Text>

            <Flex style={{ gap: 20 }}>
              <Flex
                direction="row"
                alignItems={'center'}
                style={{ gap: 10 }}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
              >
                <Image source={Img.icHelp} size={26} alt="image" />
                <Text color="#191D31" fontWeight={'semibold'} fontSize={'md'}>
                  FAQ
                </Text>
              </Flex>
              <Flex
                direction="row"
                alignItems={'center'}
                style={{ gap: 10 }}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
              >
                <Image source={Img.icSecurity} size={26} alt="image" />
                <Text color="#191D31" fontWeight={'semibold'} fontSize={'md'}>
                  Privacy Policy
                </Text>
              </Flex>
              <Flex
                direction="row"
                alignItems={'center'}
                style={{ gap: 10 }}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
              >
                <Image source={Img.icTeam} size={26} alt="image" />
                <Text color="#191D31" fontWeight={'semibold'} fontSize={'md'}>
                  Contact Us
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Flex mb="8">
            <Text color="#191D31" fontSize={'lg'} fontWeight={'bold'} mb="5">
              Other
            </Text>

            <Flex style={{ gap: 20 }}>
              <Flex
                direction="row"
                alignItems={'center'}
                style={{ gap: 10 }}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
              >
                <Image source={Img.icShare} size={26} alt="image" />
                <Text color="#191D31" fontWeight={'semibold'} fontSize={'md'}>
                  Share
                </Text>
              </Flex>
              <Flex
                direction="row"
                alignItems={'center'}
                style={{ gap: 10 }}
                borderColor={'#F3F3F3'}
                borderWidth={1}
                p="3"
                rounded={'xl'}
              >
                <Image source={Img.icMobile} size={26} alt="image" />
                <Text color="#191D31" fontWeight={'semibold'} fontSize={'md'}>
                  Get The Latest Version
                </Text>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </ScrollView>
    </>
  );
}
