import React,{useState,useEffect} from 'react';
import {
    View,
    StyleSheet,
    Image,
    ImageBackground,
    Text, 
    Alert,
    TextInput,
    Grid,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    ScrollView,
    TouchableWithoutFeedback,
    Modal,
    Dimensions,
  } from "react-native";
import Swipeout from 'react-native-swipeout';
import firebaseConfig from '../firebase/firebaseConfig.js';
import * as ImagePicker  from 'expo-image-picker';
import * as JounisDAO from '../firebase/DAO.js';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import imageBackGroundInsertLink from '../assets/backgroundButton_Insert.jpg';
import WebView from 'react-native-webview';
import { Button } from 'react-native-paper';
import BackGroundRose from '../assets/rose.jpg'


console.disableYellowBox = true;

const JounisScreen = () =>{
    const[data, setData] = useState([]);
    const[filterData, setFilterData] = useState('');

    const GetAllJounis = () => {
        firebaseConfig.database().ref().child('Jounis').on('value',(snapshot) =>{
          var items = [];
          snapshot.forEach((child) => {
              let item = {
                  key: child.key,
                  name: child.val().name,
                  title: child.val().title,
                  image: child.val().image
              };
              items.push(item);
          })
          setData(items);
      });
    } 

    const FilterData = () => {
      if(filterData == ''){
        GetAllJounis();
      }else{
        firebaseConfig.database().ref().child('Jounis').orderByChild("name").equalTo(filterData).on("value",(snapshot) =>{
          var items = [];
          snapshot.forEach((child) => {
              let item = {
                  key: child.key,
                  name: child.val().name,
                  title: child.val().title,
                  image: child.val().image
              };
              items.push(item);
          })
          setData(items);
      });
      }
    }

    const [modalVisible, setModalVisible] = useState(false);
    
    const hideDialog = () => {
        setModalVisible(false);
    };
    const showDialog = () => {
        setModalVisible(true);
    };
    const [currentItem, setCurrentItem] = useState(null);
    const setCurrent = async (item) =>{
        await setCurrentItem(item);
    };

    useEffect(() =>{
      if(filterData == ''){
        return GetAllJounis();;
      }else{
        return FilterData();
      }
    },[]);

    return(
    <View style={styles.contaier} > 
      <ImageBackground source={BackGroundRose} style={{width:width, height:height}}>
      <Text style={styles.text}>International List</Text>
      <View style={styles.row}>
      <TouchableOpacity onPress={() =>{showDialog();}}>
        <ImageBackground source={imageBackGroundInsertLink} style={{width:100, height:150,}}/>
      </TouchableOpacity>
      <TouchableOpacity onPress={()=> FilterData()} style={{backgroundColor: 'pink',borderTopRightRadius:10,borderBottomRightRadius:10}} >
        <TextInput style={{backgroundColor: '#2AB7CA', borderColor:'#E7EFF6',width:235,height:75,marginTop:38,paddingLeft:5,fontSize:20,color:"white"}} 
        placeholderTextColor="white" placeholder={('Search...')} 
        onChangeText={(value)=> setFilterData(value)}/>
      </TouchableOpacity>
      </View>
      <FlatList data={data} renderItem={({ item }) => <ListItem item={item} showDialog={showDialog} setCurrent={setCurrent}  />} />
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        {currentItem ? (
          <JounisUpdate item={currentItem} hideDialog={hideDialog}/>
        ) : (
          <JounisInsert hideDialog={hideDialog}/>
        )}
      </Modal>
      </ImageBackground>
    </View>
    );
};


const Wikipedia = () => {
  return (
    <View>
    <WebView source={{ uri: 'https://en.wikipedia.org'}} injectedJavaScriptBeforeContentLoaded={("This is Wikipedia")}/> 
    </View>
  );
}



const JounisInsert = (props) => {
    const [name, setName] = useState('');
    const [title, setTitle] = useState('');
    const [image, setImage] = useState('https://www.everythingoverseas.com/wp-content/uploads/2018/07/10-places-portugal.jpg');

    const _chooseImage = async() => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4,3] 
        });
        
        if(!result.cancelled){
            console.log(image);
            setImage(result.uri);
        }
    };
    return (
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Insert YourJounis</Text>
            <TouchableWithoutFeedback onPress={()=> _chooseImage()}>
                <Image source={{uri: image, width:200, height:150}} style={{borderWidth:1, borderColor:'black'}}/>
            </TouchableWithoutFeedback>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Name: </Text>
                <TextInput style={styles.textInputDialog} value={name} onChangeText={(text)=> setName(text)}/>
            </View>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Title: </Text>
                <TextInput style={styles.textInputDialog} value={title} onChangeText={(text)=> setTitle(text)}/>
            </View>
            <View style={styles.modelButton}>
                <TouchableOpacity style={styles.openButton} onPress={()=> {props.hideDialog();}}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navopenButton} 
                onPress={()=> {
                  console.log('Click Insert');
                  props.hideDialog(); 
                  JounisDAO.insert(name,title,image);
  
                  }}>
                    <Text style={styles.textStyle}>Insert</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
    );
};

const JounisUpdate = (props) => {
    const [key, setKey] = useState(props.item.key);
    const [name, setName] = useState(props.item.name);
    const [title, setTitle] = useState(props.item.title);
    const [image, setImage] = useState(props.item.image);
  
    const _chooseImage = async() => {
      const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3] 
      });
      
      if(!result.cancelled){
          console.log(image);
          setImage(result.uri);
      }
    };
    return (
        <View style={styles.centeredView} value={props.item.key}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Update YourJounis</Text>
            <TouchableWithoutFeedback onPress={()=> _chooseImage()}>
                <Image source={{uri: image, width:200, height:200}} style={{borderWidth:1, borderColor:'black'}}/>
            </TouchableWithoutFeedback>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Name: </Text>
                <TextInput style={styles.textInputDialog} placeholder={props.item.name} onChangeText={(text)=> setName(text)}></TextInput>
            </View>
            <View style={styles.lineDialog}>
                <Text style={styles.textDialog}>Title: </Text>
                <TextInput style={styles.textInputDialog} placeholder={props.item.title} onChangeText={(text)=> setTitle(text)}></TextInput>
            </View>
            <View style={styles.modelButton}>
                <TouchableOpacity style={{...styles.openButton, backgroundColor: '#2196F3'}} 
                onPress={()=> {props.hideDialog();}}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{...styles.navopenButton, backgroundColor: '#2196F3'}} 
                onPress={()=> {props.hideDialog(); JounisDAO.update(key,name,title,image); console.log(" "+name+" "+title+" "+image+" "+key);}}>
                    <Text style={styles.textStyle}>Update</Text>
                </TouchableOpacity>
            </View>
          </View>
        </View>
    );
  };

const ListItem = (props) => {
const swipeoutSettings = {
    autoClose: () => true,
    onClose: () => {
        props.setCurrent(null);
    },
    onOpen: () => {
        props.setCurrent(props.item);
        Wikipedia()
        console.log(""+props.item.name)
        console.log("Open Swipe");
    },
    right: [
        {
            text: "Update",
            backgroundColor: "orange",
            type: "Secondary",
            onPress: () => {
              props.setCurrent(props.item);
              props.showDialog(true); 
              console.log("Update");
         },
        },
        {
            text: "Delete",
            backgroundColor: "red",
            type: "Delete",
            onPress: () => {
            Alert.alert('Delete', 'Are you want to delete Your Jounis'+" "+props.item.name + '?',
            [
                {text: 'No', onPress: () => console.log('Cancel Delete'), type: 'Cancel'},
                {text: 'Yes', onPress: () => JounisDAO.delete(props.item.key)}
            ],
                {cancelable:true}
            );
         }
        }
      ]
    };

    return (
    
    <View style={styles.listContainer} >
      <Swipeout {...swipeoutSettings} style={{position:'relative',borderRadius:10,backgroundColor:'#2AB7CA', marginTop:10,}}>
        <View style={styles.items} >
          <Image onPress={()=> Wikipedia()} source={{uri : props.item.image}} style={{width: 335,height: 200, borderRadius:10}}></Image>
            <View style={{width: 335, marginTop:5,}}>
              <Text style={styles.itemsText}>{props.item.name}</Text>
              <Text style={styles.itemsText}>{props.item.title}</Text>
            </View>
        </View>
      </Swipeout>
    </View>
    

  );
};

const {width, height} = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    width: width,
    height: height,
  },
  listContainer: {
    marginLeft:5,
    marginRight:5,
    marginBottom:5,
    height:height/1.75,
    paddingBottom:20
  },
  items:{
    margin:(width*3)/300,
    padding:(width*3)/300,
    borderRadius:10,
    backgroundColor: "white",
    borderColor:'#E7EFF6',
  },
  itemsText:{
    padding: 5, 
    fontSize: 20, 
    color:'#2AB7CA', 
    backgroundColor:'#E7eFF6', 
    backgroundColor:'#FFFFFF'
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    fontWeight:'bold',
    marginTop: 50,
    marginBottom:10,
    color:'#FFFFFF',
  },
  centeredView:{
    backgroundColor: "#FFFFFF",
    marginTop:100,
    alignItems:'center',
    width:215,
    borderRadius:5,
  },
  modalText:{
    margin:20,
    color: '#2196F3',
    fontSize: 25,
    textAlign: "center",
  },
  textDialog:{
    margin:5,
    fontSize: 16,
    textAlign: "center",
    color: '#2196F3',
  },
  row:{
    flexDirection: 'row',
    marginLeft:15
  },
  textInputDialog:{
    padding:2,
    margin:5,
    borderRadius:5,
    borderWidth:1
  },
  modelButton:{
    flexDirection: "row",
    marginLeft:15
  },
  openButton:{
    margin:5,
    backgroundColor: "#2196F3",
    borderRadius:5,
    padding:5,
    width:75,
    height:25
  },
  navopenButton:{
    margin:5,
    backgroundColor: "#2196F3",
    borderRadius:5,
    padding:5,
    width:75,
    height:25
  },
  textStyle:{
    textAlign: "center",
    color:'#FFFFFF',
    fontStyle:'italic'
  }
  
});

export default JounisScreen;