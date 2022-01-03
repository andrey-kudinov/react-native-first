import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { THEME } from '../theme'
import { AppText } from '../components/base/AppText'

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
        <AppText>{todo.title}</AppText>
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
