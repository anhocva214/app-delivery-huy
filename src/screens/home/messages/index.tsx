// SignUp.js
import React, { useEffect, useState } from 'react';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  Pressable,
  TextInput,
  StyleSheet,
  Dimensions,
  ScrollView,
  BackHandler,
  Alert,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  useWindowDimensions,
} from 'react-native';
import {
  Box,
  Button,
  Input,
  Icon,
  View,
  Text,
  Image,
  VStack,
  HStack,
  Divider,
  Center,
  Toast,
  FlatList,
  Flex,
  Avatar,
} from 'native-base';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import image from '../public/images/backgroundProfile.png';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';
import io from 'socket.io-client';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
const socket = io(process.env.EXPO_PUBLIC_API_URL as string);
const Tab = createBottomTabNavigator();

const { height, width } = Dimensions.get('window');


const MessagesScreen = ({ navigation }: NativeStackScreenProps<any>) => {
  const dispatch = useDispatch();
  const { height } = useWindowDimensions();

  const [hasNoti, setHasNoti] = useState(false);

  const goToNoti = async () => {};

  const goToScan = async () => {};

  return (
    <View flex={1}>
      {/* <SafeAreaView> */}
      <ImageBackground
        source={require('../../../public/images/backgroundProfile.png')}
        style={styles.backgroundImage}
      >
        <View style={styles.containerHeader}>
          <View style={styles.containerHeaderRow1}>
            <View style={styles.logo}>
              <Image
                style={styles.imageBackgroundHeader}
                source={require('../../../public/images/logoCseDeli.png')}
                alt="image"
              />
              <Text style={styles.titleHeader}>CSEDeli</Text>
            </View>
            <Pressable style={styles.noti} onPress={goToNoti}>
              <Image
                style={styles.notiIcon}
                source={
                  hasNoti
                    ? require('../../../public/images/noti.png')
                    : require('../../../public/images/noti1.png')
                }
                alt="image"
              />
            </Pressable>
          </View>
          <View>
            <View style={styles.containerHeaderTrackNumber}>
              <Box alignItems="center" style={styles.inputHeaderRow}>
                <Input
                  borderRadius={12}
                  _focus={styles.inputTrack}
                  isFocused={true}
                  style={styles.inputTrackNumber}
                  keyboardType="numeric"
                  InputLeftElement={
                    <Image
                      style={styles.imageInput}
                      source={require('../../../public/images/search-normal.png')}
                      alt="image"
                    />
                  }
                  placeholder="Search message"
                  placeholderTextColor={'#1D272F'}
                />
              </Box>
            </View>
          </View>
        </View>
      </ImageBackground>
      <View style={styles.containerContent}>
        <FlatList
          data={_.range(0, 10)}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={item} onPress={()=>{
              navigation.push("MessageDetailScreen")
            }}>
              <Flex
                flexDirection={'row'}
                alignItems={'center'}
                justifyContent={'space-between'}
                borderBottomWidth={_.range(0, 10).length == index + 1 ? 0 : 1.5}
                borderColor={'#F3F3F3'}
                pb="3"
                mb="3"
              >
                <Flex
                  flexDirection={'row'}
                  alignItems={'center'}
                  style={{ gap: 10 }}
                >
                  <Avatar
                    source={{
                      uri: 'https://hinhgaixinh.com/wp-content/uploads/2022/03/anh-gai-xinh-hoc-sinh-tuyet-dep.jpg',
                    }}
                    size={44}
                  />
                  <Flex>
                    <Text
                      color={'#191D31'}
                      fontSize={14}
                      fontWeight={'semibold'}
                    >
                      Maddy lin {item}
                    </Text>
                    <Text color="#A7A9B7" fontSize={14}>
                      Hai Rizal, I’m on the way to your...
                    </Text>
                  </Flex>
                </Flex>
                <Text color="#A7A9B7" fontWeight={'semibold'} fontSize={12}>
                  3:74 Pm
                </Text>
              </Flex>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.toString()}
          style={{
            marginBottom: 10,
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundImage: `../public/images/backgroundProfile.png`,
    backgroundSize: 'contain',
    height: 300,
  },
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    // height: height * 0.45,
    paddingBottom: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    //textAlign: "center",
    marginTop: 20,
  },

  subTitle: {
    fontSize: 15,
    fontWeight: '200',
    //textAlign: 'center',
    marginTop: 10,
  },

  background: {
    flex: 1,
    resizeMode: 'cover', // You can adjust the resizeMode as needed
  },
  button: {
    backgroundColor: '#F79E1B',
    width: '100%',
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonNotSignIn: {
    color: '#FF5733',
    backgroundColor: '#FFFFFF',
    borderColor: '#000000',
    borderWidth: 2,
    width: '100%',
    height: 60,
    borderRadius: 30,
    marginTop: 10,
  },
  buttonNotSignInText: {
    color: '#000000',
    fontSize: 16,
    fontWeight: '700',
  },
  buttonGroup: {
    marginTop: 30,
  },
  switchSelector: {
    marginTop: 30,
  },
  goBack: {
    left: width * 0.05,
    width: 100,
    marginTop: 30,
    backgroundColor: 'transparent',
  },
  input: {
    width: width * 0.8,
    height: height * 0.06,
    //backgroundColor: '#F79E1B',
    margin: 10,
    padding: 8,
    color: 'black',
    borderRadius: 30,
    fontSize: 18,
    fontWeight: '500',
  },
  boxInput: {
    borderRadius: 30,
  },
  imageInputSuccess: {
    height: height * 0.04,
    marginLeft: width * 0.03,
    width: width * 0.08,
    tintColor: '#F79E1B',
  },
  textNormal: {
    fontSize: 14,
    fontWeight: '500',
    //textAlign: "center",
    color: '#A7A9B7',
  },
  googleIcon: {
    height: 20,
  },
  buttonGoogle: {
    width: '100%',
    height: 60,
    borderRadius: 30,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
  },
  buttonTextGoogle: {
    color: '#191D31',
    fontSize: 16,
    fontWeight: '700',
  },
  imageBackground: {
    height: 100,
    borderColor: '#F3F3F3',
  },

  containerHeader: {
    flex: 1,
    marginTop: height * 0.1,
  },
  titleHeader: {
    fontSize: 23,
    fontWeight: '700',
    //textAlign: "center",
    // marginTop: height * 0.1,
    marginLeft: width * 0.02,
    color: '#FFFFFF',
  },
  imageBackgroundHeader: {
    // marginTop: height * 0.1,
    height: height * 0.04,
    width: width * 0.05,
    // marginLeft: width * 0.1,
    // borderColor: '#F3F3F3',
    // marginBottom: height * 0.03,
  },
  containerHeaderRow1: {
    // alignItems: "center",
    // display: "flex",
    // flex: 1,
    // flexDirection: "row",
    // flexWrap: "wrap",
    // justifyContent: "space-between"
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 35,
    paddingLeft: 25,
    paddingRight: 25,
  },
  logo: {
    // width: 100,
    // height: 100,
    // borderRadius: 63,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 2,
    // borderColor: "white",
    // marginBottom: 10,
    // float: "left"
    // height: height * 0.04,
    // width: width * 0.05,
  },
  noti: {
    // left: width * 0.43,
    // width: width * 0.5,
    backgroundColor: 'transparent',
    // marginTop: height * 0.09,
    // marginRight: height * 0.05,
    // borderColor: "white",
    // width: 10,
    // height: 10,
    // float: "right",
    // alignItems: 'center'
  },
  notiIcon: {
    width: 50,
    height: 50,
  },
  containerMyOrder: {
    flexDirection: 'column',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // marginBottom: 35,
    paddingLeft: 20,
    paddingRight: 20,
  },
  containerHeaderMyOrder: {
    backgroundColor: '#FFFFFF',
    width: width * 0.9,
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 12,
    marginBottom: 30,
  },
  titleHeaderMyOrder: {
    fontFamily: 'Abel',
    fontSize: 16,
    fontWeight: '400',
    // textAlign: "center",
    color: '#A7A9B7',
    textAlign: 'left',
    // marginLeft: width * 0.1,
    // marginBottom: 10,
    paddingTop: 15,
  },
  containerInputMyOrder: {
    alignItems: 'center',
  },
  inputHeader: {
    // width: width * 0.4,
    height: height * 0.06,
    //backgroundColor: '#F79E1B',
    // margin: 10,
    padding: 8,
    color: '#191D31',
    fontSize: 25,
    fontWeight: '500',
    fontFamily: 'Outfit',
    // backgroundColor: "#FFFFFF"
  },
  inputHeaderRow: {
    width: width * 0.9,
    height: height * 0.06,
    // borderBlockColor: '#FFFFFF'
    //backgroundColor: '#F79E1B',
  },
  inputTrackNumber: {
    // width: width * 0.4,
    height: height * 0.08,
    backgroundColor: '#F79E1B',
    // padding: 8,
    fontSize: 18,
    fontWeight: '300',
    fontStyle: 'normal',
    fontFamily: 'Abel',
    // backgroundColor: "#FFFFFF"
  },
  inputTrack: {
    backgroundColor: '#F79E1B',
    borderColor: '#1D272F',
  },
  containerHeaderTrackNumber: {
    // marginTop: 30,
    alignItems: 'center',
  },
  containerContent: {
    paddingTop: 35,
    paddingLeft: 25,
    paddingRight: 25,
    backgroundColor: '#FFFFFF',
    height: height - 350,
  },
  inputHover: {
    backgroundColor: '#fff',
    borderColor: '#1D272F',
  },
  inputHover1: {
    backgroundColor: '#fff',
    borderColor: '#1D272F',
  },
  topUp: {
    left: width * 0.25,
    // width: width * 0.5,
    flexDirection: 'row',
  },
  topUpIcon: {
    marginLeft: 10,
    marginBottom: 10,
    tintColor: '#FFFFFF',
  },
  imageInputRight: {
    height: height * 0.04,
    marginRight: width * 0.04,
    width: width * 0.08,
  },
  imageInput: {
    height: height * 0.04,
    marginLeft: width * 0.04,
    width: width * 0.08,
  },
  featureTitle: {
    fontFamily: 'Outfit',
    fontSize: 20,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  featureItems: {
    marginTop: 15,
    marginBottom: 20,
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  featureItem: {
    // marginTop: 100,
    width: '30%',
    height: height * 0.12,
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F3F3F3',
    padding: 4,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  titleFeatureItem: {
    fontSize: 15,
    fontWeight: '700',
    //textAlign: "center",
    color: 'black',
    textAlign: 'center',
    // marginBottom: 10,
  },
  featureIcon: {
    // marginLeft: width * 0.001,
    height: 35,
    width: 35,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 5,
    // tintColor: '#F79E1B',
  },
  orderListItem: {
    // marginTop: 10,
    width: '100%',
    height: height * 0.09,
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
  containerFooter: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
  },
});

export default MessagesScreen;
