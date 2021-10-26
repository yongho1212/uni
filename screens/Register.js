import React, { useState, createRef } from "react";
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Keyboard,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import auth from "@react-native-firebase/auth";
import { Alert } from "react-native";
import { a } from "hangul-js";

const RegisterScreen = ({ navigation }) => {
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [errortext, setErrortext] = useState("");

  const emailInputRef = createRef();
  const passwordInputRef = createRef();

  const handleSubmitButton = () => {
    setErrortext("");
    if (!userName) return alert("Please fill Name");
    if (!userEmail) return alert("Please fill Email");
    if (!userPassword) return alert("Please fill Address");

    auth()
      .createUserWithEmailAndPassword(
        userEmail,
        userPassword
      )
      .then((user) => {
        console.log(
          "Registration Successful. Please Login to proceed"
        );
        user.user.sendEmailVerification();
        alert('이메일 인증을 완료해주세요!')
        console.log(user);
        if (user) {
          auth()
            .currentUser.updateProfile({
              displayName: userName,
              photoURL:
                "https://aboutreact.com/profile.png",
            })
            .then(() => navigation.replace("Auth"))
            .catch((error) => {
              alert(error);
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.code === "auth/email-already-in-use") {
          setErrortext(
            "That email address is already in use!"
          );
        } else {
          setErrortext(error.message);
        }
      });
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#121212",  }}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{
          justifyContent: "center",
          alignContent: "center",
        }}
      >
        
        <KeyboardAvoidingView enabled>
          <View style={styles.sectionStyle}>

          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:10}}>
                <View style={{ height: 1, backgroundColor: '#fff'}} />
                <View>
                  <Text style={{width: 100, textAlign:'left', color: '#fff', fontWeight:'bold', fontSize:20}}>
                    Name
                  </Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
              </View>

            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserName) =>
                setUserName(UserName)
              }
              underlineColorAndroid="#f000"
              placeholder="Enter Name"
              placeholderTextColor="#8b9cb5"
              autoCapitalize="sentences"
              returnKeyType="next"
              onSubmitEditing={() =>
                emailInputRef.current &&
                emailInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>

          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:10}}>
                <View style={{ height: 1, backgroundColor: '#fff'}} />
                <View>
                  <Text style={{width: 100, textAlign:'left', color: '#fff', fontWeight:'bold', fontSize:20}}>
                    Email
                  </Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
              </View>

            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserEmail) =>
                setUserEmail(UserEmail)
              }
              underlineColorAndroid="#fff"
              placeholder="Enter Email"
              placeholderTextColor="#8b9cb5"
              keyboardType="email-address"
              ref={emailInputRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                passwordInputRef.current &&
                passwordInputRef.current.focus()
              }
              blurOnSubmit={false}
            />
          </View>
          <View style={styles.sectionStyle}>

              <View style={{flexDirection: 'row', alignItems: 'center', marginBottom:10}}>
                <View style={{ height: 1, backgroundColor: '#fff'}} />
                <View>
                  <Text style={{width: 100, textAlign:'left', color: '#fff', fontWeight:'bold', fontSize:20}}>
                    Password
                  </Text>
                </View>
                <View style={{flex: 1, height: 1, backgroundColor: '#fff'}} />
              </View>

            <TextInput
              style={styles.inputStyle}
              onChangeText={(UserPassword) =>
                setUserPassword(UserPassword)
              }
              underlineColorAndroid="#fff"
              placeholder="Enter Password"
              placeholderTextColor="#8b9cb5"
              ref={passwordInputRef}
              returnKeyType="next"
              secureTextEntry={true}
              onSubmitEditing={Keyboard.dismiss}
              blurOnSubmit={false}
            />
          </View>
          {errortext != "" ? (
            <Text style={styles.errorTextStyle}>
              {" "}
              {errortext}{" "}
            </Text>
          ) : null}
          <TouchableOpacity
            style={styles.buttonStyle}
            activeOpacity={0.5}
            onPress={handleSubmitButton}
          >
            <Text style={styles.buttonTextStyle}>
              REGISTER
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>
      
    </SafeAreaView>
  );
};
export default RegisterScreen;

const styles = StyleSheet.create({
  sectionStyle: {
    
    height: 80,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  text:{
color:'#fff'
  },
  buttonStyle: {
    backgroundColor: "#fb009e",
    
    color: "#FFFFFF",
    
    height: 40,
    
    borderRadius: 30,
    width:312,
    marginTop: 20,
    marginBottom: 20,
    justifyContent:'center',
    alignItems:'center'
  },
  buttonTextStyle: {
    color: "#fff",
    paddingVertical: 10,
    fontSize: 20,
    fontWeight:'bold',

  
  },
  inputStyle: {
    paddingLeft:20,
    color: "#fff",
    width: 312,
    height:45,
    borderWidth: 1,
    borderRadius: 30,
    borderColor: "#fff",
  },
  errorTextStyle: {
    color: "red",
    textAlign: "center",
    fontSize: 14,
  },
});