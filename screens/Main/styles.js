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
    },
    placeInfo: {    
        paddingLeft:20,    
        height: 50,
        width: Dimensions.get('window').width * 0.9,  
        height:Dimensions.get('window').width * 0.15,      
        borderRadius: 30,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        color: 'black',
    },
    categoryContainer: {
        paddingBottom: 15,
    },
    categoryText: {
        fontSize: 20,
        marginBottom: 5,
    },
    categoryInfo: {   
        paddingLeft:20,   
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').width * 0.15,   
        borderRadius: 25,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        color: 'black',
    },
    titleContainer: {
        paddingBottom: 15,
    },
    titleText: {
        fontSize: 20,
        marginBottom: 5,
    },
    titleInfo: {      
        paddingLeft:20,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').width * 0.15,   
        borderRadius: 25,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        color: 'black',
    },
    timeContainer: {
        paddingBottom: 15,
    },
    timeText: {
        fontSize: 20,
        marginBottom: 5,
    },
    timeInfo: {      
        paddingLeft:20,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').width * 0.15,    
        
        borderRadius: 25,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
        color: 'black',
    },
    joinButton: {
        backgroundColor: '#00FF7F',
        height: 60,
        width: Dimensions.get('window').width * 0.6,
        marginLeft: Dimensions.get('window').width * 0.15,
        borderRadius: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30
    },
    modifyButton: {
        backgroundColor: '#00FF7F',
        height: 60,
        width: Dimensions.get('window').width * 0.6,
        marginLeft: Dimensions.get('window').width * 0.15,
        borderRadius: 30,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30
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
});

export default styles;