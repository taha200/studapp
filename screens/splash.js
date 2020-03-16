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
import AsyncStorage from '@react-native-community/async-storage';


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class Splash extends Component{
  state={
    vala:''
  }
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uXEr')
           var abc=JSON.parse(value)
           
           this.setState({
             val:abc
           })
    } catch(e) {
      // error reading value
    }
  }
componentDidMount(){
  this.getData();
  setTimeout(()=>{
    if(this.state.val===null){
      this.props.navigation.navigate('Auth')

    }
    else{
      this.props.navigation.navigate('Tab')

    }
  },8000)

}
    render(){
        return (
   <ImageBackground style={{flex:1}} source={require('./image1.jpg')}>
    <View style={{width:wp('100%'),height:hp('60%'),alignItems:'center',justifyContent:'center'}} >
      <Image source={require('./why.png')}  style={{width:250,height:250}}/>
    </View>
    <View style={{width:wp('100%'),height:hp('40%'),justifyContent:'flex-end'}}>
    <Image source={require('./heart.png')}  style={{width:350,height:100,marginBottom:50}}/>

    </View>
    </ImageBackground>
            
          );
    }
};


export default Splash;