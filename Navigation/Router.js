import React, { useState, useEffect } from "react";
import {Button} from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

import PhoneAuth from '../components/phoneAuth/PhoneAuth'

import Nickname from '../screens/NewProfile/Nickname';
import Gender from '../screens/NewProfile/Gender';
import Birth from '../screens/NewProfile/Birth';
import Interest from '../screens/NewProfile/Interest';
import NewProfileImg from '../screens/NewProfile/Image';

import Main from '../screens/Main';
import Hosting from '../screens/Host/Hosting';
import LocationSearch from "../screens/Host/LocationSearch";
import Category from '../screens/Host/Category';
import Time from '../screens/Host/Time'
import Chat from '../screens/Chat'
import RoomList from '../screens/Room/RoomList';
import Roomctrl from "../screens/Room/Roomctrl";

import DrawerNav from './Ctrl';
import EditProfile from '../screens/EditProfile';

import LogoutBtn from '../components/logOutBtn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RNBootSplash from "react-native-bootsplash";
import auth from "@react-native-firebase/auth";


const Stack = createStackNavigator();

const Auth = () => {
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
        />
        <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{
            title: "Register", 
            headerStyle: {
                backgroundColor: "#307ecc", 
            },
            headerTintColor: "#fff", 
            headerTitleStyle: {
                fontWeight: "bold", 
            },
            }}
        />
        <Stack.Screen
            name="PhoneAuth"
            component={PhoneAuth}
        />
         
        </Stack.Navigator>
    );
};

const Router = ({navigation}) => {
   


    return (
        <NavigationContainer >
            <Stack.Navigator initialRouteName="SplashScreen">
                <Stack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Auth"
                    component={Auth}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Nickname"
                    component={Nickname}
                    options={{ 
                        headerShown: true,
                        headerStyle:{
                            backgroundColor:"#49ffbd",
                            shadowColor: 'transparent'
                        },
                        title: '',
                        headerTitleStyle:{
                            fontSize:19
                        },
                        headerBackImage: ()=>( 
                        <MaterialIcons name={"arrow-back-ios"} 
                        size={35} 
                        color={'balck'}
                        style={{marginLeft:30}}
                        />),
                        headerBackTitle:' ',
                        headerBackTitleStyle:{
                            fontSize:18,
                            color:'black'
                        }
                     }}
                />
                <Stack.Screen
                    name="Gender"
                    component={Gender}
                    options={{
                        headerShown: true,
                        headerStyle:{
                            backgroundColor:"#49ffbd",
                            shadowColor: 'transparent'
                        },
                        title: '',
                        headerTitleStyle:{
                            fontSize:19
                        },
                        headerBackImage: ()=>( 
                        <MaterialIcons name={"arrow-back-ios"} 
                        size={35} 
                        color={'balck'}
                        style={{marginLeft:30}}
                        />),
                        headerBackTitle:' ',
                        headerBackTitleStyle:{
                            fontSize:18,
                            color:'black'
                        }}}
                />
                <Stack.Screen
                    name="Birth"
                    component={Birth}
                    options={{ 
                        headerShown: true,
                        headerStyle:{
                            backgroundColor:"#49ffbd",
                            shadowColor: 'transparent'
                        },
                        title: '',
                        headerTitleStyle:{
                            fontSize:19
                        },
                        headerBackImage: ()=>( 
                        <MaterialIcons name={"arrow-back-ios"} 
                        size={35} 
                        color={'balck'}
                        style={{marginLeft:30}}
                        />),
                        headerBackTitle:' ',
                        headerBackTitleStyle:{
                            fontSize:18,
                            color:'black'
                        } }}
                />
                <Stack.Screen
                    name="Interest"
                    component={Interest}
                    options={{ 
                        headerShown: true,
                        headerStyle:{
                            backgroundColor:"#49ffbd",
                            shadowColor: 'transparent'
                        },
                        title: '',
                        headerTitleStyle:{
                            fontSize:19
                        },
                        headerBackImage: ()=>( 
                        <MaterialIcons name={"arrow-back-ios"} 
                        size={35} 
                        color={'balck'}
                        style={{marginLeft:30}}
                        />),
                        headerBackTitle:' ',
                        headerBackTitleStyle:{
                            fontSize:18,
                            color:'black'
                        }
                     }}
                />
                <Stack.Screen
                    name="NewProfileImg"
                    component={NewProfileImg}
                    options={{ headerShown: true,
                        headerStyle:{
                            backgroundColor:"#49ffbd",
                            shadowColor: 'transparent'
                        },
                        title: '',
                        headerTitleStyle:{
                            fontSize:19
                        },
                        headerBackImage: ()=>( 
                        <MaterialIcons name={"arrow-back-ios"} 
                        size={35} 
                        color={'balck'}
                        style={{marginLeft:30}}
                        />),
                        headerBackTitle:' ',
                        headerBackTitleStyle:{
                            fontSize:18,
                            color:'black'
                        }}}
                />
                
                <Stack.Screen
                    name={"DrawerNav"}
                    component={DrawerNav}
                    options={{
                        headerShown: false,    
                    }}
                />
                <Stack.Screen
                    name={"Hosting"}
                    component={Hosting}
                    options={{
                        headerShown: false,
                        
                    }}
                />
                <Stack.Screen
                    name={"LocationSearch"}
                    component={LocationSearch}
                    options={{
                        headerShown: false,    
                    }}
                />
                <Stack.Screen
                    name={"Category"}
                    component={Category}
                    options={{
                        headerShown: false,    
                    }}
                />
                <Stack.Screen
                    name={"Time"}
                    component={Time}
                    options={{
                        headerShown: false,    
                    }}
                />
                 <Stack.Screen
                    name={"RoomList"}
                    component={RoomList}
                    options={{
                        headerShown: true,
                        title: '참가 정보',
                        headerTitleStyle:{
                            fontSize:19
                        },
                        headerBackImage: ()=>(<Ionicons name={"ios-chevron-back"} size={30}/>),
                        headerBackTitle:' ',
                        headerBackTitleStyle:{
                            fontSize:18,
                            color:'black'
                        }
                    }}
                />
                <Stack.Screen
                    name={"Roomctrl"}
                    component={Roomctrl}
                    options={{
                        headerShown: true,
                        headerBackImage: ()=>( 
                            <MaterialIcons name={"arrow-back-ios"} 
                            size={35} 
                            color={'balck'}
                            style={{marginLeft:30}}
                            />),
                            headerBackTitle:' ',
                            headerBackTitleStyle:{
                                fontSize:18,
                                color:'black'
                            }
                    }}
                />
                <Stack.Screen
                    name={"Chat"}
                    component={Chat}
                    options={{
                        headerShown: true,
                        headerBackImage: ()=>( 
                            <MaterialIcons name={"arrow-back-ios"} 
                            size={35} 
                            color={'balck'}
                            style={{marginLeft:30}}
                            />),
                            headerBackTitle:' ',
                            headerBackTitleStyle:{
                                fontSize:18,
                                color:'black'
                            }
                    }}
                />
                <Stack.Screen
                    name={"LogoutBtn"}
                    component={LogoutBtn}
                    options={{
                        headerShown: false,    
                    }}
                />
                <Stack.Screen
                    name={"EditProfile"}
                    component={EditProfile}
                    options={{
                        headerShown: true,    
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;

