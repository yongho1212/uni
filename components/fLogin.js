import React, { Component } from 'react';
import { View, Pressable, Text, Image } from 'react-native';
import { LoginButton, AccessToken,LoginManager } from 'react-native-fbsdk-next';
import Icon from 'react-native-vector-icons/FontAwesome';
import auth from '@react-native-firebase/auth';

const FLogin = () => {
     {/*const signIn = () =>{
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
        
     }*/}
     async function onFacebookButtonPress() {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);
    
      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }
    
      // Once signed in, get the users AccesToken
      const data = await AccessToken.getCurrentAccessToken();
    
      if (!data) {
        throw 'Something went wrong obtaining access token';
      }
    
      // Create a Firebase credential with the AccessToken
      const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);
    
      // Sign-in the user with the credential
      return auth().signInWithCredential(facebookCredential);
    }
        return(
          <View style={{}}>
         
            <Pressable
            onPress={onFacebookButtonPress}
            style={{
              backgroundColor: "white",
              borderColor: "black",
              width:312, 
              height:48, 
              flexDirection:'row', 
              justifyContent: 'space-between',
              paddingHorizontal:30,
              alignItems:'center',
              
              borderRadius:40
            }}
            >
            <Image
            source={require('../assets/logo/flogo.png')}
            style={{width:38, height:38}}
            />
            <Text style={{fontWeight:'bold', color:'black', fontSize: 16,}}> Continue with Facebook</Text>
            </Pressable>
          </View>
        )
  }

  export default FLogin
;
