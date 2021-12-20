import React, {Component} from 'react';
import {View, Text, Pressable, Dimensions, StyleSheet} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';

export default class MainButton extends Component {   
    render() {
        return (       
            <View style={styles.btnContainer}>
                
 {/*
                <Pressable
                    style={styles.Button}
                    onPress={() => this.props.navigate('Chat')}
                >
                    <Ionicons
                    color="#fff"
                    name='chatbubbles-sharp'
                    size={30}
                    />
                  <Text style={styles.Txt}>Chat</Text>
                </Pressable>*/}
                <Pressable
                    style={styles.HostingButton}
                    onPress={() => this.props.navigate('Hosting')}
                >
                    <Ionicons
                    color="#fff"
                    name='golf'
                    size={30}
                    />
                   {/*<Text style={styles.Txt}>Hosting</Text>*/}
                </Pressable>
                <Pressable
                    style={styles.Button}
                    onPress={() => this.props.navigate('Room')}
                >
                    <Foundation
                    color="#fff"
                    name='results-demographics'
                    size={30}
                    />
                    {/*<Text style={styles.Txt}>Room</Text>*/}
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
        
        
        
    },
    HostingButton:{
        width:65,
        height:65,
        backgroundColor:'#fb009e',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:26,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },
    },
    Button: {
        width:65,
        height:65,
        backgroundColor:'#fb009e',
        borderRadius:25,
        justifyContent:'center',
        alignItems:'center',
        marginHorizontal:26,
        shadowOpacity: 0.5,
        shadowRadius: 5,
        shadowColor: '#000',
        shadowOffset: { height: 3, width: 3 },

    },
    Txt:{
        fontWeight:'900',
        color:'#fff',
        fontSize:15,
        fontFamily:'Jost-medium'
    }
});