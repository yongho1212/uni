import React from 'react'
import { View, Text, Pressable } from 'react-native'




const  Friends = () => {
     return (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#fff' }}>
               <Text>it is friends</Text>
               <Text>add friend</Text>
               <Text>accept friends</Text>
               
               <Pressable>
               <Text>friends list</Text>
               </Pressable>
          </View>
     )
}
 
export default Friends;