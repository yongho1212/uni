import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
infoContainer:{
     height: Dimensions.get('window').height*0.7,
     
},
l1Container:{
     flexDirection:'row',
     height:100,
     marginTop:20,
     
},
sectionName:{
     fontFamily:'Jost-Bold',
     fontSize:20,
     fontFamily:'Jost-Medium'
},
category:{
     flex:1,
     backgroundColor:'#fff',
     borderRadius:25,
     padding:10,
     marginLeft:-20,
     justifyContent:'center',
     alignItems:'center',
     shadowOpacity: 0.3,
                        shadowRadius: 5,
                        shadowColor: 'grey',
                        shadowOffset: { height: 3, width: 3 },
},
timedate:{
     flex:1,
     backgroundColor:'#fff',
     borderRadius:25,
     padding:10,
     marginLeft:10,
     marginRight:-20,
     justifyContent:'center',
     alignItems:'flex-start',
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },
},
time:{
     flex:1,
     backgroundColor:'#fff',
     justifyContent:'center',
     alignItems:'center',
     borderRadius:25,
     padding:10,
     margin:10,
     alignItems:'center',
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },
     
     

},
l2Container:{
     marginTop:20
},
timeContainer:{
     flexDirection:'row',
     marginTop:20
},
title:{
     backgroundColor:'#fff',
     borderRadius:25,
     margin:10,
     height:100,
     padding:14,
     justifyContent:'center',
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },
     height: Dimensions.get('window').height*0.15,
     
},
host:{
     backgroundColor:'#fff',
     borderRadius:25,
     padding:10,
     margin:10,
     height:80,
     justifyContent:'center',
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },
},
l3Container:{

},
location:{
     backgroundColor:'#fff',
     borderRadius:25,
     margin:10,
     height:100,
     padding:14,
     justifyContent:'center',
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },
     height: Dimensions.get('window').height*0.15,
},

btnContainer:{
     alignItems:'center',
     
},
  chatBtn:{
     width: Dimensions.get('window').width*0.7,
     height:50,
       backgroundColor:'#FFF',
       justifyContent:'center',
       alignItems:'center',
       marginVertical:15,
       borderRadius:25,
       shadowOpacity: 0.3,
       shadowRadius: 5,
       shadowColor: 'grey',
       shadowOffset: { height: 3, width: 3 },       
       
       
  },
  editBtn:{
     width: Dimensions.get('window').width*0.7,
     height:50,
     backgroundColor:'#dddddd',
     justifyContent:'center',
     alignItems:'center',
     marginVertical:15,
     borderRadius:25,
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },     
  },
  delBtn:{
     width: Dimensions.get('window').width*0.7,
     height:50,
     backgroundColor:'red',
     justifyContent:'center',
     alignItems:'center',
     marginVertical:15,
     borderRadius:25,
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },     
     },
     reportBtn:{
          width: Dimensions.get('window').width * 0.7,
          height: Dimensions.get('screen').height * 0.06,
          backgroundColor: '#fff',
          justifyContent: 'center',
          alignItems: 'center',
          marginVertical: 10,
          borderRadius: 25,
          shadowOpacity: 0.3,
          shadowRadius: 5,
          shadowColor: 'grey',
          shadowOffset: { height: 3, width: 3 }, 
          elevation: 30,    
      },
   chatBtnText:{
     fontSize:25,
     fontWeight:'bold',
     color:'#000',
     fontFamily:'Jost-Bold'
     
     },
     reportBtnText:{
          fontSize:25,
          fontWeight:'bold',
          color:'red',
          fontFamily:'Jost-Bold' 
      },
   dateText:{
     fontSize:28,
     
     fontFamily:'Jost-Medium'
   },
   timeText:{
     fontSize:33,
     
     fontFamily:'Jost-Bold',
     
     
   },
   titleText:{
     fontSize:30,
     marginLeft:5,
     fontFamily:'Jost-Medium'
   },
   locationText:{
     fontSize:23,
     fontFamily:'Jost-Medium'
     
   },

  
});

export default styles;