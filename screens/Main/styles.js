import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    roomContainer: {
        width: Dimensions.get('window').width,
    },
    placeContainer: {
        paddingBottom: 15,
    },
    placeText: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight:'bold'
    },
    placeInfo: {    
        paddingLeft:20,    
        height: 50,
        width: Dimensions.get('window').width * 0.9,  
        height:Dimensions.get('window').width * 0.15,      
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
        paddingBottom: 15,
    },
    categoryText: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight:'bold'
    },
    categoryInfo: {   
        paddingLeft:20,   
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').width * 0.15,   
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
        paddingBottom: 15,
    },
    titleText: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight:'bold'
    },
    titleInfo: {      
        paddingLeft:20,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').width * 0.15,   
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
        paddingBottom: 15,
    },
    timeText: {
        fontSize: 20,
        marginBottom: 5,
        fontWeight:'bold'
    },
    timeInfo: {      
        paddingLeft:20,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').width * 0.15,    
        
        borderRadius: 25,
        backgroundColor: '#fff',
        justifyContent: 'center',
        color: '#000',
        fontSize:17,
        borderWidth:3,
        borderColor:"#fb009e",
        marginTop:4
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