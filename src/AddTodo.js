import { View, StyleSheet, TextInput, Button } from 'react-native'

export const AddTodo = ({ onSubmit }) => {
  const handlePress = () => {
    onSubmit('test todo')
  }

  return (
    <View style={styles.block}>
      <TextInput style={styles.input}/>
      <Button title='Add' onPress={handlePress}/>
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