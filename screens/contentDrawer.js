import React from 'react'
import {View,Text,TouchableOpacity,ImageBackground,Image,FlatList} from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import URL from './../appconstant'
import AsyncStorage from '@react-native-community/async-storage';
import {Icon} from 'react-native-elements'

export default class Content extends React.Component{
    state={
        examTense:false,
        routes:false,
        data:[]
    }
fetchExam=(id)=>{
   fetch(`${URL}/api/getExam${id}`,{
      method:"GET",
      headers:{
          "Content-Type":"application/json"
      }
   }).then(res=>res.json()).then((data)=>{
    this.setState({
        data:data.doc
    })
   }).catch(err=>alert(err))
}
onSignOut = async ()=>{
  try {
    await AsyncStorage.removeItem('uXEr')
    this.props.propa.navigation.navigate("Auth")
  } catch (e) {
    alert(e)
  }
}
getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uXEr')
           var abc=JSON.parse(value)
           if(abc.sessionID===""){
            this.setState({
                examTense:false,
                routes:false
            })
           }
           else{
             this.fetchExam(abc.sessionID)
             this.setState({
                examTense:true,
                routes:true
            })
           }
    } catch(e) {
      // error reading value
    }
  }
    componentDidMount(){
        this.getData();
        
    }
    remainDays=(date)=>{
       var toarr = date.split("T")
     
       var dates=new Date()
           var bcd=dates.toISOString()
          var fromarr=bcd.split('T')
      var from=fromarr[0]
      var to = toarr[0]
      
          var date1 = new Date(from);
  var date2 = new Date(to);

  // To calculate the time difference of two dates
  var Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  var Difference_In_Days = Difference_In_Time / (1000 * 3600 * 24);
  if(Difference_In_Days>0){
    return Difference_In_Days

  }
  else{
  return "Done"
  }
    }
    render(){
        return(
      <ImageBackground style={{flex:1}} source={require('./image1.jpg')}>
   <Image style={{width:150,height:150,alignSelf:'center'}} source={require('./why.png')}/>
   <View style={{alignItems:'center'}}>
   <FlatList 
              
              data={this.state.data}
showsVerticalScrollIndicator={false}
              renderItem={({item,index})=>(
                 <View>
       <Text style={{marginTop:5,marginBottom:5,marginLeft:10,color:'white',fontSize:18}}>Days Left In {item.name} : {this.remainDays(item.examAt)}</Text>

                 </View>

        
              )}

            />
   </View>
   <TouchableOpacity onPress={()=>this.props.propa.navigation.navigate('Home')}>
     <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
     <Icon
  name='ios-home'
  type='ionicon'
  color='white'
  size={20}
  containerStyle={{alignSelf:'center',marginLeft:5}}
/>
     <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>Home</Text>

     </View>
   </TouchableOpacity>
   <TouchableOpacity onPress={()=>this.props.propa.navigation.navigate('WebView')}>
   <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
     <Icon
  name='live-tv'
  type='material-icon'
  color='white'
  size={20}
  containerStyle={{alignSelf:'center',marginLeft:5}}
/>
     <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>Live</Text>

     </View>
   </TouchableOpacity>
   {
       (this.state.routes)?
       <View>
       <TouchableOpacity onPress={()=>this.props.propa.navigation.navigate('Studyform')}>
       <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
     <Icon
  name='ios-document'
  type='ionicon'
  color='white'
  size={20}
  containerStyle={{alignSelf:'center',marginLeft:8}}
/>
     <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>Study Scheduling</Text>

     </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>this.props.propa.navigation.navigate('OnlineLecs')}>
       <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
     <Icon
  name='folder1'
  type='antdesign'
  color='white'
  size={20}
  containerStyle={{alignSelf:'center',marginLeft:5}}
/>
     <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>Online Lectures</Text>

     </View>
       </TouchableOpacity>
       <TouchableOpacity onPress={()=>this.props.propa.navigation.navigate('OfflineLecs')}>
       <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
     <Icon
  name='folder1'
  type='antdesign'
  color='white'
  size={20}
  containerStyle={{alignSelf:'center',marginLeft:5}}
/>
     <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>Offline Lectures</Text>

     </View>
       </TouchableOpacity>
       </View>
       :
       null
   }
 
   <TouchableOpacity onPress={()=>this.props.propa.navigation.navigate('Past Papers')}>
   <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
   <Icon
  name='ios-document'
  type='ionicon'
  color='white'
  size={20}
  containerStyle={{alignSelf:'center',marginLeft:8}}
/>
     <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>Documents</Text>

     </View>
   </TouchableOpacity>
   
   <TouchableOpacity onPress={()=>this.props.propa.navigation.navigate('Whatsapp')}>
   <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
     <Icon
  name='logo-whatsapp'
  type='ionicon'
  color='white'
  size={20}
  containerStyle={{alignSelf:'center',marginLeft:5}}
/>
     <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>WhatsApp</Text>

     </View>
   </TouchableOpacity>
   <TouchableOpacity onPress={
     this.onSignOut
     
     }>
   <View style={{flexDirection:"row",marginTop:5,marginBottom:5}}>
     <Icon
  name='uninstall'
  type='entypo'
  color='white'
  size={20}
  containerStyle={{alignSelf:'center',marginLeft:5}}
/>
     <Text style={{color:'white',fontSize:18,fontWeight:'bold',marginLeft:5}}>SignOut</Text>

     </View>
   </TouchableOpacity>
   <View style={{height:hp('26%'),justifyContent:'flex-end',alignItems:'center'}}>
       <Text style={{marginTop:5,marginBottom:5,marginLeft:10,color:'white',fontSize:17}}>Designed & Developed </Text>
       <Text style={{marginTop:5,marginBottom:5,marginLeft:10,color:'white',fontSize:17}}>By</Text>

       <Text style={{marginTop:5,marginBottom:5,marginLeft:10,color:'white',fontSize:18,fontWeight:'bold'}}>Alpha Institute Of Health Science</Text>

   </View>
      </ImageBackground>
        )
    }
}