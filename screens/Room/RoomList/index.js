import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, ScrollView, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';

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
                                        <Text style={styles.categoryText}> {data.category}</Text> 
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