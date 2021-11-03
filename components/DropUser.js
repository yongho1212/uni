import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet, Alert, BackHandler } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { firebase } from '@react-native-firebase/auth';
import auth from "@react-native-firebase/auth";
import RNExitApp from 'react-native-exit-app';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { SERVER_URL } from '@env';

export default class DropUser extends Component { 
    constructor(props) {
        super(props);
        this.state = {
            id: '',
        }
    }

    dropFunc = async() => {

        const user = auth().currentUser;
        var id = await AsyncStorage.getItem('id');
        const URL = `${SERVER_URL}/dropUser`;

         user.delete().then(() => {
            RNExitApp.exitApp();
            console.log('User Deleted Successfully');
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type' : 'application/json',
                },
                body: JSON.stringify({
                    id: id,                
                })
            })
            
        })
        
        .catch(function(error) {
            Alert.alert(error.message);
        }) 
    }

    dropUser = () => {

    
        Alert.alert(
            "회원탈퇴",
            "탈퇴 하시겠습니까?",
            [
              {
                text: "Cancel",
                onPress: () => {
                  return null;
                },
              },
              {
                text: "Confirm",
                onPress: () => {
                    this.dropFunc();
                },
              },
            ],
            
        );
    }

    backAction = () => {
        Alert.alert("탈퇴 하시겠습니까?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => this.dropUser() }
        ]);
        return true;
      };

      componentDidMount() {
        this.backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          this.backAction
        );
      }

      componentWillUnmount() {
        this.backHandler.remove();
      }


    render() {
        return (       
            <View >
                <TouchableHighlight 
                    onPress={() => this.dropUser()}
                    style={styles.buttonStyle}
                >
                    <Text style={styles.textStyle}>회원탈퇴</Text>                    
                </TouchableHighlight>
            </View>
        )
    }
}

const styles = StyleSheet.create({

        buttonStyle: {
            minWidth: 300,
            backgroundColor: "#1212",
            borderWidth: 0,
            color: "red",
            height: 40,
            
            borderRadius: 30,
            marginLeft: 35,
            marginRight: 35,
            marginTop: 20,
            marginBottom: 25,
            alignItems:'center',
            justifyContent:'center'
    },
    textStyle:{
        color:'red',
        fontSize: 20,
        fontWeight:'bold'
    }
}); 