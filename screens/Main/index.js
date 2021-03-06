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

import auth, { firebase } from "@react-native-firebase/auth";
import { useNavigation } from '@react-navigation/native';
import Moment from 'moment';
import 'moment/locale/ko';

import { GEO, SERVER_URL } from '@env'
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';

import messaging from '@react-native-firebase/messaging';
// import OneSignal from 'react-native-onesignal';

import styles from './styles';
import { TouchableOpacity } from 'react-native';

import { LogBox } from 'react-native';
import { id } from 'prelude-ls';
import { run } from 'jest';

LogBox.ignoreLogs(['Warning: ...']);


export default class Main extends Component {
     constructor(props) {
          super(props);
          this.state = {
               region: undefined,     
               roomInfo: undefined,
               hostsProfile: [],
               usersProfile: [],
               address: 0,
               id: '',
               push: 0,
               roomData: [],
               userData: [],
               GUID: [],
               hobbyList: [],               
               hobby: '',
               onFilter: false,   
               firstLoading: true, 
               
               check: false,    
               
               //trackview controll value
               cnt: 0,
               temp: 0,

               //bottom sheet
               isOpen: false,

               loginOk: false
          }
     }

     logOutNull = () => {
               auth()
              .signOut()
              .then(() => this.props.navigation.replace("Auth"))
              .catch((error) => {
                console.log(error);
                if (error.code === "auth/no-current-user")
                    this.props.navigation.replace("Auth");
                else console.log(error);
              })

     }

     
    
     
     componentDidMount = async() => {            
          const id = await AsyncStorage.getItem('id');
          
          if(id == null){
               this.logOutNull()
               
          }else{
               this.setState({loginOk:true})
          }
          


          if(this.props.route.params.params.params !== undefined) {               
               this.state.firstLoading = false;         
          }
          
         
                                                      
          if(this.state.firstLoading) {                                                                        
               this.state.firstLoading = false;               
               this.getCurrentLocation();
               setTimeout(() => {
                    this.setState({temp: 0});
               }, 1000);
          }else {
               this.hosted();
          }

          this.props.navigation.addListener('focus', async () => {                    
               this.setState({ 
                    temp: 1,
               })                  
               setTimeout(() => {
                    this.setState({temp: 0});
               }, 1000);              
               this.removeStorage();                                   
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

          var Interest = new Array();
          var hobbyList = new Array();

          const URL = `${SERVER_URL}/main`;
          const loginOk = this.state.loginOk 
          console.log(loginOk)
          const id = await AsyncStorage.getItem('id');
          this.setState({id: id})
          console.log("connect")
            
         
          
        
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
          
          .then(response => {if(loginOk == true)
               {response.json()}
               else{console,log('err')}
          })
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
                                        this.state.cnt = 1;
                                        this.connectFilter(hobby); 
                                        this.state.hobby = hobby;
                                   }}
                         >
                              {
                               hobby === '??????' ?              
                                  <MaterialCommunityIcons
                                  name={"soccer"}
                                  size={37}
                                  color={'black'}
                                  style={{ zIndex:10,  }}   
                                  />

                                  : hobby === '??????' ?
                                  <Image  
                                   style={{ width:38,height:38, zIndex:10,    }}   
                                   source={require('../../assets/cateicon/basketball.png')}/>
                                   : hobby === '??????' ?
                                  <Image  
                                   style={{ width:38,height:38, zIndex:10,    }}   
                                   source={require('../../assets/cateicon/disco-ball.png')}/>
                             
                                  
                                  : hobby === '????????????' ?
                                   <Image  
                                   style={{ width:38,height:38, zIndex:10,    }}   
                                   source={require('../../assets/cateicon/languages.png')}/>
                          
                                   : hobby === '??????' ?
                                   <Image  
                                   style={{ width:38,height:38, zIndex:10,  }}   
                                   source={require('../../assets/cateicon/bowling.png')}/>
                                     
                                   : hobby === '??????' ?
                                   <Image  
                                   style={{  width:38,height:38, zIndex:10,}}   
                                   source={require('../../assets/cateicon/hiking.png')}/>
                                     
                                   : hobby === '?????????' ?
                                   <Image  
                                   style={{  width:38,height:38, zIndex:10, marginBottom:8, borderRadius:19 }}   
                                   source={require('../../assets/cateicon/weight.png')}/>
                                     
                                   : hobby === '??????' ?
                                   <Image  
                                   style={{  width:39,height:39, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                                   source={require('../../assets/cateicon/run.png')}/>
                                      
                   
                                   : hobby === '??????' ?        
                                   <Image  
                                   style={{  width:39,height:39, zIndex:30,  borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../assets/cateicon/golf-player.png')}/>
                                      
                                   : hobby === '??????' ?
                                   <Image  
                                   style={{ width:38,height:38, zIndex:10,  }}   
                                   source={require('../../assets/cateicon/table-tennis.png')}/>
                                     
                                   : hobby === '????????????' ?
                                      
                                   <Image  
                                   style={{ backgroundColor:'#fff', width:39,height:39, zIndex:30, borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../assets/cateicon/board-game.png')}/>
                                      
                                   : hobby === '????????????' ?
                                       
                                   <Image  
                                   style={{ backgroundColor:'#fff', width:39,height:39, zIndex:30, borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../assets/cateicon/languages.png')}/>
                                    
                                   : hobby === '?????????????????????' ?
                                       
                                   <Image  
                                   style={{  width:32,height:36, zIndex:30, marginBottom:7,    }}   
                                   source={require('../../assets/cateicon/lol.png')}/>
                                       
                                   : hobby === '??????????????????' ?    
                                   <Image  
                                   style={{  width:36,height:30, zIndex:30, marginBottom:7, backgroundColor:'#fff', borderRadius:10    }}   
                                   source={require('../../assets/cateicon/pubg.png')}/>
                                     
                                   : hobby === '??? ??????' ?    
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
                                        this.state.cnt = 1;
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
          this.setState({
               check: true,
          })
     }

     onMapRegionChange = async(region) => {                           
          this.state.cnt = 0;  
          this.state.temp = 0;        
          this.setState({region: region})
          Geocoder.init(GEO, { language: 'ko' });
          await Geocoder.from(region.latitude, region.longitude)
          .then(json => {
               var address = json.results[0].formatted_address;
               this.setState({
                    address: address,
               });
          })          
     }         

     //???????????? : this.state.hostsProfile??? ?????? ????????? ?????? ????????? ???????????? ?????? ????????? ???????????? ????????? ??????????????? ????????? ???????????? ?????? ???????????? 3??? ???????????? ???????????? ???????????? ?????????.
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
                    if(data.hostUser[i] !== data.joinUser[i]) {
                         fetch(`${SERVER_URL}/firstProfile/?id=` + data.joinUser[i]  + "&time=" + new Date())
                         .then(responseData => {
                              if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {                                            
                                   usersProfile.push(responseData.url);    
                              }
                         })                    
                         .then(() => this.setState({usersProfile: usersProfile}));                          
                    }                                                  
               }

               this.bs.current.snapTo(0);          
               this.state.isOpen = true;                                 
          }else {
               this.setState({hostsProfile: null, usersProfile: null})
               this.bs.current.snapTo(5);
               this.state.isOpen = false;
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
               Alert.alert('?????? ??????????????????');
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
             style={{ backgroundColor: '#F2F2F2', padding: 20, height: 700,}}
          >
               {this.state.roomInfo !== undefined ? 
               /* ScrollView ?????? ???????????? ?????? ?????? */
               <View style={styles.roomContainer}>
                    <View style={styles.imgContainer}>                                                                   
                         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{height:60}}>
                              {this.state.hostsProfile !== null ?
                                   this.state.hostsProfile.map((data, index) => {
                                        return (
                                             <View key={index++}>
                                                  <Image 
                                                       source={{uri : data}}
                                                       style={{width: 50, height: 50, borderRadius: 25, borderWidth: 3, marginLeft: 7,}}
                                                       key={index++}
                                                  />
                                                  <Image style={{position: 'absolute', left: 26, top: 22, flex: 1, width: 30, height: 30,}} 
                                                  source={require('../../assets/logo/crown.png')} 
                                                  key={index++}/> 
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
                         </View>      
                    <View style={styles.placeContainer}>                                                                     
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
                    
                    <View style={styles.btnContainer}>
                         
                    <TouchableOpacity
                         onPress={() => this.props.navigation.push('Hosting', 
                              {
                                   _id: this.state.roomInfo._id, address: this.state.roomInfo.address, lat: this.state.roomInfo.latitude, lng: this.state.roomInfo.longitude, 
                                   category: this.state.hobby, title: this.state.roomInfo.title, time: JSON.stringify(this.state.roomInfo.time), timeInfo: this.state.roomInfo.timeInfo, Info: 'modify'
                              }
                         )}                              
                         style={styles.modifyButton}
                    >
                         <Text style={styles.btnText}>??? ???</Text>
                    </TouchableOpacity>   
                    </View>                
                    :
                    <View style={styles.btnContainer}>
                    <TouchableOpacity
                         onPress={() => {this.joinRoom(this.state.roomInfo.id, this.state.roomInfo._id); Alert.alert('???????????? ??????');}}
                         style={styles.joinButton}
                    >
                         <Text style={styles.btnText}>Join</Text>
                    </TouchableOpacity>  
                    </View>  
                    }                                
               </View>                                           
               : null}
          </View>          
     )

     //???????????? 3???
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

     //??? ???????????? ??? ??? ?????? ????????? ???????????? ????????? ?????????.
     hosted = () => {                    
          this.setState({
               region: {
                    latitude: parseFloat(this.props.route.params.params.params.lat),
                    longitude: parseFloat(this.props.route.params.params.params.lng),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
               },
          });    

          console.log(this.state.region);
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
                         size={45}
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