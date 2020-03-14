import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header,Card} from 'react-native-elements';
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
import ModalDropdown from 'react-native-modal-dropdown';
import firebase from 'react-native-firebase';
import BaseUrl from './../appconstant'
import AsyncStorage from '@react-native-community/async-storage';
import Orientation from 'react-native-orientation'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class Home extends Component{
   constructor(props){
     super(props);
     this.state={
       featuredVideos:[],
       NotificationLength:'',
       news:null,
       seen:0,
       fbID:'',
       homeImage:'',
       title:'',
       descrip:'',
       fileName:'',
       Isshow:false
      }
   }
  //  async checkPermission() {
  //   const enabled = await firebase.messaging().hasPermission();
  //   if (enabled) {
  //     this.getToken();
  //   } else {
  //     this.requestPermission();
  //   }
  // }
  // componentWillUnmount() {
  //   this.notificationListener;
  //   this.notificationOpenedListener;
  // }
  // async createNotificationListeners() {
  //   /*
  //    * Triggered when a particular notification has been received in foreground
  //    * */
  //   this.notificationListener = firebase
  //     .notifications()
  //     .onNotification(notification => {
  //       const { title, body } = notification;
  //       console.log("onNotification:");
  //       // Alert.alert(title,body)
  //       // alert('message');

  //       const localNotification = new firebase.notifications.Notification({
  //         sound: "sampleaudio",
  //         show_in_foreground: true
  //       })
  //         .setNotificationId(notification.notificationId)
  //         .setTitle(notification.title)
  //         // .setSubtitle(notification.subtitle)
  //         .setBody(notification.body)
  //         // .setData(notification.data)
  //         .android.setChannelId("fcm_default_channel") // e.g. the id you chose above
  //         .android.setSmallIcon("@drawable/ic_launcher") // create this icon in Android Studio
  //         .android.setColor("#000000") // you can set a color here
  //         .android.setPriority(firebase.notifications.Android.Priority.High)
  //         .notifications()
  //         .displayNotification(localNotification)
  //         .catch(err => console.error(err));
  //     });


  //     const channel = new firebase.notifications.Android.Channel('fcm_default_channel', 'Demo app name', firebase.notifications.Android.Importance.High).setDescription("Demo app description")
  //     .setSound("sampleaudio.mp3");
  //   firebase.notifications().android.createChannel(channel);

  //   /*
  //    * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
  //    * */
  //   this.notificationOpenedListener = firebase
  //     .notifications()
  //     .onNotificationOpened(notificationOpen => {
  //       const { title, body } = notificationOpen.notification;
  //       console.log("onNotificationOpened:");
  //       this.props.navigation.navigate("Conversations");;
  //     });

  //   /*
  //    * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
  //    * */
  //   const notificationOpen = await firebase
  //     .notifications()
  //     .getInitialNotification();
  //   if (notificationOpen) {
  //     const { title, body } = notificationOpen.notification;
  //     this.props.navigation.navigate("Conversations");
  //   }
  //   /*
  //    * Triggered for data only payload in foreground
  //    * */
  //   this.messageListener = firebase.messaging().onMessage(message => {
  //     //process data message
  //     console.log(JSON.stringify(message));
  //   });
  // }

  // //3
  // async generateToken() {
  //   let Token = await firebase.messaging().getToken();
  //   if (Token) {
  //     // user has a device token
  //     console.log(Token);;
  //     let data = {
  //      firebaseUID: this.state.fbI,
  //       token: Token,
  //     };;
  //     fetch(BaseUrl + "/api/addToken", {
  //       method: "PUT",
  //       body: JSON.stringify(data),
  //       headers: { "Content-Type": "application/json" }
  //     })
  //       .then(res => res.json())
  //       .then(response => {
  //         console.log(response);;
  //         AsyncStorage.setItem("fcmToken", Token);
  //       });;
  //   }
  // }
  // async getToken() {
  //   await AsyncStorage.getItem("fcmToken").then(data => {
  //     if  (data === null) {
  //       this.generateToken();;
  //     } else console.log(data);;
  //   });;
  // }

  // //2
  // async requestPermission() {
  //   try {
  //     await firebase.messaging().requestPermission();
  //     // User has authorised
  //     this.getToken();
  //   } catch (error) {
  //     // User has rejected permissions
  //     console.log("permission rejected");
  //   }
  // }
   fetchImage=()=>{
    fetch(`${BaseUrl}/api/getCovers`,{
      method:"GET"
    }).then(res=>res.json()).then(data=>{
      var abc=JSON.stringify(data)
      this.setState({
        homeImage:data.doc[0].home
      })
    }).catch(err=>console.log(err))
   }
   fetchFeaturedVideos=()=>{
     fetch(`${BaseUrl}/api/getAllFeaturedVideos`,{
       method:"GET"
     }).then(res=>res.json()).then(data=>{
       this.setState({
         featuredVideos:data.doc
       })
     }).catch(err=>console.log(err))
   }
  
   getNotificationLength=(id)=>{
    fetch(`${BaseUrl}/api/remainNotifications${id}`,{
      method:"GET"
    }).then(res=>res.json()).then(data=>{
   this.setState({
     news:data.doc.totalNews-data.doc.noOfSeenNotifications,
     seen:data.doc.totalNews,
     fbID:id
   })
    }).catch(err=>alert(err))
   }
   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uXEr')

      if(value!==null){
           var abc=JSON.parse(value)
         this.getNotificationLength(abc.firebaseUID)
      
      }
    } catch(e) {
       alert("error")
    }
  }
  getAdvertise=()=>{
    fetch(`${BaseUrl}/api/getAdvertisement`,{
      method:"GET"
    }).then(res=>res.json()).then(data=>{
       this.setState({
         title:data.doc[0].title,
         descrip:data.doc[0].description,
          fileName:data.doc[0].filename

       })
    }).catch(err=>alert(err))
  }
  componentWillUnmount(){
    this._unsubscribe();
  }
   componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      Orientation.lockToPortrait()
    });
  
    
     this.getData();
    this.fetchFeaturedVideos()
    this.fetchImage()
    this.getAdvertise()
    setTimeout(()=>{
      this.setState({
        Isshow:true
      })
    },5000)
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
        return (
          <View style={{flex:1,backgroundColor:'white'}}>
   <ImageBackground style={{width:wp('100%'),height:hp('8%'),flexDirection:'row',justifyContent:'space-between'}} source={require('./image1.jpg')}>
   <Icon
  name='ios-menu'
  type='ionicon'
  color='white'
  size={30}
  onPress={()=>this.props.navigation.toggleDrawer()}
  containerStyle={{alignSelf:'flex-end',marginLeft:10,marginBottom:10}}
/>
<Icon
  name='bell'
  type='octicon'
  color='white'
  size={30}
  containerStyle={{alignSelf:'flex-end',marginRight:10,marginBottom:10}}
  onPress={()=>this.props.navigation.navigate("News",{
    see:this.state.seen,
    id:this.state.fbID
  })}
/>
    </ImageBackground>
    <Image style={{width:wp('100%'),height:hp('30%'),marginTop:5}} source={{uri:`${BaseUrl}/api/getFeaturedVideo${this.state.homeImage}`}}></Image>
     <View style={{width:wp('95%'),alignSelf:'center',height:hp('50%'),backgroundColor:'white'}}>
  <Text style={{fontSize:20,marginTop:15,marginLeft:5,marginBottom:5,color:'gray',fontWeight:'bold'}}>Featured Videos</Text>
  <FlatList 
                    showsHorizontalScrollIndicator={false}
                    horizontal
                   data={this.state.featuredVideos}

                    renderItem={({item})=>(
                      <TouchableOpacity onPress={(()=>this.props.navigation.navigate("Onvideo",{
                        link:item.fileServerName,
                        seek:3
                      }))}>
                              <ImageBackground style={{width:150,height:100,marginLeft:5,alignItems:'center',justifyContent:'center'}} source={{uri:`${BaseUrl}/api/getFeaturedVideo${item.thumbnail}`}}>
                            <View style={{alignItems:'center',justifyContent:'center',position:'absolute',bottom:0,right:0,width:wp('10%'),height:hp('3%'),backgroundColor:'#A4A4A4'}}>
                    <Text style={{color:'white'}}>{this.getTimeandSeconds(item.duration)}</Text>
                            </View>
                              <Icon
  name='ios-play'
  type='ionicon'
  color='white'
  size={30}
/>
                                </ImageBackground>
                            <View style={{marginLeft:10}}>
                    <Text numberOfLines={1}>{item.title}</Text>
                              </View>
                        </TouchableOpacity>
                    )}

                  />
                  <View style={{width:wp('50%'),height:hp('2%'),alignSelf:'center',borderBottomWidth:1,borderBottomColor:'skyblue',marginBottom:8,borderColor:"skyblue"}}  ></View>
                  <ImageBackground style={{width:wp('95%'),height:hp('22%'),flexDirection:"row"}} source={require('./image1.jpg')} imageStyle={{borderRadius:8}}>
        
                  <View style={{justifyContent:'center',borderRightWidth:1,borderRightColor:"white",alignItems:"center",width:wp('35%')}}>
<View style={{width:wp('25%'),height:hp('14'),borderRadius:100,backgroundColor:'white',justifyContent:'center'}}>
<Icon
  name='price-tag'
  type='entypo'
  color='black'
  size={60}
  containerStyle={{alignSelf:'center'}}
/>
</View>


  </View>
  <View style={{borderLeftWidth:1,borderLeftColor:"white",width:wp('60%'),padding:5,justifyContent:"center",alignItems:"center"}}>
  <Text style={{fontSize:16,marginLeft:5,color:"white"}}>For Admission or details related to preparation classes please contact</Text>
 <View style={{width:wp('50%'),height:hp('5%'),backgroundColor:"white",borderRadius:12,marginTop:3,justifyContent:'center',alignItems:'center'}}>
   <Text style={{fontSize:18}} onPress={()=>Linking.openURL('tel:+923129684650')}>Call: +923129684650</Text>
 </View>
  </View>
 </ImageBackground>   
    </View>
    <View style={{width:wp('6%'),height:hp('3%'),backgroundColor:'red',borderRadius:100,alignItems:'center',justifyContent:'center',position:'absolute',right:3,top:5}}>
                    <Text style={{color:'white'}}>{this.state.news}</Text>
</View>
<Overlay
  isVisible={this.state.Isshow}
  windowBackgroundColor="rgba(255, 255, 255)"
  overlayBackgroundColor="white"
  width={wp('75%')}
  height={hp('50%')}
  overlayStyle={{borderRadius:12}}
>
<Icon
  name='close'
  type='antdesign'
  color='black'
  size={25}
  containerStyle={{alignSelf:'flex-end'}}
  onPress={()=>this.setState({
    Isshow:false
  })}
/>
<Image style={{width:wp('69%'),height:hp('25%'),marginTop:5}} source={{uri:`${BaseUrl}/api/getFeaturedVideo${this.state.fileName}`}}></Image>
                    <Text style={{textAlign:'center',marginTop:5,fontSize:25,fontWeight:'bold'}}>{this.state.descrip}</Text>

<Text style={{textAlign:'center',marginTop:10,fontSize:18}}>
{this.state.descrip}
</Text>
</Overlay>
    </View>
          );
    }
};


export default Home;