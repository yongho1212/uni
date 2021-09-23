import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
} from "react-native";

import { useNavigation } from '@react-navigation/native';

import auth from "@react-native-firebase/auth";


firebase.auth().signInWithEmailAndPassword(user.email, password).then((user) => {
    firebase.database().ref('/users').child(user.uid).remove();
    return user.delete();
  })