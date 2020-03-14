import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header,Card} from 'react-native-elements';
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
import { Dropdown } from 'react-native-material-dropdown';



const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class Recommendation extends Component{
   constructor(props){
     super(props);
     this.state={
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew"
     }
   }
    render(){
      let data = [{
        value: 'Contact',
      }, {
        value: 'About US',
      }, {
        value: 'SignOut',
      }];
        return (
          <View style={{flex:1,backgroundColor:'white'}}>
   <ImageBackground style={{width:wp('100%'),height:hp('10%'),flexDirection:'row',justifyContent:'space-between'}} source={require('./image1.jpg')}>
   <Text style={{marginBottom:10,color:'white',textAlignVertical:'bottom',fontSize:20,marginLeft:15,fontFamily:'Gill Sans'}}>Rexommendations</Text>

<Icon
  name='bell'
  type='octicon'
  color='white'
  size={30}
  containerStyle={{alignSelf:'flex-end',marginRight:10,marginBottom:10}}
/>
    </ImageBackground>
    <View style={{width:wp('95%'),height:hp('85%'),alignSelf:'center',backgroundColor:'white'}}>
  <Image style={{width:wp('95%'),height:hp('30%'),marginTop:5}} source={require('./image2.jpg')}></Image>
  <Text style={{fontSize:20,marginTop:5,marginLeft:5,marginBottom:5}}>Recommendations</Text>
  <FlatList 
              
                    data={['dasd','sadasd','sdsadasds','ggfh']}
   showsVerticalScrollIndicator={false}
                    renderItem={({item})=>(
                    <View>
                       <ImageBackground style={{width:wp('95%'),height:hp('20%'),marginBottom:5}} imageStyle={{borderRadius:12}} source={require('./imageRoc.png')}>
                          <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:8,fontWeight:'bold'}}>Subject Name: Physiology</Text>
                          <Text style={{fontSize:18,color:'white',marginLeft:10,marginTop:8,fontWeight:'bold'}}>Topic Name: Intro to Physiology</Text>
                          <Text style={{fontSize:15,color:'white',marginLeft:10,marginTop:8}}>Required Study Time: 30 Minutes</Text>
               <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:5}}>
                 <View style={{flexDirection:'row'}}>
                   <Text style={{color:'white',textAlignVertical:'center'}}>Tap to play to watch Lec</Text>
                   <Icon
  name='ios-play'
  type='ionicon'
  color='white'
  size={25}
  containerStyle={{marginLeft:5,alignSelf:'center'}}
/>
                 </View>
                 <View style={{flexDirection:'row'}}>
                 <Text style={{color:'white',textAlignVertical:'center'}}>Check When Topic Done</Text>
                 <Icon
  name='ios-checkmark-circle'
  type='ionicon'
  color='white'
  size={25}
  containerStyle={{marginLeft:5,alignSelf:'center'}}
/>
                 </View>
               </View>
                         </ImageBackground>
   </View>
                    )}

                  />
                 
    </View>
    </View>
          );
    }
};


export default Recommendation;
