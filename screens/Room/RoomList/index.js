import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, ScrollView, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { SERVER_URL } from '@env'

import styles from './styles';

export default class RoomList extends Component {
     constructor(props) {
          super(props);
          this.state = {
               id: '',
               hostRoomInfo: [], 
               joinRoomInfo: [],              
               list: [],
          }
     }
  
     componentDidMount = async() => {
          this.connect();
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

          const URL = `${SERVER_URL}/roomList`;
          fetch(URL, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                id: this.state.id,
              }),
          })
          .then(response => response.json())
          .then(responseData => {
               this.setState({
                    hostRoomInfo: responseData[0],
                    joinRoomInfo: responseData[1],
               })
          })          
     }

     showRoomList = () => {
          let roomList = [];
          var key = 0;
          
          if(this.state.hostRoomInfo !== undefined) {
               this.state.hostRoomInfo.map(data => roomList.push (
                    <View
                         style={styles.cardContainer}
                         key={key++}
                    >
                         <Pressable
                              onPress={() => this.props.navigation.push('Roomctrl', 
                                   {sendd: data}
                              )}
                              >
                         <View style={styles.roomCard}>
                              
                                   <View style={styles.categoryIcon}>
                                        
                                        {

                                              data.category === '축구' ?              
                                  <MaterialCommunityIcons
                                  name={"soccer"}
                                  size={37}
                                  color={'black'}
                                  style={{ zIndex:10,  }}   
                                  />

                                  : data.category === '농구' ?
                                  <Image  
                                   style={{ width:50,height:50, zIndex:10,    }}   
                                   source={require('../../../assets/cateicon/basketball.png')}/>
                             
                                  
                                  : data.category === '언어교환' ?
                                   <Image  
                                   style={{ width:50,height:50, zIndex:10,    }}   
                                   source={require('../../../assets/cateicon/languages.png')}/>
                          
                                   : data.category === '볼링' ?
                                   <Image  
                                   style={{ width:50,height:50, zIndex:10,  }}   
                                   source={require('../../../assets/cateicon/bowling.png')}/>
                                     
                                   : data.category === '등산' ?
                                   <Image  
                                   style={{  width:50,height:50, zIndex:10,}}   
                                   source={require('../../../assets/cateicon/hiking.png')}/>
                                     
                                   : data.category === '웨이트' ?
                                   <Image  
                                   style={{  width:50,height:50, zIndex:10, marginBottom:8, borderRadius:19 }}   
                                   source={require('../../../assets/cateicon/weight.png')}/>
                                     
                                   : data.category === '런닝' ?
                                   <Image  
                                   style={{  width:50,height:50, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                                   source={require('../../../assets/cateicon/run.png')}/>
                                      
                   
                                   : data.category === '골프' ?        
                                   <Image  
                                   style={{  width:50,height:50, zIndex:30,  borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../../assets/cateicon/golf-player.png')}/>
                                      
                                   : data.category === '탁구' ?
                                   <Image  
                                   style={{ width:50,height:50, zIndex:10,  }}   
                                   source={require('../../../assets/cateicon/table-tennis.png')}/>
                                     
                                   : data.category === '보드게임' ?
                                      
                                   <Image  
                                   style={{ backgroundColor:'#fff', width:50,height:50, zIndex:30, borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../../assets/cateicon/board-game.png')}/>
                                      
                                   : data.category === '언어교환' ?
                                       
                                   <Image  
                                   style={{ backgroundColor:'#fff', width:50,height:50, zIndex:30, borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../../assets/cateicon/languages.png')}/>
                                    
                                   : data.category === '리그오브레전드' ?
                                       
                                   <Image  
                                   style={{  width:40,height:50, zIndex:30,     }}   
                                   source={require('../../../assets/cateicon/lol.png')}/>
                                       
                                   : data.category === '배틀그라운드' ?    
                                   <Image  
                                   style={{  width:50,height:40, zIndex:30,  backgroundColor:'#fff', borderRadius:10    }}   
                                   source={require('../../../assets/cateicon/pubg.png')}/>

                                   : data.category === '파티' ?    
                                   <Image  
                                   style={{  width:50,height:40, zIndex:30,  backgroundColor:'#fff', borderRadius:10    }}   
                                   source={require('../../../assets/cateicon/disco-ball.png')}/>
                                     
                                   : data.category === '술 한잔' ?    
                                   <Image  
                                   style={{  width:50,height:50, zIndex:30,  backgroundColor:'#fff', borderRadius:19   }}   
                                   source={require('../../../assets/cateicon/soju.png')}/>

                                   : <Text>{data.category}</Text>
                                        }
                                   </View>
                              <View style={styles.infoContainer}>
                              
                                   <View style={styles.titleContainer}>
                                        <Text numberOfLines={1}  style={styles.titleText}> {data.title}</Text>
                                   </View>
                                   <Text style={styles.timeText}> {data.timeInfo}~ </Text> 
                                   <Text numberOfLines={2} style={styles.locationText}> {data.address}</Text>                    
                                  
                              </View>
                              
                                
                         </View>
                         </Pressable>  
                    </View>
               ))
     
               return roomList;
          }                   
     }

     showJoinRoomList = () => {
          let roomList = [];
          var key = 0;

          if(this.state.joinRoomInfo !== undefined) {
               this.state.joinRoomInfo.map(data => roomList.push (
                    <View
                         style={styles.cardContainer}
                         key={key++}
                    >
                         <Pressable
                              onPress={() => this.props.navigation.push('Roomctrl', 
                                   {sendd: data}
                              )}
                         >
                              <View style={styles.roomCard}>                              
                                   <View style={styles.categoryIcon}>
                                        <Text style={styles.categoryText}>{data.category}</Text> 
                                   </View>
                                   <View style={styles.infoContainer}>                              
                                        <View style={styles.titleContainer}>
                                             <Text numberOfLines={1}  style={styles.titleText}>{data.title}</Text>
                                        </View>
                                        <Text style={styles.timeText}> {data.timeInfo}~</Text> 
                                        <Text numberOfLines={2} style={styles.locationText}>{data.address}</Text>                                                      
                                   </View>                                                              
                              </View>
                         </Pressable>  
                    </View>
               ))

               
               return roomList;
          }                   
                     
     }



     render() {
          return (
               <ScrollView style={{backgroundColor:'#fff'}}>
                   {/* <View style={styles.headerConatiner}>
                         <AntDesign
                              name={"arrowleft"}
                              style={styles.backIcon}
                              onPress={() => {this.props.navigation.navigate('Main');}}
                         />  
                         <Text>Room List</Text> 
          </View>  */} 
               <View style={styles.sectionConatiner}>
                    <Text style={styles.sectionText}>
                         호스팅중
                    </Text>
               </View>                      
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>                 
                         {this.showRoomList()}                                                
                    </View>
                    <View style={{}}>
                         <Text style={styles.sectionText}>
                              참가중
                         </Text>
                    </View>
                      
                    <View style={{flexDirection:'row', flexWrap:'wrap'}}>                 
                              {this.showJoinRoomList()}                                                
                         </View>                      
                </ScrollView>
          )
     }
}