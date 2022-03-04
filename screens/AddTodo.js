import React , {useEffect , useState} from 'react'
import {View , Text , StyleSheet, SafeAreaView , Button , TextInput} from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons'
//////import DatePicker from 'react-native-date-picker'
import DatePicker from '@react-native-community/datetimepicker'


const db = SQLite.openDatabase(
    {
        name : 'MAINDB',
        location : 'default'
    },
    () => {},
    error => { console.log(error)}
)

const AddTodo = ({route}) => {

    const [username , setusername] = useState('')
    const [title , settitle] = useState('')
    const [desc , setdesc] = useState('')
    const [start , setstart] = useState('')
    const [end , setend] = useState('')
    const [status , setstatus] = useState('Pending')
    

    const navigation = useNavigation()

    useEffect(() => {
        if(route.params != undefined){
            
            // console.log(route)
            setusername(route.params.username)
            createTable();
        }
    })

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()
    const day = days[today.getDay()]

    const t1 = dd + '/' + mm + '/' + yyyy
    const t2 = dd + '/' + mm + '/' + yyyy

    const date = () => {
      
    }

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "Todo8"
                + "(id INTEGER PRIMARY KEY AUTOINCREMENT,title TEXT, desc TEXT, start TEXT, end TEXT, created TEXT, updated TEXT, status TEXT, username TEXT );"
            )
        })
    }

    


    let AddTodo = () => {
        console.log(username);
    
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO Todo8 (title , desc , start , end , created , updated , status , username) VALUES (?,?,?,?,?,?,?,?)',
            [title , desc , start , end , t1 , t2 ,status , username],
            (tx, results) => {
              console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                // Alert.alert(
                //   'Success',
                //   'You are Registered Successfully',
                //   [
                //     {
                //       text: 'Ok',
                //       onPress: () => navigation.navigate('Login'),
                //     },
                //   ],
                //   { cancelable: false }
                // );
                navigation.navigate('Todo')
              } else alert('Registration Failed');
            }
          );
        });
      };

    return (
        <SafeAreaView >

<View style = {{backgroundColor : 'orange' , flexDirection : 'row'}}>



<Text style = {[styles.header , {marginLeft : 155}]}>
   Add Todo
 </Text>



 </View>

           
           
            <TextInput placeholder='Enter Title'
            style = {{color : 'black' , backgroundColor : '#C5C6D0' , marginTop : 20 , marginHorizontal : 20}}
            value = {title}
            onChangeText={settitle}
            />
             

            
            
            <TextInput placeholder='Enter Description'
            style = {{color : 'black' , backgroundColor : '#C5C6D0' , marginTop : 20 , marginHorizontal : 20}}
            value = {desc}
            multiline = {true}
            onChangeText={setdesc}
            />
            

             
         
           
            <TextInput placeholder='Enter end'
            style = {{color : 'black' , backgroundColor : '#C5C6D0' , marginTop : 20 , marginBottom : 20 , marginHorizontal : 20}}
            value = {start}
            onChangeText={setstart}
            />

            
            
            <TextInput placeholder='Enter end'
            style = {{color : 'black' , backgroundColor : '#C5C6D0' , marginTop : 20 , marginBottom : 20 , marginHorizontal : 20}}
            value = {end}
            onChangeText={setend}
            />
            

            
             <Button title = "Add" onPress = {AddTodo}/>
             <Text>{username}</Text>
            


             

         </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header : {
        color : '#696808',
        marginVertical : 10,
       fontSize : 20,
       fontWeight : 'bold'
    },

    todotext : {
        color : 'green',
       fontSize : 25,
       fontWeight : 'bold',
       marginHorizontal : 125
    },
    
    icon : {
        color : 'black',
        elevation : 5,
        marginRight : 135
    },
   text : {
       color : 'black'
   }
})

export default AddTodo