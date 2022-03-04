import React , {useEffect , useState , useMemo} from 'react';
import { 
  SafeAreaView , View
, StyleSheet , Text , ActivityIndicator} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SQLite from 'react-native-sqlite-storage'

import login from './screens/login.js'
import register from './screens/Register.js'
import todo from './screens/Todo.js'
import addtodo from './screens/AddTodo.js'
import updateTodo from './screens/updateTodo.js'

const db = SQLite.openDatabase(
  {
      name : 'MAINDB',
      location : 'default'
  },
  () => {},
  error => { console.log(error)}
)


const Stack = createNativeStackNavigator();

const  App = () => {
  return(

    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={login} />
        <Stack.Screen name="Register" component={register}/>
        <Stack.Screen name="Todo" component={todo} />
        <Stack.Screen name="AddTodo" component={addtodo} />
        <Stack.Screen name="updateTodo" component={updateTodo} />
       
      </Stack.Navigator>
    </NavigationContainer>

  )
}

export default App
