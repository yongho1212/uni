import React from 'react'
import {Text, SafeAreaView, View, Button} from 'react-native';

function History ({ navigation }) {
     return(
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button onPress={() => navigation.goBack()} title="Go back home" />
    </View>
     );
};

export default History;