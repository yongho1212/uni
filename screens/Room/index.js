import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, Alert} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export default class Room extends Component {
     render() {
          return (
               <View style={styles.headerConatiner}>
                    <AntDesign
                        name={"arrowleft"}
                        style={styles.backIcon}
                        onPress={() => {this.props.navigation.navigate('Main');}}
                    />  
                    <Text>Room</Text>
                </View>
          )
     }
}