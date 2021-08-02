import React from 'react'
import {Text, SafeAreaView, View, Button} from 'react-native';
import LogoutBtn from '../../../components/logOutBtn';

function Setting ({ navigation }) {
     return(
     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
          <View>
               <LogoutBtn/>
          </View>
    </View>
     );
};


export default Setting;