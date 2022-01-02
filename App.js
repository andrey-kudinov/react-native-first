import { useState } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Navbar } from './src/Navbar';
import { AddTodo } from './src/AddTodo';
import { Todo } from './src/Todo';

export default function App() {
  const [todos, setTodos] = useState([])

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(), // ? should be String or Number for key 
      title
    }

    setTodos(prev => [...prev, newTodo])
  }

  return (
    <View>
      <Navbar title='Todo App'/>

      <View style={styles.container}>
        <AddTodo onSubmit={addTodo}/>

        <View>
          {todos.map(todo => <Todo key={todo.id} todo={todo} />)}
        </View>

        {/* <StatusBar style="auto" /> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  },
});
