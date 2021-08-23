import React from 'react'
import {Text, SafeAreaView, View} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import UserList from '../UserList';
import Roominfo from '../Roominfo'


   const Tab = createMaterialTopTabNavigator();


function Roomctrl () {
     return(
          
     <Tab.Navigator
          initialRouteName="Chatting"
          tabBarOptions={{
               activeTintColor: '#fff',
               labelStyle: { fontSize: 20 , fontWeight:'bold'},
               style: { backgroundColor: '#fb009e', height:80, borderRadius:30 },
             }}
             tabBarPosition={'bottom'}
    >
      <Tab.Screen name="Roominfo" component={Roominfo} />
      <Tab.Screen name="UserList" component={UserList} />
    </Tab.Navigator>

        
          
     );
};

export default Roomctrl;