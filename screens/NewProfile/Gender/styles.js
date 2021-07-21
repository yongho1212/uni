import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({    
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
    },
    back: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 30,
        marginLeft: 10,
    },
    contentContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
      
    },
    bottomContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height - 50,
    },
    announceContainer: {
        marginTop:20,
        marginLeft:20
    },
    announce:{
        fontSize:18
    }
});

export default styles;