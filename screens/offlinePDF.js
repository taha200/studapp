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
import Pdf from 'react-native-pdf'
import RNfetchBlob from 'rn-fetch-blob'
import RNDM from 'react-native-easy-downloader';
import { zip, unzip, unzipAssets, subscribe,zipWithPassword ,unzipWithPassword} from 'react-native-zip-archive'


const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height


class OfflinePdf extends Component{
   constructor(props){
     super(props);
     this.state={
       title:"Sturucture of Eyee fkbjfewkfkwbefewkbfkwebfkewbfkwebfkewbfewfkewbfkbewkfewkfbewkfbewkfbewkbfew",
       selectedIndex:0,
       current:1,
       total:0,
       source:''
      }
     this.updateIndex = this.updateIndex.bind(this)

   }
   componentWillUnmount(){
    var pth=`${RNfetchBlob.fs.dirs.DownloadDir}/${this.props.route.params.file}.pdf`
    RNfetchBlob.fs.unlink(pth)
.then(() => console.log("Oh yeah"))
.catch((err) => console.log("NoOOOo"))
  }
   componentDidMount(){
    var path=`${RNfetchBlob.fs.dirs.DownloadDir}/studapp/pdfs/${this.props.route.params.file}.zip`
    var path1=RNfetchBlob.fs.dirs.DownloadDir
    unzipWithPassword(path,path1,'H3LL0','STANDARD')
    .then((patha) => {
        this.setState({
             source:`${RNfetchBlob.fs.dirs.DownloadDir}/${this.props.route.params.file}.pdf`
        })
    })
    .catch((error) => {
    alert(error)})
   }
   updateIndex (selectedIndex) {
    this.setState({
      selectedIndex:selectedIndex
    })
}
// componentDidMount(){
//     var path=RNfetchBlob.fs.dirs.DownloadDir

//     RNDM.download({
//         url:'http://192.168.0.104:5000/getFile',
//         savePath:path+'/studapp/videos/testam.txt',

//       }).then(
//         ret => Alert.alert('Success')
//       ).catch (
//         err => Alert.alert('Something wrong')
//       )

// }
    render() {

        const source = {uri:`http://192.168.0.110:5000/api/getFeaturedVideo147.pdf`};
        //const source = require('./test.pdf');  // ios only
        //const source = {uri:'bundle-assets://test.pdf'};
 
        //const source = {uri:'file:///sdcard/test.pdf'};
        //const source = {uri:"data:application/pdf;base64,JVBERi0xLjcKJc..."};
 
        return (
            <View style={styles.container}>
                 <ImageBackground style={{width:wp('100%'),height:hp('8%'),flexDirection:'row',justifyContent:'space-between'}} source={require('./image1.jpg')}>
<View style={{flexDirection:'row'}}>
<Icon
  name='ios-arrow-back'
  type='ionicon'
  color='white'
  size={30}
  containerStyle={{alignSelf:'flex-end',marginLeft:10,marginBottom:10}}
  onPress={()=>this.props.navigation.navigate("Offline")}
/>
    <Text style={{marginBottom:15,color:'white',textAlignVertical:'bottom',fontSize:20,fontFamily:'Gill Sans',marginLeft:15}}>Page No. {this.state.current} / Total Page No. {this.state.total} </Text>
</View>

    </ImageBackground>
                <Pdf
                    source={{uri:this.state.source}}
                    onLoadComplete={(numberOfPages,filePath)=>{
                        this.setState({
                            total:numberOfPages
                        })
                    }}
                    onPageChanged={(page,numberOfPages)=>{
                        this.setState({
                            current:page
                        })
                    }}
                    onError={(error)=>{
                        console.log(error);
                    }}
                    onPressLink={(uri)=>{
                        console.log(`Link presse: ${uri}`)
                    }}
                    style={styles.pdf}/>
            </View>
        )
  }
}
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    pdf: {
        flex:1,
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    }
});
 



export default OfflinePdf;