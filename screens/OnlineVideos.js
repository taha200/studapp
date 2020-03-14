import React from 'react'
import {StyleSheet, View } from 'react-native'
import Videoge from 'react-native-af-video-player'
import URL from './../appconstant'
import { heightPercentageToDP } from 'react-native-responsive-screen'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})



export default class VideoExample extends React.Component {
state={
    url:""
}
componentDidMount(){
    this.setState({
        url:`${URL}/api/getLecVideo${this.props.route.params.link}`
    })
}
  render() {
    return (
      <View style={{flex:1,justifyContent:"center",backgroundColor:'black'}}>
        <Videoge url={this.state.url} 
                    ref={(ref) => { this.video = ref }}
                    onLoad={()=>{
                      setTimeout(()=>{
                        this.video.seekTo(this.props.route.params.seek)
                      },3000)
                    }}
        fullScreenOnly={true}
        rotateToFullScreen={true}
        autoPlay={true}
        
        />
        </View>
    )
  }
}