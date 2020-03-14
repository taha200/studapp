import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header,Card,ButtonGroup} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,ProgressBarAndroid,ImageBackground,Linking
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


class WhatsappGroup extends Component{
   constructor(props){
     super(props);
     this.state={
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew",
       selectedIndex:0,
       data:[]
      }
     this.updateIndex = this.updateIndex.bind(this)

   }
   componentDidMount(){
    fetch(`${URL}/api/getWhatsapp`,{
      method:"GET",
      headers:{
    'Content-Type':'application/json'
      }    
    }).then(res => res.json()).then((data)=>{
     this.setState({
       data:data.doc
     })
    }).catch((error)=>{
       console.log(error)
    })
   }
   onDownload=(tit,file)=>{
    var path=RNfetchBlob.fs.dirs.DownloadDir
    RNDM.download({
      url:`${URL}/getFile${file}`,
      savePath:path+`/studapp/videos/${tit}.pdf`,

    }).then(
      ret => alert('Success')
    ).catch (
      err => alert('Something wrong')
    )
   }
   updateIndex (selectedIndex) {
    fetch(`${URL}/api/getWhatsappGroup${selectedIndex}`,{
      method:"GET",
      headers:{
    'Content-Type':'application/json'
      }    
    }).then(res => res.json()).then((data)=>{
     this.setState({
       data:data.doc
     })
    }).catch((error)=>{
       console.log(error)
    })
    this.setState({
      selectedIndex:selectedIndex
    })
  }
  opengroup=(url)=>{
   Linking.openURL(url)
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
  name='ios-menu'
  type='ionicon'
  color='white'
  size={30}
  onPress={()=>this.props.navigation.toggleDrawer()}
  containerStyle={{alignSelf:'flex-end',marginLeft:10,marginBottom:10}}
/>
<Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,marginLeft:15,fontFamily:'Gill Sans'}}>WhatsApp Group</Text>
  

    </ImageBackground>
    <View style={{width:wp('95%'),alignSelf:'center',height:hp('80%'),backgroundColor:'white',marginTop:10}}>

      <FlatList 
              numColumns={2}
              data={this.state.data}
showsVerticalScrollIndicator={false}
              renderItem={({item,index})=>(
                 <View style={{width:wp('45%'),height:hp('25%'),backgroundColor:(index%2===0?"#6D8AFF":"#00A4FF"),borderRadius:15,marginLeft:7,marginBottom:5}}>
                  <Icon
name='logo-whatsapp'
type='ionicon'
color='white'
size={30}
containerStyle={{alignSelf:'flex-start',marginLeft:10,marginTop:5}}
/>
              <Text style={{textAlign:'center',color:'white',fontSize:25,marginTop:20,fontWeight:'bold'}}>{item.title}</Text>
              <Text style={{textAlign:'center',color:'white',fontSize:20,marginTop:10,textDecorationLine:"underline",fontWeight:'bold'}} onPress={()=>this.opengroup(item.url)}>JOIN NOW</Text>

                 </View>
             
              )}

            />
    </View>
    </View>
          );
    }
};


export default WhatsappGroup;