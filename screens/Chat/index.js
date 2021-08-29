import React from 'react'
import {Text, SafeAreaView, View} from 'react-native';

import { CometChatUI } from '../../cometchat-pro-react-native-ui-kit-3';

// import Chatting from '../Chatting';
// import Friends from '../Friends'

   // const Tab = createMaterialTopTabNavigator();
 


   export default function Chat () {
     return(
          
  /*   <Tab.Navigator
          initialRouteName="Chatting"
          tabBarOptions={{
               activeTintColor: '#fff',
               labelStyle: { fontSize: 20 , fontWeight:'bold'},
               style: { backgroundColor: '#fb009e', height:80, borderRadius:30 },
             }}
             tabBarPosition={'bottom'}
    >
      <Tab.Screen name="Chatting" component={Chatting} />
      <Tab.Screen name="Friends" component={Friends} />
          </Tab.Navigator>*/

     <View style={{ flex: 1 }}>
          <CometChatUI/>
     </View>

        
          
     );
};

