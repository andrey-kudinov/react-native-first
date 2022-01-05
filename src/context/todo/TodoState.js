import { useReducer, useContext } from 'react'
import { TodoContext } from './todoContext'
import { ScreenContext } from '../screen/screenContext'
import { todoReducer } from './todoReducer'
import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '../types'

export const TodoState = ({ children }) => {
  const initialState = {
      todos: [...Array(2)].map((n, i) => ({
        id: i + 1,
        title: String((i + 1) * 1000)
      }))
    },
    { changeScreen } = useContext(ScreenContext),
    [state, dispatch] = useReducer(todoReducer, initialState)

  const addTodo = title => dispatch({ type: ADD_TODO, title }),
    removeTodo = id => {
      changeScreen(null)
      dispatch({ type: REMOVE_TODO, id })
    },
    updateTodo = (id, title) => dispatch({ type: UPDATE_TODO, id, title })

  return (
    <TodoContext.Provider
      value={{ todos: state.todos, addTodo, removeTodo, updateTodo }}
    >
      {children}
    </TodoContext.Provider>
  )
}
