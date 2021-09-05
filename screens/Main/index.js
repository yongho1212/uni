import React, {Component} from 'react';
import { View, Text, Alert, ScrollView, Pressable, Dimensions, TextInput, Image } from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MyMapView from '../../components/MyMapView';
import MainButton from '../../components/MainButton';
import ViewProfiles from '../../components/ViewProfiles';
import LogoutBtn from '../../components/logOutBtn';

import Moment from 'moment';
import 'moment/locale/ko';


import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import messaging from '@react-native-firebase/messaging';
// import OneSignal from 'react-native-onesignal';

import styles from './styles';


export default class Main extends Component {
     constructor(props) {
          super(props);
          this.state = {
               region: {
                    latitude: 37.49783315274643, 
                    longitude: 127.02783092726877,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,     
               },
               roomInfo: undefined,
               hostsProfile: [],
               usersProfile: [],
               address: 0,
               id: '',
               push: 0,
               
               
          }
          
     }
    
     
     componentDidMount = async() => {                    
          this.getId();                 

      {/*    OneSignal.setLogLevel(6, 0);
          OneSignal.setAppId('1a158c3f-3d81-4428-9ac7-b65ff2c8b9ea');   
          await OneSignal.setExternalUserId(await AsyncStorage.getItem('id'), (result) => {
               console.log(result);
          });*/}

          if(this.props.route.params === undefined) {
               this.requestPermission().then(result => {
                    if(result === 'granted') {
                         this.getCurrentLocation();
                    }else {
                         console.log('');
                    }
               })      
          }else {
               this.hosted();
          }
     }     

     getId = async() => {
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
     }          

     //임시
     requestPermission = async() => {
          try {
               if(Platform.OS === 'ios') {
                    return await Geolocation.requestAuthorization('always');
               }
               if(Platform.OS === 'android') {
                    return await PermissionsAndroid.request (
                         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    );
               }
          }catch(e) {
               console.log(e);
          }
     }

     getCurrentLocation = async() => {
          await Geolocation.getCurrentPosition (
               position => {
                    this.setState({
                         region: {
                              latitude: position.coords.latitude,
                              longitude: position.coords.longitude,
                              latitudeDelta: 0.015,
                              longitudeDelta: 0.0121, 
                         },
                    });
                    Geocoder.init('AIzaSyCTml8KmT7QuXIgxDNwTkrnJcuAV_35PY8', {language: 'ko'});
                    Geocoder.from(position.coords.latitude, position.coords.longitude)
                    .then(json => {
                         var address = json.results[0].formatted_address;
                         this.setState({
                              address: address
                         });
                    })
               },
               error => Alert.alert(error.message),
               {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          )
     }

     onMapRegionChange = async(region) => {
          await this.setState({region});
          
          await Geocoder.init('AIzaSyCTml8KmT7QuXIgxDNwTkrnJcuAV_35PY8', {language: 'ko'});
          await Geocoder.from(this.state.region.latitude, this.state.region.longitude)
          .then(json => {
               var address = json.results[0].formatted_address;
               this.setState({
                    address: address,
               });
          })
     }         

     //수정사항 : this.state.hostsProfile로 하면 한번에 방에 참가한 사람들의 모든 프로필 이미지를 한번에 불러오지만 지도를 움직이지 않은 상태에서 3번 째부터는 이미지를 불러오지 못한다.
     getData = async(data) => { 
          var hostsProfile = new Array();
          var usersProfile = new Array();

          if(data !== undefined) {
               this.setState({roomInfo: data});
               
               for(let i = 0; i < data.hostUser.length; i++) {
                    fetch("http://127.0.0.1:3000/firstProfile/?id=" + data.hostUser[i] + "&time=" + new Date())
                    .then(responseData => {
                         if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {
                              hostsProfile.push(responseData.url);
                         }
                    })   
                    .then(() => this.setState({hostsProfile: hostsProfile}))                 
               }
               //this.setState({hostsProfile: hostsProfile});

               for(let i = 0; i < data.joinUser.length; i++) {
                    fetch("http://127.0.0.1:3000/firstProfile/?id=" + data.joinUser[i]  + "&time=" + new Date())
                    .then(responseData => {
                         if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {              
                              usersProfile.push(responseData.url);    
                         }
                    })    
                    //.then(() => this.setState({usersProfile: usersProfile}))                
                    .then(() => this.state.usersProfile = usersProfile)                               
               }
               //this.setState({usersProfile: usersProfile});

               this.bs.current.snapTo(0);                          
          }else {
               this.setState({hostsProfile: null, usersProfile: null})
               this.bs.current.snapTo(5);
          }
     }

     joinRoom = async(hostId, roomId) => {          
          const URL = "https://onesignal.com/api/v1/notifications";
          fetch(URL, {
               method: 'POST',
               headers: {
                    'Content-Type' : 'application/json; charset=utf-8',
                    'Authorization' : 'Basic ODk4YjFjNTctOTZkZi00ODBlLWIyNTAtMTY5OWU0ZmZhNTc0'
               },
               body: JSON.stringify({                    
                    app_id: "1a158c3f-3d81-4428-9ac7-b65ff2c8b9ea",
                    include_external_user_ids: [hostId],
                    contents: {"en": "Someone like to enjoy your room! 😀"}
               }),
          })        
          .then(response => response.json())
          .then(responseData => this.joinSuccess(hostId, roomId, responseData))                  
     }

     joinSuccess = async(hostId, roomId, responseData) => {
          console.log(responseData.recipients);
          if(responseData.recipients !== 0) {
               const URL = "http://127.0.0.1:3000/joinRoom";
               fetch(URL, {
                    method: 'POST',
                    headers: {
                         'Content-Type' : 'application/json',                         
                    },
                    body: JSON.stringify({
                         requestId: this.state.id,
                         hostId: hostId,
                         roomId: roomId,
                    }),
               })                            
          }else {
               Alert.alert('다시 시도해주세요');
          }
     }

     checkJoin = async() => {
          const URL = "http://127.0.0.1:3000/checkJoin";
          fetch(URL, {
               method: 'POST',
               headers: {
                    'Content-Type' : 'application/json',
               },
               body: JSON.stringify({
                    id: this.state.id,
               }),
          })
          .then(response => response.json())
          .then(responseData => {
               this.setState({
                    push: responseData,
               })
          })
     }

     bs = React.createRef();

     renderContent = () => (    
          <View
             style={{flex: 0, backgroundColor: '#fff', padding: 20, height: 700,}}
          >
               {this.state.roomInfo !== undefined ? 
               /* ScrollView 끝에 잘리는거 수정 필요 */
               <View style={styles.roomContainer}>
                    <View style={styles.placeContainer}>                                                                   
                         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                              {this.state.hostsProfile !== null ?
                                   this.state.hostsProfile.map((data, index) => {
                                        return (
                                             <View key={index++}>
                                                  <Image 
                                                       source={{uri : data}}
                                                       style={{width: 50, height: 50, borderRadius: 25, borderWidth: 3, marginLeft: 7,}}
                                                       key={index++}
                                                  />
                                                  <Image style={{position: 'absolute', left: 26, top: 22, flex: 1, width: 30, height: 30,}} source={require('../../assets/logo/crown.png')} key={index++}/> 
                                             </View>
                                        )
                                   })
                              : null}
                              {this.state.usersProfile !== null ?                              
                                   this.state.usersProfile.map((data, index) => {                                                   
                                        return (                                                          
                                             <Image 
                                                  source={{uri : data}}
                                                  style={{width: 50, height: 50, borderRadius: 25, borderWidth: 3, marginLeft: 7,}}
                                                  key={index++}
                                             />                                                                                                                                                                                                                                                        
                                        )                                             
                                   }) 
                              : null}    
                         </ScrollView>                                                                                      
                         <Text style={styles.placeText}>Place</Text>
                         <TextInput
                              style={styles.placeInfo}
                              value={this.state.roomInfo.address}
                              editable={false}
                         />
                    </View>
                    <View style={styles.categoryContainer}>
                         <Text style={styles.categoryText}>Category</Text>
                         <TextInput
                              style={styles.categoryInfo}
                              value={this.state.roomInfo.category}
                              editable={false}
                         />                         
                    </View>
                    <View style={styles.titleContainer}>
                         <Text style={styles.titleText}>Title</Text>
                         <TextInput
                              style={styles.titleInfo}
                              value={this.state.roomInfo.title}
                              editable={false}
                         />
                    </View>
                    <View style={styles.timeContainer}>
                         <Text style={styles.timeText}>Time</Text>
                         <TextInput
                              style={styles.timeInfo}
                              value={this.state.roomInfo.timeInfo}
                              editable={false}
                         />
                    </View>           
                    {this.state.id === this.state.roomInfo.id ?
                    <Pressable
                         onPress={() => this.props.navigation.push('Hosting', 
                              {
                                   _id: this.state.roomInfo._id, address: this.state.roomInfo.address, lat: this.state.roomInfo.latitude, lng: this.state.roomInfo.longitude, 
                                   category: this.state.roomInfo.category, title: this.state.roomInfo.title, time: JSON.stringify(this.state.roomInfo.time), timeInfo: this.state.roomInfo.timeInfo, Info: 'modify'
                              }
                         )}                              
                         style={styles.modifyButton}
                    >
                         <Text>modify</Text>
                    </Pressable>                   
                    :
                    <Pressable
                         onPress={() => this.joinRoom(this.state.roomInfo.id, this.state.roomInfo._id)}
                         style={styles.joinButton}
                    >
                         <Text>join</Text>
                    </Pressable>  
                    }                                
               </View>                                           
               : null}
          </View>          
     )

     //메인버튼 3개
     navigate = async(screen) => {
          if(screen === 'Hosting') {
               this.props.navigation.push('Hosting', {address: this.state.address, lat: this.state.region.latitude, lng: this.state.region.longitude, Info: 'place'})
          }else if(screen === 'Room') {
               this.props.navigation.navigate('RoomList');
               this.checkJoin();               
          }else if(screen === 'Chat') {
               this.props.navigation.navigate('Chat');
          }
     }

     //방 만들었을 때 방 만든 주소를 중심으로 지도를 띄운다.
     hosted = () => {
          this.setState({
               region: {
                    latitude: parseFloat(this.props.route.params.lat),
                    longitude: parseFloat(this.props.route.params.lng),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
               },
          });
     } 

     render() {
          return (
               <View style={{width: '100%', height: Dimensions.get('window').height}}> 
                    <MyMapView
                         region={this.state.region}
                         onRegionChange={(reg) => this.onMapRegionChange(reg)}
                         sendData={this.getData}
                         getLocation={() => this.getCurrentLocation()}
                    >
                    </MyMapView>  
                    <MainButton                         
                         navigate={this.navigate}   
                         push={this.state.push}                      
                    >
                    </MainButton>                
                    <BottomSheet
                         ref={this.bs}
                         renderContent={this.renderContent}
                         snapPoints={[700, 600, 450, 300, 150, 0]}
                         initialSnap={5}
                         borderRadius={10}
                         enabledContentTapInteraction={false}
                    />
               </View>  
          )
     }
}