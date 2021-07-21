import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import styles from './styles';

export default class Gender extends Component {
    constructor(props) {
        super(props);
        this.state = {
           id: '',
           gender: '',     
           manColor: '#dcdcdc', 
           womanColor: '#dcdcdc',
           nextColor: '#dcdcdc',             
        }
    }

    componentDidMount = () => {
        this.getId();
    }

    getId = async () => {
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

    check_Gender = (gender) => {
        if(gender === '남성') {
            this.state.manColor = '#0080ff';
            this.state.womanColor = '#dcdcdc';
        }else {
            this.state.womanColor = '#0080ff';
            this.state.manColor = '#dcdcdc';
        }

        this.state.nextColor = '#00ff00';
    }

    connect = async () => {
        
        const URL = "http://127.0.0.1:3000/setGender";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                gender: this.state.gender,
            })
        })    
    }

    render() {
        return (       
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <AntDesign 
                        name={"arrowleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Auth')}
                    />
                    <Text style={{fontSize: 18}}></Text>
                    <Pressable style={styles.vaccum}></Pressable>
                </View>
                    <View style={styles.announceContainer}>
                        <Text style={ styles.announce}>
                            성별을 알려주세요! 
                        </Text>
                        <Text style={ styles.announce}>
                            성별은 변경이 불가하니 신중하게 골라주세요!
                        </Text>
                    </View>
                <View style={styles.contentContainer}>
                    
                    <Pressable
                        style={{
                            width: Dimensions.get('window').width * 0.7,
                            height: 50,
                            borderColor: this.state.manColor,
                            borderWidth: 3,    
                            
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical:10,
                            
                        }}
                        onPress={() => {this.setState({gender: '남성'}); this.check_Gender('남성');}}
                    >
                        <Text>남성</Text>
                        <FontAwesome 
                        name={"male"}
                        
                        />
                    </Pressable>
                    <Pressable
                        style={{
                            width: Dimensions.get('window').width * 0.7,
                            height: 50,
                            borderColor: this.state.womanColor,
                            borderWidth: 3,    
                            
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical:10,
                            flexDirection:'row'
                        }}
                        onPress={() => {this.setState({gender: '여성'}); this.check_Gender('여성');}}
                    >
                        <Text>여성</Text>
                        <FontAwesome 
                        name={"female"}
                        
                        />
                    </Pressable>
                    <Pressable
                        style={{
                            width: Dimensions.get('window').width * 0.7,
                            height: 50,
                            borderColor: this.state.nextColor,
                            borderWidth: 3,    
                            marginVertical: 5,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical:10,
                            flexDirection:'row'
                        }}
                        onPress={() => {this.connect(); this.props.navigation.navigate('Birth');}}
                    >
                        <Text>다음</Text>
                        <MaterialIcons 
                        name={"navigate-next"}
                        
                        />
                    </Pressable>
                </View>                     
            </SafeAreaView>
        )
    }
}