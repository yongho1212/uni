import React, {Component} from 'react';
import {SafeAreaView, View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, Alert, Platform} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LinearGradient from 'react-native-linear-gradient';

import styles from './styles';

export default class Gender extends Component {
    constructor(props) {
        super(props);
        this.state = {
           id: '',
           gender: '',     
           manColor: '#fff', 
           womanColor: '#fff',
           nextColor: '#fff',             
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
            this.state.manColor = '#ff0081';
            this.state.womanColor = '#fff';
        }else {
            this.state.womanColor = '#ff0081';
            this.state.manColor = '#fff';
        }

        this.state.nextColor = '#f5ff00';
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
            <SafeAreaView style={{backgroundColor:'white'}}>
                <View style={styles.headerContainer}>
                    <AntDesign 
                        name={"doubleleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Nickname')}
                    />
                    <Text style={{fontSize: 18}}></Text>
                    <Pressable style={styles.vaccum}></Pressable>
                </View>
                    <View style={styles.announceContainer}>
                        <Text style={ styles.announce}>
                            성별을 알려주세요! 
                        </Text>
                        <Text style={ styles.announce}>
                       
                        </Text>
                        <Text style={ styles.announce}>
                            성별은 변경이 불가하니 신중하게 골라주세요!
                        </Text>
                    </View>
                <View style={styles.contentContainer}>
                  
                  
                    <Pressable
                        style={{
                            width: Dimensions.get('window').width * 0.5,
                            height: Dimensions.get('window').width * 0.5,
                            backgroundColor:this.state.manColor,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical:10,
                            flexDirection:'row',
                            shadowOpacity: 0.75,
                            shadowRadius: 5,
                            shadowColor: 'grey',
                            shadowOffset: { height: 2, width: 2 },
                            borderRadius:20
                            
                            
                            
                        }}
                        onPress={() => {this.setState({gender: '남성'}); this.check_Gender('남성');}}
                    >
                        <Text style={styles.btnFonts}>남성 </Text>
                        <FontAwesome 
                        name={"male"}
                        style={styles.btnFonts}
                        />
                    </Pressable>
                    
                   
                    <Pressable
                        style={{
                            width: Dimensions.get('window').width * 0.5,
                            height: Dimensions.get('window').width * 0.5,
                            backgroundColor: this.state.womanColor,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            marginVertical:10,
                            flexDirection:'row',
                            shadowOpacity: 0.75,
                            shadowRadius: 5,
                            shadowColor: 'grey',
                            shadowOffset: { height: 2, width: 2 },
                            borderRadius:20
                        }}
                        onPress={() => {this.setState({gender: '여성'}); this.check_Gender('여성');}}
                    >
                        <Text style={styles.btnFonts}>여성 </Text>
                        <FontAwesome 
                        name={"female"}
                        style={styles.btnFonts}
                        />
                    </Pressable>
                    
                    <Pressable
                        style={{
                            width: Dimensions.get('window').width * 0.7,
                            height: 50,
                            backgroundColor: this.state.nextColor,
                            marginTop:50,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection:'row',
                            shadowOpacity: 0.75,
                            shadowRadius: 5,
                            shadowColor: 'grey',
                            shadowOffset: { height: 2, width: 2 },
                            borderRadius:20
                       
                        }}
                        onPress={() => {this.connect(); this.props.navigation.navigate('Birth');}}
                    >
                        <Text style={styles.btnFonts}>NEXT </Text>
                        <MaterialIcons 
                        name={"navigate-next"}
                        style={styles.btnFonts}
                        />
                    </Pressable>
          
                </View>                     
            </SafeAreaView>
        )
    }
}