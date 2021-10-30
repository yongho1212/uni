import React, {Component} from 'react';
import {KeyboardAvoidingView, View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, SafeAreaView, ImageBackground} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';
import { Buffer } from 'buffer';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome'

import styles from './styles';
import { ScrollView } from 'react-native-gesture-handler';

import { SERVER_URL,  } from '@env'

export default class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            picker: [],
            image: [
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},
                {uri: undefined, width: 100, height: 150, mime: undefined},    
            ],
            index: 0,
            interestList: [],
            userInterest: [],
        }
    }

    componentDidMount = () => {                   
        this.props.navigation.addListener('focus', () => {   
            this.getProfile();  
            this.getUserInfo();                                                          
        })                
    }

    getProfile = async () => {                
        const id = await AsyncStorage.getItem('id');
        this.setState({ 
            id: id,
        })

        fetch(`${SERVER_URL}/firstProfile/?id=` + id  + "&time=" + new Date())
        .then(responseData => {
            if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {              
                this.state.image[0].uri = responseData.url;     
            }
        })
        .then(() =>
            fetch(`${SERVER_URL}/secondProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {  
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {
                    this.state.image[1].uri = responseData.url;                                     
                }
            })
        )
        .then(() =>
            fetch(`${SERVER_URL}/thirdProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[2].uri = responseData.url;                                   
                }
            })
        )
        .then(() =>
            fetch(`${SERVER_URL}/fourthProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[3].uri = responseData.url;     
                }
            })
        ).then(() =>
            fetch(`${SERVER_URL}/fifthProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[4].uri = responseData.url;                                     
                }
            })
        ).then(() => 
            fetch(`${SERVER_URL}/sixthProfile/?id=` + id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[5].uri = responseData.url;                                     
                }
            })
        )
        .then(() => this.picker())
    }

    picker = () => {
        let picker = new Array();

        this.state.image.map((data, index) => { 
            picker.push (
                <TouchableOpacity
                    style={styles.imageBoard}
                    onPress={() => {this.setState({index : index}); this.pickImage('gallery');}}
                    key={index}
                >                    
                    {data.uri === undefined ?
                        <Fontisto
                            name={"plus-a"}
                        />
                        :
                        <Image 
                            source={{uri: data.uri}}
                            style={{width: 100, height: 150, borderRadius: 25}}
                        />
                    }
                </TouchableOpacity>
            )
        })

        this.setState({
            picker: picker
        })
    }

    pickImage = async(option) => {
        if(option === 'camera') {
            ImagePicker.openCamera({
                width: 300, height: 400, cropping: true, freeStyleCropEnabled: true, includeBase64: true,           
            })
            .then(image => {
                var sequence = 6;
                var check = 0;

                this.state.image.map((data, index) => {
                    if(data.uri !== undefined) {
                        if(this.state.index === index) {
                            data.uri = image.path;
                            data.mime = image.mime;
                            data.width = image.width;
                            data.height = image.height;
                            
                            check += 1;
                        }
                    }else if(data.uri === undefined) {
                        if(check === 0) {
                            if(sequence > index) {
                                data.uri = image.path;
                                data.mime = image.mime;
                                data.width = image.width;
                                data.height = image.height;

                                sequence = index;
                                this.setState({index: sequence});
                            }
                        }
                    }
                })
                
                this.uploadImage(image, this.state.index);
                this.picker();
            })
        }else {
            ImagePicker.openPicker({
                cropping: true, freeStyleCropEnabled: true, includeBase64: true,
            }).then((image) => {
                var sequence = 6;
                var check = 0;

                this.state.image.map((data, index) => {
                    if(data.uri !== undefined) {
                        if(this.state.index === index) {
                            data.uri = image.path;
                            data.mime = image.mime;
                            check += 1;
                        }
                    }else if(data.uri === undefined) {
                        if(check === 0) {
                            if(sequence > index) {
                                data.uri = image.path;
                                data.mime = image.mime;
                                sequence = index;
                                this.setState({index: sequence});
                            }
                        }
                    }
                })
                
                this.uploadImage(image, this.state.index);
                this.picker();    
            }).catch((e) =>console.log(JSON.stringify(e)));
        }

        this.bs.current.snapTo(1);        
    }

    uploadImage = async(image, index) => { 
        var profile;             
        profile = await ImageResizer.createResizedImage(image.path, 1000, 1000, 'JPEG', 100, 0, undefined, false, {mode: 'contain'});

        const formData = new FormData();

        var path = profile.uri;        
        var name = profile.uri.substring(path.lastIndexOf('/') + 1, path.length);      
        var type = image.mime;

        var id = this.state.id;
        var date = Date.now();

        formData.append('id', id);
        formData.append('date', date);
        formData.append('index', index);
        formData.append('profile', {
            name: name,
            uri: path,  
            type: type,
        })

        const URL = `${SERVER_URL}/uploadProfile`;
        fetch(URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
    }

    bs = React.createRef();
    renderContent = () => (
        <View
            style={{
                flex: 0,
                backgroundColor: '#fff',
                paddingTop: 30,
                height: 700,
            }}
        >      
            <Pressable
                style={styles.pickerButton}
                onPress={() => this.pickImage('camera')}
            >
                <Fontisto 
                    name={'camera'}
                    size={25} 
                    style={{marginHorizontal: 40}}
                />                
                <Text style={{fontSize: 17}}>Take Photo</Text>
            </Pressable>
            <Pressable
                style={styles.pickerButton}
                onPress={() => this.pickImage('gallery')}
            >
                <FontAwesome 
                    name={'image'}
                    size={25}
                    style={{marginHorizontal: 40}}
                />
                <Text style={{fontSize: 17}}>Choose From Gallery</Text>
            </Pressable>
        </View>
    );    

    getUserInfo = async() => {       
        this.state.interestList = '';

        const id = await AsyncStorage.getItem('id');
        const URL = `${SERVER_URL}/userInfo`;
        var interest = new Array();

        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({
                id: id,
            })
        })
        .then(response => response.json())
        .then(responseData => {
          responseData.map(userData => {
            interest = userData.hobby.split(',');                        
          })
        })
        .then(() => {
            this.state.userInterest = interest; 

            interest.map(data => {                
                this.state.interestList += data;
                
                if(data !== interest[interest.length - 1]) {
                    this.state.interestList += ', ';
                }
            })
        })                
    }            

    render() {
        return (
            <View style={styles.editContainer}>                                   
                <ImageBackground
                    source={require("../../assets/imgs/3rs.png")} resizeMode="cover" 
                    style={{ width: "100%", height: '110%' }}                    
                >                    
                    <View style={styles.announceContainer}>
                        <View style={styles.headerConatiner}>
                            <MaterialIcons name={"arrow-back-ios"} 
                                size={45} 
                                color={'#000'}
                                style={{marginLeft:10,marginTop:20}}
                                onPress={() => {this.props.navigation.navigate('DrawerNav');}}
                            />                   
                        </View>
                        <View style={{ flexDirection:'row', alignItems:'flex-end' }}>
                            <Text style={styles.announceTitle}>
                                사진
                            </Text>
                            <Text style={styles.announce}>
                                을 
                            </Text>
                        </View>
                        <Text style={styles.announce}>
                             추가해 주세요! 
                        </Text>                                           
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', marginTop: 60 }}>  
                        <View style={{flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', width: Dimensions.get('window').width*0.9, marginHorizontal: Dimensions.get('window').width*0.05}}>
                            {this.state.picker}
                        </View>                        
                        <View style={styles.interestContainer}>
                            <Pressable
                                style={styles.interestList}
                                onPress={() => this.props.navigation.push('editHobby', {interest: this.state.userInterest})}
                            >
                                <Text style={{fontSize:18}}>{this.state.interestList}</Text>
                            </Pressable>                                                     
                        </View>   
                        <BottomSheet
                            ref={this.bs}
                            snapPoints={[250, 0]}
                            initialSnap={1}
                            renderContent={this.renderContent}                   
                            enabledContentTapInteraction={false}
                            enabledInnerScrolling={false}
                        />                                                                                                      
                    </View>
                </ImageBackground>               
            </View> 
        )
    }
}