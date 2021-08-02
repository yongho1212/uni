import React, {Component} from 'react';
import {View, Text, SafeAreaView} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AntDesign from 'react-native-vector-icons/AntDesign';

import SuggestionRow from "./SuggestionRow";

import styles from './styles';

export default class LocationSearch extends Component {
    render() {
        return (
            <SafeAreaView style={{width: '100%', height: '100%', backgroundColor:'#fff'}}>
                <View style={styles.headerConatiner}>
                    <AntDesign
                        name={"arrowleft"}
                        style={styles.backIcon}
                        onPress={() => this.props.navigation.push('Hosting', {address: null, Info: 'place'})}
                    />
                    <Text>LocationSearch</Text>
                </View>
                <GooglePlacesAutocomplete
                    placeholder='주소 또는 건물명을 입력하세요'
                    enableHighAccuracyLocation={true}
                    enablePoweredByContainer={false}
                    listViewDisplayed="auto"
                    fetchDetails={true}
                    renderRow={(rowData) => {
                        const main = rowData.structured_formatting.main_text;
                        const second = rowData.structured_formatting.secondary_text;
                        return (
                            <View>
                                <Text>{main}</Text>
                                <Text>{second}</Text>
                            </View>
                        )
                    }}
                    onPress={(data, details = null) => {
                        this.props.navigation.push('Hosting', {address: data.description, lat: details.geometry.location.lat, lng: details.geometry.location.lng, Info: 'place'})
                    }}
                    query={{
                        key: 'AIzaSyCTml8KmT7QuXIgxDNwTkrnJcuAV_35PY8',
                        components: 'country:kr',
                        language: 'ko',
                        rankby: 'distance',
                        
                    }}
                    
                   
                    
                />
            </SafeAreaView>
        )
    }
}