import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header,Card,ButtonGroup} from 'react-native-elements';
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
import URL from './../appconstant'
import RNDM from 'react-native-easy-downloader';
import RNfetchBlob from 'rn-fetch-blob'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class News extends Component{
   constructor(props){
     super(props);
     this.state={
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew",
       selectedIndex:0,
       data:[]
      }

   }
   getDates=(time)=>{
       var bcd=time.split("T")
       return bcd[0]
   }
   componentDidMount(){
    fetch(`${URL}/api/getNews`,{
      method:"GET",
      headers:{
    'Content-Type':'application/json'
      }    
    }).then(res => res.json()).then((data)=>{
      var abc=data.doc.reverse()
     this.setState({
        data:abc
     })
    }).catch((error)=>{
       console.log(error)
    })
   }
  componentWillUnmount(){
    fetch(`${URL}/api/updateNotificationLength`,{
      method:"PUT",
      headers:{
    'Content-Type':'application/json'
      },
      body:JSON.stringify({
        length:this.props.route.params.see,
        firebaseUID:this.props.route.params.id
      })
        
    }).then(res => res.json()).then((data)=>{
    
    }).catch((error)=>{
    })
  }
  
    render(){
      let data = [{
        value: 'Contact',
      }, {
        value: 'About US',
      }, {
        value: 'SignOut',
      }];
      var buttons=['FCPS', 'FCPS1','FCPS2']

        return (
          <View style={{flex:1,backgroundColor:'white'}}>
 <ImageBackground style={{width:wp('100%'),height:hp('8%'),flexDirection:'row'}} source={require('./image1.jpg')}>
 <Icon
  name='ios-arrow-back'
  type='ionicon'
  color='white'
  size={30}
  containerStyle={{alignSelf:'flex-end',marginLeft:10,marginBottom:10}}
  onPress={()=>this.props.navigation.navigate('Home')}
/>
<Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,marginLeft:15,fontFamily:'Gill Sans'}}>News Updates</Text>
  

    </ImageBackground>
    <View style={{width:wp('95%'),alignSelf:'center',height:hp('85%'),backgroundColor:'white',marginTop:10}}>

      <FlatList 
              
              data={this.state.data}
showsVerticalScrollIndicator={false}
              renderItem={({item,index})=>(
                 
                <View style={{width:wp('95%'),backgroundColor:(index%2===0)?"#6D8AFF":"#00A4FF",borderRadius:12,marginTop:5,padding:10}}>
 <Icon
  name='newsletter'
  type='entypo'
  color='white'
  size={30}
  containerStyle={{alignSelf:'flex-start'}}
/>
              <Text style={{fontSize:20,fontWeight:'bold',marginLeft:10,marginTop:5,color:'white'}}>News: {item.title}</Text>
          <View style={{width:wp('90%')}}>
          <Text style={{fontSize:16,marginLeft:10,marginTop:3,color:'white'}}>News Description : {item.description}
        </Text>
       </View>
              <Text style={{fontSize:18,fontWeight:'bold',marginLeft:10,marginTop:5,color:'white'}}>Dated: {this.getDates(item.createdAt)}</Text>
</View>
              )}

            />
    </View>
    </View>
          );
    }
};


export default News;