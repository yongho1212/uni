import React, {Component} from 'react';
import {SafeAreaView, ScrollView, View, Text, TouchableOpacity, Pressable, FlatList, Dimensions, Image, TextInput, Alert} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';



import styles from './styles';


export default class Interest extends Component {   
    constructor(props) {
        super(props);
        this.state = {
           id: '',
           data: [],
           list: [],
           hobby: [],
           cnt: 0,
           selectColor: '#dcdcdc',
           selectedColor: 'red',
           nextColor: '#dcdcdc',
        }
    }

    componentDidMount = () => {  
        /*
        if(this.props.route.params.selectedHobby !== undefined) {
            console.log(this.props.route.params.selectedHobby)
            this.state.hobby = this.props.route.params.selectedHobby;
        }
        */
        this.get_Interest();
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
    
    get_Interest = async () => {
        const URL = "http://127.0.0.1:3000/setInterest";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                hobby: 0,
            })
        })    
        .then(response => response.json())
        .then(responseData => {
            this.state.data = responseData;
        })
        .then(() => this.getList())
    }

    send_Interest = async () => {
        const URL = "http://127.0.0.1:3000/setInterest";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',        
            },
            body: JSON.stringify({
                id: this.state.id,
                hobby: this.state.hobby,
            })
        })
    }

    getList = () => {
        if(this.state.cnt >= 3) {
            this.state.nextColor = 'red';
        }else {
            this.state.nextColor = '#dcdcdc';
        }

        let list = new Array();
        let cnt = 0;
        let area = this.state.data[0].no;

        this.state.data.map((data, index) => {
            if(cnt === 0) {
                cnt += 1;
                list.push(<Text key={data._id + '1'}>{this.state.data[0].area}</Text>)
                list.push(<Pressable key={data._id + '2'} style={styles.vaccum}></Pressable>)
            }

            if(area !== data.no) {
                list.push(<Pressable key={data._id + '3'} style={styles.vaccum}></Pressable>)
                list.push(<Text key={data._id}>{data.area}</Text>)
                list.push(<Pressable key={data._id + '4'} style={styles.vaccum}></Pressable>)
            
                area = data.no;
            }

            list.push(
                <Pressable
                    key={index}
                    onPress={() =>                                                     
                        {
                        this.state.hobby.indexOf(data.category) < 0 
                        ? (this.state.hobby.push(data.category), this.state.cnt += 1)
                        : (this.state.hobby.splice(this.state.hobby.indexOf(data.category), 1), this.state.cnt -= 1);

                        this.updateList();
                        }
                    }
                    style={this.state.hobby.indexOf(data.category) < 0 ? styles.selectBox : styles.selectedBox}                                                                  
                >
                    <Text key={data._id + '5'}>{data.category}</Text>
                </Pressable>
            )
            /*
            this.setState({
                list: list
            })
            */
        })

        list.push(<Pressable key={'last'} style={styles.vaccum}></Pressable>)
        list.push(
            <Pressable
               key={'next'} 
                style={{
                    width: Dimensions.get('window').width * 0.7,
                    height: 50,
                    borderColor: this.state.nextColor,
                    borderWidth: 3,    
                    marginVertical: 5,
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
                onPress={() => 
                    {
                        this.state.cnt >= 3 
                        ? (this.send_Interest(), this.props.navigation.navigate('NewProfileImg'))
                        : Alert.alert('관심사를 최소 3개 이상 설정해주세요');
                    }
                }
            >
                <Text>다음  ({this.state.cnt}/5)</Text>
            </Pressable>     
        )
       
        this.setState({
            list: list
        })
    }

    updateList = () => {
        if(this.state.cnt >= 3) {
            this.state.nextColor = 'red';
        }else {
            this.state.nextColor = '#dcdcdc';
        }

        let list = new Array();
        let cnt = 0;
        let area = this.state.data[0].no;

        this.state.data.map((data, index) => {
            if(cnt === 0) {
                cnt += 1;
                list.push(<Text key={data._id + '1'}>{this.state.data[0].area}</Text>)
                list.push(<Pressable key={data._id + '2'} style={styles.vaccum}></Pressable>)
            }

            if(area !== data.no) {
                list.push(<Pressable key={data._id + '3'} style={styles.vaccum}></Pressable>)
                list.push(<Text key={data._id}>{data.area}</Text>)
                list.push(<Pressable key={data._id + '4'} style={styles.vaccum}></Pressable>)
            
                area = data.no;
            }

            list.push(
                <Pressable
                    key={index}
                    onPress={() =>                                                     
                        {
                        this.state.hobby.indexOf(data.category) < 0 
                        ? (this.state.hobby.push(data.category), this.state.cnt += 1)
                        : (this.state.hobby.splice(this.state.hobby.indexOf(data.category), 1), this.state.cnt -= 1);

                        this.getList();
                        }
                    }
                    style={this.state.hobby.indexOf(data.category) < 0 ? styles.selectBox : styles.selectedBox}                                                                  
                >
                    <Text key={data._id + '5'} style={styles.buttonText}>{data.category}</Text>
                </Pressable>
            )
        })

        list.push(<Pressable key={'last'} style={styles.vaccum}></Pressable>)
        list.push(
            <View style={styles.nextBtnContainer} key={'next_container'}>
            <Pressable
                key={'next'}
                style={{
                    width: Dimensions.get('window').width * 0.7,
                    height: 50,
                    borderColor: this.state.nextColor,
                    borderWidth: 2,    
                    marginVertical: 5,
                    borderRadius: 20,
                    
                    
                }}
                onPress={() => 
                    {
                        this.state.cnt >= 3 
                        ? (this.send_Interest(), this.props.navigation.navigate('NewProfileImg'))
                        : Alert.alert('관심사를 최소 3개 이상 설정해주세요');
                    }
                }
            >

                <Text>다음  ({this.state.cnt}/5)</Text>
            </Pressable> 
            </View>    
        )

        this.setState({
            list: list
        })
    }

    render() {
        return (   
            <SafeAreaView>
            <ScrollView style={{backgroundColor:'white', height:'100%'}}>
                <View style={styles.headerContainer}>
                    <AntDesign 
                        name={"doubleleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Birth')}
                        //onPress={() => this.props.navigation.push('NewProfile', {hobby : this.state.hobby})}
                    />
                    <Text style={{fontSize: 18}}></Text>
                    <Pressable style={styles.vaccum}></Pressable>
                </View>
                <View style={styles.listContainer}>
                    {this.state.list}
                </View>                
            </ScrollView> 
            </SafeAreaView>               
        )
    }
}