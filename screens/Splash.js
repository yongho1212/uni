import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";

import auth, { firebase } from "@react-native-firebase/auth";
import RNBootSplash from "react-native-bootsplash";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CometChat } from '@cometchat-pro/react-native-chat';

import {CHAT_APP_ID, CHAT_AUTH_KEY } from '@env'

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  async function onAuthStateChanged(user) {
    const id = await AsyncStorage.getItem('id')
    
    if (id == null) setUser(false);
  }

  useEffect(() => {
   
    if (user == true) {
      navigation.replace("DrawerNav")
    } else {
      navigation.replace("Auth")
    }
  }, []);


  

  //chatting  
  const appID = CHAT_APP_ID;
  const region = 'us';
  const appSetting = new CometChat.AppSettingsBuilder()
    .subscribePresenceForAllUsers()
    .setRegion(region)
    .build();

 

    const loginCheck = () => {
      const user = auth().currentUser;
      if (user) {
        navigation.replace("DrawerNav")
      } else {
        navigation.replace("Auth")
      }
    }

  // useEffect(() => {
   // loginCheck();
  //  setTimeout(() => {
    {/*  navigation.replace(
        auth().currentUser ? "DrawerNav" : "Auth"        
      );
    */}
    //  auth().currentUser ? chatInit() : console.log('Login Please');
  //  }, 1);
//  }, []);  

  const chatInit = async() => {    
    var id = await AsyncStorage.getItem('id');

    CometChat.init(appID, appSetting).then(
      () => {
        console.log('Initialization completed successfully');
      },
      (error) => {
        console.log('Initialization failed with error:', error);
      },
    ).then(
      CometChat.getLoggedinUser().then(
        (user) => {
            if(!user){
                CometChat.login(id, authKey).then(
                  user => {
                    console.log("Login Successful:", { user });    
                  }, error => {
                    console.log("Login failed with exception:", { error });    
                  }
                );
            }
        }, error => {
            console.log("Some Error Occured", { error });
        }
    )

    )
  }
  return (
    <SafeAreaView
      style={{ flex: 1,}}
    >
    <ActivityIndicator size="large" color="#fb009e" />
    </SafeAreaView>
  );
};

export default SplashScreen;

