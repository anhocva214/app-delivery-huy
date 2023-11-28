import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import SignUpScreen from '../SignUp';
import ProfileScreen from '../profile';
import DriverHomeScreen from './DriverHomeScreen';
import DriverOrderScreen from './DriverOrder';
import TrackingLogScreen from './TrackingLog/TrackingLogScreen';
import MessagesScreen from '../home/messages';

const Tab = createBottomTabNavigator();

function DriverBottomTabs({ navigation, route }) {
  const par = route.params;
  // console.log(route);
  // console.log(par);
  return (
    <Tab.Navigator
      initialRouteName={par ? (par.screen ? par.screen : 'Home') : 'Home'}
      screenOptions={{
        headerShown: false,
        // tabBarActiveBackgroundColor: '#F79E1B',
        tabBarActiveTintColor: 'black',
      }}
    >
      <Tab.Screen
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused }) => (
            <Image
              style={appStyles.bottomNavTabIcon}
              source={
                focused
                  ? require('../../public/images/Home2.png')
                  : require('../../public/images/Home1.png')
              }
            />
          ),
        }}
        name="Home"
        component={DriverHomeScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'My Order',
          tabBarIcon: ({ focused }) => (
            <Image
              style={appStyles.bottomNavTabIcon}
              source={
                focused
                  ? require('../../public/images/receipt-text.png')
                  : require('../../public/images/receipt-text1.png')
              }
            />
          ),
        }}
        name="My Order"
        component={DriverOrderScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Tracking Log',
          tabBarIcon: ({ focused }) => (
            <Image
              style={appStyles.bottomNavTabIcon}
              source={
                focused
                  ? require('../../public/images/message2.png')
                  : require('../../public/images/message.png')
              }
            />
          ),
        }}
        name="Tracking Log"
        component={TrackingLogScreen}
      />
       <Tab.Screen
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ focused }) => (
            <Image
              style={appStyles.bottomNavTabIcon}
              source={
                focused
                  ? require('../../public/images/message2.png')
                  : require('../../public/images/message.png')
              }
            />
          ),
        }}
        name="MessagesScreen"
        component={MessagesScreen}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ focused }) => (
            <Image
              style={appStyles.bottomNavTabIcon}
              source={
                focused
                  ? require('../../public/images/profile1.png')
                  : require('../../public/images/profile2.png')
              }
            />
          ),
        }}
        name="ProfileScreen"
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}

const appStyles = StyleSheet.create({
  bottomNavTabIcon: {
    height: 20,
    width: 20,
  },
});

export default DriverBottomTabs;
