import React, {Component} from 'react'
import {Text, View, Image, TouchableOpacity, Pressable, SafeAreaView, Switch, Dimensions} from 'react-native';
import LogoutBtn from '../../../components/logOutBtn';
import DropUser from '../../../components/DropUser';

import VersionCheck from "react-native-version-check";

import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypov from 'react-native-vector-icons/Entypo';

import { SERVER_URL } from '@env';

import styles from './styles';

export default class Setting extends Component {
    constructor(props) {
        super(props);
        this.state = {
            allowPush: true,
            onColor: '#fb009e',
            offColor: 'gray',
        }
    }

    componentDidMount = async() => {
        this.getPush();
       
    }


    getPush = async() => {
        const id = await AsyncStorage.getItem('id');
        const URL = `${SERVER_URL}/getPush`;

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
                allowPush: responseData,
            })
        })
    }

    connectPush = async() => {     
        const id = await AsyncStorage.getItem('id');
        const URL = `${SERVER_URL}/setPush`;
        
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: id,   
                push: this.state.allowPush,             
           })  
        })
    }

    render () {
        return(
            <SafeAreaView style={{ height: Dimensions.get('screen').height * 1, backgroundColor: '#fff'}}>      
                <View style={styles.headerConatiner}>
                    <View style={styles.backIcon}>
                        <Pressable
                            onPress={() => this.props.navigation.navigate('HomePage')}
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
                        <Text style={styles.headerText}>설정</Text>
                    </View>
                </View>                
                <View style={{}}>
                    {/*
                    <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff', }}>
                        <TouchableOpacity 
                            style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff', paddingVertical:10}}
                            onPress={() => alert ('서비스 준비중')}
                        >
                            <Image
                                style={{width:80, height:80}}
                                source={require('../../../assets/imgs/invitation.png')}
                            />
                            <Text style={{marginTop:10, fontWeight:'bold', fontSize:18}}>
                                친구 초대하기
                            </Text>
                        </TouchableOpacity>                    
                    </View>
                    */}
                    <View>
                        <View style={{paddingVertical: 25, flexDirection: 'row', borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>                                                    
                            <View style={{marginLeft: 10}}> 
                                <Text>버전정보</Text>
                            </View>
                            <View style={{marginLeft: Dimensions.get('screen').width * 0.75}}>
                                <Text>{VersionCheck.getCurrentVersion()}</Text>                     
                            </View>                             
                        </View>                        
                    </View>
                    <View style={{paddingVertical: 25, flexDirection:'row', backgroundColor:'#fff', borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                        <View style={{marginLeft: 10, marginRight: Dimensions.get('screen').width * 0.65}}>
                            <Text>앱 푸시 알림</Text>
                        </View>
                        {this.state.allowPush === true ?
                        <Switch 
                            onValueChange={() => {this.setState({allowPush: false}); this.connectPush();}} 
                            value={true} 
                            thumbColor={this.state.onColor}  
                            trackColor={{true: '#ff69b4'}}                                                         
                        />
                        :
                        <Switch 
                            onValueChange={() => {this.setState({allowPush: true}); this.connectPush();}} 
                            value={false} 
                            thumbColor={this.state.offColor}
                            trackColor={{false: '#a9a9a9'}}    
                        />
                        }                                      
                    </View>  
                    <View style={{flexDirection: 'row', paddingVertical: 25, borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                        <View
                            style={{marginRight: Dimensions.get('screen').width * 0.65}}
                        >
                            <TouchableOpacity
                                style={{marginLeft: 10}}
                                onPress={() => this.props.navigation.navigate('Privacy')}                            
                            >
                                <Text>서비스 이용약관</Text>
                            </TouchableOpacity>
                        </View>
                            <Entypov                                         
                                name={'chevron-right'}
                                size={24}
                                color={'#fb009e'}
                            />
                    </View>                                       
                </View>
                <View style={{flexDirection: 'row', paddingVertical: 25, borderBottomColor: 'lightgrey', borderBottomWidth: 1}}>
                    <View
                        style={{marginRight: Dimensions.get('screen').width * 0.76}}
                    >
                        <TouchableOpacity
                            style={{marginLeft: 10}}    
                            onPress={() => this.props.navigation.navigate('Notify')}
                        >
                            <Text>공지사항</Text>
                        </TouchableOpacity>
                    </View>                    
                    <Entypov                                         
                        name={'chevron-right'}
                        size={24}
                        color={'#fb009e'}
                    />                  
                </View>
                <View style={{   justifyContent:'center', alignItems:'center', marginVertical:20}}>
                
                        <LogoutBtn/>
                
                        
                </View>
                <View style={{  borderBottomColor: 'lightgrey', borderBottomWidth: 1, justifyContent:'center', alignItems:'center', marginVertical:20}}>
                    
                        <DropUser/>
                    
                    
                </View>                
                {/*
                <View style={{justifyContent:'center', alignItems:'center', marginTop: Dimensions.get('screen').height * 0.07}}>
                    <LogoutBtn/>
                    <DropUser/>
                </View>            
                */}
            </SafeAreaView>
        );
    }    
};
