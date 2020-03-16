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
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage';
import URL from './../appconstant'
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class Login extends Component{
   state={
     email:'',
     pass:''
   }
   storeData = async (dat) => {
  try {
    await AsyncStorage.setItem('uXEr', JSON.stringify(dat))
  } catch (e) {
    // saving error
  }
}
getData = async () => {
  try {
    const value = await AsyncStorage.getItem('uXEr')
         var abc=JSON.parse(value)
         console.log(abc)
  } catch(e) {
    // error reading value
  }
}
   UserLogin=(datam)=>{
     const obju={
       firebaseUID:datam
     }
    fetch(`${URL}/api/login`,{
      method:"PUT",
      headers:{
    'Content-Type':'application/json'
      },
      body:JSON.stringify(obju)
    }).then(res => res.json()).then((data)=>{
       this.storeData(data.doc)
       this.getData();
       this.props.navigation.navigate("Tab")
    }).catch((error)=>{
      alert("catch")
       console.log(error)
       firebase.auth().signOut()
    })
   }
   onLogin=()=>{
      firebase.auth().signInWithEmailAndPassword(this.state.email,this.state.pass).then((data)=>{
        this.UserLogin(data.user._user.uid);
      }).catch((err)=>{
      alert(err)
      })
   }
    render(){
        return (
   <ImageBackground style={{flex:1}} source={require('./image1.jpg')}>
    <View style={{width:wp('100%'),height:hp('40%'),alignItems:'center',justifyContent:'center'}} >
      <Image source={require('./why.png')}  style={{width:250,height:250}}/>
    </View>
    <TextField
        label='E-mail'
        onChangeText={ (value) => this.setState({email:value }) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
      />
         <TextField
        label='Password'
        onChangeText={ (value) => this.setState({pass:value}) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
   secureTextEntry={true}
      />
    <View style={{width:wp('100%'),height:hp('30%'),alignItems:'center',justifyContent:'center'}}>
 
 <TouchableOpacity style={{width:wp('40%'),height:hp('6%'),backgroundColor:'white',borderRadius:8,justifyContent:'center',alignItems:'center',alignSelf:'center'}} onPress={this.onLogin}>
     <Text style={{fontSize:20,fontWeight:'bold',color:'#2586EF'}}>Sign In</Text>
 </TouchableOpacity>
    </View>
    </ImageBackground>
            
          );
    }
};


export default Login;