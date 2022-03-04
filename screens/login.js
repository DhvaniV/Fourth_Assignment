import React , {useEffect , useState , useMemo}  from 'react'
import {View , Text , TextInput , Button , StyleSheet , Image , TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native';
import SQLite from 'react-native-sqlite-storage'

const db = SQLite.openDatabase(
    {
        name : 'MAINDB',
        location : 'default'
    },
    () => {},
    error => { console.log(error)}
)

const login = () => {

    const [username , setusername] = useState('')
    const [password , setpassword] = useState('')
    
    const navigation = useNavigation()

    const User = () => {
        if(username != '' && password != ''){

            console.log(username);
            // setUserData({});
            db.transaction((tx) => {
              tx.executeSql(
                'SELECT * FROM USERS where username = ? AND password = ?',
                [username , password],
                (tx, results) => {
                  var len = results.rows.length;
                  console.log('len', len);
                  if (len > 0) {
                    navigation.navigate('Todo', { id: results.rows.item(0).id, username: username })
                  } else {
                    alert('No user found');
                  }
                }
              );
            });

        }
       
      };
    
    
    return (
    <View style = {styles.root}>
       <View style = {styles.container}>

       <Image source = {require('../Images/logo_1.png')} styles ={styles.logo} resizeMode='contain'/>

        <TextInput placeholder='Enter Your Name'
        style = {{color : 'black' , backgroundColor : 'grey'}}
        value = {username}
        onChangeText={setusername}
        />



        <TextInput placeholder='Enter Your Password'
        style = {{color : 'black' , backgroundColor : 'grey' , marginTop :20 }}
        value = {password}
        onChangeText={setpassword}
        secureTextEntry = { true } />       

        <Button title = "Login" style = {styles.button} onPress = {User}/>

        <TouchableOpacity onPress = {() => navigation.navigate('Register')}>

        <Text style = {styles.accountText}>
            Don't have an account? Create New
        </Text>

        </TouchableOpacity>



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

    button : {
        backgroundColor : '#3B71F3',
        padding : 30,
        borderRadius : 5 ,
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


export default login;
