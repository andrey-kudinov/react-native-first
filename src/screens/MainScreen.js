import { useState, useEffect, useContext, useCallback } from 'react'
import { View, FlatList, StyleSheet, Image, Dimensions } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'
import { THEME } from '../theme'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'
import { AppLoader } from '../components/base/AppLoader'
import { AppText } from '../components/base/AppText'
import { AppButton } from '../components/base/AppButton'

export const MainScreen = () => {
  const { addTodo, todos, removeTodo, fetchTodos, loading, error } =
      useContext(TodoContext),
    { changeScreen } = useContext(ScreenContext),
    [deviceWidth, setDeviceWidth] = useState(
      Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
    )

  const loadTodos = useCallback(async () => await fetchTodos(), [fetchTodos])

  useEffect(() => {
    loadTodos()
  }, [])

  useEffect(() => {
    const update = () => {
      const width =
        Dimensions.get('window').width - THEME.PADDING_HORIZONTAL * 2
      setDeviceWidth(width)
    }

    Dimensions.addEventListener('change', update)

    return () => {
      Dimensions.removeEventListener('change', update)
    }
  }, [])

  if (loading) {
    return <AppLoader />
  }

  if (error) {
    return (
      <View style={styles.errorWrapper}>
        <AppText style={styles.error}>{error}</AppText>
        <AppButton onPress={loadTodos}>Try again</AppButton>
      </View>
    )
  }

  let content = (
    <View style={{ width: deviceWidth }}>
      <FlatList
        keyExtractor={item => item.id}
        data={todos}
        renderItem={({ item }) => (
          <Todo todo={item} onRemove={removeTodo} onOpen={changeScreen} />
        )}
      />
    </View>
  )

  if (!todos.length) {
    content = (
      <View style={styles.imageWrapper}>
        <Image
          style={styles.image}
          source={{
            url: 'https://cdn.dribbble.com/users/2206859/screenshots/4959690/confetti_lr_prev1_2.gif'
          }}
        />
      </View>
    )
  }

  return (
    <View>
      <AddTodo onSubmit={addTodo} />
      {content}
    </View>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: -30,
    paddingVertical: 10,
    height: 300
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  errorWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 100
  },
  error: {
    fontSize: 20,
    color: THEME.DANGER_COLOR,
    marginBottom: 20
  }
})
