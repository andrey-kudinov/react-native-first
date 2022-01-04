import { useState } from 'react'
import { View, StyleSheet, TextInput, Modal } from 'react-native'
import { THEME } from '../theme'
import { AppButton } from '../components/base/AppButton'

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
          <View style={styles.button}>
            <AppButton onPress={onCancel} color={THEME.DANGER_COLOR}>
              Cancel
            </AppButton>
          </View>
          <View style={styles.button}>
            <AppButton onPress={handleSave}>Save</AppButton>
          </View>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30
  },
  input: {
    padding: 10,
    borderBottomColor: THEME.MAIN_COLOR,
    borderBottomWidth: 2,
    width: '100%',
    fontSize: 20
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10
  },
  button: {
    width: '40%'
  }
})
