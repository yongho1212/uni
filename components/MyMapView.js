import React, {Component} from 'react';
import { View, Pressable, Text, Image, Dimensions, StyleSheet, ImageBackground } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MapView, { Marker } from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import Animated from 'react-native-reanimated';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import Foundation from 'react-native-vector-icons/Foundation';

import { CometChat } from '@cometchat-pro/react-native-chat';
import { Touchable } from 'react-native';
import { TouchableOpacity } from 'react-native';


export default class MyMapView extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: '',
            roomData: [],
            userData: [],            
            hobbyList: [],
            hobby: '',
            onFilter: false,
            check: 0,

            test: 0,
        }
    }
    

    componentDidMount = () => {
        this.removeStorage();
        
    }

    removeStorage = async() => {
        await AsyncStorage.removeItem('check');
        await AsyncStorage.removeItem('category');
        await AsyncStorage.removeItem('title');
        await AsyncStorage.removeItem('time');
        await AsyncStorage.removeItem('timeInfo');
    }

    createMarker = () => {        
        let marker = []
        var key = 0;

        for(let index = 0; index < this.props.roomData.length; index++) {
            this.props.roomData.map(roomInfo => marker.push (                  
                <Marker 
                    coordinate={{latitude: roomInfo.latitude, longitude: roomInfo.longitude}}
                    onPress={() => {                        
                        this.props.sendData(roomInfo);                    
                    }}
                    key={key++}
                >
                    
                    {roomInfo.category === '축구' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                        <MaterialCommunityIcons
                            name={"soccer"}
                            size={37}
                            color={'black'}
                            style={{ zIndex:10, marginBottom:8 }}   
                        />
                    </View>
                    : roomInfo.category === '농구' ? 
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                        <Image  
                        style={{ backgroundColor:'#fff', width:38,height:38, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                        source={require('../assets/cateicon/basketball.png')}/>
                    </View>
                    : roomInfo.category === '볼링' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <FontAwesome5 
                        name={"bowling-ball"}
                        size={37}   
                        color={'#bc2b62'}
                    />
                    </View>
                    : roomInfo.category === '야구' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <FontAwesome5 
                        name={"baseball-outline"}
                        size={37}   
                        color={'#bc2b62'}
                    />
                    </View>
                    : roomInfo.category === '배드민턴' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <MaterialCommunityIcons 
                        name={"badminton"}
                        size={37}   
                        color={'#bc2b62'}
                    />
                    </View>
                    : roomInfo.category === '등산' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <Foundation 
                        name={"mountains"}
                        size={37}   
                        color={'#bc2b62'}
                    />
                    </View>
                    : roomInfo.category === '당구' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                        <Image  
                        style={{ backgroundColor:'#fff', width:38,height:38, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                        source={require('../assets/cateicon/pool.png')}/>
                    </View>
                    : roomInfo.category === '요가' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <MaterialCommunityIcons 
                        name={"yoga"}
                        size={37}   
                        color={'#bc2b62'}
                    />
                    </View>
                    : roomInfo.category === '웨이트' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <MaterialCommunityIcons 
                        name={"weight-lifter"}
                        size={37}   
                        color={'#bc2b62'}
                    />
                    </View>
                    : roomInfo.category === '자전거' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <Ionicons 
                        name={"bicycle"}
                        size={37}   
                        color={'#000'}
                    />
                    </View>
                    : roomInfo.category === '런닝' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                        <Image  
                        style={{ backgroundColor:'#fff', width:38,height:38, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                        source={require('../assets/cateicon/running.png')}/>
                    </View>
                    : roomInfo.category === '골프' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <MaterialCommunityIcons 
                        name={"golf"}
                        size={37}   
                        color={'#000'}
                    />
                    </View>
                    : roomInfo.category === '탁구' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                    <FontAwesome5 
                        name={"gotable-tennislf"}
                        size={37}   
                        color={'#000'}
                    />
                    </View>
                    : roomInfo.category === '스케이트 보드' ?
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                        <Image  
                        style={{ backgroundColor:'#fff', width:38,height:38, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                        source={require('../assets/cateicon/skateboard.png')}/>
                         {/*https://www.flaticon.com/authors/photo3idea-studio*/}
                    </View>
                     : roomInfo.category === '커피 한잔' ?
                     <View style={{ justifyContent:'center', alignItems:'center'}} >
                         <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                     <MaterialCommunityIcons 
                         name={"coffee"}
                         size={37}   
                         color={'#000'}
                     />
                     </View>
                     : roomInfo.category === '밥 한끼!' ? 
                     <View style={{ justifyContent:'center', alignItems:'center'}} >
                         <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                         <Image  
                         style={{ backgroundColor:'#fff', width:38,height:38, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                         source={require('../assets/cateicon/dish.png')}/>
                          
                     </View>
                    : roomInfo.category === '클럽' ? 
                    <View style={{ justifyContent:'center', alignItems:'center'}} >
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                        <Image  
                        style={{ backgroundColor:'#fff', width:38,height:38, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                        source={require('../assets/cateicon/disco-ball.png')}/>
                         
                    </View>
                    
                    : null}
                </Marker>
            ))
        }
        
        return marker;
    }


   

    

    render() {
        let region;
        if(this.state.test === 0) {
            region = {
                latitude: 37.49783315274643, 
                longitude: 127.02783092726877,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,     
            }
        }
        let marker = 
                    <View style={{top: '50%', left: '50%', marginLeft: -15, marginTop: -40, position: 'absolute'}}>
                        <Image style={{height: 50, resizeMode:'contain'}} source={require('../assets/marker/mpin.png')}/>   
                     </View>
        
        return (
            <View>
                <MapView
                    style={{width: '100%', height: '100%',padding:100}}
                    showsUserLocation={true}                                                            
                    region={this.props.region}
                    onRegionChangeComplete={(reg) => {         
                        this.state.test += 1;                                       
                        region = reg;
                        this.props.onRegionChangeComplete(reg);                        
                        if(!this.props.onFilter) {
                            this.props.connect();
                        }else{
                            this.props.connectFilter(this.props.hobby);
                        }
                    }}
                    onPress={() => this.props.sendData(undefined)}
                >

                    {this.createMarker()}

                </MapView>
                {marker}
                <TouchableOpacity
                    style={styles.locationBtn}
                    onPress={() => this.props.getLocation()}
                >
                    <Text>
                         <Ionicons name="ios-locate" color="grey" size={30} /> 
                    </Text>

                </TouchableOpacity>
                
            </View>
        )                  
    }
}

const styles = StyleSheet.create({
    actionButtonIcon: {
      fontSize: 20,
      position:'absolute',
      top:25,
      right:-10
    },
    actionButtonIconClose:{
        fontSize:25,
        color:'#49ffbd',
        
    },
    actionButtonIconOpen:{
        fontSize:25,
        color:'#fff',
        
    },
    locationBtn:{
        position: 'absolute', 
        justifyContent:'center', 
        alignItems:'center', 
        width:40, 
        height:40, 
        backgroundColor:'white', 
        right:25,
        bottom:120, 
        borderRadius:20,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
        zIndex:30,
        
    }
  });







//구글지도 설정 : https://agilog.tistory.com/1
//