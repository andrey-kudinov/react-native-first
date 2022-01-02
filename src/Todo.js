import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

export const Todo = ({ todo, onRemove }) => {
  const handleLongPress = () => {
    onRemove(todo.id)
  }
  return (
    <TouchableOpacity 
      activeOpacity={0.5}
      onPress={() => console.log('todo.id -', todo.id)}
      // onLongPress={onRemove.bind(null, todo.id)}
      // onLongPress={() => onRemove(todo.id)}
      onLongPress={handleLongPress}
    >
      <View style={styles.todo}>
        <Text>{todo.title}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    padding: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 5
  }
})