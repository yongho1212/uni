import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet, Alert, BackHandler } from 'react-native';
import { TouchableHighlight } from 'react-native-gesture-handler';

import { firebase } from '@react-native-firebase/auth';
import auth from "@react-native-firebase/auth";
import RNExitApp from 'react-native-exit-app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CometChat } from '@cometchat-pro/react-native-chat';
import { SERVER_URL, CHAT_APP_ID, CHAT_API_KEY } from '@env';

export default class DropUser extends Component { 
  constructor(props) {
    super(props);
    this.state = {
        id: '',
        GUID: [],
    }
}    

componentDidMount() {
    this.connect();
}


connect = async() => {
    var id = await AsyncStorage.getItem('id');

    const URL = `${SERVER_URL}/chatInfo`;
    fetch(URL, {
        method: 'POST',
        headers: {
            'Content-Type' : 'application/json',
        },
        body: JSON.stringify({
            id: id,                
        })
    })
    .then(response => response.json())
    .then(responseData => {
        this.setState({
            GUID: responseData
        })
    })
}

deleteGroup = async(GUID) => {
    CometChat.deleteGroup(GUID).then(
        response => {
             console.log("Groups deleted successfully:", response);
        },
        error => {
             console.log("Group delete failed with exception:", error);
        }
    )
}

leaveGroup = async(GUID) => {
    CometChat.leaveGroup(GUID).then(
        response => {
             console.log("Leave group successfully:", response);
        },
        error => {
             console.log("Leave group failed with exception:", error);
        }
    )     
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
        .then(() => {
          const url = 'https://api-us.cometchat.io/v3.0/users/' + id;
          fetch(url, {
              method: 'DELETE',
              headers: {Accept: 'application/json', 'Content-Type': 'application/json', appId: CHAT_APP_ID, apiKey: CHAT_API_KEY},
              body: JSON.stringify({permanent: true})
          })
          .then(response => response.json())
          .then(responseData => console.log(responseData))  
      })
      .then(() => {
          console.log(this.state.GUID);
          console.log(this.state.GUID.length);
          for(let i = 0; i < this.state.GUID.length; i++) {
              //탈퇴하는 회원이 방의 호스트 일 경우
              if(this.state.GUID[i].hostUser.length === 1 && this.state.GUID[i].hostUser.indexOf(id) > -1) {
                  this.deleteGroup(this.state.GUID[i].GUID);
              //탈퇴하는 회원이 방의 참가자 일 경우                    
              }else {
                  this.leaveGroup(this.state.GUID[i].GUID);
              }                
          }
      })
        .catch(function(error) {
          Alert.alert('Login again please');
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
      color: "red",
      fontSize: 25,
      fontFamily:'Jost-Medium',
      fontWeight:'bold'
    }
}); 