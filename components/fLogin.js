import React, { Component } from 'react';
import { View, Pressable } from 'react-native';
import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk-next';

const FLogin = () => {
     const signIn = () =>{
     LoginManager.logInWithPermissions(["public_profile"]).then(
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
          <Pressable
          style={{borderWidth:1, height:30}}
          onPress={signIn}
          />
          </View>
        )
  }

  export default FLogin
;
