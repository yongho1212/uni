import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from '../screens/Splash';
import LoginScreen from '../screens/Login';
import RegisterScreen from '../screens/Register';

import PhoneAuth from '../components/phoneAuth/PhoneAuth'

import Gender from '../screens/NewProfile/Gender';
import Birth from '../screens/NewProfile/Birth';
import Interest from '../screens/NewProfile/Interest';
import NewProfileImg from '../screens/NewProfile/Image';

import Main from '../screens/Main';
import Hosting from '../screens/Host/Hosting';
import LocationSearch from "../screens/Host/LocationSearch";
import Category from '../screens/Host/Category';
import Time from '../screens/Host/Time'
import Chat from '../screens/Chat';

import Drawer from './Drawer';

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

const Router = () => {
    return (
        <NavigationContainer>
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
                    name="Gender"
                    component={Gender}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Birth"
                    component={Birth}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Interest"
                    component={Interest}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="NewProfileImg"
                    component={NewProfileImg}
                    options={{ headerShown: false }}
                />
                
                <Stack.Screen
                    name={"Main"}
                    component={Main}
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
                    name={"Chat"}
                    component={Chat}
                    options={{
                        headerShown: false,    
                    }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Router;

