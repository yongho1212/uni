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


export default class MyMapView extends Component {
    constructor(props){
        super(props);
        this.state = {
            roomData: [],
            userData: [],
            id: '',
            data: [],
            hobbies: [],
            hobby: '',

            onFilter: false,
            check: 0,
        }
    }
    

    componentDidMount = () => {
        this.connect();
        this.removeStorage();
        
    }

    removeStorage = async() => {
        await AsyncStorage.removeItem('category');
        await AsyncStorage.removeItem('title');
        await AsyncStorage.removeItem('time');
        await AsyncStorage.removeItem('timeInfo');
    }

    connect = async() => {
        try {
            const id = await AsyncStorage.getItem('id');
            if(id !== null) {
                this.setState({
                    id: id,
                })
            }
        } catch(e) {
            console.log(e);
        }

        const URL = "http://127.0.0.1:3000/main";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                onFilter: this.state.onFilter,
            })            
        })
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                roomData: responseData[0],
                userData: responseData[1],
            })

            var Interest = new Array();
            this.state.userData.map(userData => 
                Interest = userData.hobby.split(',')            
            )

            this.state.check += 1;
            if(this.state.check === 1) {
                Interest.map((hobby, index) => {
                    this.state.hobbies.push(
                        <ActionButton.Item key={index} buttonColor='#49ffbd' onPress={() => {this.connectFilter(hobby); this.state.hobby = hobby;}}>
                            <Text>{hobby}</Text>
                        </ActionButton.Item>                    
                    )
                })
            } 
        })        
    }

    createMarker = () => {
        let marker = []
        var key = 0;

        for(let index = 0; index < this.state.roomData.length; index++) {
            this.state.roomData.map(roomInfo => marker.push (
                <Marker 
                    coordinate={{latitude: roomInfo.latitude, longitude: roomInfo.longitude}}
                    onPress={() => {                        
                        this.props.sendData(roomInfo);                    
                    }}
                    key={key++}
                    // image={require('../assets/marker/pingk.png')}    
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
                    <View style={{ justifyContent:'center', alignItems:'center'}}>
                        <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
                        <Ionicons
                            name={"basketball"}
                            size={37}   
                            color={'#B96319'}     
                            style={{ zIndex:10, marginBottom:8 }}                                        
                        />
                    </View>
                    : roomInfo.category === '볼링' ?
                    <FontAwesome5 
                        name={"bowling-ball"}
                        size={20}
                        color={'#bc2b62'}
                    />
                    : null}
                </Marker>
            ))
        }
        
        return marker;
    }

    connectFilter = async(hobby) => {
        this.state.onFilter = true;

        const URL = "http://127.0.0.1:3000/main";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                onFilter: this.state.onFilter,
                category: hobby,
            })
        })
        .then(response => response.json())
        .then(responseData => {
            this.setState({
                roomData: responseData[0],
            })
        })
    }

    mapRef = React.createRef();

    /*
    animateToRegion = (region) => {
        this.mapRef.current.animateToRegion(region, 2000);
    };
    */
    

    render() {
        let marker = <View style={{top: '50%', left: '50%', marginLeft: -15, marginTop: -40, position: 'absolute'}}>
                        <Image style={{height: 50, resizeMode:'contain'}} source={require('../assets/marker/mpin.png')}/>   
                     </View>
        return (
            <View>
                <MapView
                    style={{width: '100%', height: '100%',padding:100}}
                    showsUserLocation={true}
                    mapType={'mutedStandard'}
                    
                    ref={this.mapRef} 
                    userLocationCalloutEnabled={true}
                    showsMyLocationButton={true}
                    region={this.props.region}
                    onRegionChangeComplete={(reg) => {
                        this.props.onRegionChange(reg);

                        if(!this.state.onFilter) {
                            this.connect();
                        }else{
                            this.connectFilter(this.state.hobby);
                        }
                    }}
                    onPress={() => this.props.sendData(undefined)}
                >
                    {this.createMarker()}
                </MapView>
                {marker}
                <Pressable 
                    style={styles.locationBtn}
                    onPress={() => this.props.getLocation()}
                >
                    <Text>
                         <Ionicons name="ios-locate" color="grey" size={30} /> 
                    </Text>
                </Pressable>
                <ActionButton 
                size={48}
                buttonColor="#fb009e" 
                verticalOrientation="down"
                style={styles.actionButtonIcon} 
                >
                        {this.state.hobbies}  
                </ActionButton>  
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

    }
  });







//구글지도 설정 : https://agilog.tistory.com/1
//