import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    sectionConatiner: {
        
        height: 40,
        justifyContent:'center',
        
    },
    sectionText:{
        fontSize:18,
        marginLeft:10,
        backgroundColor:"#fff",
        width:125
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
    cardContainer: {
        flexDirection: 'row',
    },
    roomCard: {
        width: Dimensions.get('window').width*0.4,
        marginHorizontal: Dimensions.get('window').width*0.05,
        height: Dimensions.get('window').width*0.4,
        padding:15,
        marginVertical: 15,
        borderRadius:25,
        backgroundColor:'#96FFD9',
        shadowOpacity: 0.3,
        shadowRadius: 5,
        shadowColor: 'grey',
        shadowOffset: { height: 3, width: 3 },
        resizeMode:'contain'

        
    },  

    titleContainer:{
        width:100,
        alignItems:'flex-end'
    },
    titleText:{
        fontSize:20,
        fontWeight:'bold',
        
        
    },
    locationText:{
        fontSize:14,
        color:'grey',
        marginTop:10

    },
  
    timeText:{
        fontSize:15,
        marginTop:10
        
    },
    categoryIcon:{
        justifyContent:'center',
        alignItems:'center',
        position:'absolute',
        marginLeft:-25,
        marginTop:-25,
        backgroundColor:'#fb009e',
        width:45,
        height:45,
        borderRadius:25,
        
    },
    categoryText:{
        fontSize:20,
        color:'#fff',
        marginLeft:-4
    },
    infoContainer:{
        
        alignItems:'flex-end'
    }

});

export default styles;