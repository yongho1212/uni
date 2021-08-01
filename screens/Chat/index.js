import React from 'react'
import {Text, SafeAreaView} from 'react-native';
import LogoutBtn from '../../components/logOutBtn';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Chat = ({navigation}) => {
     return(
          <SafeAreaView>
               <AntDesign
                        name={"arrowleft"}
                        
                        onPress={() => {navigation.navigate('Main');}}
                    />  

               <Text>
                    Chatting
               </Text>
               <LogoutBtn/>
          </SafeAreaView>
     );
};

export default Chat;