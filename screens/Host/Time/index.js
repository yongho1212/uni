import React, { Component } from 'react';
import {Text, View, TextInput, Pressable, Alert} from 'react-native';

import DatePicker from 'react-native-date-picker';
import Moment from 'moment';
import 'moment/locale/ko';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export default class Time extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
            showTime: '',
            isChange: false,
        }
    }

    componentDidMount = () => {
        
    }

    datePicker = () => {
        var currentTime = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + (9 * 60 * 60 * 1000));
        
        if(!this.state.isChange) {
            this.state.time = currentTime;
            this.state.showTime = Moment(currentTime).format('MM/DD(dd)  HH:mm');
        }

        return (
            <View>        
                <View style={styles.timeInfoContainer}>
                    <Text style={styles.timeInfoText}>{this.state.showTime}</Text>                                        
                </View>
                <DatePicker
                    mode='datetime'
                    date={this.state.time}
                    onDateChange={this.onChangeTime}
                    minimumDate={currentTime}
                    minuteInterval={10}
                    locale="ko"
                    is24hourSource="locale"
                    androidVariant="nativeAndroid"
                    
                />
            </View>
        )
    }

    onChangeTime = (selectedTime) => {
        const currentTime = new Date(new Date().getTime() + new Date().getTimezoneOffset() * 60 * 1000 + (9 * 60 * 60 * 1000));

        if(currentTime > selectedTime) {
            //Alert 대신 Fade out으로 바꿀 예정
            Alert.alert('X');
        }else {
            this.setState({       
                time: selectedTime,         
                showTime: Moment(selectedTime).format('MM/DD(dd)  HH:mm'),
                isChange: true,
            })     

            this.datePicker();                               
        }
    }

    render() {
        return (
            <View>
                <View style={styles.headerContainer}>
                    <AntDesign                        
                        name={"arrowleft"}
                        style={styles.backIcon}
                        onPress={() => this.props.navigation.push('Hosting', {time: JSON.stringify(this.state.time), timeInfo: this.state.showTime, Info: 'time'})}
                    />
                    <Text>약속시간</Text>
                </View>                
                <View style={styles.contentContainer}>                    
                    {this.datePicker()}                    
                </View>
            </View>
        )
    }
}