import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header,Card,ButtonGroup} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,ProgressBarAndroid,ImageBackground,ActivityIndicator, Alert,TextInput
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {TextField} from 'react-native-material-textfield'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { Dropdown } from 'react-native-material-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import URL from './../appconstant'
import RNfetchBlob from 'rn-fetch-blob';
import RNDM from 'react-native-easy-downloader'
import { zip, unzip, unzipAssets, subscribe,zipWithPassword } from 'react-native-zip-archive'
import Orientation from 'react-native-orientation'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height

// signature is a NodeJS Buffer polyfill

class OnlineFiles extends Component{
   constructor(props){
     super(props);
     this.state={
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew",
       selectedIndex:0,
       sessionID:'',
       data:[],
       loading:true,
       data1:[],
       check:'',
       key:'',
       sig:'',
       keyto:"",
       show:true,
       filtData:[],
       fil:true
      }

   }
  
 
onClickPDF=()=>{
 this.setState({
   show:false
 })
 this.forPDF(this.state.sessionID)
 this.setState({
  loading:true
})
}
onClickVideos=()=>{
  this.setState({
    show:true
  })
  this.forVideos(this.state.sessionID)
  this.setState({
    loading:true
  })
}
  
  getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uXEr')

      if(value!==null){
           var abc=JSON.parse(value)
         
            this.forVideos(abc.sessionID)
            this.setState({
              sessionID:abc.sessionID
            })
      }
    } catch(e) {
      // error reading value
    }
  }
  storeData = async (dat,dta) => {
    try {
      await AsyncStorage.setItem('sign', dat)
      await AsyncStorage.setItem('key',JSON.stringify(dta))
    } catch (e) {
      // saving error
    }
  }
  forPDF=(sess)=>{
    const obju={
      sessionID:sess
     }
    fetch(`${URL}/api/getPDFLectures`,{
      method:"POST",
      headers:{
    'Content-Type':'application/json'
      },
      body:JSON.stringify(obju)
    }).then(res => res.json()).then((data)=>{
      this.setState({
        data1:data.doc,
        loading:false
      })
    }).catch((error)=>{
       console.log(error)
    })
  }
  forVideos=(sess)=>{
    const obju={
     sessionID:sess
    }
    fetch(`${URL}/api/getVidLectures`,{
      method:"POST",
      headers:{
    'Content-Type':'application/json'
      },
      body:JSON.stringify(obju)
    }).then(res => res.json()).then((data)=>{
      console.log(data)
      this.setState({
        data:data.doc,
        loading:false
      })
    }).catch((error)=>{
       console.log(error)
    })
  }
 
  onDownload=(fil,tit)=>{
    var path=RNfetchBlob.fs.dirs.DownloadDir
    // var path1=RNfetchBlob.fs.dirs.PictureDir

    RNDM.download({
      url:`${URL}/api/getPdfFile${fil}`,
      savePath:path+`/studapp/videos/${tit}.mp4`,

    }).then(
      ret => {
        zipWithPassword(path+`/studapp/videos/${tit}.mp4`,path+`/studapp/videos/${tit}.zip`,'H3LL0', 'STANDARD')
        .then((pat) => {
          RNfetchBlob.fs.unlink(path+`/studapp/videos/${tit}.mp4`)
          .then(() => console.log("Oh yeah"))
          .catch((err) => console.log("NoOOOo"))
        })
        .catch((error) => {
          RNfetchBlob.fs.unlink(path+`/studapp/videos/${tit}.mp4`)
          .then(() => console.log("Oh yeah"))
          .catch((err) => console.log("NoOOOo"))
        })
  
      }
    ).catch (
      err => alert(err)
    )
    
  }
  onDownloadPDF=(fil,tit)=>{
    
    var path=RNfetchBlob.fs.dirs.DownloadDir
    // var path1=RNfetchBlob.fs.dirs.PictureDir

    RNDM.download({
      url:`${URL}/api/getPdfFile${fil}`,
      savePath:path+`/studapp/pdfs/${tit}.pdf`,

    }).then(
      ret => {
        zipWithPassword(path+`/studapp/pdfs/${tit}.pdf`,path+`/studapp/pdfs/${tit}.zip`,'H3LL0', 'STANDARD')
        .then((pat) => {
          RNfetchBlob.fs.unlink(path+`/studapp/pdfs/${tit}.pdf`)
          .then(() => alert("Success"))
          .catch((err) => alert(err))
        })
        .catch((error) => {
          RNfetchBlob.fs.unlink(path+`/studapp/pdfs/${tit}.pdf`)
          .then(() => console.log("Oh yeah"))
          .catch((err) => console.log("NoOOOo"))
        })
  
      }
    ).catch (
      err => alert(err)
    )
    
  }
  componentWillUnmount(){
    this._unsubscribe();
  }
  componentDidMount(){
   this.getData();
   this._unsubscribe = this.props.navigation.addListener('focus', () => {
    Orientation.lockToPortrait()
  });

  //  this.getSignData();
  
  }
  getTimeandSeconds=(time)=>{
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time - minutes * 60);
    return minutes+':'+seconds

  }
    render(){
      let data = [{
        value: 'Contact',
      }, {
        value: 'About US',
      }, {
        value: 'SignOut',
      }];
      var buttons=['Videos', 'PDF']

        return (
          <View style={{flex:1,backgroundColor:'white'}}>
 <ImageBackground style={{width:wp('100%'),height:hp('9%'),flexDirection:'row',justifyContent:'space-between'}} source={require('./image1.jpg')} imageStyle={{borderBottomRightRadius:12,borderBottomLeftRadius:12}}>
<View style={{flexDirection:'row'}}>
<Icon
  name='ios-menu'
  type='ionicon'
  color='white'
  size={30}
  onPress={()=>this.props.navigation.toggleDrawer()}
  containerStyle={{alignSelf:'flex-end',marginLeft:10,marginBottom:10}}
/>
        <Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,fontFamily:'Gill Sans',marginLeft:15}}>Online Files</Text>
</View>

    </ImageBackground>
    <View style={{width:wp('100%'),height:hp('77%'),backgroundColor:'white'}}>
      {(this.state.loading)?
      <View style={{width:wp('100%'),height:hp('80%'),alignItems:'center',justifyContent:'center'}}>
        <ActivityIndicator color="blue" size="large"/>
        </View>
        :
        <View>
     <ImageBackground style={{width:wp('90%'),height:hp('11%'),alignSelf:'center',marginTop:5,flexDirection:'row'}} source={require('./image1.jpg')} imageStyle={{borderRadius:12}}>
<TouchableOpacity style={{justifyContent:"center",alignItems:'center'}} onPress={this.onClickVideos}>
<View style={{justifyContent:'center',borderRightWidth:1,borderRightColor:"white",alignItems:"center",width:wp('45%')}}>
<Icon
  name='ios-play'
  type='ionicon'
  color='white'
  size={25}
  containerStyle={{alignSelf:'center'}}
/>
  <Text style={{fontSize:20,color:'white'}}>Videos</Text>
  </View>
  </TouchableOpacity>
  <TouchableOpacity style={{justifyContent:"center",alignItems:'center'}} onPress={this.onClickPDF}>

  <View style={{justifyContent:'center',borderLeftWidth:1,borderLeftColor:"white",alignItems:"center",width:wp('45%')}}>
<Icon
  name='ios-document'
  type='ionicon'
  color='white'
  size={25}
  containerStyle={{alignSelf:'center'}}
/>
<Text style={{fontSize:20,color:'white'}}>PDF</Text>
  </View>
  </TouchableOpacity>

    </ImageBackground>
    {(this.state.show)?
   <TextInput style={{width:wp('80%'),borderColor:'gray',borderWidth:1,backgroundColor:'white',borderRadius:5,height:hp('6%'),fontSize:20,marginTop:5,alignSelf:'center'}} placeholder="Search" onChangeText={(text)=>{
    const newData = this.state.data.filter(item => {      
      const itemData = `${item.title.toUpperCase()}` 
      
       const textData = text.toUpperCase();
        
       return itemData.indexOf(textData) > -1;    
    });
    if(newData.length>0){
      this.setState({ 
        filtData: newData,
        fil:false
      }); 

    }
    else{
      this.setState({ 
        data: this.state.data,
        fil:true
      });
    }
    
  
  }}  />  
  :
  null
  }
   

    {(this.state.show)?
        <FlatList 
        showsVerticalScrollIndicator={false}
        style={{marginTop:5}}
        data={(this.state.fil)?this.state.data:this.state.filtData}
        renderItem={({item,index})=>(
          
          <View style={{marginTop:7}}>
                  <ImageBackground style={{width:wp('97%'),height:hp('28%'),marginLeft:5,alignItems:'center',justifyContent:'center'}} source={{uri:`${BaseUrl}/api/getFeaturedVideo${item.thumbnail}`}}>
                <View style={{alignItems:'center',justifyContent:'center',position:'absolute',bottom:0,right:0,width:wp('10%'),height:hp('3%'),backgroundColor:'#A4A4A4'}}>
        <Text style={{color:'white'}}>{this.getTimeandSeconds(item.videoProps.duration)}</Text>
                </View>
                  <Icon
name='ios-play'
type='ionicon'
color='white'
size={45}
onPress={(()=>this.props.navigation.navigate("Onvideo",{
  link:item.fileServerName,
  seek:3
}))}
/>
                    </ImageBackground>
                <View style={{width:wp('97%'),height:hp('13%'),marginLeft:5,backgroundColor:'#fffafa'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{width:wp('76%'),height:hp('12%'),marginLeft:5}}>
        <Text style={{fontSize:20,fontWeight:'bold',marginTop:5}}>{item.title}</Text>
        <Text>Description : {item.description}</Text>
                   </View>
        <Icon
name='download'
type='antdesign'
color='black'
size={25}
  onPress={()=>this.onDownload(item.fileServerName,item.title)}
containerStyle={{marginRight:10,width:wp('21%'),height:hp('12%'),alignItems:'center',justifyContent:'center'}}
/>

        </View>
                  </View>
                  {(index===(this.state.fil)?this.state.data.length - 1:this.state.filtData.length-1)?
                <View style={{width:wp('100%'),height:hp('8%')}}></View>  :
                null
                }
            </View>
        )}

      />
    :
    <FlatList 
              
    data={this.state.data1}
showsVerticalScrollIndicator={false}
contentContainerStyle={{alignSelf:'center'}}
    renderItem={({item,index})=>(
<View style={{width:wp('95%'),height:hp('12%'),backgroundColor:(index%2===0)?"#548DFF":"#009EFF",borderRadius:12,marginTop:5,flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{textAlignVertical:'center',fontSize:20,color:'white',marginLeft:10}} >{item.title}.pdf</Text>
      <View style={{flexDirection:'row'}}>
        <Text style={{color:'white',textDecorationLine:'underline',fontSize:20,textAlignVertical:'center',marginRight:10}} onPress={()=>this.props.navigation.navigate("onlinepdf",{
          file:item.fileServerName
        })}>Open</Text>
    <Icon
name='download'
type='antdesign'
color='white'
size={35}
containerStyle={{marginRight:5,alignSelf:'center'}}
onPress={()=>this.onDownloadPDF(item.fileServerName,item.title)}
/>
</View>

   
{(index===this.state.data.length - 1)?
                <View style={{width:wp('100%'),height:hp('10%')}}></View>  :
                null
                }
</View>
    )}

  />
    }

        </View>
    }

    </View>
 
    </View>
          );
    }
};


export default OnlineFiles;