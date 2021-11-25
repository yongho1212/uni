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
  imageBoard: {
    width: Dimensions.get('window').width*0.26,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff',
    borderRadius:25,
    margin:Dimensions.get('window').width*0.02,
    shadowOpacity: 0.5,
    shadowRadius: 5,
    shadowColor: 'grey',
    shadowOffset: { height: 3, width: 3 },
  },
 
  //BottomSheet
  pickerButton: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    backgroundColor:'blue',
    flexDirection: 'row',
    
  },

  intro_Title: {
    paddingLeft: 10,
    marginTop: 15,
  },

  intro_Input: {
    width: Dimensions.get('window').width,
    height: 50,
    backgroundColor: "#fff",
    //backgroundColor: "#dcdcdc",
  },

  interest_Input: {
    width: Dimensions.get('window').width,
    height: 40,
    backgroundColor: "#fff",
    justifyContent: 'center',
  },
  btnFonts:{
    fontSize:20,
        
  },
  announceContainer:{
    
    height:Dimensions.get('window').height*0.2,
    marginLeft:20,
    justifyContent:'center',
    
    width: Dimensions.get('window').width*0.9,
},
imgPickerContainer:{
  flexDirection:'row', 
  flexWrap: 'wrap',
  height:Dimensions.get('window').height * 0.4, 
  justifyContent:'center', 
  width: Dimensions.get('window').width*0.9,
   marginHorizontal:Dimensions.get('window').width*0.05,
   
},
nextBtnContainer:{
  height:Dimensions.get('window').height*0.2,
},
announceTitle:{
    fontSize:75,
    color: '#000',
    fontWeight:'bold'
},
announce:{
    fontSize:35,
    color: '#000',
},
announceSpecific:{
    fontSize:18,
    color: 'grey',
    lineHeight:70
},
});

export default styles;