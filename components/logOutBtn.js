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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';
import {CometChat} from '@cometchat-pro/react-native-chat';

import auth from "@react-native-firebase/auth";

const LogoutBtn = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((user) => {
      
      setUser(user);
    });

    return subscriber;
  }, []);

  const navigation = useNavigation();

  const logout = () => {
    Alert.alert(
      "로그아웃",
      "로그아웃 하시겠습니까?",
      [
        {
          text: "취소",
          onPress: () => {
            return null;
          },
        },
        {
          text: "확인",
          onPress: () => {
            CometChat.logout().then(
              () => {
                console.log("Logout completed successfully");
              },error=>{
                console.log("Logout failed with exception:",{error});
              }
            ).then(
            auth()
              .signOut()
              .then(() => navigation.replace("Auth"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                  navigation.replace("Auth");
                else alert(error);
                
              })
            )
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
  
       <View style={{ height:39,  zIndex:200}}>
          <Pressable
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={logout}
          >
            <Text style={styles.buttonTextStyle}>
              로그아웃
            </Text>
          </Pressable>
          </View>

        
 
  );
};

export default LogoutBtn;

const styles = StyleSheet.create({
  buttonStyle: {
    minWidth: 300,
    backgroundColor: "#e6e6e6",
    borderWidth: 0,
    color: "red",
    
    height: 40,

    borderRadius: 30,
  
    marginTop: 20,
    marginBottom: 25,
    alignItems:'center',
    justifyContent:'center'
  },
  buttonTextStyle: {
    color: "red",
    fontSize: 25,
    fontFamily:'Jost-Medium',
    fontWeight:'bold'
    
  },
});