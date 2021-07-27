import React from 'react'
import {Text, SafeAreaView} from 'react-native';
import LogoutBtn from '../../components/logOutBtn';
const Chat = () => {
     return(
          <SafeAreaView>
               <Text>
                    Chatting
               </Text>
               <LogoutBtn/>
          </SafeAreaView>
     );
};

export default Chat;