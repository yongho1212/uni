import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
infoContainer:{
     height: Dimensions.get('window').height*0.65,
},
l1Container:{
     flexDirection:'row',
     height:100,
     marginTop:20
},
category:{
     flex:1,
     backgroundColor:'red',
     padding:10,
     margin:10,
     justifyContent:'center',
     alignItems:'center'
},
time:{
     flex:2,
     backgroundColor:'blue',
     padding:10,
     margin:10,
     justifyContent:'center',
     alignItems:'center'
},
l2Container:{
     
},
title:{
     backgroundColor:'green',
     padding:10,
     margin:10,
     height:40,
     justifyContent:'center',
},
host:{
     backgroundColor:'green',
     padding:10,
     margin:10,
     height:80,
     justifyContent:'center',
},
l3Container:{

},
location:{
     backgroundColor:'green',
     padding:10,
     margin:10,
     height:80,
     justifyContent:'center',
},

btnContainer:{
     justifyContent:'center',
     alignItems:'center'
},
  chatBtn:{
     width: Dimensions.get('window').width*0.7,
     height:50,
       backgroundColor:'#49ffbd',
       justifyContent:'center',
       alignItems:'center',
       marginVertical:15,
       borderRadius:25,
       
       
  },
  editBtn:{
     width: Dimensions.get('window').width*0.7,
     height:50,
     backgroundColor:'grey',
     justifyContent:'center',
     alignItems:'center',
     marginVertical:15,
     borderRadius:25
  },
  delBtn:{
     width: Dimensions.get('window').width*0.7,
     height:50,
     backgroundColor:'red',
     justifyContent:'center',
     alignItems:'center',
     marginVertical:15,
     borderRadius:25
  }
  
});

export default styles;