import { Text, StyleSheet } from 'react-native'

export const AppTextBold = props => (
  <Text style={{ ...styles.default, ...props.style }}>{props.children}</Text>
)

const styles = StyleSheet.create({
  default: {
    fontFamily: 'Mont-Bold'
  }
})
