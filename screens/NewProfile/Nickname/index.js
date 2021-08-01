import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export default class Nickname extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            nickname: '',
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

    onChangeText = async(text) => { 
        if(text.length !== 0) {
            this.setState({nextColor: 'red'})    
        }else {
            this.setState({nextColor: '#dcdcdc'})
        }
        
        this.setState({nickname: text})
    }

    connect = async () => {
        if(this.state.nickname === '') {
            Alert.alert('닉네임을 설정해주세요');
        }else {
            const URL = "http://127.0.0.1:3000/setNickname";
            fetch(URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: this.state.id,
                    nickname: this.state.nickname,
                })
            }) 
            .then(() => this.props.navigation.navigate('Gender'))  
        } 
    }

    render() {
        return (       
            <View>
                <View style={styles.headerContainer}>
                    <AntDesign 
                        name={"arrowleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Auth')}
                    />
                    <Text style={{fontSize: 18}}>닉네임</Text>                    
                </View>                 
                <View style={styles.contentContainer}>
                    <TextInput
                        style={styles.nicknameInput}
                        onChangeText={text => this.onChangeText(text)}
                        value={this.state.nickname}
                    />
                    <Pressable
                        style={{
                            marginTop: 50,
                            width: Dimensions.get('window').width * 0.7,
                            height: 50,
                            borderColor: this.state.nextColor,
                            borderWidth: 3,    
                            marginVertical: 5,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                        onPress={() => this.connect()}
                    >
                        <Text>다음</Text>
                    </Pressable>
                </View>                    
            </View>
        )
    }
}
