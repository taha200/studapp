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
import RNFetchBlob from 'react-native-fetch-blob'
import firebase from 'react-native-firebase'
import RNFS from 'react-native-fs'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class Download extends Component{
   constructor(props){
     super(props);
     this.state={
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew",
       selectedIndex:0
      }
     this.updateIndex = this.updateIndex.bind(this)

   }
   updateIndex (selectedIndex) {
    this.setState({
      selectedIndex:selectedIndex
    })
  }
  componentDidMount(){
  
RNFetchBlob
  .config({
    // add this option that makes response data to be stored as a file,
    // this is much more performant.
    fileCache : true,
    path:RNFetchBlob.fs.dirs.DownloadDir
  })
  .fetch('GET', 'http://192.168.0.102:5000/video.txt', {
    //some headers ..
  })
  .then((res) => {
    // the temp file path
    console.log('The file saved to ', res.path())
  })
    // var TRACK_FOLDER = RNFetchBlob.fs.dirs.DownloadDir
// console.log(TRACK_FOLDER)
// RNFetchBlob.fs.ls(TRACK_FOLDER).then((files) => {
//   // console.log(files)
//       files.forEach((item)=>{
//           var ab=item.split('.')
//           console.log(ab)
//       })
//       })
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
 <ImageBackground style={{width:wp('100%'),height:hp('8%'),flexDirection:'row',justifyContent:'space-between'}} source={require('./image1.jpg')}>
<View style={{flexDirection:'row'}}>
<Icon
  name='ios-arrow-back'
  type='ionicon'
  color='white'
  size={35}
  containerStyle={{alignSelf:'flex-end',marginLeft:10,marginBottom:10}}
/>
<Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,fontFamily:'Gill Sans',marginLeft:15}}>Offline Lectures</Text>
</View>
<Icon
  name='bell'
  type='octicon'
  color='white'
  size={30}
  containerStyle={{alignSelf:'flex-end',marginRight:10,marginBottom:15}}
/>

    </ImageBackground>
    <View style={{width:wp('100%'),height:hp('85%'),backgroundColor:'white'}}>
  <ButtonGroup
        selectedButtonStyle={{backgroundColor:'#289BFA'}}
      onPress={this.updateIndex}
      selectedIndex={this.state.selectedIndex}
      buttons={buttons}
      containerStyle={{height: 50,marginTop:15,alignSelf:'center'}}
      textStyle={{fontSize:20,fontWeight:'bold'}}
    />
    {(this.state.selectedIndex===0)?
        <FlatList 
        showsVerticalScrollIndicator={false}
        
        data={['dasd','sadasd','sdsadasds','hhjj']}
        renderItem={({item})=>(
          <View style={{marginTop:7}}>
                  <ImageBackground style={{width:wp('97%'),height:hp('28%'),marginLeft:5,alignItems:'center',justifyContent:'center'}} source={require('./image2.jpg')}>
                <View style={{alignItems:'center',justifyContent:'center',position:'absolute',bottom:0,right:0,width:wp('10%'),height:hp('3%'),backgroundColor:'#A4A4A4'}}>
                  <Text style={{color:'white'}}>30:00</Text>
                </View>
                  <Icon
name='ios-play'
type='ionicon'
color='white'
size={45}
/>
                    </ImageBackground>
                <View style={{width:wp('97%'),height:hp('13%'),marginLeft:5,backgroundColor:'#fffafa'}}>
                    <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                    <View style={{width:wp('76%'),height:hp('12%'),marginLeft:5}}>
                    <Text style={{fontSize:20,fontWeight:'bold',marginTop:5}}>Heart Surgery</Text>
                   <Text>Description: tsbdasbdkasbdsbdsabdkasbdbsadbasdbsajdsajdbsajbdjsabdjbasjdsabjdbasjdbsajdbsajddbsadbdsd</Text>
                   </View>
        <Icon
name='download'
type='antdesign'
color='black'
size={25}

containerStyle={{marginRight:10,width:wp('21%'),height:hp('12%'),alignItems:'center',justifyContent:'center'}}
/>

        </View>
                  </View>
            </View>
        )}

      />
    :
    <FlatList 
              
    data={['dasd','sadasd','sdsadasds','ggfh','sadasd','sdsadasds','ggfh']}
showsVerticalScrollIndicator={false}
contentContainerStyle={{alignSelf:'center'}}
    renderItem={({item})=>(
        <View style={{width:wp('90%'),height:hp('10%'),backgroundColor:'#fffafa',marginTop:8,borderRadius:8,borderColor:'lightgray',borderWidth:1}}>
    <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:16}}>
    <Text style={{textAlignVertical:'center',fontSize:20,marginLeft:5}}>Introdu.pdf</Text>
    <View style={{flexDirection:'row'}}>
        <Text style={{color:'blue',textDecorationLine:'underline',fontSize:20,textAlignVertical:'center',marginRight:10}}>Open</Text>
    <Icon
name='download'
type='antdesign'
color='black'
size={35}
containerStyle={{marginRight:5}}

/>
</View>
</View>
</View>

    )}

  />
    }

    </View>
    <View style={{width:wp('6%'),height:hp('3%'),backgroundColor:'red',borderRadius:100,alignItems:'center',justifyContent:'center',position:'absolute',right:0,top:0}}>
    <Text style={{color:'white'}}>1</Text>
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
export default Download;