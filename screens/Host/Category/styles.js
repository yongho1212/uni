import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    fullConatiner: {
        backgroundColor: 'white',
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
    listContainer: {
        paddingVertical: 15,
        paddingLeft: 10,
        borderBottomWidth: 1,
        borderColor: 'lightgrey',
        backgroundColor: 'white',        
    },
});

export default styles;
