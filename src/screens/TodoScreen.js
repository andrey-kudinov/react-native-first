import { useState, useContext } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { FontAwesome, AntDesign } from '@expo/vector-icons'
import { AppCard } from '../components/base/AppCard'
import { EditModal } from '../components/EditModal'
import { THEME } from '../theme'
import { AppTextBold } from '../components/base/AppTextBold'
import { AppButton } from '../components/base/AppButton'
import { TodoContext } from '../context/todo/todoContext'
import { ScreenContext } from '../context/screen/screenContext'

export const TodoScreen = ({ goBack }) => {
  const {todos, updateTodo, removeTodo} = useContext(TodoContext)
  const {todoId, changeScreen} = useContext(ScreenContext)
  const [modal, setModal] = useState(false)

  const todo = todos.find(todo => todo.id === todoId)

  const handleSave = title => {
    updateTodo(todo.id, title)
    setModal(false)
  }

  return (
    <View>
      <EditModal
        value={todo.title}
        visible={modal}
        onCancel={() => setModal(false)}
        onSave={handleSave}
      />

      <AppCard style={styles.card}>
        <AppTextBold style={styles.title}>{todo.title}</AppTextBold>
        <AppButton onPress={() => setModal(true)}>
          <FontAwesome name='edit' size={20} />
        </AppButton>
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <AppButton onPress={() => changeScreen(null)} color={THEME.GREY_COLOR}>
            <AntDesign name='back' color='#fff' size={20} />
          </AppButton>
        </View>
        <View style={styles.button}>
          <AppButton
            onPress={() => removeTodo(todo.id)}
            color={THEME.DANGER_COLOR}
          >
            <FontAwesome name='remove' color='#fff' size={20} />
          </AppButton>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  button: {
    width: Dimensions.get('window').width / 3
  },
  title: {
    fontSize: 20
  },
  card: {
    marginBottom: 20,
    padding: 15
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingRight: 10
  }
})
