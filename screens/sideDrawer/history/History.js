import React from 'react'
import {Text, SafeAreaView, View, Button} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import {Config} from "react-native-config";

const geoKey = Config.GEO_KEY;

function History ({ navigation }) {
     return(
          <SafeAreaView style={{backgroundColor:'#fff', flex:1}}>
               <View style={styles.headerContainer}>
               <MaterialIcons name={"arrow-back-ios"} 
                        size={35} 
                        color={'black'}
                        style={{marginLeft:30}}
                        onPress={() => navigation.goBack()}
               />
               <View style={styles.headerTextContainer }>
                <Text style={styles.headerText }>공지사항</Text>
               </View>
                    
                   
                </View>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
      <Button onPress={() => console.log(Config.GOOGLE_MAPS_API_KEY)} title="CSLOG" />
    </SafeAreaView>
     );
};

export default History;