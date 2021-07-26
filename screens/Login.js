import React, { useState, createRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  ImageBackground,
  Image,
  Keyboard,
  TouchableOpacity,
  KeyboardAvoidingView,
  Pressable,
} from "react-native";

import auth from "@react-native-firebase/auth";

import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';

import {
  LoginButton,
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} from 'react-native-fbsdk-next';

import FLogin from '../components/fLogin';
import PhoneAuth from '../components/phoneAuth/PhoneAuth';

import AsyncStorage from "@react-native-async-storage/async-storage";

import Ionicons from 'react-native-vector-icons/Ionicons'


const LoginScreen = ({ navigation }) => {
  //custom
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  // google
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  

  const passwordInputRef = createRef();

// BACK
  const connect = async(id, email) => {
    try {
      await AsyncStorage.setItem('id', id)    
    } catch (e) {
      console.log(e);
    }  

    const URL = "http://127.0.0.1:3000/signIn";
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            id: id,
            email: email,
        })
    })
    .then(response => response.json())
    .then(responseData => {
        if(responseData) {
          console.log(responseData);
          navigation.navigate('Main');    
        }else {
          console.log(responseData);
          navigation.navigate('Gender');
        }
    })
}


// CUSTOM
  const handleSubmitPress = () => {
    setErrortext("");
    if (!userEmail) {
      alert("Please fill Email");
      return;
    }
    if (!userPassword) {
      alert("Please fill Password");
      return;
    }
    auth()
      .signInWithEmailAndPassword(userEmail, userPassword)
      .then((user) => {
        console.log(user);
        // If server response message same as Data Matched
        if (user) navigation.replace("Main");
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/invalid-email")
          setErrortext(error.message);
        else if (error.code === "auth/user-not-found")
          setErrortext("No User Found");
        else {
          setErrortext(
            "Please check your email id or password"
          );
        }
      });
  };

  // GOOGLE
  useEffect(() => {
    // Initial configuration
    GoogleSignin.configure({
      // Mandatory method to call before calling signIn()
     // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      // Repleace with your webClientId
      // Generated from Firebase console
      webClientId: '913377494399-3utpu41533gamaa6fgqtui5ajcu54pt6.apps.googleusercontent.com',
    });
    // Check if user is already signed in
  
  }, []);

  const g_signIn = async () => {
    // It will prompt google Signin Widget
    try {
      await GoogleSignin.hasPlayServices();
      const {accessToken, idToken} = await GoogleSignin.signIn();
      setloggedIn(true);

      const credential = auth.GoogleAuthProvider.credential(
        idToken,
        accessToken,
      );
      await auth().signInWithCredential(credential)
      .then((idToken) => {
        console.log(idToken);
        // If server response message same as Data Matched
        // if (idToken) navigation.replace("Gender");
        var id = idToken.additionalUserInfo.profile.sub;   
        var email = idToken.additionalUserInfo.profile.email;
                
        // If server response message same as Data Matched
        //if (idToken) navigation.replace("HomeScreen");
        connect(id, email);
      })
     
    } catch (error) {
      console.log('Message', JSON.stringify(error));
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('User Cancelled the Login Flow');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signing In');
      } else if (
          error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE
        ) {
        alert('Play Services Not Available or Outdated');
      } else {
        alert(error.message);
      }
    }
  };

  


  

  return (
    <View style={styles.mainBody}>
      <View
        keyboardShouldPersistTaps="handled"
       
      >
        <ImageBackground
        source={require("../assets/imgs/party.jpg")} resizeMode="cover" 
        style={{width:"100%", height:'100%'}}
        >
        <View style={{alignItems:'center', justifyContent:'center'}}> 
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center", flex:1, top:200 }}>
              <Text style={{justifyContent:'center', height:500, color:'white', alignItems:'center', fontSize:100, fontWeight:'bold', fontStyle:'italic', }}>
                LOOF!
              </Text>
            </View>
             {/*<View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserEmail) =>
                  setUserEmail(UserEmail)
                }
                placeholder="Enter Email"
                placeholderTextColor="#8b9cb5"
                autoCapitalize="none"
                keyboardType="email-address"
                returnKeyType="next"
                onSubmitEditing={() =>
                  passwordInputRef.current &&
                  passwordInputRef.current.focus()
                }
                underlineColorAndroid="#f000"
                blurOnSubmit={false}
              />
            </View>
           <View style={styles.sectionStyle}>
              <TextInput
                style={styles.inputStyle}
                onChangeText={(UserPassword) =>
                  setUserPassword(UserPassword)
                }
                placeholder="Enter Password"
                placeholderTextColor="#8b9cb5"
                keyboardType="default"
                ref={passwordInputRef}
                onSubmitEditing={Keyboard.dismiss}
                blurOnSubmit={false}
                secureTextEntry={true}
                underlineColorAndroid="#f000"
                returnKeyType="next"
              />
            </View>*/}
            {/*{errortext != "" ? (
              <Text style={styles.errorTextStyle}>
                {" "}
                {errortext}{" "}
              </Text>
            ) : null}*/}
            <View style={{flex:1, justifyContent:'center'}}>
              <View style={styles.sectionStyle}>
            <TouchableOpacity
              style={{backgroundColor: "white",
              borderColor: "black",
              width:312, 
              height:48, 
              flexDirection:'row', 
              justifyContent: 'space-between',
              paddingHorizontal:30,
              alignItems:'center',
              
              borderRadius:40
            }}
              activeOpacity={0.5}
              // onPress={handleSubmitPress}
              onPress={() => navigation.navigate('PhoneAuth')}
            >
              <Ionicons 
                        name={"phone-portrait-outline"}
                        style={{fontSize:38}}
                        />
              <Text 
              style={styles.buttonTextStyle}>
                 Continue with Phone 
              </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.sectionStyle}>
              <Pressable
                onPress={g_signIn}
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
                source={require('../assets/logo/g-logo.png')}
                style={{width:38, height:38,}}
                />
                <Text 
                style={styles.buttonTextStyle}>
                 Continue with Google
                </Text>
              </Pressable>
              </View>
              <View style={styles.sectionStyle}>
                <FLogin/>
              </View>
              </View>
           {/* <Text
              style={styles.registerTextStyle}
              onPress={() =>
                navigation.navigate("RegisterScreen")
              }
            > 
              New Here ? Register
            </Text>*/}
          </KeyboardAvoidingView>
        </View>
        </ImageBackground>
      </View>
    
    
              
    </View>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    justifyContent:'center',
    
    
    
    
  },
  sectionStyle: {
    flexDirection: "row",
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: "white",
              borderColor: "#1877F2",
              width:312, 
              height:48, 
              flexDirection:'row', 
              justifyContent:'space-around',
              alignItems:'center',
              borderWidth:2,
              borderRadius:40

  },
  buttonTextStyle: {
    color: "black",
    paddingVertical: 10,
    fontSize: 16,
    fontWeight:'bold'
  },
  inputStyle: {
    
    color: "white",
    paddingLeft: 15,
    paddingRight: 15,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#dadae8",
  },
  registerTextStyle: {
    color: "#FFFFFF",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 14,
    alignSelf: "center",
    padding: 10,
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
  googleButtonStyle:{
    justifyContent:'center',
    alignItems:'center'
  }
});