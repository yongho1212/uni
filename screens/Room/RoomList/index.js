import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, Alert, Image, SafeAreaView, ScrollView} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import { Avatar } from 'react-native-paper';
import { Card, Title, Paragraph } from 'react-native-paper';


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

         this.state.roomInfo.map(data => roomList.push (
             <View
                style={styles.line}
                key={key++}
             >
                <Card style={styles.roomCard}>
                    <Pressable
                        onPress={() => this.props.navigation.push('UserList', {_id: data._id})}
                    >
                         <Card.Content>
                         <View style={styles.headerInfoContainer}>
                              <View style={{flexDirection:'row', alignItems:'center'}}>
                                   <Entypo
                                   name={"drink"}
                                   size={30}
                                   />
                                   <Text>  Category</Text>
                              </View>
                              
                              <Text style={styles.peopleText}>4/8</Text>
                         </View>
                         <View style={styles.roomInfoContainer}>
                              <Title style={styles.titleText}>제목 : {data.title}</Title>
                              <Paragraph style={styles.locationText}>주소 : {data.address}</Paragraph>                    
                         </View>
                         <View style={styles.peopleInfoContainer}>
                              
                              <Paragraph style={styles.timeText}>time</Paragraph>
                              <Avatar.Image size={60} source={{uri: 'https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/72133855_376680976545337_8393998703647522816_n.jpg?_nc_cat=103&ccb=1-3&_nc_sid=8bfeb9&_nc_ohc=5KyRrovpnwAAX-ae4Wv&_nc_ht=scontent-ssn1-1.xx&oh=484dd34b01b4572eb4998d989a437209&oe=612C4014'}} />
                              
                         </View>
                         </Card.Content>
                    </Pressable>    
                </Card>
             </View>
         ))

         return roomList;
     }

     render() {
          return (
               <SafeAreaView style={styles.renderContainer}>
                    <View style={styles.headerConatiner}>
                         {/* <AntDesign
                              name={"arrowleft"}
                              style={styles.backIcon}
                              onPress={() => {this.props.navigation.navigate('Main');}}
                         />  
                         <Text>Room List</Text> */}
                    </View>                         
                    <ScrollView>
                        {this.showRoomList()}                  
                    </ScrollView>                     
                </SafeAreaView>
          )
     }
}