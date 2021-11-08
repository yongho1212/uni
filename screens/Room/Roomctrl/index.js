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
          screenOptions={({ route }) => ({
              tabBarIcon: ({ color }) => {                      
                  if (route.name === 'Roominfo') {
                      return (
                          <AntDesign name="user" size={20} color={color} />
                      );
                  }
                  if (route.name === 'UserList') {
                      return (
                          <AntDesign
                              name="infocirlceo"
                              size={20}
                              color={color}
                          />
                      );
                  }             
              },
          })}          
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