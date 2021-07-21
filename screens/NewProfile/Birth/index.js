import React, {Component} from 'react';
import {SafeAreaView, View, Text, Pressable, Dimensions} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import DatePicker from 'react-native-date-picker';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export default class Birth extends Component {   
    constructor(props) {
        super(props);
        this.state = {
           id: '',    
           birth: '',  
           age: 0,
           
           date: '',
           check: 0,    
           nextColor: '#00ff00',                   
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

    changeDate = (date) => {   
        this.state.date = date; 
        this.state.check = 1;

        this.state.birth = date;

        var currentYear = new Date().getFullYear();
        var birthYear = date.getFullYear();
        this.state.age = currentYear - birthYear + 1;
        
        this.setState({
            nextColor: 'red',
        })
    }   

    connect = async () => {
        const URL = "http://127.0.0.1:3000/setBirth";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                birth: this.state.birth,
                age: this.state.age,
            })
        })    
    }

    render() {
        if(this.state.check === 0) {
            this.state.date = new Date();
        }
        return (       
            <SafeAreaView>
                <View style={styles.headerContainer}>
                    <AntDesign 
                        name={"arrowleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Gender')}
                    />
                    <Text style={{fontSize: 18}}>생일</Text>
                    <Pressable style={styles.vaccum}></Pressable>
                </View>
                <View style={styles.contentContainer}>
                    <DatePicker
                        mode='date'
                        date={this.state.date}                                       
                        minuteInterval={10}
                        onDateChange={this.changeDate}
                        androidVariant="nativeAndroid"
                        locale="ko"
                        is24hourSource="locale"
                    />
                    <Pressable
                        style={{
                            width: Dimensions.get('window').width * 0.7,
                            height: 50,
                            borderColor: this.state.nextColor,
                            borderWidth: 3,    
                            marginVertical: 20,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        onPress={() => {this.connect(); this.props.navigation.navigate('Interest');}}
                    >
                        <Text>다음</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        )
    }
}