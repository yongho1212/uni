import React, {Component} from 'react';
import { View, Text, Alert, Pressable, Dimensions, TextInput, Image } from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import ActionButton from 'react-native-action-button';
import Animated from 'react-native-reanimated';
import {ScrollView} from 'react-native-gesture-handler';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MyMapView from '../../components/MyMapView';
import MainButton from '../../components/MainButton';
import ViewProfiles from '../../components/ViewProfiles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';



import Moment from 'moment';
import 'moment/locale/ko';

import { GEO, SERVER_URL } from '@env'
import Geolocation from 'react-native-geolocation-service';
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
               GUID: [],
               roomData: [],
               userData: [],
               hobbyList: [],               
               hobby: '',
               onFilter: false,   
               firstLoading: true,            
          }
     }
    
     
     componentDidMount = async() => {                    
          if(this.state.firstLoading) {
               console.log(this.state.firstLoading);
               this.state.firstLoading = false;               
               this.getCurrentLocation();     
          }else {
               this.hosted();
          }

          this.props.navigation.addListener('focus', async () => {
               this.removeStorage();     
               this.connect();                       
          })                  
          
     }     

     removeStorage = async() => {
          await AsyncStorage.removeItem('check');
          await AsyncStorage.removeItem('category');
          await AsyncStorage.removeItem('title');
          await AsyncStorage.removeItem('time');
          await AsyncStorage.removeItem('timeInfo');
     } 

     connect = async() => {
          const id = await AsyncStorage.getItem('id');
          this.setState({id: id});

          var Interest = new Array();
          var hobbyList = new Array();

          const URL = `${SERVER_URL}/main`;
        
          fetch(URL, {
               method: 'POST',
               headers: {
                    'Content-Type' : 'application/json',
               },
               body: JSON.stringify({
                    id: id,
                    onFilter: this.state.onFilter,
                    category: this.state.hobby,
               })            
          })
          .then(response => response.json())
          .then(responseData => {
               this.setState({
                    roomData: responseData[0],
                    userData: responseData[1],
                    GUID: responseData[2],
               })
     
               this.state.userData.map(userData => {
                    Interest = userData.hobby.split(',');       
               })                                        
          })
          .then(() => {
               Interest.map((hobby, index) => {
                    hobbyList.push (                                   
                         <ActionButton.Item 
                              key={index} buttonColor='#49ffbd' 
                              onPress={() => 
                                   {
                                        this.connectFilter(hobby); 
                                        this.state.hobby = hobby;
                                   }}
                         >
                              {
                               hobby === '축구' ?              
                                  <MaterialCommunityIcons
                                  name={"soccer"}
                                  size={37}
                                  color={'black'}
                                  style={{ zIndex:10,  }}   
                                  />

                                  : hobby === '농구' ?
                                  <Image  
                                   style={{ width:38,height:38, zIndex:10,    }}   
                                   source={require('../../assets/cateicon/basketball.png')}/>
                             
                                  
                                  : hobby === '언어교환' ?
                                   <Image  
                                   style={{ width:38,height:38, zIndex:10,    }}   
                                   source={require('../../assets/cateicon/languages.png')}/>
                          
                                   : hobby === '볼링' ?
                                   <Image  
                                   style={{ width:38,height:38, zIndex:10,  }}   
                                   source={require('../../assets/cateicon/bowling.png')}/>
                                     
                                   : hobby === '등산' ?
                                   <Image  
                                   style={{  width:38,height:38, zIndex:10,}}   
                                   source={require('../../assets/cateicon/hiking.png')}/>
                                     
                                   : hobby === '웨이트' ?
                                   <Image  
                                   style={{  width:38,height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                                   source={require('../../assets/cateicon/weight.png')}/>
                                     
                                   : hobby === '런닝' ?
                                   <Image  
                                   style={{  width:39,height:39, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                                   source={require('../../assets/cateicon/run.png')}/>
                                      
                   
                                   : hobby === '골프' ?        
                                   <Image  
                                   style={{  width:39,height:39, zIndex:30,  borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../assets/cateicon/golf-player.png')}/>
                                      
                                   : hobby === '탁구' ?
                                   <Image  
                                   style={{ width:38,height:38, zIndex:10,  }}   
                                   source={require('../../assets/cateicon/table-tennis.png')}/>
                                     
                                   : hobby === '보드게임' ?
                                      
                                   <Image  
                                   style={{ backgroundColor:'#fff', width:39,height:39, zIndex:30, borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../assets/cateicon/board-game.png')}/>
                                      
                                   : hobby === '언어교환' ?
                                       
                                   <Image  
                                   style={{ backgroundColor:'#fff', width:39,height:39, zIndex:30, borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../assets/cateicon/languages.png')}/>
                                    
                                   : hobby === '리그오브레전드' ?
                                       
                                   <Image  
                                   style={{  width:32,height:36, zIndex:30, marginBottom:7,    }}   
                                   source={require('../../assets/cateicon/lol.png')}/>
                                       
                                   : hobby === '배틀그라운드' ?    
                                   <Image  
                                   style={{  width:36,height:30, zIndex:30, marginBottom:7, backgroundColor:'#fff', borderRadius:10    }}   
                                   source={require('../../assets/cateicon/pubg.png')}/>
                                     
                                   : hobby === '술 한잔' ?    
                                   <Image  
                                   style={{  width:39,height:39, zIndex:30, marginBottom:7, backgroundColor:'#fff', borderRadius:19   }}   
                                   source={require('../../assets/cateicon/soju.png')}/>
                                         
                                   
                          : <Text>{hobby}</Text>
                         }
                              
                          </ActionButton.Item>                    
                        )                              
                    })
                    hobbyList.push (
                         <ActionButton.Item
                              key={"all"} buttonColor='#49ffbd'
                              onPress={() => 
                                   {
                                        this.connectFilter("all");
                                        this.state.hobby = "all";
                                   }}
                         >
                              <FontAwesome 
                                   name={"repeat"}
                                   size={37}   
                                   color={'#000'}
                              />
                         </ActionButton.Item>
                    )
     
                    console.log(this.state.GUID);
     
                    if(this.state.GUID.length !== 0) {
                         this.deleteGroupChat(this.state.GUID);
                    };
               })
               .then(() => {
                    this.setState({
                         hobbyList: hobbyList,
                    })
               })                      
          }

          deleteGroupChat = async(GUID) => {  
               GUID.map((data, index) => {
                    CometChat.deleteGroup(data.GUID).then(
                         response => {
                              console.log("Groups deleted successfully:", response);
                         },
                         error => {
                              console.log("Group delete failed with exception:", error);
                         }
                    )
               })                        
          }
     


          connectFilter = async(hobby) => {
               const id = await AsyncStorage.getItem('id');
               this.state.onFilter = true;
       
               const URL = `${SERVER_URL}/main`;
               fetch(URL, {
                    method: 'POST',
                    headers: {
                         'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                         id: id,
                         onFilter: this.state.onFilter,                    
                         category: hobby,                    
                    })
               })
               .then(response => response.json())
               .then(responseData => {
                    this.setState({
                         roomData: responseData[0],
                         userData: responseData[1]
                    })
               })
          }       

     getCurrentLocation = async() => {
          Geolocation.getCurrentPosition(
               position => {
                    this.setState({
                         region: {
                              latitude: position.coords.latitude,
                              longitude: position.coords.longitude,
                              latitudeDelta: 0.015,
                              longitudeDelta: 0.0121,
                         },
                    });
                    Geocoder.init(GEO, { language: 'ko' });
                    Geocoder.from(position.coords.latitude, position.coords.longitude)
                         .then(json => {
                              var address = json.results[0].formatted_address;
                              this.setState({
                                   address: address
                              });
                         });
               },
               error => console.log(error),           
               { enableHighAccuracy: true, timeout: 30000, maximumAge: 1000 }
          )
     }

     onMapRegionChange = async(region) => {                             
          this.setState({region: region})
          Geocoder.init(GEO, { language: 'ko' });
          await Geocoder.from(region.latitude, region.longitude)
          .then(json => {
               var address = json.results[0].formatted_address;
               this.setState({
                    address: address,
               }, () => {console.log(this.state.address)});
          })          
     }           

     //수정사항 : this.state.hostsProfile로 하면 한번에 방에 참가한 사람들의 모든 프로필 이미지를 한번에 불러오지만 지도를 움직이지 않은 상태에서 3번 째부터는 이미지를 불러오지 못한다.
     getRoomData = async(data) => { 
          var hostsProfile = new Array();
          var usersProfile = new Array();

          if(data !== undefined) {
               this.setState({roomInfo: data});    
               
               for(let i = 0; i < data.hostUser.length; i++) {
                    fetch(`${SERVER_URL}/firstProfile/?id=` + data.hostUser[i] + "&time=" + new Date())
                    .then(responseData => {
                         if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {
                              hostsProfile.push(responseData.url);
                         }
                    })                   
                    .then(() => this.state.hostsProfile = hostsProfile);
               }

               for(let i = 0; i < data.joinUser.length; i++) {
                    fetch(`${SERVER_URL}/firstProfile/?id=` + data.joinUser[i]  + "&time=" + new Date())
                    .then(responseData => {
                         if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {              
                              usersProfile.push(responseData.url);    
                         }
                    })                    
                    .then(() => this.state.usersProfile = usersProfile)                               
               }

               this.bs.current.snapTo(0);                          
          }else {
               this.setState({hostsProfile: null, usersProfile: null})
               this.bs.current.snapTo(5);
          }
     }

     joinRoom = async(hostId, roomId) => {          
          const URL = `${SERVER_URL}/joinRoom`;
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
     }

     joinSuccess = async(hostId, roomId, responseData) => {
          console.log(responseData.recipients);
          if(responseData.recipients !== 0) {
               const URL = `${SERVER_URL}/joinRoom`;
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
               console.log('s');
          }
     }

     checkJoin = async() => {
          const URL = `${SERVER_URL}/checkJoin`;
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
                              value={this.state.hobby}
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
                                   category: this.state.hobby, title: this.state.roomInfo.title, time: JSON.stringify(this.state.roomInfo.time), timeInfo: this.state.roomInfo.timeInfo, Info: 'modify'
                              }
                         )}                              
                         style={styles.modifyButton}
                    >
                         <Text>수 정</Text>
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
                         getLocation={() => this.getCurrentLocation()}
                         connect={this.state.onFilter ? this.connectFilter : this.connect}
                         connectFilter={this.connectFilter}
                         sendData={this.getRoomData}
                         onFilter={this.state.onFilter}
                         roomData={this.state.roomData}
                         hobby={this.state.hobby}
                    >
                    </MyMapView>
                    
                    <ActionButton 
                         size={48}
                         buttonColor="#fb009e" 
                         verticalOrientation="down"
                         renderIcon={active => active ? (<Ionicons name="ios-funnel-sharp" style={styles.actionButtonIconOpen} /> ) : (<Ionicons name="ios-funnel-sharp" style={styles.actionButtonIconClose} />)}
                         style={styles.actionButtonIcon} 
                    >
                              {this.state.hobbyList}   
                    </ActionButton>     
               
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