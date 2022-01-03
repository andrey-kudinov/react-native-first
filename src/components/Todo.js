import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'
import { THEME } from '../theme'

export const Todo = ({ todo, onRemove, onOpen }) => {
  const handleLongPress = () => {
    onRemove(todo.id)
  }

  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => onOpen(todo.id)}
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
    borderColor: THEME.MAIN_COLOR,
    borderRadius: 5
  }
})
