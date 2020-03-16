/**
 * Sample React Native App
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
  PermissionsAndroid
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import RNFetchBlob from 'rn-fetch-blob'
//Import React Native Video to play video
import MediaControls, { PLAYER_STATES } from 'react-native-media-controls';
//Media Controls to control Play/Pause/Seek and full screen
import Download from './screens/routes'
import firebase from 'react-native-firebase'
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation'


 class App extends React.Component{
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
       screenType: 'content',
       file64:'',
        val:''
     };
   }

 
  async componentDidMount(){ 
    try {
      const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        var path = RNFetchBlob.fs.dirs.DownloadDir
        RNFetchBlob.fs.mkdir(path+'/studapp/videos')
        .then(() => {
          RNFetchBlob.fs.mkdir(path+'/studapp/pdfs')
          .then(() => {})
          .catch((err) => {})
        })
        .catch((err) => {})

    
     

      } else {
          alert('Permission denied');
      }
      } catch (err) {
          console.warn(err);
      }
    Orientation.lockToPortrait()
  

    }
    
   render(){
    // const dirs = RNFetchBlob.fs.dirs;
    // const url = dirs.DownloadDir + '/teddya.mp4'
    return (
      // <View style={styles.container}>
      //   <Video
      //     onEnd={this.onEnd}
      //     onLoad={this.onLoad}
      //     onProgress={this.onProgress}
      //     paused={this.state.paused}
      //     onReadyForDisplay={this.onReadyForDis}
      //     ref={videoPlayer => (this.videoPlayer = videoPlayer)}
      //     resizeMode="cover"
      //     source={{uri:'https://vjs.zencdn.net/v/oceans.mp4' }}
      //     style={styles.mediaPlayer}
      //     volume={10.0}
          
      //   />
      //   <MediaControls
      //     duration={this.state.duration}
      //     isLoading={this.state.isLoading}
      //     mainColor="orange"
      //     onFullScreen={this.onFullScreen}
      //     onPaused={this.onPaused}
      //     onReplay={this.onReplay}
      //     onSeek={this.onSeek}
      //     playerState={this.state.playerState}
      //     progress={this.state.currentTime}
      //     toolbar={this.renderToolbar()}
      //   />
      // </View>
      <Download />
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


export default App;
