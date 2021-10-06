import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, Alert, Image,ImageBackground} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { CometChat } from '@cometchat-pro/react-native-chat';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';


export default class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            _id: '',
            id: '',
            usersId: [],
            usersNick: [],
            usersProfile: [],               
        }
    }
  
    componentDidMount = async() => {
        console.log(this.props.route.params.sendd._id);
        this.connect();
    }

    connect = async() => {
        const id = await AsyncStorage.getItem('id');

        this.setState({
            id: id,
            _id: this.props.route.params.sendd._id,
        })

        var usersId = new Array();
        var usersNick = new Array();
        const URL = "https://loof-back.herokuapp.com/userList";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: this.state._id,
            })
        })
        .then(response => response.json())
        .then(responseData => {
            responseData.map((data, index) => {
                usersId.push(data.id);
                usersNick.push(data.nickname);
            })
        })
        .then(() => {
            this.setState({
                 usersId: usersId,
                 usersNick: usersNick,
            })
        })
        .then(() => this.getUsersProfile())
    }

    getUsersProfile = async() => {
        var usersProfile = new Array();

        for(let i = 0; i < this.state.usersId.length; i++) {               
             fetch("https://loof-back.herokuapp.com/firstProfile/?id=" + this.state.usersId[i] + "&time=" + new Date())
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
                                <Text
                                    style={styles.usersNick}
                                >
                                    {this.state.usersNick[i]}
                                </Text>
                                <Text style={styles.introText}>
                                    introdoce about me
                                </Text>
                            </View>
                            
                       </View>
                       <View style={styles.checkList}>
                            <AntDesign
                                 name={"checkcircleo"}
                                 style={styles.allowIcon}           
                                 onPress={() => {this.allowUser(this.state.usersId[i]); this.joinGroup()}}                                             
                            />
                            <AntDesign
                                 name={"closecircleo"}
                                 style={styles.refuseIcon}                                   
                            />
                       </View>
                    </View>
                </View>
            )
        }

        return profile;
    }

    allowUser = async(userId) => {
        var usersId = new Array();
        var usersNick = new Array();

        const URL = "https://loof-back.herokuapp.com/allowUser";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: this.props.route.params.sendd._id,
                id: userId,
            })
        })
        .then(response => response.json())
        .then(responseData => {
            console.log(responseData);
            responseData.map((data, index) => {
                usersId.push(data.id);
                usersNick.push(data.nickname);
            })
        })
        .then(() => {
            this.setState({
                 usersId: usersId,
                 usersNick: usersNick,
            })
        })
        .then(() => this.getUsersProfile())
    }

    //그룹채팅 합류
    joinGroup = () => {
        var GUID = this.props.route.params.GUID;
        var groupType = CometChat.GROUP_TYPE.PUBLIC;

        CometChat.joinGroup(GUID, groupType).then(
            group => {
                console.log("Group joined successfully:", group);
            },
            error => {
                console.log("Group joining failed with exception:", error);
            }
        )
    }

    render() {
        return (
            <View style={{backgroundColor:'#fff', flex:1}}>
                 
                <View style={{alignItems:'center'}}>
                    {this.showUsersProfile()}
                </View>
                {/*
                <ImageBackground
                source={require("../../../assets/imgs/3rs.png")} resizeMode="cover" 
                style={{width:"100%", height:'100%'}}
                >
                </ImageBackground>
                <View style={styles.headerConatiner}>
                        <AntDesign
                            name={"arrowleft"}
                            style={styles.backIcon}
                            onPress={() => {this.props.navigation.navigate('RoomList');}}
                        />  
                        <Text>Request User List</Text>                    
        </View>*/}
                
                
            </View>
        )
    }
}