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
import RNFetchBlob from 'rn-fetch-blob'
import firebase from 'react-native-firebase'
import { virgilCrypto } from 'react-native-virgil-crypto';
import AsyncStorage from '@react-native-community/async-storage';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height
import { zip, unzip, unzipAssets, subscribe,zipWithPassword ,unzipWithPassword} from 'react-native-zip-archive'


class OfflineFiles extends Component{
   constructor(props){
     super(props);
     this.state={
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew",
       selectedIndex:0,
       pathpdf:RNFetchBlob.fs.dirs.DownloadDir+'/studapp/pdfs',
       pathvideos:RNFetchBlob.fs.dirs.DownloadDir+'/studapp/videos',
       videos:[],
       pdf:[],
       sig:'',
       key:'',
       check:'',
       show:true
      }
     this.updateIndex = this.updateIndex.bind(this)

   }
   onClickVideos=()=>{
     this.setState({
       show:true
     })
     RNFetchBlob.fs.ls(this.state.pathvideos).then((files) => {
      // console.log(files)
        var abc= files.map(item=>{
         var arr= item.split('.')
           return {
             title:arr[0]
           }
         })
         this.setState({
           videos:abc
         })
          })
   }
   onClickPDF=()=>{
    this.setState({
      show:false
    })
     
RNFetchBlob.fs.ls(this.state.pathpdf).then((files) => {
  // console.log(files)
    var abc= files.map(item=>{
     var arr= item.split('.')
       return {
         title:arr[0]
       }
     })
     this.setState({
       pdf:abc
     })
      })
   }
   updateIndex (selectedIndex) {
    this.setState({
      selectedIndex:selectedIndex
    })
    if(this.state.show===false){

    }
    else{
    
    }
  }
  componentDidMount(){
     
var TRACK_FOLDER = RNFetchBlob.fs.dirs.DownloadDir
console.log(TRACK_FOLDER)
RNFetchBlob.fs.ls(this.state.pathvideos).then((files) => {
  // console.log(files)
    var abc= files.map(item=>{
     var arr= item.split('.')
       return {
         title:arr[0]
       }
     })
     this.setState({
       videos:abc
     })
      })
const base64= RNFetchBlob.base64
      
// const dirs = RNFetchBlob.fs.dirs;
// const fs = RNFetchBlob.fs;

// const NEW_FILE_PATH = dirs.DownloadDir + '/taha.txt';
// RNFetchBlob.fs.unlink(NEW_FILE_PATH)
// .then(() => {console.log('succes')})
// .catch((err) => {console.log('error')})
// const NEW_FILE_PATHH = dirs.DownloadDir + '/StudyAPP/pdfs';

// RNFetchBlob.fs.mkdir(NEW_FILE_PATH)
// .then(() => {console.log('success')})
// .catch((err) => { console.log(err) })
// RNFetchBlob.fs.mkdir(NEW_FILE_PATHH)
// .then(() => {console.log('success')})
// .catch((err) => { console.log(err) })
// RNFetchBlob.fs.readFile(NEW_FILE_PATH,'base64')
// .then((data) => {
//   const NEW_FILE_PATHH = dirs.DownloadDir +'/tedae/todiaqa.mp4';
//   fs.createFile(NEW_FILE_PATHH,base64.decode(data), 'base64');
//   fs.stat(NEW_FILE_PATHH).then(state=>{
//     console.log(state)
//   }).catch(()=>{console.log('error')})
//   })
}

loadDat=()=>{
//   var path=RNFetchBlob.fs.dirs.DownloadDir
//   unzipWithPassword(path+'/456.zip',path,'no')
// .then((patha) => {
//    alert(patha)
// })
// .catch((error) => {
//   alert(error)
// })
   this.props.navigation.navigate('Video')
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
        <Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,fontFamily:'Gill Sans',marginLeft:15}}>Offline Lectures</Text>
</View>


    </ImageBackground>
    <View style={{width:wp('100%'),height:hp('85%'),backgroundColor:'white'}}>
  {/* <ButtonGroup
        selectedButtonStyle={{backgroundColor:'#289BFA'}}
      onPress={this.updateIndex}
      selectedIndex={this.state.selectedIndex}
      buttons={buttons}
      containerStyle={{height: 50,marginTop:15,alignSelf:'center'}}
      textStyle={{fontSize:20,fontWeight:'bold'}}
    /> */}
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
     <FlatList 
              
     data={this.state.videos}
 showsVerticalScrollIndicator={false}
 contentContainerStyle={{alignSelf:'center'}}
     renderItem={({item,index})=>(
<View style={{width:wp('95%'),height:hp('12%'),backgroundColor:(index%2===0)?"#548DFF":"#009EFF",borderRadius:12,marginTop:5,flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{textAlignVertical:'center',fontSize:20,color:'white',marginLeft:10}}>{item.title}.mp4</Text>
      <Icon
  name='ios-play'
  type='ionicon'
  color='white'
  size={35}
  containerStyle={{alignSelf:'center',marginRight:20}}
  onPress={()=>this.props.navigation.navigate("Video",{
    file:item.title
  })}
/></View>


     )}
 
   />
    :
    <FlatList 
              
    data={this.state.pdf}
showsVerticalScrollIndicator={false}
contentContainerStyle={{alignSelf:'center'}}
    renderItem={({item,index})=>(
<View style={{width:wp('95%'),height:hp('12%'),backgroundColor:(index%2===0)?"#548DFF":"#009EFF",borderRadius:12,marginTop:5,flexDirection:'row',justifyContent:'space-between'}}>
      <Text style={{textAlignVertical:'center',fontSize:20,color:'white',marginLeft:10}}>{item.title}.pdf</Text>
    <Text style={{marginRight:20,alignSelf:'center',color:'white',fontSize:20,textDecorationLine:'underline'}}   onPress={()=>this.props.navigation.navigate("offlinepdf",{
      file:item.title
    })}
>Open</Text>
 </View>


    )}

  />
    }

    </View>
   
    </View>
      
          );
    }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})
export default OfflineFiles;