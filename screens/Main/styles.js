import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    roomContainer: {
        width: Dimensions.get('window').width,
    },
    imgContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.07,
        justifyContent:'center',
       
    },
    placeContainer:{
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.13,
        justifyContent:'center',
        
    },
    placeText: {
        fontSize: 20,
        fontWeight:'bold'
    },
    placeInfo: {    
        paddingLeft:20,    
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').height * 0.07,       
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        color: '#000',
        fontSize:17,
        borderWidth:3,
        borderColor:"#fb009e",
        marginTop:4
    },
    categoryContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.13,
        justifyContent:'center',
        
    },
    categoryText: {
        fontSize: 20,
        
        fontWeight:'bold'
    },
    categoryInfo: {   
        paddingLeft:20,   
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').height * 0.07,    
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        color: '#000',
        fontSize:17,
        borderWidth:3,
        borderColor:"#fb009e",
        marginTop:4
    },
    titleContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.13,
        justifyContent:'center',
        
    },
    titleText: {
        fontSize: 20,
        
        fontWeight:'bold'
    },
    titleInfo: {      
        paddingLeft:20,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').height * 0.07,    
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        color: '#000',
        fontSize:17,
        borderWidth:3,
        borderColor:"#fb009e",
        marginTop:4
    },
    timeContainer: {
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.13,
        justifyContent:'center'
    },
    timeText: {
        fontSize: 20,
        
        fontWeight:'bold'
    },
    timeInfo: {      
        paddingLeft:20,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').height * 0.07,    
        
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        color: '#000',
        fontSize:17,
        borderWidth:3,
        borderColor:"#fb009e",
        marginTop:4
    },
    btnContainer:{
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.15,
        justifyContent:'center'
    },
    joinButton: {
        backgroundColor: '#00FF7F',
        height: 50,
        width: Dimensions.get('window').width * 0.6,
        marginLeft: Dimensions.get('window').width * 0.15,
        borderRadius: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:50
    },
    modifyButton: {
        backgroundColor: '#00FF7F',
        height: 50,
        width: Dimensions.get('window').width * 0.6,
        marginLeft: Dimensions.get('window').width * 0.15,
        borderRadius: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:50
    },
    actionButtonIcon: {
        fontSize: 20,
        position:'absolute',
        top:25,
        right:-10
      },
      actionButtonIconClose:{
          fontSize:25,
          color:'#49ffbd',
          
      },
      actionButtonIconOpen:{
          fontSize:25,
          color:'#fff',
          
      },
      locationBtn:{
        position: 'absolute', 
        justifyContent:'center', 
        alignItems:'center', 
        width:40, 
        height:40, 
        backgroundColor:'white', 
        right:25,
        bottom:120, 
        borderRadius:20,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
        zIndex:30
      },
      btnText:{
          
          fontSize:20
      }
});

export default styles;