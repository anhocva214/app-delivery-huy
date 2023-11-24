// SignUp.js
import React, { useEffect, useState } from 'react';
import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from '@react-navigation/native';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  SafeAreaView,
} from 'react-native';
import { Box, Button, Input, Icon, useToast } from 'native-base';
import SwitchSelector from 'react-native-switch-selector';
import { useDispatch, useSelector } from 'react-redux';
import { signIn, signUp } from '../redux-toolkit/actions/auth';
import {} from '../redux-toolkit/slices/authSlice';
import { checkTokenExpired } from '../service/auth';
import { unwrapResult } from '@reduxjs/toolkit';

const { height, width } = Dimensions.get('window');
const options = [
  { label: 'Sign Up', value: 0 },
  { label: 'Sign In', value: 1 },
];

interface SignUpScreenProps {
  navigation: NavigationProp<any, any>;
  route: RouteProp<any, any>;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ navigation, route }) => {
  const toast = useToast();

  useEffect(() => {
    // const checkToken = checkTokenExpired()
    // if (!checkToken) {
    //   navigation.navigate('SignUpScreen', {tab: 1})
    // } else {
    //   navigation.navigate('BottomTabs',{screen: 'HomeScreen'})
    // }
  }, [])
  
  const dispatch = useDispatch();
  const auth = useSelector((stateRedux: any) => stateRedux.authReducer);

  const initialTab = route.params && route.params.tab ? route.params.tab : 0;
  const [tab, setTab] = useState(initialTab);

  const [state, setState] = useState({
    fullName: '',
    password: '',
    phoneNumber: '',
    email: '',
    userNameValid: false,
    passwordValid: false,
    phoneNumberValid: false,
  });

  const onChangeText = (key, val) => {
    const newState = { ...state, [key]: val };
    validationInput(key, val, newState);
  };

  // useEffect(() => {
  //   if (auth.signUp.loading == 'fulfilled') {
  //     alert('Sign up successfully');
  //   }
  // }, [auth.signUp.loading]);

  // useEffect(() => {
  //   if (auth.signIn.loading == 'fulfilled' && auth.signIn?.user?.statusCode == 200) {
  //     navigation.navigate('BottomTabs');
  //   }
  // }, [auth.signIn.loading]);

  const validationInput = (key, val, newState) => {
    if (key == 'fullName') {
      newState.userNameValid = !!(val && val.trim() !== '');
    }

    if (key == 'phoneNumber') {
      const reg = new RegExp(/^[0-9\b\+\-\(\)]+/);
      newState.phoneNumberValid = !!(val && val.trim() !== '' && reg.test(val));
    }

    if (key == 'password') {
      newState.passwordValid = !!(val && val.trim() !== '');
    }

    if (key == 'email') {
      newState.emailValid = !!(val && val.trim() !== '');
    }

    setState(newState);
  };

  const goBack = () => {
    navigation.goBack();
  };

  const handleSignUp = async () => {
    const fullName = state.fullName;
    const password = state.password;
    const phoneNumber = state.phoneNumber;
    const email = state.email;
    const userNameValid = state.userNameValid;
    const passwordValid = state.passwordValid;
    const phoneNumberValid = state.phoneNumberValid;
    const emailValid = state.email;

    try {
      if (!userNameValid || !passwordValid || !phoneNumberValid) {
        console.log('Inputs are invalid');
        return;
      }
      // @ts-ignore
      const actionResult = await dispatch(signUp({ fullName, email, phoneNumber, password }));
      // @ts-ignore
      const signUpResult = unwrapResult(actionResult)
      if (signUpResult.status == 200) {
        await toast.show({
          placement: "top",
          render: () => {
            return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                    { signUpResult.message }
                  </Box>;
          }
        });
        setTab(1);
      }
    } catch (err) {
      toast.show({
        placement: "top",
        render: () => {
          return <Box bg="#e62e2e" px="2" py="1" rounded="sm" mb={5}>
                  { err.message }
                </Box>;
        }
      });
    }
  };

  const handleSignIn = async () => {
    const { phoneNumber, password } = state;
    try {
      // @ts-ignore
      const actionResult = await dispatch(signIn({ phoneNumber, password }));
      // @ts-ignore
      const signInResult = unwrapResult(actionResult)
      if (signInResult?.statusCode == 200) {
        await toast.show({
          placement: "top",
          render: () => {
            return <Box bg="emerald.500" px="2" py="1" rounded="sm" mb={5}>
                    { signInResult.message }
                  </Box>;
          }
        });
        if (signInResult?.data.user.roleId === 2) navigation.navigate('BottomTabs')
        console.log("🚀 ~ file: SignUp.tsx:166 ~ handleSignIn ~ signInResult?.data.user.roleId:", signInResult?.data.user.roleId)
        if (signInResult?.data.user.roleId === 1) navigation.navigate('DriverBottomTabs')
      } else {
        toast.show({
          placement: "top",
          render: () => {
            return <Box bg="#eb4034" px="2" py="1" rounded="sm" mb={5}>
                    { signInResult.message }
                  </Box>;
          }
        });
      }
    } catch (error) {}
  };
  return (
    <SafeAreaView style={styles.containerParent}>
      <View>
        <Pressable style={styles.goBack} onPress={goBack}>
          <Image
            style={styles.imageBackground}
            source={require('../public/images/Back.png')}
          />
        </Pressable>
      </View>
      <View style={styles.container}>
        <Text style={styles.header_1}>Shipping and Track Anytime </Text>
        <Text style={styles.subTitle}>Get great experience with tracky</Text>
        <View style={styles.switchSelector}>
          <SwitchSelector
            options={options}
            textColor="#A7A9B7"
            height={height * 0.07}
            selectedColor="#000000"
            buttonColor="#FFFFFF"
            // buttonColor='#FFFFFF'
            backgroundColor="#F3F3F3"
            // boxShadow = "0px 4px 40px 0px rgba(167, 169, 183, 0.15)"
            fontSize={16}
            initial={tab}
            onPress={(value) => setTab(value)}
            bold={true}
            borderRadius={50}
          />
        </View>

        {tab === 0 && (
          <View>
            <ScrollView style={styles.buttonGroup}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            >
              <Text style={styles.header_2}>Full Name</Text>
              <Box alignItems="center" style={{ marginBottom: 16 }}>
                <Input
                  borderRadius={30}
                  _focus={styles.inputHover}
                  style={styles.input}
                  InputLeftElement={
                    <Image
                      style={
                        state.userNameValid
                          ? styles.imageInputSuccess
                          : styles.imageInput
                      }
                      source={require('../public/images/profile.png')}
                    />
                  }
                  placeholder="Enter your name"
                  onChangeText={(val) => onChangeText('fullName', val)}
                  autoCapitalize="words"
                />
              </Box>
              <Text style={styles.header_2}>Email</Text>
              <Box alignItems="center" style={{ marginBottom: 16 }}>
                <Input
                  borderRadius={30}
                  _focus={styles.inputHover}
                  style={styles.input}
                  InputLeftElement={
                    <Image
                      style={
                        state.userNameValid
                          ? styles.imageInputSuccess
                          : styles.imageInput
                      }
                      source={require('../public/images/profile.png')}
                    />
                  }
                  placeholder="Enter your email"
                  onChangeText={(val) => onChangeText('email', val)}
                  autoCapitalize="none"
                />
              </Box>
              <Text style={styles.header_2}>Phone Number</Text>
              <Box alignItems="center" style={{ marginBottom: 16 }}>
                <Input
                  borderRadius={30}
                  _focus={styles.inputHover}
                  style={styles.input}
                  InputLeftElement={
                    <Image
                      style={
                        state.phoneNumberValid
                          ? styles.imageInputSuccess
                          : styles.imageInput
                      }
                      source={require('../public/images/call.png')}
                    />
                  }
                  placeholder="Enter your number"
                  onChangeText={(val) => onChangeText('phoneNumber', val)}
                />
              </Box>
              <Text style={styles.header_2}>Password</Text>
              <Box alignItems="center" style={{ marginBottom: 16 }}>
                <Input
                  w={{}}
                  borderRadius={30}
                  _focus={styles.inputHover}
                  style={styles.input}
                  InputLeftElement={
                    <Image
                      style={
                        state.passwordValid
                          ? styles.imageInputSuccess
                          : styles.imageInput
                      }
                      source={require('../public/images/lock.png')}
                    />
                  }
                  placeholder="Enter your password"
                  type={'password'}
                  onChangeText={(val) => onChangeText('password', val)}
                  autoCapitalize="none"
                />
              </Box>
              <Text style={styles.header_2}>Retype Password</Text>
              <Box alignItems="center" style={{ marginBottom: 16 }}>
                <Input
                  w={{}}
                  borderRadius={30}
                  _focus={styles.inputHover}
                  style={styles.input}
                  InputLeftElement={
                    <Image
                      style={
                        state.passwordValid
                          ? styles.imageInputSuccess
                          : styles.imageInput
                      }
                      source={require('../public/images/lock.png')}
                    />
                  }
                  placeholder="Enter your retype password"
                  type={'password'}
                  onChangeText={(val) => onChangeText('password', val)}
                />
              </Box>
            </ScrollView>
            <Box alignItems="center" marginTop={5}>
              <Button style={styles.button} onPress={handleSignUp}>
                <Text style={styles.buttonText}>Create account</Text>
              </Button>
            </Box>
          </View>
        )}

        {tab === 1 && (
          <View>
            <View style={styles.buttonGroup}>
              <Text style={styles.header_2}>Phone Number</Text>
              <Box alignItems="center" style={{ marginBottom: 16 }}>
                <Input
                  w={{}}
                  borderRadius={30}
                  _focus={styles.inputHover}
                  style={styles.input}
                  InputLeftElement={
                    <Image
                      style={
                        state.phoneNumberValid
                          ? styles.imageInputSuccess
                          : styles.imageInput
                      }
                      source={require('../public/images/call.png')}
                    />
                  }
                  placeholder="Enter your phone number"
                  keyboardType="numeric"
                  onChangeText={(val) => onChangeText('phoneNumber', val)}
                />
              </Box>
              <Text style={styles.header_2}>Password</Text>
              <Box alignItems="center" style={{ marginBottom: 16 }}>
                <Input
                  w={{}}
                  borderRadius={30}
                  _focus={styles.inputHover}
                  style={styles.input}
                  InputLeftElement={
                    <Image
                      style={
                        state.passwordValid
                          ? styles.imageInputSuccess
                          : styles.imageInput
                      }
                      source={require('../public/images/lock.png')}
                    />
                  }
                  placeholder="Enter your password"
                  type={'password'}
                  onChangeText={(val) => onChangeText('password', val)}
                />
              </Box>
            </View>
            <Box alignItems="center" marginTop={5}>
              <Button style={styles.button} onPress={handleSignIn}>
                <Text style={styles.buttonText}>Sign In</Text>
              </Button>
            </Box>
          </View>
        )}
      </View>

      <View style={styles.container}>
        <View>
          <View style={{ flex: 1, height: 1, backgroundColor: '#F3F3F3' }} />
          <Box alignItems="center">
            <Text style={styles.textNormal}>Or Sign Up With</Text>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}
            >
              <Button
                leftIcon={
                  <Image source={require('../public/images/google.png')} />
                }
                style={styles.buttonGoogle}
                onPress={() => console.log('Google Sign Up')}
              >
                <Text style={styles.buttonTextGoogle}>Sign Up with Google</Text>
              </Button>
            </View>
          </Box>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  containerParent: {
    backgroundColor: '#FFFFFF',
  },
  header_1: {
    fontSize: 25,
    fontWeight: '700',
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
  imageBackground: {
    height: 50,
    width: 50,
    borderColor: '#F3F3F3',
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // You can adjust the resizeMode as needed
  },
  container: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: '#F79E1B',
    width: '100%',
    height: 60,
    borderRadius: 30,
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
    marginTop: 20,
    height: 390,
  },
  switchSelector: {
    marginTop: 30,
    backgroundColor: '#F3F3F3',
    padding: 5,
    borderRadius: 50,
  },
  goBack: {
    left: width * 0.05,
    width: 100,
    backgroundColor: 'transparent',
  },
  input: {
    width: width * 0.8,
    height: height * 0.05,
    //backgroundColor: '#F79E1B',
    padding: 8,
    color: 'black',
    borderRadius: 20,
    fontSize: 16,
    fontWeight: '500',
  },
  boxInput: {
    borderRadius: 30,
  },
  inputHover: {
    backgroundColor: '#fff',
    borderColor: '#1D272F',
  },
  imageInput: {
    height: height * 0.03,
    marginLeft: width * 0.03,
    width: width * 0.07,
  },
  imageInputSuccess: {
    height: height * 0.03,
    marginLeft: width * 0.03,
    width: width * 0.06,
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
    borderWidth: 1,
    marginTop: 10,
    backgroundColor: '#FFFFFF',
    // marginBottom: 20
  },
  buttonTextGoogle: {
    color: '#191D31',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default SignUpScreen;
