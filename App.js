import "react-native-gesture-handler";

// Import React and Component
import React, {useEffect,  useRef, useState} from "react";
import { Animated, Dimensions, StyleSheet, Text, View, StatusBar} from "react-native";
import Router from "./Navigation/Router";
import RNBootSplash from 'react-native-bootsplash';
import messaging from '@react-native-firebase/messaging'
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import PushNotification from "react-native-push-notification";


/* Main Navigator */



async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

const App = () => {
  
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);
  

  React.useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 1500)
  })

  

  return (
    <>
     <StatusBar barStyle="dark-content" />
      <Router/>
    </>
  );
};

export default App;