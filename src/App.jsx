import React from 'react'
import Input from './components/Input'
import List from './components/List'
import Footer from './components/Footer'
import { nanoid } from 'nanoid'

import './App.css'
const { useState } = React
export default function App() {
  const [todos, setTodos] = useState([])
  function addTodo(e, value) {
    if (e.keyCode === 13 && value) {
      setTodos([ {id: nanoid(), value, done: false }, ...todos ])
    }
  }

  // 点击切换为已完成状态部分
  function handleToggle(id) {
    let newTodos = [...todos]
    for( let todo of newTodos ) {
      if(todo.id === id) {
        todo.done = !todo.done
      }
    }
    setTodos(newTodos)
  }
  // 删除todo部分
  function deleteTodo(index) {
    let newTodos = [...todos]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }

  // 删除已完成选项
  function deleteCompleted() {
    const newTodos = todos.filter(todo => {
      return !todo.done
    })
    setTodos(newTodos)
  }

  return(
    <div className="app-container">
      <h1>todos</h1>
      <Input OnAddtodo={ addTodo } />
      <List todos={ todos } onToggle={ handleToggle } onDelete={ deleteTodo }/>
      <Footer todos={todos} onDeleteCompleted={ deleteCompleted }/>
    </div>
  )
}