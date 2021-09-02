import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, Alert, SafeAreaView, ImageBackground} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Convert} from 'mongo-image-converter';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { CometChat } from '@cometchat-pro/react-native-chat';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';


import styles from './styles';

export default class NewProfileImg extends Component {
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
            nextColor: '#dcdcdc',
        }
    }

    componentDidMount = () => {
        this.getProfile();
    }

    getProfile = async () => {
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
        console.log(this.state.id);

        fetch("http://127.0.0.1:3000/firstProfile/?id=" + this.state.id  + "&time=" + new Date())
        .then(responseData => {
            if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {              
                this.state.image[0].uri = responseData.url;     
            }
        })
        .then(() =>
            fetch("http://127.0.0.1:3000/secondProfile/?id=" + this.state.id + "&time=" + new Date())
            .then(responseData => {  
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {
                    this.state.image[1].uri = responseData.url;                                     
                }
            })
        )
        .then(() =>
            fetch("http://127.0.0.1:3000/thirdProfile/?id=" + this.state.id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[2].uri = responseData.url;                                   
                }
            })
        )
        .then(() =>
            fetch("http://127.0.0.1:3000/fourthProfile/?id=" + this.state.id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[3].uri = responseData.url;     
                }
            })
        ).then(() =>
            fetch("http://127.0.0.1:3000/fifthProfile/?id=" + this.state.id + "&time=" + new Date())
            .then(responseData => {
                if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {  
                    this.state.image[4].uri = responseData.url;                                     
                }
            })
        ).then(() => 
            fetch("http://127.0.0.1:3000/sixthProfile/?id=" + this.state.id + "&time=" + new Date())
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
                            source={{uri : data.uri}}
                            style={{width: 100, height: 150, borderRadius:25}}
                        />
                    }
                </TouchableOpacity>
            )
        })

        this.setState({
            picker: picker
        })
    }

    bs = React.createRef();


        renderContent = () => (
        <View
          style={{
            flex: 0,
            backgroundColor: '#fff',
            padding: 20,
            height: 700,
          }}
        >      
            <Pressable
                style={styles.pickerButton}
                onPress={() => this.pickImage('camera')}
            >
                <Text>카메라</Text>
            </Pressable>
            <Pressable
                style={styles.pickerButton}
                onPress={() => this.pickImage('gallery')}
            >
                <Text>갤러리</Text>
            </Pressable>
        </View>
    );
        
    pickImage = async(option) => {
        if(option === 'camera') {
            ImagePicker.openCamera({
                width: 300, height: 300, cropping: true, freeStyleCropEnabled: true, includeBase64: true,           
            })
            .then(image => {
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
            })
        }else {
            ImagePicker.openPicker({
                width: 200, height: 300, cropping: true, freeStyleCropEnabled: true, includeBase64: true,
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
            }).catch((e) => console.log(JSON.stringify(e)));
        }

        this.bs.current.snapTo(1);        
    }

    uploadImage = async(image, index) => {
        const formData = new FormData();

        var path = image.path;
        var name = image.path.substring(path.lastIndexOf('/') + 1, path.length);
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

        const URL = "http://127.0.0.1:3000/uploadProfile";
        fetch(URL, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
    }

    check = () => {
        var cnt = 0;
        this.state.image.map((data, index) => {
            console.log(data);
            if(data.uri !== undefined){
                cnt+=1;
            }
        })

        if(cnt === 0) {
            Alert.alert('프로필 사진을 1장 이상 등록하세요');
        }else {
            console.log('프로필 등록 완료');
            this.createUser();
            this.setCompleted();
            this.props.navigation.navigate('DrawerNav');            
        }
    }

       //채팅 아이디 생성
       createUser = async() => {

        const appSetting = new CometChat.AppSettingsBuilder()
        .subscribePresenceForAllUsers()
        .setRegion('us')
        .build();

        CometChat.init('192332ba9a7ee10b', appSetting).then(
            () => {
                console.log('Initialization completed successfully');
            },
            (error) => {
                console.log('Initialization failed with error:', error);
            },
        );

        const nickname = await AsyncStorage.getItem('nickname'); 
        console.log(nickname);
        fetch("http://127.0.0.1:3000/firstProfile/?id=" + this.state.id  + "&time=" + new Date())
        .then(responseData => {           
            const URL = 'https://api-us.cometchat.io/v3.0/users';
            fetch(URL, {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    appId: '192332ba9a7ee10b',
                    apiKey: 'e545675a7e11466d096a79bc9c5270838d6d633d',
                },
                body: JSON.stringify({
                    uid: this.state.id,
                    name: nickname,   
                    avatar: responseData.url,             
                })
            })    
            .then(response => response.json())
            .then(responseData => console.log(responseData))   
            .then(() => {
                CometChat.login(this.state.id, '92a48b2397822aea1cbebd8c615115bd3a14d4fa').then (
                    User => {
                      console.log("Login Successful:", { User });
                    },
                    error => {
                      console.log("Login failed with exception:", { error });
                    }
                )
            }) 
        })            
    }



    setCompleted = () => {
        const URL = "http://127.0.0.1:3000/setCompleted";
        fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: this.state.id,
                complete: true,
            })
        })
    }

    render() {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>   
                <ImageBackground
                source={require("../../../assets/imgs/3.png")} resizeMode="cover" 
                style={{width:"100%", height:'100%', }}
                >
                    <View style={styles.announceContainer}>
                    <View style={{ flexDirection:'row', alignItems:'flex-end'}}>
                    <Text style={ styles.announceTitle}>
                            사진
                        </Text>
                        <Text style={ styles.announce}>
                             을 
                        </Text>
                        </View>
                        <Text style={ styles.announce}>
                             추가해 주세요! 
                        </Text>
                    
                       
                    </View>
                {/*<View style={styles.headerContainer}>
                    <AntDesign 
                        name={"doubleleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Interest')}
                    />
                    <Text style={{fontSize: 18}}>사진 설정</Text>
                    <Pressable style={styles.vaccum}></Pressable>
        </View>   */}
                <View style={{ flex:1, justifyContent:'center', }}>  
                    <View style={{flexDirection:'row', flexWrap: 'wrap', justifyContent:'center', width: Dimensions.get('window').width*0.9, marginHorizontal:Dimensions.get('window').width*0.05,}}>
                    {this.state.picker}
                    </View>
                    <View>
                        <Pressable
                            style={{
                                width: Dimensions.get('window').width * 0.7,
                                height: 50,
                                borderColor: this.state.nextColor,
                                marginHorizontal:Dimensions.get('window').width * 0.15,
                                marginTop: 70,
                                borderRadius: 25,
                                justifyContent:'center',
                                alignItems: 'center',
                                backgroundColor:'#fff',
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                shadowColor: 'grey',
                                shadowOffset: { height: 3, width: 3 },
                                position:'absolute'
                            }}
                            
                            onPress={() => 
                                this.check()
                            }
                        >
                            <Text style={styles.btnFonts}>NEXT </Text>
                            
                        </Pressable>
                    </View>
                    
                    <BottomSheet
                        ref={this.bs}
                        snapPoints={[300, 0]}
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