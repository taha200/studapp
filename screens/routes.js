import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer , useNavigation} from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import {Icon} from 'react-native-elements'
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';
import Whatsapp from './whatsapp'
import Home from './home'
import Online from './onlineFiles'
import Offline from './offineFiles'
import Video from './video'
import PDF from './pdf'
import StudyForm from './studyForm';
import PastPaper from './Pastpapers'
import Login from './login'
import Sign from './sign'
import Splash from './splash'
import SignUp from './signup';
import News from './news'
import Webview from './webview'
import Content from './contentDrawer'
import OnlineVideo from './OnlineVideos'
import OfflinePdf from './offlinePDF'

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

class HomeStack extends React.Component{
   render(){
  return (
    <Stack.Navigator initialRouteName="Home" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
   
      <Stack.Screen name="Onvideo" component={OnlineVideo} />

      <Stack.Screen name="News" component={News} />
    </Stack.Navigator>
  );
}
}
class SRLS extends React.Component{
  render(){
 return (
   <Stack.Navigator initialRouteName="Splash" headerMode="none">
     <Stack.Screen name="Splash" component={Splash} />
     <Stack.Screen name="Login" component={Login} />
     <Stack.Screen name="SignUp" component={SignUp} />
     <Stack.Screen name="Sign" component={Sign} />


   </Stack.Navigator>
 );
}
}
class Recommendation extends React.Component{
  render(){
 return (
   <Stack.Navigator initialRouteName="Study" headerMode="none" >
     <Stack.Screen name="Study" component={StudyForm} />
     <Stack.Screen name="Onvideo" component={OnlineVideo} />

   </Stack.Navigator>
 );
}
}
class OfflineLecs extends React.Component{
  render(){
 return (
   <Stack.Navigator initialRouteName="Offline" headerMode="none" >
     <Stack.Screen name="Offline" component={Offline} />
     <Stack.Screen name="Video" component={Video} />
     <Stack.Screen name="offlinepdf" component={OfflinePdf} />

    
   </Stack.Navigator>
 );
}
}
class OnlineLecs extends React.Component{
  render(){
 return (
   <Stack.Navigator initialRouteName="Online" headerMode="none" >
     <Stack.Screen name="Online" component={Online} />
     <Stack.Screen name="Onvideo" component={OnlineVideo} />
     <Stack.Screen name="onlinepdf" component={PDF} />

    
   </Stack.Navigator>
 );
}
}
export default class Auth extends React.Component{
 
  // getData = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('uXEr')
  //          var abc=JSON.parse(value)
  //       console.log(abc)
  //   } catch(e) {
  //     // error reading value
  //   }
  // }
  // componentDidMount(){
  //   this.getData();
  // }
  render(){
 return (
  <NavigationContainer>

   <Stack.Navigator  headerMode="none" initialRouteName={(this.props.vala===null)?"Auth":"Tab"} >
    {(this.props.vala===null) ? (
  <>
      <Stack.Screen name="Auth" component={SRLS} />

  
  </>
) : (
  <>
      <Stack.Screen name="Tab" component={App} />

  </>)
  }
   </Stack.Navigator>
   </NavigationContainer>

 );
}
}

 function App() {
  return (
    <Drawer.Navigator initialRouteName="Home"  drawerContent={props => <Content propa={props} />} >
    <Drawer.Screen name="Home" component={HomeStack}   />
    <Drawer.Screen name="WebView" component={Webview}  />
    <Drawer.Screen name="Studyform" component={Recommendation} />
    <Drawer.Screen name="OnlineLecs" component={OnlineLecs} />
     <Drawer.Screen name="OfflineLecs" component={OfflineLecs} />
    <Drawer.Screen name="Past Papers" component={PastPaper}  />
    <Drawer.Screen  name="Whatsapp" component={Whatsapp} />
    <Drawer.Screen name="Auth" component={SRLS} />

    </Drawer.Navigator>
  );
}
