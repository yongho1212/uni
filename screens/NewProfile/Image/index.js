import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, Alert, SafeAreaView} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import {Convert} from 'mongo-image-converter';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';

import AntDesign from 'react-native-vector-icons/AntDesign';
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
            uploadFile: {uri: undefined, width: 100, height: 150, mime: undefined},
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
                    onPress={() => {this.setState({index : index}); this.bs.current.snapTo(0);}}
                    key={index}
                >                    
                    {data.uri === undefined ?
                        <Fontisto
                            name={"plus-a"}
                        />
                        :
                        <Image 
                            source={{uri : data.uri}}
                            style={{width: 100, height: 150}}
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
                width: 300, height: 300, cropping: true, freeStyleCropEnabled: true, includeBase64: true,
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
            }).catch((e) => Alert.alert(JSON.stringify(e)));
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
            this.setCompleted();
            this.props.navigation.navigate('DrawerNav');            
        }
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
            <SafeAreaView>   
                <View style={styles.headerContainer}>
                    <AntDesign 
                        name={"doubleleft"}
                        style={styles.back} 
                        onPress={() => this.props.navigation.navigate('Interest')}
                    />
                    <Text style={{fontSize: 18}}>관심사 설정</Text>
                    <Pressable style={styles.vaccum}></Pressable>
                </View>   
                <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>  
                    {this.state.picker}
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
                        }}
                        onPress={() => 
                            this.check()
                        }
                    >
                        <Text>완료</Text>
                    </Pressable>
                    <BottomSheet
                        ref={this.bs}
                        snapPoints={[300, 0]}
                        initialSnap={1}
                        renderContent={this.renderContent}                   
                        enabledContentTapInteraction={false}
                        enabledInnerScrolling={false}
                    />                                       
                </View>
            </SafeAreaView> 
        )
    }
}