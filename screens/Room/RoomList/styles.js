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
        borderBottomColor: 'black',
        borderBottomWidth: 1,
    },
    roomList: {
        width: Dimensions.get('window').width,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignItems: 'center',
        marginLeft: 5,
        justifyContent: 'space-between',
        marginVertical: 15,
    },  
});

export default styles;