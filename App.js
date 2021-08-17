import "react-native-gesture-handler";

// Import React and Component
import React, {useEffect,  useRef, useState} from "react";
import { Animated, Dimensions, StyleSheet, Text, View } from "react-native";
import Router from "./Navigation/Router";
import RNBootSplash from 'react-native-bootsplash';


/* Main Navigator */

const App = () => {
  

  React.useEffect(() => {
    setTimeout(() => {
      RNBootSplash.hide();
    }, 1500)
  })

  return (
    <>
      <Router/>
    </>
  );
};

export default App;