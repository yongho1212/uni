import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    headerConatiner: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff',
        height: 50,
        
    },
    renderContainer:{
        backgroundColor:'#fff',
        flex:1
    },
    backIcon: {
        fontSize: 22,
        fontWeight: 'bold',
        marginRight: 10,
    },
    line: {
        justifyContent:'center',
        alignItems:'center',
     
        
    },
    roomCard: {
        width: Dimensions.get('window').width*0.9,
        marginHorizontal: Dimensions.get('window').width*0.05,
        flexDirection: 'row',
        flexWrap: 'wrap', 
        alignItems: 'center',
        padding:15,
        justifyContent: 'space-between',
        marginVertical: 15,
        borderWidth:1,
        borderRadius:25,
        backgroundColor:'#96FFD9',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },

        
    },  
    headerInfoContainer:{
        flexDirection:'row',
        alignItems:'center',
        marginVertical:3,
        justifyContent:'space-between',
    },
    roomInfoContainer:{
        marginVertical:3
    },
    peopleInfoContainer:{
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between',
        marginVertical:3
    },
    titleText:{
        fontSize:19,
        fontWeight:'bold'
    },
    locationText:{
        fontSize:14,
        color:'grey'
    },
    peopleText:{
        fontSize:21
    },
    timeText:{
        fontSize:22
    }

});

export default styles;