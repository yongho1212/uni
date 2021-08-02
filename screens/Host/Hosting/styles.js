import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    hostingContainer:{
        backgroundColor:'#fff',
        flex:1
    },
    headerConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        
    },
    backIcon: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
    },
    contentContainer: {
        marginTop: 20,
    },
    placeContainer: {
        marginVertical:10
    },
    placeText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    placeInput: {
        paddingLeft: 10,
        height: 50,
        height:Dimensions.get('window').width * 0.15,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        borderRadius: 25,
        paddingLeft:20,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
    },
    categoryContainer: {
        marginVertical:10
    },
    categoryText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    categoryInput: {
        paddingLeft: 10,
        height: 50,
        height:Dimensions.get('window').width * 0.15,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        paddingLeft:20,
        borderRadius: 25,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
    },
    titleConatiner: {
        marginVertical:10
    },
    titleText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    titleInput: {
        height:Dimensions.get('window').width * 0.15,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        backgroundColor: '#EBEBEB',
        borderRadius:25,
        paddingLeft:20,
        
    },
    timeConatiner: {
        marginVertical:10
    },
    timeText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    timeInput: {

        height: 50,
        width: Dimensions.get('window').width * 0.9,
        height:Dimensions.get('window').width * 0.15,
        marginLeft: Dimensions.get('window').width * 0.05,        
        paddingLeft:20,
        borderRadius: 25,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
    },
    timePlaceHolder: {
        justifyContent: 'flex-start',
        marginRight: Dimensions.get('window').width * 0.35,
    },
    timeInfo: {
        flexDirection: 'row',
    },
    hostButton: {
        padding: 10,
        backgroundColor: '#fb009e',
        height: 60,
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 25,
        marginLeft: Dimensions.get('window').width * 0.15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:70
    },
    modifyButton: {
        padding: 10,
        backgroundColor: '#fb009e',
        height: 60,
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 25,
        marginLeft: Dimensions.get('window').width * 0.15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:70
    }
});

export default styles;