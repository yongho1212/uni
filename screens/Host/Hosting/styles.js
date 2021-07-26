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
    contentContainer: {
        marginTop: 10,
    },
    placeContainer: {
        paddingBottom: 15,
    },
    placeText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    placeInput: {
        paddingLeft: 10,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
    },
    categoryContainer: {
        marginTop: 10,
    },
    categoryText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    categoryInput: {
        paddingLeft: 10,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
    },
    titleConatiner: {
        marginTop: 10,
    },
    titleText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    titleInput: {
        paddingLeft: 10,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
    },
    timeConatiner: {
        marginTop: 10,
    },
    timeText: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: Dimensions.get('window').width * 0.05,
    },
    timeInput: {
        paddingLeft: 10,
        height: 50,
        width: Dimensions.get('window').width * 0.9,
        marginLeft: Dimensions.get('window').width * 0.05,        
        borderWidth: 1,
        borderRadius: 30,
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
        backgroundColor: '#00FF7F',
        height: 60,
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 30,
        marginLeft: Dimensions.get('window').width * 0.15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30
    },
    modifyButton: {
        padding: 10,
        backgroundColor: '#00FF7F',
        height: 60,
        width: Dimensions.get('window').width * 0.7,
        borderRadius: 30,
        marginLeft: Dimensions.get('window').width * 0.15,
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop:30
    }
});

export default styles;