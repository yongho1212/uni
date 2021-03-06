import React, { Component } from 'react';
import {Text, View, Pressable, Alert, SafeAreaView, TextInput, Keyboard, ImageBackground, KeyboardAvoidingView, TouchableWithoutFeedback} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Moment from 'moment';
import 'moment/locale/ko';

import { CometChat } from '@cometchat-pro/react-native-chat';


import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { SERVER_URL } from '@env'
import styles from './styles';
import { TouchableOpacity } from 'react-native';



export default class Hosting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            room: {
                
            },
            check: '',
        }
    }

    componentDidMount = async() => {
        this.asyncStorage();
    }

    asyncStorage = async() => {
        if(this.props.route.params.Info === 'modify') {
            await AsyncStorage.setItem('check', this.props.route.params.Info);
            
            await AsyncStorage.setItem('_id', this.props.route.params._id);
            await AsyncStorage.setItem('address', this.props.route.params.address);
            await AsyncStorage.setItem('lat', JSON.stringify(this.props.route.params.lat));
            await AsyncStorage.setItem('lng', JSON.stringify(this.props.route.params.lng));
            await AsyncStorage.setItem('category', this.props.route.params.category);
            await AsyncStorage.setItem('title', this.props.route.params.title);
            await AsyncStorage.setItem('time', JSON.parse(this.props.route.params.time));
            await AsyncStorage.setItem('timeInfo', this.props.route.params.timeInfo);
            await AsyncStorage.setItem('kakaolink', this.props.route.params.timeInfo);
        }else if(this.props.route.params.Info === 'place') {    
            if(this.props.route.params.address !== null) {        
                console.log(this.props.route.params.lat);
                console.log(this.props.route.params.lng);
                await AsyncStorage.setItem('address', this.props.route.params.address);
                await AsyncStorage.setItem('lat', JSON.stringify(this.props.route.params.lat));
                await AsyncStorage.setItem('lng', JSON.stringify(this.props.route.params.lng));
            }
        }else if(this.props.route.params.Info === 'category') {
            if(this.props.route.params.category !== ''){
                await AsyncStorage.setItem('category', this.props.route.params.category);
            }
        }else if(this.props.route.params.Info === 'time') {
            await AsyncStorage.setItem('time', JSON.parse(this.props.route.params.time));
            await AsyncStorage.setItem('timeInfo', this.props.route.params.timeInfo);
        } 
        
        try {                        
            const _id = await AsyncStorage.getItem('_id');
            const check = await AsyncStorage.getItem('check');

            const id = await AsyncStorage.getItem('id');
            const address = await AsyncStorage.getItem('address');
            const lat = await AsyncStorage.getItem('lat');
            const lng = await AsyncStorage.getItem('lng');
            const category = await AsyncStorage.getItem('category');
            const title = await AsyncStorage.getItem('title');
            const time = await AsyncStorage.getItem('time');
            const timeInfo = await AsyncStorage.getItem('timeInfo');
            const kakaolink = await AsyncStorage.getItem('kakaolink');
            this.setState({
                room: {
                    id: id,
                    address: address,
                    lat: lat,
                    lng: lng,
                    category: category,
                    title: title,
                    kakaolink: kakaolink,
                    time: time,
                    timeInfo: timeInfo,
                },
                check: check,         
                _id: _id,       
            })
        } catch(e) {
            console.log(e);
        }
    }
    removeStorage = async() => {
        await AsyncStorage.removeItem('check');
        await AsyncStorage.removeItem('category');
        await AsyncStorage.removeItem('title');
        await AsyncStorage.removeItem('kakaolink');
        await AsyncStorage.removeItem('time');
        await AsyncStorage.removeItem('timeInfo');
    }

    //????????????
    onChangeText = async(text) => {
        await AsyncStorage.setItem('title', text);    
        const title = await AsyncStorage.getItem('title');
        this.state.room.title = title;
    }

    onChangeLink = async(text) => {
        await AsyncStorage.setItem('kakaolink', text);    
        const kakaolink = await AsyncStorage.getItem('kakaolink');
        this.state.room.kakaolink = kakaolink;
    }

    createRoom = async() => {        
        const {id, address, lat, lng, category, title, time, timeInfo, kakaolink} = this.state.room;
        var GUID = Moment(new Date()).format('MMDD_HHmmss');

        const URL = `${ SERVER_URL }/createRoom`;
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id,
                address: address,
                lat: lat,
                lng: lng,                
                category: category,
                title: title,
                kakaolink: kakaolink,
                time: time,
                timeInfo: timeInfo,
                GUID: GUID,
            })
        })
        .then(() => this.props.navigation.push('DrawerNav', {lat: this.state.room.lat, lng: this.state.room.lng}))
    }

    modifyRoom = async() => {
        const {_id} = this.state;
        const {address, lat, lng, category, title, time, timeInfo, kakaolink} = this.state.room;

        console.log(_id);
        
        const URL = `${ SERVER_URL }/modifyRoom`
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                _id: _id,
                address: address,
                lat: lat,
                lng: lng,
                category: category,
                title: title,
                kakaolink: kakaolink,
                time: time,
                timeInfo: timeInfo,
            })
        })
        
        .then(this.props.navigation.push('DrawerNav'));
    }

    hosting = async() => {
        if(this.state.room.address === null) {
            Alert.alert('????????? ???????????????');
        }else if(this.state.room.category === null) {
            Alert.alert('??????????????? ???????????????');
        }else if(this.state.room.title === null) {
            Alert.alert('????????? ???????????????');
        }else if(this.state.room.kakaolink === null) {
            Alert.alert('????????? ???????????????');
        }else if(this.state.room.time === null) {
            Alert.alert('????????? ???????????????');
        }else {
            this.createRoom();
            this.props.navigation.push('DrawerNav', {lat: this.state.room.lat, lng: this.state.room.lng})             
        }        
    }      

     //??? ????????? ????????? ?????? ?????? ??????
    createGroup = () => {
        var GUID = Moment(new Date()).format('MMDD_HHmmss');
        var groupName = this.state.room.title;
        var groupType = CometChat.GROUP_TYPE.PUBLIC;
        var password = "";
        var icon;

        if(this.state.room.category === '??????') {            
            icon = 'https://cdn-icons-png.flaticon.com/512/3379/3379077.png';
        }else if(this.state.room.category === '??????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/2527/2527948.png';
        }else if(this.state.room.category === '??????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/4500/4500081.png';
        }else if(this.state.room.category === '??????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/3523/3523431.png';
        }else if(this.state.room.category === '??????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/1028/1028346.png';
        }else if(this.state.room.category === '??????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/1039/1039403.png';               
        }else if(this.state.room.category === '??????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/1869/1869509.png';
        }else if(this.state.room.category === '?????????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/502/502128.png';   
        }else if(this.state.room.category === '??? ??????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/4516/4516609.png';
        }else if(this.state.room.category === '?????????????????????') {
            icon = '???';   
        }else if(this.state.room.category === '??????????????????') {
            icon = '??????';   
        }else if(this.state.room.category === '????????????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/3909/3909075.png';
        }else if(this.state.room.category === '????????????') {
            icon = 'https://cdn-icons-png.flaticon.com/512/3898/3898150.png';  
        }

        
        var group = new CometChat.Group(GUID, groupName, groupType, password, icon);

        CometChat.createGroup(group).then (
            group => {
                console.log("Group created successfully:", group);
            },
            error => {
                console.log("Group creation failed with exception:", error);
            }    
        )
    }

    render() {
        return (
            <View 
            style={styles.hostingContainer}
            
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                behavior={"position"}
                
                >
                
          
                <ImageBackground
                source={require("../../../assets/imgs/3rs.png")} 
                style={{width:"100%", height:'100%', }}
                >
                      <SafeAreaView >
                    <View style={styles.headerConatiner}>
                        <View style={styles.backIcon}>
                            <Pressable
                                onPress={() => {this.removeStorage(); this.props.navigation.navigate('DrawerNav');}}
                                style={styles.backIcon}
                            >
                            <MaterialIcons name={"arrow-back-ios"} 
                                size={35} 
                                color={'#000'}
                                style={{marginLeft:30}}
                            />                                
                            </Pressable>
                        </View>
                    
                        <View style={styles.headerTextContainer}>
                            {this.state.check === 'modify' 
                            ? 
                            <Text style={styles.headerText}>Modify</Text>
                            : 
                            <Text style={styles.headerText}>Hosting</Text>
                            }
                        </View>
                    
                </View>      
                <View style={styles.contentContainer}>
                <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>Category</Text>
                        <Pressable
                            style={styles.categoryInput}
                            onPress={() => this.props.navigation.push('Category')}
                        >
                            {this.state.room.category === null ?
                            <Text>???????????? ??????</Text>
                            :
                            <Text>{this.state.room.category}</Text>
                            }
                        </Pressable>
                    </View>
                    <View style={styles.placeContainer}>
                        <Text style={styles.placeText}>Place</Text>
                        <Pressable
                            style={styles.placeInput}
                            onPress={() => this.props.navigation.navigate('LocationSearch')}
                        >                            
                            <Text>{this.state.room.address}</Text>                            
                        </Pressable>
                    </View>
                    
                    <View style={styles.timeConatiner}>
                        <Text style={styles.timeText}>Time</Text>
                        <Pressable
                            style={styles.timeInput}
                            onPress={() => this.props.navigation.navigate('Time')}
                        >                                      
                            <View style={styles.timeInfo}>
                                <Text style={styles.timePlaceHolder}>???????????? ??????</Text>
                                <Text style={{fontFamily:'Jost-Medium'}}>{this.state.room.timeInfo}</Text>
                            </View>                                                                
                        </Pressable>
                        
                    </View>
                    <View style={styles.titleConatiner}>
                        <Text style={styles.titleText}>Title</Text>
                        <TextInput
                            style={styles.titleInput}
                            autoCapitalize="none"
                            onChangeText={text => this.onChangeText(text)}
                            value={this.state.room.title}
                        />
                    </View>
                    <View style={styles.chatlinkConatiner}>
                        <Text style={styles.chatlinkText}>Chat Link</Text>
                        <TextInput
                            style={styles.chatlinkInput}
                            autoCapitalize="none"
                            onChangeText={text => this.onChangeLink(text)}
                            value={this.state.room.kakaolink}
                            multiline ={true}
                        />
                    </View>
                    
                    {this.state.check === 'modify' ?
                    <TouchableOpacity
                        style={styles.modifyButton}  
                        onPress={() => this.modifyRoom()}                           
                    >
                        <Text style={{fontWeight:'bold', fontFamily:'Jost-Medium'}}>??? ???</Text>
                    </TouchableOpacity>
                    :        
                    <Pressable
                        style={styles.hostButton}
                        onPress={() => {this.hosting(); this.createGroup();}}                              
                    >
                        <Text style={{color:'#000', fontSize:25, fontWeight:'bold', fontFamily:'Jost-Medium'}}>Hosting</Text>
                    </Pressable>
                    }
                </View>
                </SafeAreaView>
                </ImageBackground>
                
                </KeyboardAvoidingView>
                </TouchableWithoutFeedback>
            </View>
        )
    }
}