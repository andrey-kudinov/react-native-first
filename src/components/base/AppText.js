import { Text, StyleSheet } from 'react-native'

export const AppText = props => (
  <Text style={{ ...styles.default, ...props.style }}>{props.children}</Text>
)

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Mont-Regular'
  }
})
