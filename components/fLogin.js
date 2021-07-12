import React, { Component } from 'react';
import { View, Pressable } from 'react-native';
import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const FLogin = () => {
     const signIn = () =>{
     LoginManager.logInWithPermissions(["public_profile", "email"]).then(
          async (result) => {
            if (result.isCancelled) {
              Alert.alert('로그인 취소', 'login cancelled');
            } else {
              const accessToken = await getAccressToken();
              const profile = await Profile.getCurrentProfile();
              console.log(accessToken);
              console.log(profile);
            }
          },
          (error) => {
            Alert.alert('로그인 실패', error);
          }
        );
        
     }
        return(
          <View>
         
            <Icon.Button
            name="facebook"
            backgroundColor="#3b5998"
            onPress={signIn}
            >
            Login with Facebook
            </Icon.Button>
          </View>
        )
  }

  export default FLogin
;
