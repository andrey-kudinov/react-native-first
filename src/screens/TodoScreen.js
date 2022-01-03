import { useState } from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { AppCard } from '../components/base/AppCard'
import { EditModal } from '../components/EditModal'
import { THEME } from '../theme'

export const TodoScreen = ({ goBack, todo, onRemove, onSave }) => {
  const [modal, setModal] = useState(false)

  const handleSave = title => {
    onSave(todo.id, title)
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
        <Text style={styles.title}>{todo.title}</Text>
        <Button title='Edit' onPress={() => setModal(true)} />
      </AppCard>
      <View style={styles.buttons}>
        <View style={styles.button}>
          <Button onPress={goBack} title='Back' color={THEME.GREY_COLOR} />
        </View>
        <View style={styles.button}>
          <Button
            onPress={() => onRemove(todo.id)}
            title='Remove'
            color={THEME.DANGER_COLOR}
          />
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
    width: '50%'
  },
  title: {
    fontSize: 20
  },
  card: {
    marginBottom: 20,
    padding: 15
  }
})
