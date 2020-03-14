import React, { Component } from 'react';
import { StyleSheet, Text, View,ImageBackground } from 'react-native';
import { WebView } from 'react-native-webview';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {Button,Icon,Overlay,CheckBox,Header,Card,ButtonGroup} from 'react-native-elements';

// ...
export default class MyWebComponent extends Component {
  render() {
    return (
      <View style={{flex:1}}>
     <ImageBackground style={{width:wp('100%'),height:hp('8%'),flexDirection:'row',justifyContent:'space-between'}} source={require('./image1.jpg')}>
       <View style={{flexDirection:'row',marginLeft:2}}><Icon
  name='ios-menu'
  type='ionicon'
  color='white'
  size={30}
  onPress={()=>this.props.navigation.toggleDrawer()}
  containerStyle={{alignSelf:'flex-end',marginLeft:10,marginBottom:10}}
/>
<Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,marginLeft:10,fontFamily:'Gill Sans'}}>Live Web</Text>
  </View>
  <Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,marginRight:5,fontFamily:'Gill Sans'}} onPress={() => { WebViewRef && WebViewRef.reload(); }}>Reload</Text>


    </ImageBackground>
      <WebView source={{ uri:'https://app.fcpsworld.com/login/index.php' }}    ref={WEBVIEW_REF => (WebViewRef = WEBVIEW_REF)}
      userAgent="Chrome/80.0.3987.132"

      />
      </View>
    );
  }
}
//https://stackoverflow.com/questions/49521181/how-can-i-refresh-web-view-in-react-
////https://app.fcpsworld.com/