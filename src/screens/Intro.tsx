import { NavigationProp } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet, Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

interface Props {
  navigation: NavigationProp<any>; // Use the NavigationProp type
}

const IntroScreen: React.FC<Props> = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MainScreen');
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../public/images/logoCseDeli.png')} />
      <Text style={styles.text}>CSEDeli</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: height * 0.5,
    width: width * 1,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#1D272F",
  },
  text: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: "bold",
  }
});

export default IntroScreen;
