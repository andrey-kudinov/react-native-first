import { useState } from 'react'
import { StyleSheet, Text, View, FlatList } from 'react-native'
import { Navbar } from './src/Navbar'
import { AddTodo } from './src/AddTodo'
import { Todo } from './src/Todo'

export default function App() {
  const [todos, setTodos] = useState(
    [...Array(20)].map((n, i) => ({
      id: i+1,
      title: (i+1)*1000
    }))
  )

  const addTodo = (title) => {
    const newTodo = {
      id: Date.now(), // ? should be String or Number for key 
      title
    }

    setTodos(prev => [...prev, newTodo])
  }

  const removeTodo = id => {
    setTodos(prev => prev.filter(todo => todo.id !== id))
  }

  return (
    <View>
      <Navbar title='Todo App'/>

      <View style={styles.container}>
        <AddTodo onSubmit={addTodo}/>

        <FlatList
          keyExtractor={item => item.id}
          data={todos}
          renderItem={({ item }) => <Todo todo={item} onRemove={removeTodo}/>}
        />
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
