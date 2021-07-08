import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Pressable, Dimensions, Image, TextInput, Alert} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

import Fontisto from 'react-native-vector-icons/Fontisto';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation} from '@react-navigation/native';

import styles from './styles';

export default class NewProfile extends Component {   
    constructor(props) {
        super(props);

        this.state = {
           id: '',
           picker: [],           
           //image: [undefined, undefined, undefined, undefined, undefined, undefined],
           image: [
               {uri: undefined, width: 100, height: 150, mime: undefined},
               {uri: undefined, width: 100, height: 150, mime: undefined},
               {uri: undefined, width: 100, height: 150, mime: undefined},
               {uri: undefined, width: 100, height: 150, mime: undefined},
               {uri: undefined, width: 100, height: 150, mime: undefined},
               {uri: undefined, width: 100, height: 150, mime: undefined},
           ],
           profile: [],
           intro: '',
           check: 0,
        }
    }

    componentDidMount = () => {
        this.picker()   
        this.getData()     
    }

    uploadImage = async (image, index) => {
        const formData = new FormData();

        var path = image.path;
        var name = path.substring(path.lastIndexOf('/') + 1, path.length);
        var type = image.mime;
        var id = this.state.id;
        var date = Date.now();

        console.log(path)
        console.log(name)
        console.log(type)

        formData.append('id', id)
        formData.append('date', date)
        formData.append('index', this.state.check)

        formData.append('profile', {
            name: name,
            uri: path,  
            type: type,
        })

        const URL = "http://10.0.2.2:3000/NewProfile";
        fetch(URL, {
            method: 'POST',
            headers: {     
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: formData,
        })
    }

    getData = async () => {
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

    pickImage = async (option) => {
        if(option === 'camera') {
            ImagePicker.openCamera({
                width: 300, height: 300, cropping: true, freeStyleCropEnabled: true, includeBase64: true,                
              }).then(image => {
                var sequence = 6;
                var cnt = 0;
                this.state.image.map((data, index) => {
                    if(data.uri !== undefined) {
                        if(this.state.check === index) {
                            cnt++;
                            data.uri = image.path;
                            data.mime = image.mime;
                            console.log('변경')
                        }
                    }else if(data.uri === undefined) {
                        if(cnt === 0) {
                            if(sequence > index) {                            
                                data.uri = image.path;
                                data.mime = image.mime;
                                sequence = index;
                                this.setState({check : sequence})
                                console.log('추가')
                            }
                        }
                    }
                })
    
                this.uploadImage(image, this.state.check)
                this.picker()            
            }).catch((e) => Alert.alert(JSON.stringify(e)));
        }else {
            ImagePicker.openPicker({
                width: 300, height: 300, cropping: true, freeStyleCropEnabled: true, includeBase64: true,
            }).then((image) => {
                data[index] = image
                this.setState({image: data}) 
            }).catch((e) => Alert.alert(JSON.stringify(e)));
        }

        this.bs.current.snapTo(1);        
    }

    picker = () => {
        let picker = new Array()

        this.state.image.map((data, index) => { 
            picker.push (
                <TouchableOpacity
                    style={styles.imageBoard}
                    onPress={() => {this.setState({check : index}); this.bs.current.snapTo(0);}}
                    key={index}
                >                    
                    {data.uri === undefined ?
                        <Fontisto
                            name={"plus-a"}
                        />
                        :
                        <Image 
                            source={data}
                        />
                    }
                </TouchableOpacity>
            )
        })

        this.setState({
            picker: picker
        })
    }

    render() {
        return (       
            <View style={{width: Dimensions.get('window').width, height: Dimensions.get('window').height, flexDirection: 'row', flexWrap: 'wrap', alignItems: 'flex-start'}}>  
                {this.state.picker}
                {/* 자기소개 */}
                <View>
                    <Text style={styles.intro_Title}>자기소개</Text>
                    <TextInput
                        style={styles.intro_Input}
                        onChangeText={value => this.setState({intro: value})}
                    />            
                </View>    
                {/* 관심사 */}
                <View>
                    <Text style={styles.intro_Title}>관심사</Text>
                    <Pressable
                        style={styles.interest_Input}
                        onPress={() => this.props.navigation.navigate('Interest')}
                    >

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
        )
    }
}


//flexDirect row가 화면 edge 넘어갈 때 new line으로 item 보내기 : https://stackoverflow.com/questions/34689970/flex-react-native-how-to-have-content-break-to-next-line-with-flex-when-conte
//https://medium.com/teaching-tech/react-native-take-images-and-upload-it-to-a-node-js-server-ca2d769cf657