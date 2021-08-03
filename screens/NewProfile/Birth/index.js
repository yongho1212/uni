import React, {Component} from 'react';
import {SafeAreaView, View, Text, Pressable, Dimensions, ImageBackground} from 'react-native';

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

    changeDate = (date) => {   
        this.state.date = date; 
        this.state.check = 1;

        this.state.birth = date;

        var currentYear = new Date().getFullYear();
        var birthYear = date.getFullYear();
        this.state.age = currentYear - birthYear + 1;
        
        this.setState({
            nextColor: '#f5ff00',
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
            <View style={{backgroundColor:'#fff'}}>
                <ImageBackground
                source={require("../../../assets/imgs/3r.png")} resizeMode="cover" 
                style={{width:"100%", height:'100%', }}
                >
                {/*<View style={styles.headerContainer}>
                    <AntDesign 
                        name={"doubleleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Gender')}
                    />
                    <Text style={{fontSize: 18}}>생일</Text>
        <Pressable style={styles.vaccum}></Pressable>
                </View>*/}
                <View style={styles.contentContainer}>
                <View style={styles.announceContainer}>
                        <Text style={ styles.announce}>
                            생일을 알려주세요! 
                        </Text>
                        <Text style={ styles.announce}>
                       
                        </Text>
                        <Text style={ styles.announce}>
                            생일은 변경이 불가하니 신중하게 골라주세요!
                        </Text>
                    </View>
                    
                        <DatePicker
                            mode='date'
                            date={this.state.date}                                       
                            minuteInterval={10}
                            onDateChange={this.changeDate}
                            androidVariant="iosClone"
                            locale="ko"
                            is24hourSource="locale"
                            style={{width:300, height:300, backgroundColor: 'rgba(255, 255, 255, 0.8)'}}
                            textColor="#000"
                        />
                   
                    
                    <Pressable
                        style={{
                            width: Dimensions.get('window').width * 0.7,
                            height: 50,
                            backgroundColor: this.state.nextColor,
                             
                            marginVertical: 20,
                            borderRadius: 20,
                            justifyContent: 'center',
                            alignItems: 'center',

                        }}
                        onPress={() => {this.connect(); this.props.navigation.navigate('Interest');}}
                    >
                        <Text style={{fontWeight:'bold', fontSize:20}}>다음</Text>
                    </Pressable>
                </View>
                </ImageBackground>
            </View>
        )
    }
}