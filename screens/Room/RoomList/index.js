import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, Alert, Image} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export default class RoomList extends Component {
     constructor(props) {
            super(props);
            this.state = {
                id: '',
                roomInfo: [],               
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

          const URL = "http://127.0.0.1:3000/roomList";
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
                  roomInfo: responseData,
              })
          })          
     }

     showRoomList = () => {
          let roomList = [];
          var key = 0;
          
          if(this.state.roomInfo !== 0) {
               this.state.roomInfo.map(data => roomList.push (
                    <View
                         style={styles.line}
                         key={key++}
                    >
                         <View style={styles.roomList}>
                              <Pressable
                              onPress={() => this.props.navigation.push('UserList', {_id: data._id})}
                              >
                              <Text>주소 : {data.address}</Text>                    
                              <Text>제목 : {data.title}</Text>
                              </Pressable>    
                         </View>
                    </View>
               ))
     
               return roomList;
          }                   
     }

     render() {
          return (
               <View>
                    <View style={styles.headerConatiner}>
                         <AntDesign
                              name={"arrowleft"}
                              style={styles.backIcon}
                              onPress={() => {this.props.navigation.navigate('Main');}}
                         />  
                         <Text>Room List</Text> 
                    </View>                         
                    <View>                 
                         {this.showRoomList()}                                                
                    </View>                     
                </View>
          )
     }
}