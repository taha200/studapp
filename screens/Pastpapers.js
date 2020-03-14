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


class PastPapers extends Component{
   constructor(props){
     super(props);
     this.state={
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew",
       selectedIndex:0,
       data:[],
       noFiles:true,
       pastPaper:''
      }
     this.updateIndex = this.updateIndex.bind(this)

   }
   fetchImage=()=>{
    fetch(`${BaseUrl}/api/getCovers`,{
      method:"GET"
    }).then(res=>res.json()).then(data=>{
      var abc=JSON.stringify(data)
      this.setState({
        pastPaper:data.doc[0].pastPaper
      })
    }).catch(err=>console.log(err))
   }
   componentDidMount(){
     this.fetchImage();
    fetch(`${URL}/api/getPastPapers${this.state.selectedIndex}`,{
      method:"GET",
      headers:{
    'Content-Type':'application/json'
      }    
    }).then(res => res.json()).then((data)=>{
     this.setState({
       data:data.doc,
       noFiles:false
     })
    }).catch((error)=>{
       console.log(error)
    })
   }
   onDownload=(tit,file)=>{
    var path=RNfetchBlob.fs.dirs.DownloadDir
    RNDM.download({
      url:`${URL}/api/getPdfFile${file}`,
      savePath:path+`/${tit}.pdf`,

    }).then(
      ret => alert('Success')
    ).catch (
      err => alert('Something wrong')
    )
   }
   updateIndex (selectedIndex) {
    fetch(`${URL}/api/getPastPapers${selectedIndex}`,{
      method:"GET",
      headers:{
    'Content-Type':'application/json'
      }    
    }).then(res => res.json()).then((data)=>{
     this.setState({
       data:data.doc,
       noFiles:(data.doc.length===0)?true:false
     })
    }).catch((error)=>{
       console.log(error)
    })
    this.setState({
      selectedIndex:selectedIndex
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
      var buttons=['FCPS', 'MD/MS','Notices']

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
<Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,marginLeft:15,fontFamily:'Gill Sans'}}>Documents</Text>
  

    </ImageBackground>
    <Image style={{width:wp('100%'),height:hp('30%'),marginTop:5}} source={{uri:`${BaseUrl}/api/getFeaturedVideo${this.state.pastPaper}`}}></Image>

    <View style={{width:wp('95%'),alignSelf:'center',height:hp('80%'),backgroundColor:'white'}}>
  <ButtonGroup
        selectedButtonStyle={{backgroundColor:'#289BFA'}}
      onPress={this.updateIndex}
      selectedIndex={this.state.selectedIndex}
      buttons={buttons}
      containerStyle={{height: 50,marginTop:5}}
    />{
      (this.state.noFiles)?
      <View style={{justifyContent:'center',alignItems:"center",width:wp('100%'),marginTop:20}}>
      <Icon
        name='folder'
        type='entypo'
        color='black'
        size={50}
        containerStyle={{alignSelf:'center'}}
      />
      <Text style={{fontSize:20,color:'black'}}>No Files Yet</Text>
        </View>
        :
        <FlatList 
              
        data={this.state.data}
showsVerticalScrollIndicator={false}
        renderItem={({item,index})=>(
          <View style={{alignSelf:'center'}}>
              <View style={{width:wp('90%'),backgroundColor:(index%2===0)?"#6D8AFF":"#00A4FF",borderRadius:12,marginTop:5,padding:10,flexDirection:'row',justifyContent:'space-between'}}>
              <Text style={{textAlignVertical:'center',fontSize:20,color:'white',marginLeft:10}}>{item.title}.pdf</Text>
              <Icon
  name='download'
  type='antdesign'
  color='white'
  size={35}
  containerStyle={{alignSelf:'center',marginRight:5}}
  onPress={()=>this.onDownload(item.title,item.fileLink)}
/>
       </View>
     
        
 </View>
        )}

      />
    }
     
    </View>
    </View>
          );
    }
};


export default PastPapers;