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
                    <Text style={styles.Txt}>Make</Text>
                </Pressable>

                <Pressable
                    style={styles.Button}
                    onPress={() => this.props.navigate('Chat')}
                >
                    <Text style={styles.Txt}>Chat</Text>
                </Pressable>
                <Pressable
                    style={styles.Button}
                    onPress={() => this.props.navigate('Room')}
                >
                    <Text style={styles.Txt}>Room</Text>
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    btnContainer: {
        width: Dimensions.get('screen').width - 40,
        marginHorizontal: 20,
        justifyContent:'center',
        position:'absolute',
        zIndex:100,
        flexDirection:'row',
        bottom: 30,

        padding:5,
        borderRadius:20,
        backgroundColor:'#fff'
        
        
    },
    Button: {
        width:70,
        height:70,
        backgroundColor:'#ff0081',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:26,

    },
    Txt:{
        fontWeight:'bold',
        color:'white',
        fontSize:17
    }
});