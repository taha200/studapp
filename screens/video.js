/**
 * Sample React Native Video
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  PermissionsAndroid,Alert
} from 'react-native';


import RNFetchBlob from 'rn-fetch-blob'
import Video from 'react-native-video'
//Import React Native Video to play video
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full screen
import firebase from 'react-native-firebase'
import Vid from './../video2.mp4'
import MediaMeta from 'react-native-media-meta';
import { zip, unzip, unzipAssets, subscribe,zipWithPassword ,unzipWithPassword} from 'react-native-zip-archive'

 class Videosa extends React.Component{
  videoPlayer;
  
   constructor(props) {
     super(props);
     this.state = {
       currentTime: 0,
       duration: 0,
       isFullScreen: false,
       isLoading: true,
       paused: false,
       playerState: PLAYER_STATES.PLAYING,
       screenType: 'contain',
       file64:'',
       url:''
     };
   }
  //  onSeek = seek => {
  //   //Handler for change in seekbar
  //   var abca=parseInt(seek)
  //  this.setState({
  //    currentTime:abca
  //  })
  // };
  onPaused = playerState => {
    //Handler for Video Pause
    console.log(playerState)
    this.setState({
      paused: !this.state.paused,
      playerState,
    });
  };
 
  onReplay = (data) => {
    
    //Handler for Replay
    this.setState({ playerState: PLAYER_STATES.PLAYING,currentTime:0});

    this.videoPlayer.seek(0);
  };
 
  onProgress = data => {
  
    const { isLoading, playerState } = this.state;
    // Video Player will continue progress even if the video already ended
    if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
      this.setState({ currentTime: data.currentTime });
    }
  };
  
  onLoad = data => {
    this.setState({isLoading: false});
  }
  
  onLoadStart = data => {

    this.setState({ isLoading: true });
  }
  
  onEnd = () =>{ 
    this.setState({ playerState: PLAYER_STATES.ENDED })};
  
  onError = () => alert('Oh! ', error);
  
  exitFullScreen = () => {
    alert('Exit full screen');
  };
  
  enterFullScreen = () => {};
  
  onFullScreen = () => {
    if (this.state.screenType == 'contain')
      this.setState({ screenType: 'cover' });
    else this.setState({ screenType: 'contain' });
  };
  renderToolbar = () => (
    <View>
      <Text style={{color:'white'}}> {this.props.route.params.file} </Text>
    </View>
  );
  onSeeking = currentTime =>{ 
   var abcde=parseInt(currentTime)
    this.setState({
    currentTime:abcde
  });
  this.videoPlayer.seek(abcde,5)
}
 
  componentDidMount(){
  
var path=`${RNFetchBlob.fs.dirs.DownloadDir}/studapp/videos/${this.props.route.params.file}.zip`
var path1=RNFetchBlob.fs.dirs.DownloadDir
unzipWithPassword(path,path1,'H3LL0','STANDARD')
.then((patha) => {
  this.videoData()
})
.catch((error) => {
alert(error)})


  .catch(err => console.error(err));
    // const dirs = RNFetchBlob.fs.dirs;
    // const fs = RNFetchBlob.fs;
    // console.log(dirs.DownloadDir)
    // this.setState({
    //   file64:dirs.DownloadDir + '/teddya.mp4'
    // })
    // var TRACK_FOLDER = RNFetchBlob.fs.dirs.DownloadDir
    // console.log('Files LIST in Download Folder = ', RNFetchBlob.fs.ls(TRACK_FOLDER));

    // setTimeout(()=>{
    //   this.videoPlayer.seek(4)
    // },2000)
    
    // const NEW_FILE_PATH = dirs.DownloadDir + '/vid.txt';
    
    // RNFetchBlob.fs.readFile(NEW_FILE_PATH,'base64')
    // .then((data) => {
    //   const NEW_FILE_PATHH = dirs.DownloadDir + '/teddya.mp4';
    //   fs.createFile(NEW_FILE_PATHH,base64.decode(data), 'base64').then(()=>console.log('success')).catch(()=>console.log('error'))
    //   // this.setState({
    //   //   file64:data
    //   // })
    // })

  }
  componentWillUnmount(){
    var pth=`${RNFetchBlob.fs.dirs.DownloadDir}/${this.props.route.params.file}.mp4`
    RNFetchBlob.fs.unlink(pth)
.then(() => console.log("Oh yeah"))
.catch((err) => console.log("NoOOOo"))
  }
  videoData=()=>{
  
    var pt=`${RNFetchBlob.fs.dirs.DownloadDir}/${this.props.route.params.file}.mp4`
    MediaMeta.get(pt)
  .then(metadata => {
      var abc=metadata.duration/1000
    this.setState({
      duration:abc,
      url:`${RNFetchBlob.fs.dirs.DownloadDir}/${this.props.route.params.file}.mp4`
    })
  })
  }
  saveFile = async () => {
    
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                    );
                    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        console.log("Permission granted");
                        const base64= RNFetchBlob.base64
                        const fs = RNFetchBlob.fs;
                        // const base64 = RNFetchBlob.base64;
    
                        const dirs = RNFetchBlob.fs.dirs;
                        console.log(dirs.DownloadDir);
    
                        const NEW_FILE_PATH = dirs.DownloadDir + '/taha.txt';
                        fs.createFile(NEW_FILE_PATH,base64.encode('foof'), 'base64');
    
                    } else {
                        console.log('Permission denied');
                    }
                    } catch (err) {
                        console.warn(err);
                    }
    
            }
    readFile=()=>{
      const base64= RNFetchBlob.base64
      
      const dirs = RNFetchBlob.fs.dirs;
      const fs = RNFetchBlob.fs;
      
      const NEW_FILE_PATH = dirs.DownloadDir + '/taha.txt';
      
      RNFetchBlob.fs.readFile(NEW_FILE_PATH,'base64')
      .then((data) => {
        const NEW_FILE_PATHH = dirs.DownloadDir + '/tameed.txt';
        fs.createFile(NEW_FILE_PATHH,base64.decode(data), 'utf-8');
        
      })
    }
    
   render(){
    const dirs = RNFetchBlob.fs.dirs;
    const url = dirs.DownloadDir + '/video1.mp4'
    return (
      <View style={styles.container}>

      <Video
      onEnd={this.onEnd}
      onLoad={this.onLoad}
      onLoadStart={this.onLoadStart}
      onProgress={this.onProgress}
      paused={this.state.paused}
      ref={videoPlayer => (this.videoPlayer = videoPlayer)}
      resizeMode={this.state.screenType}
      source={{uri:this.state.url}}
      style={styles.mediaPlayer}
      volume={10.0}
    />
    <MediaControls
      duration={this.state.duration}
      isLoading={this.state.isLoading}
      mainColor="#2586EF"
      onFullScreen={this.onFullScreen}
      onPaused={this.onPaused}
      onReplay={this.onReplay}
      onSeek={this.onSeeking}
      playerState={this.state.playerState}
      progress={this.state.currentTime}
      toolbar={this.renderToolbar()}
    />
  </View>
      );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  toolbar: {
    marginTop: 30,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  mediaPlayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'black',
  },
});


export default Videosa;
