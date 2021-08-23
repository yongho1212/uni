import React from 'react'
import { SafeAreaView, Text, View, Pressable, ScrollView } from 'react-native'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

function Roominfo() {
     return (
          <SafeAreaView style={{flex:1, backgroundColor:"#fff"}}>
               <ScrollView>

               
               <View style={styles.infoContainer}>
                    <View style={styles.l1Container}>
                         <View style={styles.category}>
                              <MaterialCommunityIcons
                              name={"soccer"}
                              style={{fontSize:60}}
                         />  
                         </View>
                         <View style={styles.time}>
                              <Text>time</Text>
                         </View>
                    </View>
                    <View style={styles.l2Container}>
                         <View style={styles.title}>
                              <Text>Title</Text>
                         </View>
                         <View style={styles.host}>
                              <Text>Host</Text>
                         </View>
                    </View>
                    <View style={styles.l3Container}>
                         <View style={styles.location}>
                         
                              <Text>Location</Text>
                         
                         </View>
                    </View>
               </View>


               <View style={styles.btnContainer}>
                    <Pressable style={styles.chatBtn}>
                         <Text>
                              Chat
                         </Text>
                    </Pressable>
                    <Pressable style={styles.editBtn}>
                         <Text>
                              Edit
                         </Text>
                    </Pressable>
                    <Pressable style={styles.delBtn}>
                         <Text>
                              Delete
                         </Text>
                    </Pressable>
               </View>
               </ScrollView>
          </SafeAreaView>
     )
}

export default Roominfo;
