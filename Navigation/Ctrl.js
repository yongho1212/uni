import 'react-native-gesture-handler';

import * as React from 'react';
import {
  Button,
  View,
  Text,
  TouchableOpacity,
  Image,
  Pressable
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from '../screens/Main/index';
import Announce from '../screens/sideDrawer/announce/Announce';
import History from '../screens/sideDrawer/history/History';
import Rank from '../screens/sideDrawer/rank/Rank';
import Cs from '../screens/sideDrawer/cs/Cs';
import Setting from'../screens/sideDrawer/setting/Setting';

import CustomSidebarMenu from './customSidebar';

import Icon from 'react-native-vector-icons/Ionicons';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };
  return (
    <View style={{ zIndex:100, left:10}}>
      <Pressable 
      onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Icon name="ios-menu" color="#e91e63" size={40} /> 
      </Pressable>
    </View>
  );
}


function homeScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="Main"
          component={Main}
          options={{
            title: '', //Set Header Title
            headerLeft: ()=>
              <NavigationDrawerStructure
                navigationProps={navigation}
              />,
              headerShown: true,
              headerTransparent: true,
          }}
        />
      </Stack.Navigator>
  );
}




function DrawerNav({ navigation }) {
  return (
     <Drawer.Navigator
     
     drawerContentOptions={{
       activeTintColor: '#e91e63',
       itemStyle: { marginVertical: 5 },
     }}
     drawerContent={(props) => <CustomSidebarMenu {...props} />}>

     <Drawer.Screen
       name="HomePage"
       options={{ drawerLabel: 'Home' ,
     }}
       component={homeScreenStack} />     
     <Drawer.Screen
       name="FirstPage"
       options={{ drawerLabel: '공지사항' }}
       component={Announce} />
     <Drawer.Screen
       name="SecondPage"
       options={{ drawerLabel: '이용내역' }}
       component={History} />
       <Drawer.Screen
       name="ThirdPage"
       options={{ drawerLabel: '랭크' }}
       component={Rank} />
       <Drawer.Screen
       name="fourthPage"
       options={{ drawerLabel: '고객센터' }}
       component={Cs} />
       <Drawer.Screen
       name="SetPage"
       options={{ 
         drawerLabel: 'Setting',
         headerShown: true,
         headerLeft: () => (
          <Button
            onPress={() => navigation.goBack()}
            title="<"
            color="black"
            />
             
        
          
        ),
        }}
       component={Setting} />
   </Drawer.Navigator>
  );
}






export default DrawerNav;