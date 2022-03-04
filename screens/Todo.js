import { NavigationContainer } from '@react-navigation/native'
import React , {useEffect , useState} from 'react'
import {View , Text , StyleSheet, SafeAreaView , FlatList , Button, TouchableOpacity , Image} from 'react-native'
import SQLite from 'react-native-sqlite-storage'
import Ionicons from 'react-native-vector-icons/Ionicons'
// import Foundation from 'react-native-vector-icons/Foundation'
import { useNavigation } from '@react-navigation/native';


const db = SQLite.openDatabase(
    {
        name : 'MAINDB',
        location : 'default'
    },
    () => {},
    error => { console.log(error)}
)

 const Todo = ({route}) => {
    
    const [username , setusername] = useState('')
    const [todo, settodo] = useState([])
   
    const navigation = useNavigation()

    useEffect(() => {
        if(route.params != undefined){
            console.log(route)
            setusername(route.params.username)
        }
        getTodos();
    })

   
    const getTodos = () => {
       db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM Todo8 WHERE username=?',
                [username],
                (tx, results) => {
                    if (results.rows.length > 0) {
                        var temp = []
                        for (let i = 0; i < results.rows.length; ++i)
                            temp.push(results.rows.item(i))
                        settodo(temp)
                        setisTodoAdded('')
                        
                    }
                    else {
                        console.log('Add to do')
                        setisTodoAdded('no items')
                        // settodo([])
                    }
                }
            )
        })
    
    }

    const  deleteUser = (id) => {
        db.transaction((tx) => {
          tx.executeSql(
            'DELETE FROM Todo8 where id=?',
            [id],
            (tx, results) => {
            //   console.log('Results', results.rowsAffected);
              if (results.rowsAffected > 0) {
                Alert.alert(
                  'Success',
                  'User deleted successfully',
                //   [
                //     {
                //       text: 'Ok',
                //       onPress: () => navigation.navigate('HomeScreen'),
                //     },
                //   ],
                //   { cancelable: false }
                );
              } else {
                alert('Please insert a valid User Id');
              }
            }
          );
        });
      };

    
     
    const rendertodo = ({ item }) => (
        <View  style = {styles.continer}>

            <View style = {{flexDirection : 'row'}}>
           
                <Text style={styles.titletext}> {item.title}</Text>
            </View>

             <View style = {{flexDirection : 'row'}}>
                <Text style={styles.text}>StartDate : {item.start}</Text>
                <Text style={[styles.text , {marginLeft : 75}]}>endDate : {item.end}</Text>
             </View>

             
             <View style = {{flexDirection : 'row'}}>
                <Text style={styles.auto}>created on: {item.created}</Text>
                <Text style={[styles.auto , {marginLeft : 75}]}>updated on: {item.updated}</Text>
             </View>
             
             <Text style={styles.statustext}>{item.status}</Text>
             <View style = {{flexDirection : 'row'}}>

            <Ionicons
                name = 'pencil-sharp'
                size={35}
                onPress = {() => navigation.navigate('updateTodo' , {id : item.id} )}
                style = {{color : 'blue' , marginLeft : 100}}
                />
                <Ionicons
                name = 'trash'
                size={35}
                onPress = {() => deleteUser(item.id)}
                style = {styles.icon}
                style = {{color : 'red' , marginLeft : 70}}
                />

             </View>
            
        </View>
                   
    )

     return (
         <SafeAreaView >

            <View style = {{backgroundColor : 'orange' , flexDirection : 'row'}}>

            <Ionicons
                name = 'chevron-back-outline'
                size={55}
                onPress = {() => navigation.navigate('Login')}
                style = {{color : 'black'}}
                
                />

            <Text style = {styles.header}>
                {username}
             </Text>

            <Ionicons
                name = 'add-circle-sharp'
                size={55}
                onPress = {() => navigation.navigate('AddTodo' , {username: username})}
                style = {{color : 'green'}}
                
                />

             </View>

             <Text style = {styles.todotext}>
                List of Todos
             </Text>
               
                <FlatList
                    data={todo}
                    renderItem={item => rendertodo(item)}
                    keyExtractor={item => item.id}
                />        
         </SafeAreaView>
             
            
         
     )
 }

 const styles = StyleSheet.create({
     header : {
         color : 'white',
         marginVertical : 10,
        fontSize : 25,
        fontWeight : 'bold',
        marginHorizontal : 90
     },

     todotext : {
        color : 'green',
       fontSize : 25,
       fontWeight : 'bold',
       marginHorizontal : 125
    },
    
    text : {
        color : '#696808'
    },
    auto : {
        
        color : '#7F7D9C'
    },
    titletext : {
        color : '#800000',
        fontSize : 20,
        fontWeight : 'bold',
        marginLeft : 125
    },
    statustext : {
        color : '#87CEEB',
        fontSize : 20,
        fontWeight : 'bold',
        marginLeft : 155
    },
    itemTitle: {
        fontSize: 20,
        paddingBottom: 4
    },
    continer : {
        backgroundColor : 'white',
        width : '100%',
        borderColor : '#e8e8e8',
        borderwidth : 1,
        borderRadius : 5,
        paddingHorizontal : 20,
        marginVertical : 5,
    
    },
 })

 export default Todo