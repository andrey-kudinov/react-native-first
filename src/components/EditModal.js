import { useState } from 'react'
import { View, Button, StyleSheet, TextInput, Modal } from 'react-native'
import { THEME } from '../theme'

export const EditModal = ({ visible, onCancel, value, onSave }) => {
  const [title, setTitle] = useState(value)

  const handleSave = () => {
    if (title.trim().length < 3) {
      Alert.alert('Error!', `Min length 3 char, now ${title.trim().length}`)
    } else {
      onSave(title)
    }
  }

  return (
    <Modal visible={visible} animationType='slide' transparent={false}>
      <View style={styles.wrapper}>
        <TextInput
          value={title}
          onChangeText={setTitle}
          style={styles.input}
          placeholder='Add something'
          autoCapitalize='none'
          autoCorrect={false}
          maxLength={64}
        />
        <View style={styles.buttons}>
          <Button
            title='Cancel'
            onPress={onCancel}
            color={THEME.DANGER_COLOR}
          />
          <Button title='Save' onPress={handleSave} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '80%'
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginTop: 10
  }
})
