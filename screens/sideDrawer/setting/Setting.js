import React from 'react'
import {Text, SafeAreaView, View, Button, Image, TouchableOpacity} from 'react-native';
import LogoutBtn from '../../../components/logOutBtn';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles';
import DropUser from '../../../components/DropUser';


function Setting ({ navigation }) {
     return(
     <View style={{}}>
      {/*<Button onPress={() => navigation.goBack()} title="Go back home" />*/}
          <View style={{marginTop:30}}>
               <View style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff', }}>
                    <TouchableOpacity style={{justifyContent:'center', alignItems:'center', backgroundColor:'#fff', paddingVertical:10}}>
                    <Image
                    style={{width:80, height:80}}
                    source={require('../../../assets/imgs/invitation.png')}
                    />
                    <Text style={{marginTop:10, fontWeight:'bold', fontSize:18}}>
                         친구 초대하기
                    </Text>
                    </TouchableOpacity>
                    
               </View>
               <View style={{marginTop:20, backgroundColor:'#fff'}}>
                    <Text style={styles.textBtn}>
                         이메일
                    </Text>
                    <Text style={styles.textBtn}>
                         전화번호
                    </Text>
                    <Text style={styles.textBtn}>
                         위치
                    </Text>
                    
               </View>
               <View style={{marginTop:20, backgroundColor:'#fff'}}>
                    <Text style={styles.textBtn}>
                         개인정보 취급방침
                    </Text>
                    <Text style={styles.textBtn}>
                         이용약관
                    </Text>
                    <Text style={styles.textBtn}>
                         라이선스
                    </Text>
                    <Text style={styles.textBtn}>
                         개인정보 설정
                    </Text>
               </View>
               
               <View>
                    
               </View>
               
          </View>
          <View style={{justifyContent:'center', alignItems:'center', marginTop:40}}>
               <LogoutBtn/>
               <DropUser/>
          </View>
               
    </View>
     );
};


export default Setting;