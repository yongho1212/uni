import React from 'react'
import {Text, SafeAreaView, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UserList from '../UserList';
import Roominfo from '../Roominfo'


   const Tab = createMaterialTopTabNavigator();


function Roomctrl (props) {
     const params = props.route.params;
     
     return(
     <Tab.Navigator
          initialRouteName="Roominfo"
          tabBarOptions={{
               
               activeTintColor: '#fff',
               
               labelStyle: { fontSize: 25 , fontFamily:'Jost-Bold'},
               style: { backgroundColor: '#fb009e', height:80, borderRadius:25 },
             }}
             tabBarPosition={'bottom'}
             style={{ marginBottom:-10, backgroundColor:'#fb009e'}}
    >
      <Tab.Screen name="Roominfo" component={Roominfo} initialParams={params}/>
      <Tab.Screen name="UserList" component={UserList} initialParams={params}/>
    </Tab.Navigator>

        
          
     );
};

export default Roomctrl;