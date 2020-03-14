import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,ProgressBarAndroid,ImageBackground,
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {TextField} from 'react-native-material-textfield'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class Splash extends Component{

    render(){
        return (
   <ImageBackground style={{flex:1}} source={require('./image1.jpg')}>
    <View style={{width:wp('100%'),height:hp('50%'),alignItems:'center',justifyContent:'center'}} >
      <Image source={require('./why.png')}  style={{width:250,height:250}}/>
    </View>
    <View style={{width:wp('100%'),height:hp('40%'),alignItems:'center'}}>
      <TouchableOpacity onPress={()=>this.props.navigation.navigate('SignUp')}>
    <View style={{width:wp('40%'),height:hp('6%'),backgroundColor:'white',borderRadius:8,justifyContent:'center',alignItems:'center',alignSelf:'center'}}>
     <Text style={{fontSize:20,fontWeight:'bold',color:'#2586EF'}}>Sign Up</Text>
 </View>
 </TouchableOpacity>
 <TouchableOpacity onPress={()=>this.props.navigation.navigate('Login')}>
 <View style={{width:wp('40%'),height:hp('6%'),backgroundColor:'white',borderRadius:8,justifyContent:'center',alignItems:'center',alignSelf:'center',marginTop:12}}>
     <Text style={{fontSize:20,fontWeight:'bold',color:'#2586EF'}}>Sign In</Text>
 </View>
 </TouchableOpacity>
    </View>
    </ImageBackground>
            
          );
    }
};


export default Splash;