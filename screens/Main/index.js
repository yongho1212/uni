import React, {Component} from 'react';
import { View, Text, Alert, Button, Pressable, Dimensions, TextInput, Image } from 'react-native';
import { Platform, PermissionsAndroid } from 'react-native';

import BottomSheet from 'reanimated-bottom-sheet';
import Animated from 'react-native-reanimated';

import MyMapView from '../../components/MyMapView';
import MainButton from '../../components/MainButton';

import Moment from 'moment';
import 'moment/locale/ko';

import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';

import styles from './styles';

export default class Main extends Component {
     constructor(props) {
          super(props);
          this.state = {
               region: {
                    latitude: 37.49783315274643, 
                    longitude: 127.02783092726877,
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,     
               },
               roomInfo: undefined,
               image: [
                    {uri: undefined, width: 100, height: 150, mime: undefined},
                    {uri: undefined, width: 100, height: 150, mime: undefined},
                    {uri: undefined, width: 100, height: 150, mime: undefined},
                    {uri: undefined, width: 100, height: 150, mime: undefined},
                    {uri: undefined, width: 100, height: 150, mime: undefined},
                    {uri: undefined, width: 100, height: 150, mime: undefined},    
                ],
               address: 0,
          }
     }

     componentDidMount = () => {
          if(this.props.route.params === undefined) {
               this.requestPermission().then(result => {
                    if(result === 'granted') {
                         this.getCurrentLocation();
                    }else {
                         Alert.alert('');
                    }
               })
          }else {
               this.hosted();
          }
     }

     //임시
     requestPermission = async() => {
          try {
               if(Platform.OS === 'ios') {
                    return await Geolocation.requestAuthorization('always');
               }
               if(Platform.OS === 'android') {
                    return await PermissionsAndroid.request (
                         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    );
               }
          }catch(e) {
               console.log(e);
          }
     }

     getCurrentLocation = async() => {
          await Geolocation.getCurrentPosition (
               position => {
                    this.setState({
                         region: {
                              latitude: position.coords.latitude,
                              longitude: position.coords.longitude,
                              latitudeDelta: 0.015,
                              longitudeDelta: 0.0121, 
                         },
                    });
                    Geocoder.init('AIzaSyBMk4s9KTSOS2IICXgJ8jQQAeITjx8f3fE', {language: 'ko'});
                    Geocoder.from(position.coords.latitude, position.coords.longitude)
                    .then(json => {
                         var address = json.results[0].formatted_address;
                         this.setState({
                              address: address
                         });
                    })
               },
               error => Alert.alert(error.message),
               {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          )
     }

     onMapRegionChange = async(region) => {
          await this.setState({region});

          await Geocoder.init('AIzaSyBMk4s9KTSOS2IICXgJ8jQQAeITjx8f3fE', {language: 'ko'});
          await Geocoder.from(this.state.region.latitude, this.state.region.longitude)
          .then(json => {
               var address = json.results[0].formatted_address;
               this.setState({
                    address: address,
               });
          })
     }

     hosted = () => {
          this.setState({
               region: {
                    latitude: parseFloat(this.props.route.params.lat),
                    longitude: parseFloat(this.props.route.params.lng),
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
               },
          });
     }

     bs = React.createRef();

     getData = async(data) => {          
          if(data !== undefined) {
               this.setState({roomInfo: data});
               fetch("http://10.0.2.2:3000/firstProfile/?id=" + data.id  + "&time=" + new Date())
               .then(responseData => {
                    if(responseData.headers.get('content-type') !== 'text/html; charset=utf-8') {              
                         this.state.image[0].uri = responseData.url;    
                    }
               })   
               .then(() => this.bs.current.snapTo(0));               
          }else {
               this.bs.current.snapTo(5);
          }
     }

     renderContent = () => (
          <View
             style={{flex: 0, backgroundColor: '#fff', padding: 20, height: 700,}}
          >
               {this.state.roomInfo !== undefined ?
               <View style={styles.roomContainer}>
                    <View style={styles.placeContainer}>   
                         <Image 
                              source={{uri : this.state.image[0].uri}}
                              style={{width: 80, height: 80, borderRadius: 40, overflow: 'hidden', borderWidth: 3,}}
                         />                     
                         <Text style={styles.placeText}>Place</Text>
                         <TextInput
                              style={styles.placeInfo}
                              value={this.state.roomInfo.address}
                              editable={false}
                         />
                    </View>
                    <View style={styles.categoryContainer}>
                         <Text style={styles.categoryText}>Category</Text>
                         <TextInput
                              style={styles.categoryInfo}
                              value={this.state.roomInfo.category}
                              editable={false}
                         />                         
                    </View>
                    <View style={styles.titleContainer}>
                         <Text style={styles.titleText}>Title</Text>
                         <TextInput
                              style={styles.titleInfo}
                              value={this.state.roomInfo.title}
                              editable={false}
                         />
                    </View>
                    <View style={styles.timeContainer}>
                         <Text style={styles.timeText}>Time</Text>
                         <TextInput
                              style={styles.timeInfo}
                              value={this.state.roomInfo.timeInfo}
                              editable={false}
                         />
                    </View>
               </View>
               : null}
          </View>
     )

     navigate = (screen) => {
          if(screen === 'Hosting') {
               this.props.navigation.push('Hosting', {address: this.state.address, lat: this.state.region.latitude, lng: this.state.region.longitude, Info: 'place'})
          }else if(screen === 'Chat') {
               this.props.navigation.navigate('Chat');
          }
     }

     render() {
          return (
               <View style={{width: '100%', height: Dimensions.get('window').height}}> 
                    <MyMapView
                         region={this.state.region}
                         onRegionChange={(reg) => this.onMapRegionChange(reg)}
                         sendData={this.getData}
                    >
                    </MyMapView>  
                    <MainButton
                         navigate={this.navigate}
                    >
                    </MainButton>                
                    <BottomSheet
                         ref={this.bs}
                         renderContent={this.renderContent}
                         snapPoints={[700, 600, 450, 300, 150, 0]}
                         initialSnap={5}
                         borderRadius={10}
                         enabledContentTapInteraction={false}
                    />
               </View>  
          )
     }
}


