import { NavigationProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  SafeAreaView,
  Dimensions,
  ScrollView,
} from 'react-native';
import { Box, Button } from 'native-base';
import Carousel from 'react-native-snap-carousel';
import { getTokenFromAsyncStorage } from '../service/auth';

interface Props {
  navigation: NavigationProp<any>; // Use the NavigationProp type
}

type Item = {
  title: string;
  subTitle: string;
};

const MainScreen: React.FC<Props> = ({ navigation }) => {
  const data: Item[] = [
    {
      title: 'Cash on Delivery or E-payment',
      subTitle:
        'Our delivery will ensure your items are delivered right to the door steps',
    },
    {
      title: 'Delivery Right to Your Door Step',
      subTitle:
        'Our delivery will ensure your items are delivered right to the door steps',
    },
    {
      title: 'Welcome to Tracky',
      subTitle:
        'Tracky is the best solution to deliver and track goods from local and world shipping.',
    },
  ];

  const renderItem = ({ item }) => {
    return (
      <Box>
        <View>
          <Box style={{ width: '80%', alignSelf: 'center' }}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.subTitle}>{item.subTitle}</Text>
          </Box>
        </View>
      </Box>
    );
  };

  const handleSignIn = () => {
    // const token = getTokenFromAsyncStorage()
    // console.log("🚀 ~ file: MainApp.tsx:61 ~ handleSignIn ~ token:", token)
    // if (token !== undefined) {
      navigation.navigate('SignUpScreen', {tab: 1})
    // }
  }

  // Get the screen width dynamically
  const screenWidth = Dimensions.get('window').width;

  return (
    <View>
      <ScrollView>
        <View>
          <ImageBackground
            source={require('../public/images/background-landing-page.png')} // Replace with your image path
            style={styles.imageBackground}
          ></ImageBackground>
          <Carousel
            data={data}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            loop={true}
            autoplay={true}
            autoplayInterval={2000}
            vertical={false}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.buttonGroup}>
            <Box alignItems="center">
              <Button
                style={styles.button}
                onPress={() => navigation.navigate('SignUpScreen')}
              >
                <Text style={styles.buttonText}>Create account</Text>
              </Button>
            </Box>
            <Box alignItems="center">
              <Button
                style={styles.button}
                onPress={handleSignIn}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </Button>
            </Box>
            <Box alignItems="center">
              <Button
                style={styles.buttonNotSignIn}
                // onPress={() => console.log('hello world')}
                onPress={() => navigation.navigate('BottomTabs')}
              >
                <Text style={styles.buttonNotSignInText}>Sign In as Guest</Text>
              </Button>
            </Box>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    marginTop: 20,
  },
  subTitle: {
    fontSize: 15,
    fontWeight: '200',
    textAlign: 'center',
    marginTop: 10,
  },
  imageBackground: {
    height: 450,
  },
  background: {
    flex: 1,
    resizeMode: 'cover', // You can adjust the resizeMode as needed
  },
  container: {
    marginLeft: 20,
    marginRight: 20,
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
    marginTop: 110,
  },
  item: {
    backgroundColor: 'lightgray',
    borderRadius: 8,
    padding: 20,
    marginLeft: 25,
    marginRight: 25,
  },
});

export default MainScreen;
