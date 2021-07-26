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
      marginRight: 30,
      marginLeft: 10,
  },
  listContainer: {    
    width: Dimensions.get('window').width,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    padding: 10,
    backgroundColor:'red'
  },
 
  selectBox: {
    
    height: 35,
    borderColor: '#dcdcdc',
    borderWidth: 2,   
    marginRight: 20, 
    marginVertical: 6,
    borderRadius: 15,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    paddingHorizontal:10
  },
  selectedBox: {
    height: 35,
    borderColor: '#fc0fc0',
    backgroundColor:'#E8F550',
    borderWidth: 3,   
    marginRight: 20, 
    marginVertical: 6,
    borderRadius: 15,
    justifyContent:'center',
    alignItems:'center',
    alignSelf:'center',
    fontWeight:'bold',
    paddingHorizontal:10
  },
  vaccum: {
    width: Dimensions.get('window').width,
    height: 10,
  },
  nextBtnContainer:{
    justifyContent:'center',
    alignItems:'center',
    marginTop:40
  }
});

export default styles;