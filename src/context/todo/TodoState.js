import { useReducer, useContext } from 'react'
import { Alert } from 'react-native'
import { TodoContext } from './todoContext'
import { ScreenContext } from '../screen/screenContext'
import { todoReducer } from './todoReducer'
import {
  ADD_TODO,
  FETCH_TODOS,
  REMOVE_TODO,
  SHOW_ERROR,
  CLEAR_ERROR,
  SHOW_LOADER,
  HIDE_LOADER,
  UPDATE_TODO
} from '../types'

export const TodoState = ({ children }) => {
  const initialState = {
      todos: [],
      loading: false,
      error: null
    },
    { changeScreen } = useContext(ScreenContext),
    [state, dispatch] = useReducer(todoReducer, initialState),
    baseUrl =
      'https://todo-63-default-rtdb.europe-west1.firebasedatabase.app/todos',
    url = `${baseUrl}.json`

  const addTodo = async title => {
    const options = {
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title })
    }

    const response = await fetch(url, options),
      data = await response.json()

    dispatch({ type: ADD_TODO, id: data.name, title })
  }

  const removeTodo = id => {
    const todo = state.todos.find(todo => todo.id === id)

    Alert.alert(
      'Remove todo',
      `Remove ${todo.title}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: async () => {
            const options = {
              method: 'DELETE',
              header: {
                'Content-Type': 'application/json'
              }
            }

            changeScreen(null)
            await fetch(`${baseUrl}/${id}.json`, options)

            dispatch({ type: REMOVE_TODO, id })
          }
        }
      ],
      { cancelable: false }
    )
  }

  const fetchTodos = async () => {
    showLoader()
    clearError()

    try {
      const options = {
        header: {
          'Content-Type': 'application/json'
        }
      }

      const response = await fetch(url, options),
        data = await response.json()

      const todos = Object.keys(data).map(key => ({ ...data[key], id: key }))

      dispatch({ type: FETCH_TODOS, todos })
    } catch (error) {
      showError('Fatal error!')
      console.log(error)
    } finally {
      hideLoader()
    }
  }

  const updateTodo = async (id, title) => {
    clearError()

    try {
      const options = {
        method: 'PATCH',
        header: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      }

      await fetch(`${baseUrl}/${id}.json`, options)
      dispatch({ type: UPDATE_TODO, id, title })
    } catch (error) {
      showError('Fatal error!')
      console.log(error)
    }
  }

  const showLoader = () => dispatch({ type: SHOW_LOADER })

  const hideLoader = () => dispatch({ type: HIDE_LOADER })

  const showError = error => dispatch({ type: SHOW_ERROR, error })

  const clearError = () => dispatch({ type: CLEAR_ERROR })

  return (
    <TodoContext.Provider
      value={{
        todos: state.todos,
        loading: state.loading,
        error: state.error,
        addTodo,
        removeTodo,
        updateTodo,
        fetchTodos
      }}
    >
      {children}
    </TodoContext.Provider>
  )
}
