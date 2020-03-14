import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header, ThemeConsumer} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,ProgressBarAndroid,ImageBackground,
  Alert
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {TextField} from 'react-native-material-textfield'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { Dropdown } from 'react-native-material-dropdown';
import firebase from 'react-native-firebase'
import URL from './../appconstant'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class SignUp extends Component{
   state={
    fName:'',
   lName:'',
   yearOfGraduation:'',
   nameOfCollege:'',
    reference:'',
    sex:true,
   age:'',
   email:'',
   pass:'',
   qualification:'',
   prevApp:false,
   timeApp:'',
   firebaseUID:'',
   }
   deletionOnfirebase=()=>{
     const obj={
       firebaseUID:this.state.firebaseUID
     }
   fetch(`${URL}/api/deleteFirebaseUser`,{
     method:"DELETE",
     headers:{
      'Content-Type':'application/json'
        },
     body:JSON.stringify(obj)
   }).then(res => res.json()).then(()=>console.log('delete')).catch(()=>console.log('Not deleted'))
   }
   UserCreation=()=>{
         const obju={
        email:this.state.email,
        fName:this.state.fName,
        lName:this.state.lName,
        firebaseUID:this.state.firebaseUID,
        isLoggedIn:false,
        tokens:[],
        collegeName:this.state.nameOfCollege,
        age:this.state.age,
        gender:this.state.sex,
        yearOfGraduation:this.state.yearOfGraduation,
        appearedInFCPS:this.state.prevApp,
        fcpsExams:this.state.timeApp,
        reference:this.state.reference,
        weakSubjects:[],
        sessionID:"",
        noOfStudyHours:0,
        timeOfStudy:0,
        isVerified:false,
        mobile:this.state.qualification
         }
     if(this.state.fName===""||this.state.lName===""||this.state.yearOfGraduation===""||this.state.nameOfCollege===""||this.state.reference===""||this.state.age==""||this.state.timeApp===""){
       alert('Fill all fields')
       this.deletionOnfirebase();
     }
     else{
      fetch(`${URL}/api/createUser`,{
        method:"POST",
        headers:{
      'Content-Type':'application/json'
        },
        body:JSON.stringify(obju)
      }).then(res => res.json()).then((data)=>{
        if(data.message==="Failed"){
       alert(data.err.message)
       this.deletionOnfirebase();
}
else{
  console.log(data)
  this.props.navigation.navigate("Login")
}
      }).catch((error)=>{
         alert(error)
      })
     }
   }
   firebaseSignUp=()=>{
       firebase.auth().createUserWithEmailAndPassword(this.state.email,this.state.pass).then((data)=>{
         console.log(data)
          this.setState({
            firebaseUID:data.user._user.uid
          })
          this.UserCreation();
       }
       ).catch((err)=>alert(err))
   }
    render(){
      let data = [{
        value: 'Male',
      }, {
        value: 'Female',
      }, ];
      let data1 = [{
        value: 'Yes',
      }, {
        value: 'No',
      }, ];
        return (
   <ImageBackground style={{flex:1}} source={require('./image1.jpg')}>
     <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      scrollEnabled={false}
    >
        <Text style={{fontSize:30,color:'white',textAlign:'center',marginTop:5,fontWeight:'bold'}}>SignUP</Text>
       <View style={{flexDirection:'row',width:wp('100%')}}>
           <View style={{width:wp('50%')}}>
          <TextField
        label='First Name'
        onChangeText={ (value) => this.setState({ fName:value}) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        
      />
      </View>
      <View style={{width:wp('50%')}}>
          <TextField
        label='Last Name'
        onChangeText={ (value) => this.setState({ lName:value }) }
        tintColor="white"
        containerStyle={{marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        
      />
      </View>
      </View>
      <View style={{flexDirection:'row',width:wp('100%'),marginTop:-20}}>
           <View style={{width:wp('50%')}}>
          <TextField
        label='Age'
        onChangeText={ (value) => this.setState({ age:value }) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        keyboardType="number-pad"
        maxLength={2}
      />
      </View>
      <View style={{width:wp('50%')}}>
    <Dropdown
    label="Sex"
    data={data}
    containerStyle={{marginLeft:15,marginRight:15,marginTop:2}}
    baseColor="white"
    onChangeText={(value)=>{
           if(value==="Male"){
             this.setState({
               sex:true
             })
           }
           else{
             this.setState({
               sex:false
             })
           }
    }}
    
    />
      </View>
      </View>
      <TextField
        label='E-mail'
        onChangeText={ (value) => this.setState({ email:value }) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        inputContainerStyle={{marginTop:-20}}
      />
         <TextField
        label='Password'
        onChangeText={ (value) => this.setState({ pass:value }) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        inputContainerStyle={{marginTop:-20}}
        secureTextEntry={true}
      />
  
         <TextField
        label='Name of College'
        onChangeText={ (value) => this.setState({ nameOfCollege:value }) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        inputContainerStyle={{marginTop:-20}}

      />
     
         <TextField
        label='Mobile No.'
        onChangeText={ (value) => this.setState({ qualification:value }) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        inputContainerStyle={{marginTop:-20}}
        maxLength={11}
        keyboardType="number-pad"
      />
     
         <TextField
        label='In Which year You have graduated'
        onChangeText={ (value) => this.setState({ yearOfGraduation:value }) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        inputContainerStyle={{marginTop:-20}}
         maxLength={4}
         keyboardType="number-pad"
      />
      
      <Dropdown
              inputContainerStyle={{marginTop:-20}}

    label="Previously Appeared in FCPS exam"
    data={data1}
    containerStyle={{marginLeft:15,marginRight:15}}
    baseColor="white"
    onChangeText={(value)=>{
           if(value==="Yes"){
             this.setState({
               prevApp:true
             })
           }
           else{
             this.setState({
               prevApp:false
             })
           }
    }}
    
    />
     
         <TextField
        label='How many times you appear'
        onChangeText={ (value) => this.setState({ timeApp:value }) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        inputContainerStyle={{marginTop:-20}}
      keyboardType="number-pad"
      maxLength={2}
      />
         <TextField
        label='how did you come to know us'
        onChangeText={ (value) => this.setState({reference:value}) }
        tintColor="white"
        containerStyle={{marginLeft:15,marginRight:15}}
        style={{color:'white'}}
        textColor="white"
        baseColor="white"
        inputContainerStyle={{marginTop:-20}}

      />
      {/* <Button title="SIGN UP" buttonStyle={{width:wp('50%'),alignSelf:'center',marginTop:3}}></Button> */}

 <TouchableOpacity  style={{width:wp('40%'),height:hp('6%'),backgroundColor:'white',borderRadius:8,justifyContent:'center',alignItems:'center',alignSelf:'center'}} onPress={this.firebaseSignUp} >
     <Text style={{fontSize:20,fontWeight:'bold',color:'#2586EF'}}>SignUP</Text>
 </TouchableOpacity>
 
 </KeyboardAwareScrollView>
    </ImageBackground>
            
          );
    }
};


export default SignUp;