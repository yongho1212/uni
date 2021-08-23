import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
     editContainer:{
          flex:1,
          backgroundColor:'#fff',
          
    },
    imageContainer:{
     
     marginTop:25
    },
    mainImageContainer:{
     alignItems:'center',
    },
    subImageContainer:{
     flexDirection:'row',
     marginTop:15,
     justifyContent:'space-around',
     borderBottomColor:'#49ffbd',
     borderBottomWidth:1,
     paddingBottom:15
    },
    mainImage:{
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },
    },
    subImage:{
         marginBottom:20,
         shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },
         
    },
    boxContainer:{
          marginTop:30,
          flexDirection:'row',
          flexWrap: 'wrap', 
          marginHorizontal: Dimensions.get('window').width * 0.05,
          borderBottomColor:'#49ffbd',
     borderBottomWidth:1,
     paddingBottom:15
    },
    selectBox: {
     height: 50,
     backgroundColor:'#fff',  
     marginRight: 20, 
     marginVertical: 6,
     borderRadius: 20,
     justifyContent:'center',
     alignItems:'center',
     paddingHorizontal:15,
     shadowOpacity: 0.3,
     shadowRadius: 5,
     shadowColor: 'grey',
     shadowOffset: { height: 3, width: 3 },
   },
   aboutContainer:{
      marginTop:30,
      },
   aboutmeInput:{
            marginHorizontal: Dimensions.get('window').width * 0.05,
            width:Dimensions.get('window').width * 0.9,
            height:Dimensions.get('window').width * 0.2,
         backgroundColor:'#EBEAE9',
         borderRadius:25,
         paddingHorizontal:15,
         paddingTop:10,
         flexShrink:1
   },
   
})
export default styles;