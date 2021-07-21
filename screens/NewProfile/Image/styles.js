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
    marginTop: 20,
    marginLeft: 10, 
    width: 100,
    height: 150,
    borderWidth: 1,
    borderColor: 'lightgrey',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
 
  //BottomSheet
  pickerButton: {
    width: '100%',
    height: 50,
    marginBottom: 10,
    backgroundColor: '#8bc34a',
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
});

export default styles;