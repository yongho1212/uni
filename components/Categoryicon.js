import React from 'react'
import { View, Text } from 'react-native'

export default function IconSort() {


     

     return (
          <View>
          {sort === '축구' ?
          <View style={{ justifyContent:'center', alignItems:'center'}}>
              <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
              <MaterialCommunityIcons
                  name={"soccer"}
                  size={37}
                  color={'black'}
                  style={{ zIndex:10, marginBottom:8 }}   
              />
          </View>
          : sort === '농구' ? 
          <View style={{ justifyContent:'center', alignItems:'center'}}>
              <Image style={{resizeMode:'contain', width:50, position:'absolute' }} source={require('../assets/marker/pingk.png')}/>
              <Ionicons
                  name={"basketball"}
                  size={37}   
                  color={'#B96319'}     
                  style={{ zIndex:10, marginBottom:8 }}                                        
              />
          </View>
          : sort === '볼링' ?
          <FontAwesome5 
              name={"bowling-ball"}
              size={20}
              color={'#bc2b62'}
          />
          : null}
          
          </View>
          
     )
}
