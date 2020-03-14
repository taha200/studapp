import React,{Component} from 'react';
import {Button,Text,Icon,Overlay,CheckBox,Header,Card,ButtonGroup} from 'react-native-elements';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,ProgressBarAndroid,ImageBackground,TextInput,ActivityIndicator
} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {TextField} from 'react-native-material-textfield'
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import { Dropdown } from 'react-native-material-dropdown';
import URL from './../appconstant'
import AsyncStorage from '@react-native-community/async-storage';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import Orientation from 'react-native-orientation'

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class StudyForm extends Component{
   constructor(props){
     super(props);
     this.state={
       isShow:false,
       sessionID:'',
       loader:true,
       progress:0,
       dataRec:[],
       dataSug:[],
       recommend:false,
       onTime:false,
       showForm:false,
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew",
       selectedIndex:0,
       firebaseuid:'',
       recom:'',
       subject:[{
           title:'Anatomy',
           isWeak:false
       },
       {
        title:'Physiology',
        isWeak:false
    }
,{
    title:'Phatology',
    isWeak:false
},{
    title:'Pharmacology',
    isWeak:false
},{
    title:'Microbiology',
    isWeak:false
},{
    title:'Others',
    isWeak:false
}

],
         weak:[],
         studyHours:0,
         timeStudy:0       

      }
     this.updateIndex = this.updateIndex.bind(this)

   }

   updateIndex (selectedIndex) {
    this.setState({
      selectedIndex:selectedIndex
    })
  }
  inputSub(weak,tit,ind){
    console.log(weak)
   if(weak===true){
   
    var abc=this.state.subject.map((item,index)=>{
        if(ind===index){
          return{
            title:tit,
            isWeak:false
          }
        }
          else{
            return item
          }
        })
     var abcd= this.state.weak.filter((item)=>{
                return item!==tit
      })
        this.setState({
          subject:abc,
          weak:abcd
        })
         setTimeout(()=>{
          console.log(this.state.weak)

         },2000)
    }
    else{
      var abc=this.state.subject.map((item,index)=>{
        if(ind===index){
          return{
            title:tit,
            isWeak:true
          }
        }
          else{
            return item
          }
        })
        this.setState({
          subject:abc
        })
        var arr=this.state.weak
        arr.push(tit)
        this.setState({
          weak:arr
        })
        console.log(this.state.weak)
    }
 
   }
  
   getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uXEr')
           var abc=JSON.parse(value)
           console.log(abc)
          
            // var sub=this.state.subject.map(item=>{
            //   if(item===abc.weakSubjects[0]){
            //     return {
            //       title:item,
            //       isWeak:true
            //      }
            //   }
            //   else {
            //     return {
            //     title:item,
            //     isWeak:false
            //      }
 
            //    }
            //  })
            this.setState({
              firebaseuid:abc.firebaseUID,
              sessionID:abc.sessionID,
              studyHours:abc.noOfStudyHours,
              timeStudy:abc.timeOfStudy              
            })
           
         
           if(abc.recommended===false){
             this.setState({
               showForm:true,
               loader:false
             })
           }
           else{
             this.setState({
               showForm:false
             })
            
            if(abc.weakSubjects.length>0){
              console.log('woah')
              this.recommendedLecs(abc);
              this.getPrecentageValues(abc);
              this.setState({
                recommend:true,
              
              })
            }
            else{
              this.schedulingLecs(abc)
              this.setState({
                recommend:false,
                loader:false
              })
            }
           }
    } catch(e) {
      // error reading value
    }
  }
  storeData = async (dat) => {
    try {
      await AsyncStorage.setItem('uXEr', JSON.stringify(dat))
    } catch (e) {
      // saving error
    }
  }
  savedData(dat){
    fetch(`${URL}/api/updateRecomm`,{
      method:"PUT",
      headers:{
        "Content-Type": "application/json"
      },
      body:JSON.stringify(dat)
    }).then(res=>res.json()).then((data)=>{
      this.storeData(data.doc)
      this.getData();
      this.setState({
           showForm:false,
           isShow:false
      })

      
    }).catch(err=>console.log(err))
  }
  saveData=()=>{

    console.log(this.state.firebaseuid)
    const objs={
      firebaseUID:this.state.firebaseuid,
      noOfStudyHours:this.state.studyHours*3600,
      timeOfStudy:this.state.timeStudy,
      weakSubjects:this.state.weak,
      recommended:true
    }
    if((this.state.studyHours > 0 && this.state.studyHours < 15) && ((this.state.timeStudy >= 0 && this.state.timeStudy < 24))){
      this.savedData(objs);

    }
    else{
      alert("input Correct Value")
    }
  }
  schedulingLecs=(obj)=>{
    fetch(`${URL}/api/getSchedule${obj.sessionID}`,{
      method:"GET",
      headers:{
        "Content-Type":"application/json"
      }
        }).then(res=>res.json()).then((data)=>{
     this.setState({
       dataSug:data.doc,
       loader:false
       
     })
    }).catch(err=>alert(err))
  }
  getPrecentageValues=(obja)=>{
    var obe={
      firebaseUID:obja.firebaseUID,
      sessionID:obja.sessionID
    }
    fetch(`${URL}/getPercentageValues`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify(obe)
    }).then(res=>res.json()).then((data)=>{
      var prog=data.overAll/data.total*100
      this.setState({
        progress:prog
      })
    }).catch(err=>console.log("error"))
  }
  recommendedLecs=(obj)=>{
  var dt=new Date()
  

    if( dt.getHours() > obj.timeOfStudy - 1){
      const obju={
        sessionID:obj.sessionID,
        noOfStudyHours:obj.noOfStudyHours,
        timeOfStudy:obj.timeOfStudy,
        weakSubjects:obj.weakSubjects,
        firebaseUID:obj.firebaseUID
  }
     fetch(`${URL}/api/recommendVideos`,{
       method:"POST",
       headers:{
         "Content-Type":"application/json"
       },
       body:JSON.stringify(obju)
     }).then(res=>res.json()).then((data)=>{
      this.setState({
        dataRec:data.doc.recommendedTopics,
        onTime:true,
        loader:false
      })
     }).catch(err=>console.log("error"))
    }
    else{
      this.setState({
        onTime:false,
        loader:false
      })
    }
     
  }
  componentWillUnmount(){
    this._unsubscribe();
  }
   componentDidMount(){
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      Orientation.lockToPortrait()
    });
  
    this.fetchImage();
     this.getData();
  
    }
  
    componentWillUnmount() {
      this.listener.remove();
    }
   getTimeandSeconds=(time)=>{
    var minutes = Math.floor(time / 60);
    return minutes

  }
  LectureDone=(id)=>{
    fetch(`${URL}/api/watchVideo`,{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        firebaseUID:this.state.firebaseuid,
        lectureID:id
      })
    }).then(res=>res.json()).then((data)=>{
         this.getData();
         this.setState({
            loader:true
         })
    }).catch(err=>console.log("error"))
  }
  fetchImage=()=>{
    fetch(`${BaseUrl}/api/getCovers`,{
      method:"GET"
    }).then(res=>res.json()).then(data=>{
      var abc=JSON.stringify(data)
      this.setState({
        recom:data.doc[0].recommendations
      })
    }).catch(err=>console.log(err))
   }
    render(){
      let data = [{
        value: 'Contact',
      }, {
        value: 'About US',
      }, {
        value: 'SignOut',
      }];
      var buttons=['FCPS', 'FCPS1','FCPS2']

        return (
          <View style={{flex:1,backgroundColor:'white'}}>
            {(this.state.loader)?
             <View style={{alignItems:'center',justifyContent:'center'}}>
             <ActivityIndicator size="large" color="blue" />
           </View>
           :
           <View>
           <ImageBackground style={{width:wp('100%'),height:hp('8%'),flexDirection:'row',justifyContent:'space-between'}} source={require('./image1.jpg')}>
             <View style={{flexDirection:"row",marginLeft:5}}>
<Icon
name='ios-menu'
type='ionicon'
color='white'
size={30}
onPress={()=>this.props.navigation.toggleDrawer()}
containerStyle={{alignSelf:'flex-end',marginLeft:5,marginBottom:10}}
/>
<Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,marginLeft:15,fontFamily:'Gill Sans'}}>{(this.state.showForm)?"Recommendation Lecs Form":"Recommendations"}</Text>

</View>
{(this.state.show)?null:<Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,marginRight:5,fontFamily:'Gill Sans'}} onPress={()=>this.setState({
  isShow:true
})}>Edit</Text>}

 </ImageBackground>

{(this.state.showForm)?
<View>
   <Image style={{width:wp('100%'),height:hp('25%'),marginTop:5}} source={{uri:`${BaseUrl}/api/getFeaturedVideo${this.state.recom}`}}></Image>

<View style={{width:wp('95%'),alignSelf:'center',height:hp('60%'),backgroundColor:'white'}}>
<Text style={{marginTop:5}}>How many hours do you study?</Text>
 <TextInput style={{width:wp('30%'),borderColor:'black',borderWidth:1,backgroundColor:'lightgray',borderRadius:8,height:hp('6%'),fontSize:20,marginTop:5}} keyboardType='number-pad' onChangeText={(value)=>this.setState({studyHours:value})} maxLength={2} />
 <Text style={{marginTop:5}}>Select the time it is in 24 hours format( 0 to 11 resides in AM) while (12 to 23) resides in PM</Text>
 <TextInput style={{width:wp('30%'),borderColor:'black',borderWidth:1,backgroundColor:'lightgray',borderRadius:8,height:hp('6%'),fontSize:20,marginTop:5}} keyboardType='number-pad' onChangeText={(value)=>this.setState({timeStudy:value})} maxLength={2} />
<Text style={{marginTop:5}}>Select Your weak subjects</Text>
<FlatList 
            
            data={this.state.subject}
showsVerticalScrollIndicator={false}
numColumns={2}
            renderItem={({item,index})=>(
                <View>
              <CheckBox
              title={item.title}
              checked={item.isWeak}
              checkedColor="green"
              containerStyle={{width:wp('43%')}}
              onPress={()=>this.inputSub(item.isWeak,item.title,index)}
              />
              </View>
            )}

          />

<TouchableOpacity onPress={this.saveData}>
<ImageBackground style={{marginTop:5,width:wp('40%'),height:hp('6%'),justifyContent:'center',alignItems:'center',alignSelf:'center'}} imageStyle={{borderRadius:12}} source={require('./image1.jpg')}>
   <Text style={{fontSize:20,fontWeight:'bold',color:'white'}} >Submit</Text>
</ImageBackground>
</TouchableOpacity>
  </View>
  </View>
  :
  <View>
    {(this.state.recommend)?
    <View style={{width:wp('100%'),height:hp('20%'),alignItems:'center',justifyContent:'center'}}>
      <Text style={{marginBottom:15,fontSize:20,color:'green'}}>Your Progress</Text>
     
       
    <ProgressBarAnimated
         width={wp('90%')}
         value={this.state.progress}
         backgroundColor="green"
       />
       <View style={{width:wp('93%'),flexDirection:'row',justifyContent:'space-between',position:'absolute',top:65}}>
       <View style={{width:wp('10%'),height:hp('5.5%'),borderRadius:100,backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'white'}}>0</Text>
          </View>
          <View style={{width:wp('10%'),height:hp('5.5%'),borderRadius:100,backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'white'}}>50</Text>
          </View>
          <View style={{width:wp('10%'),height:hp('5.5%'),borderRadius:100,backgroundColor:'green',alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'white'}}>100</Text>
          </View>
       </View>
       </View>
       :
       <Image style={{width:wp('100%'),height:hp('20%'),marginTop:5}} source={{uri:`${BaseUrl}/api/getFeaturedVideo${this.state.recom}`}}></Image>

       }

<View style={{width:wp('95%'),height:hp('66%'),alignSelf:'center',backgroundColor:'white'}}>

<Text style={{fontSize:20,marginTop:5,marginLeft:5,marginBottom:5}}>{(this.state.recommend)?"Recommendations":"Scheduling"}</Text>
{(this.state.recommend)?<View>
{(this.state.onTime)?
<FlatList 
         
data={this.state.dataRec}
showsVerticalScrollIndicator={false}
renderItem={({item,index})=>(
<View>
<View style={{width:wp('95%'),height:hp('20%'),backgroundColor:(index%2===0)?"#6D8AFF":"#00A4FF",borderRadius:12,marginTop:5}}>
<Text style={{fontSize:18,color:'white',marginLeft:10,marginTop:8,fontWeight:'bold'}}>Topic Name:{item.topicName}</Text>
<Text style={{fontSize:16,color:'white',marginLeft:10,marginTop:8}}>Required Study Time: {this.getTimeandSeconds(item.duration)} Minutes</Text>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{color:'white',textAlignVertical:'center',marginLeft:10,marginTop:8,fontSize:16}}>Tap to play to watch Lec</Text>
<Icon
name='ios-play'
type='ionicon'
color='white'
size={35}
containerStyle={{marginRight:15,alignSelf:'center'}}
onPress={(()=>this.props.navigation.navigate("Onvideo",{
  link:item.fileServerName,
  seek:item.seekTime
}))}
/>
</View>
<View style={{flexDirection:'row',justifyContent:'space-between'}}>
<Text style={{color:'white',textAlignVertical:'center',marginLeft:10,marginTop:8,fontSize:16}}>Tap on Check When Topic Done</Text>
<Icon
name='ios-checkmark-circle'
type='ionicon'
color='white'
size={35}
containerStyle={{marginRight:10,alignSelf:'center'}}
onPress={()=>this.LectureDone(item.lec_id)}
/>
</View>

   </View>
   {(index=== this.state.subject.length - 1)?
             <View style={{width:wp('100%'),height:hp('23%')}}></View>
             :
             null
             }
</View>
)}

/>:
<Text style={{textAlign:'center',fontSize:20}}>Be on Your study time</Text>  
}

       </View>
       :
       <FlatList 
         
               data={this.state.dataSug}
showsVerticalScrollIndicator={false}
               renderItem={({item,index})=>(
               <View>
                 {(item.lectureID.isVideo)?
                <View style={{width:wp('95%'),backgroundColor:(index%2===0)?"#6D8AFF":"#00A4FF",borderRadius:12,marginTop:5,padding:10}}>
                <Text style={{fontSize:20,color:'white',marginLeft:10,marginTop:8,fontWeight:'bold'}}>Day: {item.day}</Text>
                <Text style={{fontSize:18,color:'white',marginLeft:10,marginTop:8,fontWeight:'bold'}}>{item.lectureTitle}</Text>
                <Text style={{fontSize:18,color:'white',marginLeft:10,marginTop:8,fontWeight:'bold'}}>Topics Covered:</Text>
 
                {item.lectureID.videoProps.topics.map(itema=>{
                  return(
                  <View style={{flexDirection:'row'}}>
                      <View style={{width:wp('4.5%'),height:hp('2.5%'),borderRadius:100,backgroundColor:'white',alignSelf:'flex-end'}}></View>
                      <Text style={{fontSize:16,color:'white',marginLeft:10,marginTop:8,fontWeight:'bold'}}>{itema.topicName}</Text>
 </View>
                  )
                })}
         
                     </View>
                     :
                     null
                }

</View>
               )}

             />
}

            
</View>
</View>
}
</View>
          }
       <Overlay
  isVisible={this.state.isShow}
  windowBackgroundColor="rgba(255, 255, 255)"
  overlayBackgroundColor="white"
  fullScreen={true}
  overlayStyle={{borderRadius:20}}
>
<Icon
  name='close'
  type='antdesign'
  color='black'
  size={25}
  containerStyle={{alignSelf:'flex-end'}}
  onPress={()=>this.setState({
    isShow:false
  })}
/>
<View style={{width:wp('95%'),alignSelf:'center',height:hp('70%'),backgroundColor:'white',justifyContent:'center'}}>
<Text style={{textAlign:'center',fontSize:30,}}>Update Info</Text>
<Text style={{marginTop:5}}>How many hours do you study?</Text>
 <TextInput style={{width:wp('30%'),borderColor:'black',borderWidth:1,backgroundColor:'lightgray',borderRadius:8,height:hp('6%'),fontSize:20,marginTop:5}} keyboardType='number-pad' onChangeText={(value)=>this.setState({studyHours:value})} maxLength={2} />
 <Text style={{marginTop:5}}>Select the time it is in 24 hours format( 0 to 11 resides in AM) while (12 to 23) resides in PM</Text>
 <TextInput style={{width:wp('30%'),borderColor:'black',borderWidth:1,backgroundColor:'lightgray',borderRadius:8,height:hp('6%'),fontSize:20,marginTop:5}} keyboardType='number-pad' onChangeText={(value)=>this.setState({timeStudy:value})} maxLength={2} />
<Text style={{marginTop:5}}>Select Your weak subjects</Text>
<FlatList 
            
            data={this.state.subject}
showsVerticalScrollIndicator={false}
numColumns={2}
            renderItem={({item,index})=>(
                <View>
              <CheckBox
              title={item.title}
              checked={item.isWeak}
              checkedColor="green"
              containerStyle={{width:wp('43%')}}
              onPress={()=>this.inputSub(item.isWeak,item.title,index)}
              />
              </View>
            )}

          />

<TouchableOpacity onPress={this.saveData}>
<ImageBackground style={{marginTop:5,width:wp('40%'),height:hp('6%'),justifyContent:'center',alignItems:'center',alignSelf:'center'}} imageStyle={{borderRadius:12}} source={require('./image1.jpg')}>
   <Text style={{fontSize:20,fontWeight:'bold',color:'white'}} >Update</Text>
</ImageBackground>
</TouchableOpacity>
  </View>
</Overlay>
           
    </View>
          );
    }
};


export default StudyForm