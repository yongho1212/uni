import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, Alert, Image, ImageBackground, BackHandler} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CometChat } from '@cometchat-pro/react-native-chat';

import AntDesign from 'react-native-vector-icons/AntDesign';

import { SERVER_URL } from '@env';

import { LogBox } from "react-native"

import styles from './styles';

export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {            
            id: '',
            GUID: '',
            usersId: [],
            usersNick: [],
            usersAge: [],
            usersGender: [],
            usersProfile: [],               
        }
    }
  
    componentDidMount = async() => {
        LogBox.ignoreAllLogs(true); 
       
        
        this.connect();
    }


    backButtonClick = () => {
        this.props.navigation.navigate('RoomList');
        return true;
    }

    connect = async() => {
        const id = await AsyncStorage.getItem('id');

        this.setState({
            id: id,
            GUID: this.props.route.params.sendd.GUID,
        })

        var usersId = new Array();
        var usersNick = new Array();
        var usersAge = new Array();
        var usersGender = new Array();
        
        const URL = `${SERVER_URL}/joinList`
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                GUID: this.state.GUID,
            })
        })
        .then(response => response.json())
        .then(responseData => {
            responseData.map((data, index) => {
                usersId.push(data.id);
                usersNick.push(data.nickname);
                usersAge.push(data.age);
                usersGender.push(data.gender);
            })
        })
        .then(() => {
            this.setState({
                usersId: usersId,
                usersNick: usersNick,
                usersAge: usersAge,
                usersGender: usersGender,
            })
        })
        .then(() => this.getUsersProfile())
    }

    getUsersProfile = async() => {
        var usersProfile = new Array();

        for(let i = 0; i < this.state.usersId.length; i++) {               
            fetch(`${SERVER_URL}/firstProfile/?id=` + this.state.usersId[i] + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {              
                    usersProfile.push(responseData.url);
                }
            })
            .then(() => {
                this.setState({
                    usersProfile: usersProfile,
                })
            })
        }          
    }

    showUsersProfile = () => {
        let profile = [];
        var key = 0;

        for(let i = 0; i < this.state.usersId.length; i++) {
            profile.push (
                <View
                    style={styles.line}
                    key={key++}
                >
                    <View style={styles.usersList}>
                        <View style={styles.infoContainer}>
                            <View style={styles.imgContainer}>
                                <Image
                                    source={{uri : this.state.usersProfile[i]}}
                                    style={{width: 70, height: 70, borderRadius: 40, overflow: 'hidden', borderWidth: 1,marginLeft:5}}
                                    key={key++}
                                />
                            </View>
                            <View>
                                <View style={{flexDirection: 'row'}}>
                                    <Text
                                        style={styles.usersNick}
                                    >
                                        {this.state.usersNick[i]}
                                    </Text>
                                    <Text 
                                        style={styles.usersAge}
                                    >
                                        {this.state.usersAge[i] + '세'}
                                    </Text>
                                    <Text
                                        style={styles.usersGender}
                                    >
                                        {this.state.usersGender[i]}
                                    </Text>
                                </View>
                                <Text style={styles.introText}>
                                    introdoce about me
                                </Text>
                            </View>                            
                       </View>
                    </View>
                </View>
            )
        }

        return profile;
    }

    //그룹채팅 합류
    joinGroup = (requestId) => {
        var GUID = this.props.route.params.sendd.GUID;
        var new_member = [
            new CometChat.GroupMember(requestId, CometChat.GROUP_MEMBER_SCOPE.ADMIN)
        ]

        CometChat.addMembersToGroup(GUID, new_member, []).then(
            response => {
                console.log("response", response);
            },
            error => {
                console.log("Something went wrong", error);
            }
        )

        /*
        var groupType = CometChat.GROUP_TYPE.PUBLIC;
        CometChat.joinGroup(GUID, groupType).then(
            group => {
                console.log("Group joined successfully:", group);
            },
            error => {
                console.log("Group joining failed with exception:", error);
            }
        )
        */
    }

    render() {
        return (
            <View>                
                <ImageBackground
                    source={require("../../../assets/imgs/2.png")} resizeMode="cover" 
                    style={{width:"100%", height:'100%', }}
                >
                    <View>
                        {this.showUsersProfile()}
                    </View>
                </ImageBackground>
            </View>
        )
    }
}