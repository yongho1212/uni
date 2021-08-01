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
    nicknameInput: {
        width: Dimensions.get('window').width * 0.9,        
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: '#EBEBEB',
        justifyContent: 'center',
    }
});

export default styles;