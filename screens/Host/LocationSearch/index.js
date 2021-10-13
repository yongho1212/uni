import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { GOOGLE_PLACE_API_KEY,  } from '@env'

import styles from './styles';

export default class LocationSearch extends Component {
    render() {
        return (
            <SafeAreaView style={{width: '100%', height: '100%', backgroundColor:'#fff'}}>
                <View style={styles.headerConatiner}>
                    <MaterialIcons name={"arrow-back-ios"} 
                        size={35} 
                        color={'balck'}
                        style={{marginLeft:30}}
                        onPress={() => this.props.navigation.push('Hosting', {address: null, Info: 'place'})}
                     />
                    <View style={styles.headerTextContainer }>
                    <Text style={styles.headerText }>검색</Text>
                    </View>
                    
                </View>
                <GooglePlacesAutocomplete
                    placeholder=' 주소 또는 건물명을 입력하세요'
                    enableHighAccuracyLocation={true}
                    enablePoweredByContainer={false}
                    listViewDisplayed="auto"
                    isRowScrollable={true}  
                    fetchDetails={true}
                    renderRow={(rowData) => {
                        const main = rowData.structured_formatting.main_text;
                        const second = rowData.structured_formatting.secondary_text;
                        return (
                            <View style={styles.resultContainer}>
                                <Text style={{fontWeight:'bold', fontSize:16}}>{main}</Text>
                                <Text>{second}</Text>
                            </View>
                        )
                    }}
                    onPress={(data, details = null) => {
                        this.props.navigation.push('Hosting', {address: data.description, lat: details.geometry.location.lat, lng: details.geometry.location.lng, Info: 'place'})
                    }}
                    query={{
                        key: GOOGLE_PLACE_API_KEY,
                        components: 'country:kr',
                        language: 'ko',
                        rankby: 'distance',
                        
                    }}
                    
                   
                    
                />
            </SafeAreaView>
        )
    }
}