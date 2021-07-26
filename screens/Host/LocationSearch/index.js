import React, {Component} from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import AntDesign from 'react-native-vector-icons/AntDesign';

import styles from './styles';

export default class LocationSearch extends Component {
    render() {
        return (
            <View style={{width: '100%', height: '100%'}}>
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
                        key: 'AIzaSyBMk4s9KTSOS2IICXgJ8jQQAeITjx8f3fE',
                        components: 'country:kr',
                        language: 'ko',
                        rankby: 'distance',
                    }}
                />
            </View>
        )
    }
}