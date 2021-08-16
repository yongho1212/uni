import React from 'react'
import { View, Text, Pressable, Image, ScrollView } from 'react-native'
import styles from './styles';
import { Avatar } from 'react-native-paper';

export default function EditProfile() {
     return (
          <ScrollView style={styles.editContainer}>
               <Text style={{left:10,top:10}}>
                    Image
               </Text>
               <View style={styles.imageContainer}>
                    
                    <View style={styles.mainImageContainer}>
                         
                         <Pressable>
                         <Avatar.Image 
                         style={styles.mainImage}
                         size={200} source={{uri: 'http://image.uc.cn/s/wemedia/s/upload/2020/7dmsUQ1ebgjl5bu/86f8d0fe046c2304481b85575418c5cc.jpg'}} />
                         </Pressable>
                    </View>
                    <View style={styles.subImageContainer}>
                         <Pressable>
                              <Avatar.Image 
                              style={styles.subImage}
                              size={100} source={{uri: 'https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/65781703_314942746052494_3117483165485105152_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=0PvxMe4wmRoAX9zSkNc&tn=zPDLxhLSMNHgm3Xe&_nc_ht=scontent-ssn1-1.xx&oh=19963bdbf03c68e22e508ed3afc32700&oe=613F9927'}} />
                         </Pressable>
                         <Pressable>
                              <Avatar.Image 
                              style={styles.subImage}
                              size={100} source={{uri: 'https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/67295560_324573861756049_6752734289294524416_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=urC0wvWZXr4AX8EJcpj&tn=zPDLxhLSMNHgm3Xe&_nc_ht=scontent-ssn1-1.xx&oh=17fe0a2a8d5b23c4aaeb8132296dbea1&oe=614182E1'}} />
                         </Pressable>
                         <Pressable>
                              <Avatar.Image 
                              style={styles.subImage}
                              size={100} source={{uri: 'https://scontent-ssn1-1.xx.fbcdn.net/v/t1.6435-9/72133855_376680976545337_8393998703647522816_n.jpg?_nc_cat=103&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=cAeuzrVjx38AX-pU76P&_nc_ht=scontent-ssn1-1.xx&oh=f61346d1c4ef8626e27e3c4202f9f987&oe=61400694'}} />
                         </Pressable>
                    </View>
                    <Text style={{ left:10,top:10}}>
                    Interest
                    </Text>
                    <View style={styles.boxContainer}>
                         
                         <View style={styles.selectBox}>
                              <Text>
                                   드라이빙
                              </Text>
                         </View>
                         <View style={styles.selectBox}>
                              <Text>
                                   배드민턴
                              </Text>
                         </View>
                         <View style={styles.selectBox}>
                              <Text>
                                   축구
                              </Text>
                         </View>
                         <View style={styles.selectBox}>
                              <Text>
                                   농구
                              </Text>
                         </View>
                         <View style={styles.selectBox}>
                              <Text>
                                   축구
                              </Text>
                         </View>

                    </View>
               </View>
               
          </ScrollView>
     )
}
