import React , {useEffect , useState , useMemo}  from 'react'
import {View , Text , TextInput , Button , StyleSheet , TouchableOpacity} from 'react-native'
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

const Register = () => {

    const [username , setusername] = useState('')
    const [password , setpassword] = useState('')
    const [email , setemail] = useState('')
    const pattern = /\S+@\S+\.\S+/

    const navigation = useNavigation()

    useEffect(() => {
        createTable();
        console.log('Hiii')
    } , [])

    const createTable = () => {
        db.transaction((tx) => {
            tx.executeSql(
                "CREATE TABLE IF NOT EXISTS "
                + "USERS "
                +"(ID INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT , password INTEGER);"
            )
        })
    }

    let register_user = () => {
        console.log(username, password);
    
        if (!username) {
          alert('Please fill name');
          return;
        }
        if (!password) {
          alert('Please fill Password');
          return;
        }

        if (!email) {
            alert('Please fill email');
            return;
          }
          
          if (!pattern.test(email)) {
            alert('Please fill correct email');
            return;
          }
        db.transaction((tx) => {
          tx.executeSql(
            'INSERT INTO USERS (username, password) VALUES (?,?)',
            [username, password],
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
                navigation.navigate('Login')
              } else alert('Registration Failed');
            }
          );
        });
      };
    



    return (
    <View style = {styles.root}>
       <View style = {styles.container}>

        <Text style = {{fontSize : 25 , fontWeight : 'bold' , color : 'blue' , alignSelf : 'center' , marginBottom : 20 }}>
                Create Your Account </Text>
        <TextInput placeholder='Enter Your Name'
        style = {{color : 'black' , backgroundColor : 'grey'}}
        value = {username}
        onChangeText={setusername}
        />

    <TextInput placeholder='Enter Your Mailid'
        style = {{color : 'black' , backgroundColor : 'grey', marginTop :20}}
        value = {email}
        onChangeText={setemail}
        />

        <TextInput placeholder='Enter Your Password'
        style = {{color : 'black' , backgroundColor : 'grey' , marginTop :20 }}
        value = {password}
        onChangeText={setpassword}
        secureTextEntry = { true } />       

        <Button title = "Register" style = {styles.button} onPress={register_user}/>

        <TouchableOpacity onPress = {() => navigation.navigate('Login')}>

        <Text style = {styles.accountText}>
            Go To Login
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


export default Register;
