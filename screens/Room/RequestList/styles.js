import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        borderBottomWidth: 0.5,
    },
    backIcon: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
    },
    line: {



    },
    infoContainer:{
        flexDirection: 'row',
        alignItems: 'center',
        flex: 3,
        
    },
    imgContainer:{
        flex:1
    },
    introContainer:{
        flex:3
    },
    userImg: {
        width: Dimensions.get('window').height*0.09,
         height: Dimensions.get('window').height*0.09,
          borderRadius: 40, overflow: 'hidden', 
          borderWidth: 1,
          borderColor:"gray",
          marginLeft:5
    },
    usersList: {
        width: Dimensions.get('window').width*0.95,
        height: Dimensions.get('window').height*0.1,
        marginHorizontal: Dimensions.get('window').width*0.025,
        flexDirection: 'row',
        alignItems: 'center',        
        marginTop: 10,
        borderRadius: 20,
        backgroundColor: '#fff',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        borderWidth: 3,
        borderColor: '#fb009e'        
    },
    usersNick: {
        marginLeft:20,
        fontSize: 20,
        fontWeight: 'bold'        
    },
    usersAge: {
        marginLeft:20,
        fontSize: 16,
              
    },
    usersGender: {
        marginLeft:10,
        fontSize: 16,
        
    },
    introText: {
        marginLeft: 10,        
    },
    checkList: {
        flexDirection: 'row',
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal: 10,
        flex:1
    },
    allowIcon: {
        fontSize: 30,
        marginRight: 5,
        color:'green',
        fontWeight:'bold'
    },
    refuseIcon: {
        fontSize: 28,
        color:'red',
        marginLeft:5
    }
});

export default styles;