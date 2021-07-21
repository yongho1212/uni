import React, { useState, createRef, useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,

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



const LoginScreen = ({ navigation }) => {
  //custom
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");
  // google
  const [loggedIn, setloggedIn] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  

  const passwordInputRef = createRef();



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
        if (user) navigation.replace("HomeScreen");
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
      scopes: ['https://www.googleapis.com/auth/drive.readonly'],
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
        if (idToken) navigation.replace("Gender");
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
    <SafeAreaView style={styles.mainBody}>
      <View
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          flex: 1,
        }}
      >
        <View style={{alignItems:'center',alignContent:'center', justifyContent:'center'}}> 
          <KeyboardAvoidingView enabled>
            <View style={{ alignItems: "center" }}>
              <Image
                source={require("../assets/logo/uni_logo.png")}
                style={{
                  width: "70%",
                  height: 300,
                  resizeMode: "contain",
                  margin: 30,
                }}
              />
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
            <View style={styles.sectionStyle}>
            <TouchableOpacity
              style={styles.buttonStyle}
              activeOpacity={0.5}
              // onPress={handleSubmitPress}
              onPress={() => navigation.navigate('PhoneAuth')}
            >
              <Text 
              style={styles.buttonTextStyle}>
                Login With Phone 
              </Text>
            </TouchableOpacity>
            </View>
            <View style={styles.sectionStyle}>
              <GoogleSigninButton
                style={{width: 312, height: 48, }}
                size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark}
                onPress={g_signIn}
              />
              </View>
              <View style={styles.sectionStyle}>
                <FLogin/>
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
      </View>
    
    
              
    </SafeAreaView>
  );
};
export default LoginScreen;

const styles = StyleSheet.create({
  mainBody: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFF",
    alignContent: "center",
    alignItems:'center'
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
    backgroundColor: "grey",
    color: "#FFFFFF",
    borderColor: "#7DE24E",
    height: 40,
    width:312,
    alignItems: "center",
    justifyContent:'center'
  },
  buttonTextStyle: {
    color: "#FFFFFF",
    paddingVertical: 10,
    fontSize: 16,
  },
  inputStyle: {
    flex: 1,
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