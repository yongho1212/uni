// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import { Avatar } from 'react-native-paper';

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    'https://raw.githubusercontent.com/AboutReact/sampleresource/master/';
  const proileImage = 'react_logo.png';

  return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center', marginTop:20}}>
        <View style={{justifyContent: 'center', }}>
          <Text style={{fontWeight:'bold', fontSize:20, marginVertical:5}}>
            Email
          </Text>
          <Text style={{fontWeight:'bold', fontSize:18, marginVertical:5}}>
            Nick Name
          </Text>
        </View>

        {/* image - shoul be connected to - DB */}
        <View style={{marginHorizontal:25}}>
        <Avatar.Image size={85} source={{uri: 'https://lh3.googleusercontent.com/proxy/dkDDg73wan0U0UIbhbwQd9ydmKTOF11LsFZaZ7GfoeqpUXlSfNLgkn0qQHZx-H-X6FH7lm8ZqzQI8x01oILFSkolDgdDGKFlAlhHigLYGvx4OhYfpLeDXQ'}} />
        </View>
      </View>
      <View style={{justifyContent:'center', alignItems:'center', marginTop:20, marginBottom:-10}}>
          <Text style={{color:'grey', fontSize:13, }}>
            Edit Profile
          </Text>
        </View>
      
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL('https://loof.party/')}
        />
        <View style={styles.customItem}>
          <Text
            onPress={() => {
              Linking.openURL('https://loof.party/');
            }}>
            Rate Us
          </Text>
          <Image
            source={{uri: BASE_PATH + 'star_filled.png'}}
            style={styles.iconStyle}
          />
        </View>
      </DrawerContentScrollView>
      <Text
        style={{
          fontSize: 16,
          textAlign: 'center',
          color: 'grey'
        }}>
        loof.party
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: 70,
    height: 70,
    borderRadius: 100 / 2,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default CustomSidebarMenu;