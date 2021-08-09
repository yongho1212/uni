import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        alignContent:'center'
    },
    backIcon: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,        
    },
    timeInfoContainer: {
        width:300,
        height:120,   
        marginBottom: 20,
        backgroundColor:'#fff',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:25,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
    
       
    },
    timeInfoText: {
        fontSize: 30,
        fontWeight:'bold',  
        color:"darkgrey"
    },
    timeInfoTextTime:{
        fontSize: 43,
        fontWeight:'bold',
        color:'#000'
    },
    setBtn:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:40,
        height:45,
        width: Dimensions.get('window').width * 0.7,
        marginHorizontal:Dimensions.get('window').width * 0.15,
        backgroundColor:'#fb009e',
        borderRadius:25,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
    }
});

export default styles;