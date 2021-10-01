import "react-native-gesture-handler";

// Import React and Component

import React, {Component} from 'react';
import { Animated, Dimensions, StyleSheet, Text, View, StatusBar} from "react-native";
import Router from "./Navigation/Router";
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging'
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from "@react-native-community/push-notification-ios";

import AsyncStorage from '@react-native-async-storage/async-storage';

/* Main Navigator */

PushNotification.configure({
  largeIcon: "ic_launcher",
  smallIcon: "ic_notification",
  
  onRegister: function (token) {
    console.log("TOKEN:", token);
  },
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
    //notification.finish(PushNotificationIOS.FetchResult.NoData);
  },
  onAction: function (notification) {
    console.log("ACTION:", notification.action);
    console.log("NOTIFICATION:", notification);
  },
  onRegistrationError: function(err) {
    console.error(err.message, err);
  },
  permissions: {
    alert: true,
    badge: true,
    sound: true,
  },
  popInitialNotification: true,
  requestPermissions: true,
});

  PushNotification.createChannel(
  {
    channelId: "TEST", // (required)
    channelName: "TEST", // (required)
    channelDescription: "TEST", // (optional) default: undefined.
    playSound: true, // (optional) default: true
    soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
    
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
    (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  );


{/*async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}
React.useEffect(() => {
  setTimeout(() => {
    RNBootSplash.hide();
  }, 1500)
}, [])  
*/}

export default class App extends Component {
  componentDidMount = () => {         
    this.foreground();   
    this.background();     
    this.bootsplash();     
  }

  componentWillUnmount = () => {
    this.foreground();
    this.background();
  }

  foreground = () => {
    messaging().onMessage(payload => {                  
      this.showNotification(payload.data.title, payload.data.body);
    });    
  }

  background = () => {
    messaging().setBackgroundMessageHandler(payload => {
      this.showNotification(payload.data.title, payload.data.body);
    })
  }
  
  bootsplash = () => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 1500)
  }

  showNotification = (title, message) => {
    PushNotification.localNotification({
      title: title,
      message: message,
      playSound: true,
      vibrate: true,
      channelId: 'TEST',      
    })
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Router/>
      </>
    )
  }
}
