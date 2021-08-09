import React, {Component} from 'react';
import {View, Text, ScrollView, Pressable, ImageBackground, Dimensions, SafeAreaView, TextInput, Alert} from 'react-native';

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
           selectColor: '#fff',
           selectedColor: 'red',
           nextColor: '#fff',
        }
    }

    componentDidMount = () => {  
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
            this.state.nextColor = '#49ffbd';
        }else {
            this.state.nextColor = '#fff';
        }

        let list = new Array();
        let cnt = 0;
        let area = this.state.data[0].no;

        this.state.data.map((data, index) => {
            if(cnt === 0) {
                cnt += 1;
                list.push(<Text key={data._id + '1'} style={styles.listName}>{this.state.data[0].area}</Text>)
                list.push(<Pressable key={data._id + '2'} style={styles.vaccum}></Pressable>)
            }

            if(area !== data.no) {
                list.push(<Pressable key={data._id + '3'} style={styles.vaccum}></Pressable>)
                list.push(<Text key={data._id} style={styles.listName}>{data.area}</Text>)
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
                    <Text key={data._id + '5'} style={styles.boxText}>{data.category}</Text>
                </Pressable>          
            )
        })

        list.push(<Pressable key={'last'} style={styles.vaccum}></Pressable>)
        list.push(
            <View style={styles.nextButtonContainer} key={'next_container'}>
                <Pressable
                    key={'next'} 
                    style={{
                        width: Dimensions.get('window').width * 0.7,
                        marginHorizontal:Dimensions.get('window').width * 0.1,
                        height: 50,
                        backgroundColor: this.state.nextColor,
                        marginVertical:70,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowColor: 'grey',
                        shadowOffset: { height: 3, width: 3 },
                    }}
                    onPress={() => 
                        {
                            this.state.cnt >= 3 
                            ? (this.send_Interest(), this.props.navigation.navigate('NewProfileImg'))
                            : Alert.alert('관심사를 최소 3개 이상 설정해주세요');
                        }
                    }
                >
                    <Text style={{fontSize:20}}>Next  ({this.state.cnt}/5)</Text>
                </Pressable> 
            </View>    
        )
       
        this.setState({
            list: list
        })
    }

    updateList = () => {
        if(this.state.cnt >= 3) {
            this.state.nextColor = '#49ffbd';
        }else {
            this.state.nextColor = '#fff';
        }

        let list = new Array();
        let cnt = 0;
        let area = this.state.data[0].no;

        this.state.data.map((data, index) => {
            if(cnt === 0) {
                cnt += 1;
                list.push(<Text key={data._id + '1'} style={styles.listName}>{this.state.data[0].area}</Text>)
                list.push(<Pressable key={data._id + '2'} style={styles.vaccum}></Pressable>)
            }

            if(area !== data.no) {
                list.push(<Pressable key={data._id + '3'} style={styles.vaccum}></Pressable>)
                list.push(<Text key={data._id} style={styles.listName}>{data.area}</Text>)
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
                        <Text key={data._id + '5'}  style={styles.boxText}>{data.category}</Text>
                    </Pressable>
            )
        })

        list.push(<Pressable key={'last'} style={styles.vaccum}></Pressable>)
        list.push(
            <View style={styles.nextButtonContainer} key={'next_container'}>
                <Pressable
                    key={'next'}
                    style={{
                        width: Dimensions.get('window').width * 0.7,
                        marginHorizontal:Dimensions.get('window').width * 0.1,
                        height: 50,
                        backgroundColor: this.state.nextColor,
                        marginVertical:70,
                        borderRadius: 25,
                        justifyContent: 'center',
                        alignItems: 'center',
                        shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowColor: 'grey',
                        shadowOffset: { height: 3, width: 3 },
                    }}
                    onPress={() => 
                        {
                            this.state.cnt >= 3 
                            ? (this.send_Interest(), this.props.navigation.navigate('NewProfileImg'))
                            : Alert.alert('관심사를 최소 3개 이상 설정해주세요');
                        }
                    }
                >
                    <Text style={{fontSize:20}}>Next  ({this.state.cnt}/5)</Text>
                </Pressable> 
            </View>    
        )

        this.setState({
            list: list
        })
    }

    render() {
        return (   
            <View style={{}}>
                <ImageBackground
                source={require("../../../assets/imgs/3.png")} resizeMode="cover" 
                style={{height:"100%", 
                width:"100%", }}
                >
                    
            <ScrollView >
            <View style={styles.announceContainer}>
                    <View style={{ flexDirection:'row', alignItems:'flex-end'}}>
                    <Text style={ styles.announceTitle}>
                            관심사
                        </Text>
                        <Text style={ styles.announce}>
                             를 
                        </Text>
                        </View>
                        <Text style={ styles.announce}>
                             알려주세요! 
                        </Text>
                    
                        <Text style={ styles.announceSpecific}>
                        3개이상 선택해 주세요!
                        </Text>
                    </View>
                
                {/*<View style={styles.headerContainer}>
                    <AntDesign 
                        name={"arrowleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Birth')}
                        //onPress={() => this.props.navigation.push('NewProfile', {hobby : this.state.hobby})}
                    />
                    <Text style={{fontSize: 18}}>관심사 설정</Text>
                    <Pressable style={styles.vaccum}></Pressable>
        </View>*/}
                <View style={styles.listContainer}>
                    {this.state.list}
                </View>     
                        
            </ScrollView>     
            </ImageBackground>   
            </View>           
        )
    }
}