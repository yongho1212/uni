import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerContainer: {
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
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,        
    },
    timeInfoContainer: {
        alignItems: 'center',    
        marginBottom: 20,
    },
    timeInfoText: {
        fontSize: 20,
    },
});

export default styles;