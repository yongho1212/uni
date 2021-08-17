import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Image,
} from "react-native";

import auth from "@react-native-firebase/auth";
import RNBootSplash from "react-native-bootsplash";

const SplashScreen = ({ navigation }) => {
  //State for ActivityIndicator animation
  const [animating, setAnimating] = useState(true);


 React.useEffect(() => {
    setTimeout(() => {
      
      navigation.replace(
        auth().currentUser ? "DrawerNav" : "Auth"
      );
    }, 1);
  }, []);


  return (
    <SafeAreaView
      style={{ flex: 1,}}
    >
    <ActivityIndicator size="large" color="#fb009e" />
    </SafeAreaView>
  );
};

export default SplashScreen;

