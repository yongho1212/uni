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
  listContainer: {    
    width: Dimensions.get('window').width,
    flexDirection: 'row', 
    flexWrap: 'wrap', 
    padding: 10,
  },
  selectBox: {
    width: 60,
    height: 30,
    borderColor: '#dcdcdc',
    borderWidth: 3,   
    marginRight: 30, 
    marginVertical: 5,
    borderRadius: 20,
  },
  selectedBox: {
    width: 60,
    height: 30,
    borderColor: 'red',
    borderWidth: 3,   
    marginRight: 30, 
    marginVertical: 5,
    borderRadius: 20,
  },
  vaccum: {
    width: Dimensions.get('window').width,
    height: 10,
  }
});

export default styles;