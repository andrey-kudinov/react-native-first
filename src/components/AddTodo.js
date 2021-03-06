import { useState } from 'react'
import { View, StyleSheet, TextInput, Button, Alert, Keyboard } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

export const AddTodo = ({ onSubmit }) => {
  const [value, setValue] = useState('')

  const handlePress = () => {
    if (value.trim()) {
      onSubmit(value)
      setValue('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Add something!')
    }
  }

  return (
    <View style={styles.block}>
      <TextInput 
        style={styles.input}
        // onChangeText={text => setValue(text)}
        onChangeText={setValue}
        value={value}
        placeholder='Todo name'
        autoCorrect={false}
        autoCapitalize='none'
        // keyboardType='...'
      />
      <AntDesign.Button name='plus' onPress={handlePress}>
        Add
      </AntDesign.Button>
      {/* <Button title='Add' onPress={handlePress}/> */}
    </View>
  )
}

const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15
  },
  input: {
    padding: 10,
    width: '70%',
    borderStyle: 'solid',
    borderBottomWidth: 2,
    borderBottomColor: '#3949ab'
  }
})