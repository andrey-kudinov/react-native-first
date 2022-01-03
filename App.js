import { useState } from 'react'
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { Navbar } from './src/components/Navbar'
import { MainScreen } from './src/screens/MainScreen'
import { TodoScreen } from './src/screens/TodoScreen'

async function loadApplication() {
  await Font.loadAsync({
    'Mont-Regular': require('./assets/fonts/Mont-Regular.ttf'),
    'Mont-Bold': require('./assets/fonts/Mont-Bold.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [todoId, setTodoId] = useState(null)
  const [todos, setTodos] = useState(
    [...Array(2)].map((n, i) => ({
      id: i + 1,
      title: String((i + 1) * 1000)
    }))
  )

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  const addTodo = title => {
    const newTodo = {
      id: Date.now(), // ? should be String or Number for key
      title
    }

    setTodos(prev => [...prev, newTodo])
  }

  const removeTodo = id => {
    const selectedTodo = todos.find(todo => todo.id === id)
    Alert.alert(
      'Remove todo',
      `Remove ${selectedTodo.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setTodoId(null)
            setTodos(prev => prev.filter(todo => todo.id !== id))
          }
        }
      ],
      { cancelable: false }
    )
  }

  const updateTodo = (id, title) => {
    setTodos(old =>
      old.map(todo => {
        if (todo.id === id) {
          todo.title = title
        }
        return todo
      })
    )
  }

  let content = (
    <MainScreen
      todos={todos}
      addTodo={addTodo}
      removeTodo={removeTodo}
      // openTodo={id => setTodoId(id)}
      openTodo={setTodoId}
    />
  )

  if (todoId) {
    const selectedTodo = todos.find(todo => todo.id === todoId)
    content = (
      <TodoScreen
        onRemove={removeTodo}
        goBack={() => setTodoId(null)}
        todo={selectedTodo}
        onSave={updateTodo}
      />
    )
  }

  return (
    <View>
      <Navbar title='Todo App' />

      <View style={styles.container}>{content}</View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 30,
    paddingVertical: 20
  }
})
