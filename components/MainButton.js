import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native';

export default class MainButton extends Component {   
    render() {
        return (       
            <View style={styles.btnContainer}>
                <Pressable
                    style={styles.Button}
                    onPress={() => this.props.navigate('Hosting')}
                >
                    <Text>Make</Text>
                </Pressable>

                <Pressable
                    style={styles.Button}
                    onPress={() => this.props.navigate('Chat')}
                >
                    <Text>Chat</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        width: Dimensions.get('screen').width - 20,
        marginHorizontal: 10,
        justifyContent:'center',
        alignItems:'center',
        alignContent:'center',
        position:'absolute',
        zIndex:100,
        flexDirection:'row',
        bottom: 40  
    },
    Button: {
        width:70,
        height:70,
        backgroundColor:'#00FF7F',
        borderRadius:25,
        alignContent:'center',
        justifyContent:'center',
        alignItems:'center',
        margin:30,
        fontWeight:'bold',
        borderWidth:2
    }
});