import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native'
import HomeScreen from '../Home';
import SignUpScreen from '../SignUp';
import OrderScreen from '../order';
import ProfileScreen from '../profile';
import MessagesScreen from '../home/messages';


const Tab = createBottomTabNavigator();

function BottomTabs({ navigation , route}: any) {
    const par = route.params
    // console.log(route)
    return (
      <Tab.Navigator initialRouteName={par ? (par.screen ? par.screen : 'Home') : 'Home'} screenOptions={{
        headerShown: false,
        // tabBarActiveBackgroundColor: '#F79E1B',
        tabBarActiveTintColor: "black",
      }}>
        <Tab.Screen options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image style={appStyles.bottomNavTabIcon} source={(focused) ? require('../../public/images/Home2.png') : require('../../public/images/Home1.png')} />
          ),
        }} name="Home" component={HomeScreen} />
        <Tab.Screen options={{
          tabBarLabel: 'My Order',
          tabBarIcon: ({ focused }) => (
            <Image style={appStyles.bottomNavTabIcon} source={(focused) ? require('../../public/images/receipt-text.png') : require('../../public/images/receipt-text1.png')} />
          ),
        }} name="My Order" component={OrderScreen} />
        <Tab.Screen options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => (
            <Image style={appStyles.bottomNavTabIcon} source={(focused) ? require('../../public/images/message2.png') : require('../../public/images/message.png')} />
          ),
        }} name="Messages" component={MessagesScreen} />
        <Tab.Screen options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image style={appStyles.bottomNavTabIcon} source={(focused) ? require('../../public/images/profile1.png') : require('../../public/images/profile2.png')} />
          ),
        }} name="ProfileScreen" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }


const appStyles = StyleSheet.create({
    bottomNavTabIcon: {
        height: 20,
        width: 20
    }
})

export default BottomTabs