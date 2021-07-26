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

import Main from '../Screens/Main/index';
import Announce from '../screens/sideDrawer/announce'
import History from '../screens/sideDrawer/history'
import Rank from '../screens/sideDrawer/rank'
import Cs from '../screens/sideDrawer/cs'

import CustomSidebarMenu from './customSidebar';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ }}>
      <Pressable 
      
      onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{uri: 'https://img1.daumcdn.net/thumb/R720x0.q80/?scode=mtistory2&fname=http%3A%2F%2Fcfile25.uf.tistory.com%2Fimage%2F140BA24D4F14F8E92E8CF1'}}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5,
            
          }}
        />
      </Pressable>
    </View>
  );
}


{/*function homeScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="HomePage">
        <Stack.Screen
          name="home"
          component={Router}
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
*/}


function Drawer({ navigation }) {
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
       component={Main} />     
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
   </Drawer.Navigator>
  );
}






export default Drawer;