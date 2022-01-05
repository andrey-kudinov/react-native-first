import { useState } from 'react'
import * as Font from 'expo-font'
import AppLoading from 'expo-app-loading'
import { TodoState } from './src/context/todo/TodoState'
import { ScreenState } from './src/context/screen/ScreenState'
import { MainLayout } from './src/MainLayout'

async function loadApplication() {
  await Font.loadAsync({
    'Mont-Regular': require('./assets/fonts/Mont-Regular.ttf'),
    'Mont-Bold': require('./assets/fonts/Mont-Bold.ttf')
  })
}

export default function App() {
  const [isReady, setIsReady] = useState(false)

  if (!isReady) {
    return (
      <AppLoading
        startAsync={loadApplication}
        onError={err => console.log(err)}
        onFinish={() => setIsReady(true)}
      />
    )
  }

  return (
    <ScreenState>
      <TodoState>
        <MainLayout />
      </TodoState>
    </ScreenState>
  )
}
