import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, Pressable, ScrollView, Image, Alert,Linking } from 'react-native'
import styles from './styles'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ActionSheet from 'react-native-actionsheet';

import { CometChat } from '@cometchat-pro/react-native-chat';

import { SERVER_URL } from '@env';

import AsyncStorage from '@react-native-async-storage/async-storage';



function Roominfo({ route, navigation }) {
     const [id, setId] = useState('');
     const [reason, setReason] = useState([
        '부적절한 메세지',
        '부적절한 프로필 사진',
        '기타',                    
        '취소',
    ]);
     const { sendd } = route.params;
     

     useEffect(() => {   
          getId();
      }, []);
  
      const getId = async() => {
          var id = await AsyncStorage.getItem('id');
          setId(id);
      }
  
      const deleteGroup = async() => {        
          CometChat.deleteGroup(sendd.GUID).then(
              response => {
                   console.log("Groups deleted successfully:", response);
              },
              error => {
                   console.log("Group delete failed with exception:", error);
              }
          )
  
          fetch(`${SERVER_URL}/deleteGroup`, {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json',
              },
              body: JSON.stringify({
                id: id,
                GUID: sendd.GUID,
            })
          })
          .then(() => navigation.push('DrawerNav'))
      }
  
      const leaveGroup = async() => {
          CometChat.leaveGroup(sendd.GUID).then(
              response => {
                   console.log("Leave group successfully:", response);
              },
              error => {
                   console.log("Leave group failed with exception:", error);
              }
          )        
  
          fetch(`${SERVER_URL}/leaveGroup`, {
              method: 'POST',
              headers: {
                  'Content-Type' : 'application/json',
              },
              body: JSON.stringify({
                  id: id,
                  GUID: sendd.GUID,
              })
          })
          .then(() => navigation.push('DrawerNav'))
      }
  
      const deleteAlert = async() => {
          Alert.alert (
              "방 삭제",
              "방을 삭제하시겠습니까?",
              [
                  {
                      text: "아니요",
                      onPress: () => {
                          return null;
                      },
                  },
                  {
                      text: "네",
                      onPress: () => {
                          deleteGroup();
                      },
                  },
              ],            
          );
      }
  
      const leaveAlert = async() => {
          Alert.alert (
              "방 나가기",
              "방을 나가시겠습니까?",
              [
                  {
                      text: "아니요",
                      onPress: () => {
                          return null;
                      },
                  },
                  {
                      text: "네",
                      onPress: () => {
                          leaveGroup();
                      },
                      
                  },
              ],            
          );
      }

      const bs = React.createRef();  

      const showActionSheet = () => {        
          bs.current.show();
      };
  
      const report = (reason) => {        
          if(reason !== '취소') {            
              var URL = `${SERVER_URL}/reportRoom`;
              fetch(URL, {
                  method: 'POST',
                  headers: {
                      'Content-Type' : 'application/json',
                  },
                  body: JSON.stringify({
                      id: sendd.GUID,
                      reason: reason,
                  })
              })    
          }  
      }
  

     return (
          <View style={{ }}>
               <ImageBackground
                source={require("../../../assets/imgs/2r.png")} resizeMode="cover" 
                style={{width:"100%",height:"100%" }}
                >

               
               <ScrollView>
               <View style={styles.infoContainer}>
                    <View style={styles.l1Container}>
                         <View style={styles.category}>
                              
                              
                              {
                               sendd.category === '축구' ?              
                                  <MaterialCommunityIcons
                                  name={"soccer"}
                                  size={50}
                                  color={'black'}
                                  style={{ zIndex:10,  }}   
                                  />

                                  : sendd.category === '농구' ?
                                  <Image  
                                   style={{ width:50,height:50, zIndex:10,    }}   
                                   source={require('../../../assets/cateicon/basketball.png')}/>
                                   : sendd.category === '농구' ?
                                  <Image  
                                   style={{ width:50,height:50, zIndex:10,    }}   
                                   source={require('../../../assets/cateicon/disco-ball.png')}/>
                             
                                  
                                  : sendd.category === '언어교환' ?
                                   <Image  
                                   style={{ width:50,height:50, zIndex:10,    }}   
                                   source={require('../../../assets/cateicon/languages.png')}/>
                          
                                   : sendd.category === '볼링' ?
                                   <Image  
                                   style={{ width:50,height:50, zIndex:10,  }}   
                                   source={require('../../../assets/cateicon/bowling.png')}/>
                                     
                                   : sendd.category === '등산' ?
                                   <Image  
                                   style={{  width:50,height:50, zIndex:10,}}   
                                   source={require('../../../assets/cateicon/hiking.png')}/>
                                     
                                   : sendd.category === '웨이트' ?
                                   <Image  
                                   style={{  width:50,height:50, zIndex:10, marginBottom:8, borderRadius:19 }}   
                                   source={require('../../../assets/cateicon/weight.png')}/>
                                     
                                   : sendd.category === '런닝' ?
                                   <Image  
                                   style={{  width:50,height:50, zIndex:10, marginBottom:8, borderRadius:19 ,  }}   
                                   source={require('../../../assets/cateicon/run.png')}/>
                                      
                   
                                   : sendd.category === '골프' ?        
                                   <Image  
                                   style={{  width:50,height:50, zIndex:30,  borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../../assets/cateicon/golf-player.png')}/>
                                      
                                   : sendd.category === '탁구' ?
                                   <Image  
                                   style={{ width:50,height:50, zIndex:10,  }}   
                                   source={require('../../../assets/cateicon/table-tennis.png')}/>
                                     
                                   : sendd.category === '보드게임' ?
                                      
                                   <Image  
                                   style={{ backgroundColor:'#fff', width:50,height:50, zIndex:30, borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../../assets/cateicon/board-game.png')}/>
                                      
                                   : sendd.category === '언어교환' ?
                                       
                                   <Image  
                                   style={{ backgroundColor:'#fff', width:50,height:50, zIndex:30, borderRadius:19 , resizeMode:'contain'  }}   
                                   source={require('../../../assets/cateicon/languages.png')}/>
                                    
                                   : sendd.category === '리그오브레전드' ?
                                       
                                   <Image  
                                   style={{  width:45,height:50, zIndex:30, marginBottom:7,    }}   
                                   source={require('../../../assets/cateicon/lol.png')}/>
                                       
                                   : sendd.category === '배틀그라운드' ?    
                                   <Image  
                                   style={{  width:50,height:44, zIndex:30, marginBottom:7, backgroundColor:'#fff', borderRadius:10    }}   
                                   source={require('../../../assets/cateicon/pubg.png')}/>
                                     
                                   : sendd.category === '술 한잔' ?    
                                   <Image  
                                   style={{  width:50,height:50, zIndex:30, marginBottom:7, backgroundColor:'#fff', borderRadius:19   }}   
                                   source={require('../../../assets/cateicon/soju.png')}/>
                                         
                                   
                          : <Text>{sendd.category}</Text>
                         }
                         <Text style={{marginTop:10,fontSize:17, fontFamily:'Jost-Medium'}}>{JSON.stringify(sendd.category).replace(/\"/gi, "")}</Text> 
                         </View>
                         <View style={{flex:2}}>
                         <View style={styles.timedate}>
                              
                              <Text style={styles.dateText}> {JSON.stringify(sendd.timeInfo).replace(/\"/gi, "").slice(0,8)}</Text>
                              <Text style={styles.timeText}>{JSON.stringify(sendd.timeInfo).replace(/\"/gi, "").slice(9)}</Text>
                         </View>
                             
                         </View>
                    </View>
                    {/* 
                    <View style={styles.timeContainer}>
                         <View style={styles.time}>
                              <Text style={styles.sectionName}>
                                   DATE
                              </Text> 
                              <Text style={styles.dateText}>{JSON.stringify(sendd.timeInfo).replace(/\"/gi, "").slice(0,8)}</Text>
                         </View>

                         <View style={styles.time}>
                              <Text style={styles.sectionName}>TIME </Text> 
                                   
                              <Text style={styles.timeText}>{JSON.stringify(sendd.timeInfo).replace(/\"/gi, "").slice(9)}</Text>
                         </View>
                    </View>
                    */}
                    <View style={styles.l2Container}>
                         <View style={styles.title}>
                         <Text style={styles.sectionName}>
                              ROOM NAME
                         </Text>
                              <Text 
                              ellipsizeMode='tail' 
                              numberOfLines={2} 
                               style={styles.titleText}
                               >
                              {JSON.stringify(sendd.title).replace(/\"/gi, "")}
                              </Text>
                              
                         </View>
                         {/*<View style={styles.host}>
                              <Text>Host</Text>
                              <Text>{JSON.stringify(sendd.joinUser).replace(/\"/gi, "")}</Text>
                         </View>*/}
                    </View>
                    <View style={styles.l3Container}>
                         <View style={styles.location}>
                         <Text style={styles.sectionName}>
                              LOCATION
                         </Text>
                              
                              <Text numberOfLines={2} ellipsizeMode='tail' style={styles.locationText}>{JSON.stringify(sendd.address).replace(/\"/gi, "")}</Text>
                         
                         </View>
                    </View>
                    <View style={styles.l2Container}>
                         <View style={styles.title}>
                         <Text style={styles.sectionName}>
                              Chat Link
                         </Text>
                              <Text 
                              ellipsizeMode='tail' 
                              numberOfLines={2} 
                               style={styles.titleText}
                               onPress={() => Linking.openURL(sendd.kakaolink)}
                               >
                              {JSON.stringify(sendd.kakaolink).replace(/\"/gi, "")}
                              </Text>
                              
                         </View>
                         {/*<View style={styles.host}>
                              <Text>Host</Text>
                              <Text>{JSON.stringify(sendd.joinUser).replace(/\"/gi, "")}</Text>
                         </View>*/}
                    </View>
               </View>


               <View style={styles.btnContainer}>
                    {/* 
                    <Pressable 
                                style={styles.chatBtn}
                                onPress={() => navigation.navigate('Chat')}
                            >
                               <Text style={styles.chatBtnText}>
                                    채팅
                                </Text>
                            </Pressable> 
                            */}
                            {id === sendd.id ?
                                <Pressable 
                                    style={styles.delBtn}
                                    onPress={() => deleteAlert()}
                                >
                                <Text style={styles.chatBtnText}>
                                    삭제
                                </Text>
                                </Pressable>
                            :
                            <View>
                                <Pressable 
                                    style={styles.delBtn} 
                                    onPress={() => leaveAlert()}                                   
                                >
                                <Text style={styles.chatBtnText}>
                                    나가기
                                </Text>
                                </Pressable>
                                    
                                    <Pressable 
                                        style={styles.reportBtn} 
                                        onPress={() => showActionSheet()}                                   
                                    >
                                        <Text style={styles.reportBtnText}>
                                            신고하기
                                        </Text>
                                    </Pressable> 
                                
                            </View>  
                            }  
                    </View>
                    <ActionSheet 
                            ref={bs}
                            title={'신고 사유'}
                            options={reason}
                            cancelButtonIndex={3} 
                            onPress={(index) => report(reason[index])}  
                        />
               </ScrollView>
               </ImageBackground>
          </View>
     )
}

export default Roominfo;
