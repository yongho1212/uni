import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, Alert, SafeAreaView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

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
            this.setState({
                room: {
                    id: id,
                    address: address,
                    lat: lat,
                    lng: lng,
                    category: category,
                    title: title,
                    time: time,
                    timeInfo: timeInfo,
                },
                check: check,         
                _id: _id,       
            })
        } catch(e) {
            console.log(e);
        }

        //console.log(this.state.room);
        console.log(this.state.check);
    }

    removeStorage = async() => {
        await AsyncStorage.removeItem('check');
        await AsyncStorage.removeItem('category');
        await AsyncStorage.removeItem('title');
        await AsyncStorage.removeItem('time');
        await AsyncStorage.removeItem('timeInfo');
    }

    //수정필요
    onChangeText = async(text) => {
        await AsyncStorage.setItem('title', text);    
        const title = await AsyncStorage.getItem('title');
        
        this.state.room.title = title;
    }

    createRoom = async() => {        
        const {id, address, lat, lng, category, title, time, timeInfo} = this.state.room;
        console.log(this.state.room);

        const URL = "http://127.0.0.1:3000/createRoom";
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
                time: time,
                timeInfo: timeInfo,
            })
        })
    }

    modifyRoom = async() => {
        const {_id} = this.state;
        const {address, lat, lng, category, title, time, timeInfo} = this.state.room;

        console.log(_id);
        
        const URL = "http://127.0.0.1:3000/modifyRoom";
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
                time: time,
                timeInfo: timeInfo,
            })
        })
        
        this.props.navigation.push('Main', {lat: this.state.room.lat, lng: this.state.room.lng})
    }

    hosting = async() => {
        if(this.state.room.address === null) {
            Alert.alert('지역을 설정하세요');
        }else if(this.state.room.category === null) {
            Alert.alert('카테고리를 설정하세요');
        }else if(this.state.room.title === null) {
            Alert.alert('제목을 입력하세요');
        }else if(this.state.room.time === null) {
            Alert.alert('시간을 설정하세요');
        }else {
            this.createRoom();
            this.props.navigation.push('Main', {lat: this.state.room.lat, lng: this.state.room.lng})
        }        
    }      

    render() {
        return (
            <SafeAreaView>
                <View style={styles.headerConatiner}>
                    <AntDesign
                        name={"arrowleft"}
                        style={styles.backIcon}
                        onPress={() => {this.removeStorage(); this.props.navigation.navigate('Main');}}
                    />  
                    {this.state.check === 'modify' ?                  
                    <Text>Modify</Text>
                    :
                    <Text>Hosting</Text>
                    }
                </View>      
                <View style={styles.contentContainer}>
                    <View style={styles.placeContainer}>
                        <Text style={styles.placeText}>Place</Text>
                        <Pressable
                            style={styles.placeInput}
                            onPress={() => this.props.navigation.navigate('LocationSearch')}
                        >                            
                            <Text>{this.state.room.address}</Text>                            
                        </Pressable>
                    </View>
                    <View style={styles.categoryContainer}>
                        <Text style={styles.categoryText}>Category</Text>
                        <Pressable
                            style={styles.categoryInput}
                            onPress={() => this.props.navigation.push('Category')}
                        >
                            {this.state.room.category === null ?
                            <Text>카테고리 설정</Text>
                            :
                            <Text>{this.state.room.category}</Text>
                            }
                        </Pressable>
                    </View>
                    <View style={styles.titleConatiner}>
                        <Text style={styles.titleText}>Title</Text>
                        <TextInput
                            style={styles.titleInput}
                            onChangeText={text => this.onChangeText(text)}
                            value={this.state.room.title}
                        />
                    </View>
                    <View style={styles.timeConatiner}>
                        <Text style={styles.timeText}>Time</Text>
                        <Pressable
                            style={styles.timeInput}
                            onPress={() => this.props.navigation.navigate('Time')}
                        >                                      
                            <View style={styles.timeInfo}>
                                <Text style={styles.timePlaceHolder}>약속시간 설정</Text>
                                <Text>{this.state.room.timeInfo}</Text>
                            </View>                                                                
                        </Pressable>
                    </View>
                    {this.state.check === 'modify' ?
                    <Pressable
                        style={styles.modifyButton}  
                        onPress={() => this.modifyRoom()}                           
                    >
                        <Text>Complete</Text>
                    </Pressable>
                    :        
                    <Pressable
                        style={styles.hostButton}
                        onPress={() => this.hosting()}                        
                    >
                        <Text>Hosting</Text>
                    </Pressable>
                    }
                </View>
            </SafeAreaView>
        )
    }
}