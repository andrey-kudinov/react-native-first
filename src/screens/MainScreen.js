import { View, Text, FlatList, StyleSheet, Image } from 'react-native'
import { AddTodo } from '../components/AddTodo'
import { Todo } from '../components/Todo'

export const MainScreen = ({ addTodo, todos, removeTodo, openTodo }) => {
  let content = (
    <FlatList
      keyExtractor={item => item.id}
      data={todos}
      renderItem={({ item }) => (
        <Todo todo={item} onRemove={removeTodo} onOpen={openTodo} />
      )}
    />
  )

  if (!todos.length) {
    content = (
      <View style={styles.imageWrapper}>
        {/* <Image
          style={styles.image}
          source={require('../../assets/no-todo.jpeg')}
        /> */}
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
  }
})
