import React , {useState , useEffect}from 'react'
import {View , Text , StyleSheet , TextInput , Button, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage';
import Ionicons from 'react-native-vector-icons/Ionicons'
import RadioForm , {RadioButton , RadioButtonInput , RadioButtonLabel} from 'react-native-simple-radio-button';

const db = SQLite.openDatabase(
    {
        name : 'MAINDB',
        location : 'default'
    },
    () => {},
    error => { console.log(error)}
)

const updateTodo = ({route}) => {

    const [title , settitle] = useState("")
    const [desc , setdesc] = useState("")
    const [id , setid] = useState("")
    const [status , setstatus] = useState("")
   
    
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    const day = days[today.getDay()]

    const t = dd + '/' + mm + '/' + yyyy

    var statusss = [
      {id : 0 ,label : "Pending" , value : 'Pending'},
       {id : 1 , label : "In-Progress" , value : 'In-progress'},
       {id : 2 , label : "Done" , value : 'Done'}
   ]

    const navigation = useNavigation()

    useEffect(() => {
      if(route.params != undefined){
        console.log(route)
        setid(route.params.id)
    }
  })
  
    let updateAllStates = (title , desc  , status) => {
        settitle(title);
        setdesc(desc);
        setstatus(status);
      };

      let display = () => {
        console.log(id);
        db.transaction((tx) => {
          tx.executeSql(
            'SELECT * FROM Todo8 where id = ?',
            [id],
            (tx, results) => {
              var len = results.rows.length;
              if (len > 0) {
                let res = results.rows.item(0);
                updateAllStates(
                  res.title,
                  res.desc,
                  res.status,
                );
              } else {
                alert('No user found');
                updateAllStates('', '', '');
              }
            }
          );
        });
      };

      let update = () => {
        console.log(id, title, desc);    
        db.transaction((tx) => {
          tx.executeSql(
            "UPDATE Todo8 SET title=?, desc=?, status=?, updated=? WHERE id=?",
            [title, desc, status, t, id],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                navigation.navigate('Todo')
              } else alert('Updation Failed');
            }
          );
        });
      };
    
    return(
        <View style = {styles.root}>
        <View style = {styles.container}>

        <Text style = {{fontSize : 25 , fontWeight : 'bold' , color : 'blue' , alignSelf : 'center' , marginBottom : 20 }}>
                Update Id </Text>
                
                <Text style = {{color : '#696808' , marginLeft : 90}}>To Get your previous data...</Text>
               <TouchableOpacity
               onPress = {display}>
                  <Text  style = {{color : 'blue' , marginLeft : 125}}>Click Here!!!</Text>
               </TouchableOpacity>

         
           
         <TextInput placeholder='Enter title'
         style = {{color : '#696808' , marginLeft : 10 , backgroundColor : '#C5C6D0' , marginTop : 20 , marginHorizontal : 20}}
         value = {title}
         onChangeText={settitle}
         />
         

         
          
         <TextInput placeholder='Enter desc'
         style = {{color : '#696808' , marginLeft : 10 , backgroundColor : '#C5C6D0' , marginTop : 20 , marginHorizontal : 20}}
         value = {desc}
         onChangeText={setdesc}
         multiline = {true}
         />
        
 

         <View style = {{flexDirection : 'row'}}>
            <Text style = {{color : 'black' , fontWeight : 'bold' , marginRight : 30 , marginTop : 20}}>
              Status:
            </Text>
          
            <RadioForm
                        radio_props = {statusss}
                        initial = {0}
                        buttonSize = {10}
                        buttonOuterSize = {20}
                        selectedButtonColor = {"darkgreen"}
                        selectedLabelColor = {"darkgreen"}
                        style = {{marginVertical: 20}}
                        onPress = {(value) => {setstatus(value)}}
                        />
         </View> 

     <Button title = "Register"  onPress={update}/>
 
        </View>
     </View>
     )
 }
 
 const styles = StyleSheet.create({
     logo : {
         width : 100,
         height : 100,
     },
     root : {
         alignItems : 'center',
         
         
     },
     container : {
 
         backgroundColor : 'white',
         width : '100%',
         borderColor : '#e8e8e8',
         borderwidth : 1,
         borderRadius : 5,
         paddingHorizontal : 20,
         marginVertical : 5,
         marginTop : 50
 
     },
 
    
 
     accountText : {
         color : 'grey',
         alignSelf : 'center',
         marginTop : 20
 
     }, 
 
     link : {
         color : '#FDB075'
     },
     error : {
         color : 'red',
         fontSize : 10
     }
 
 })
 
 

export default updateTodo