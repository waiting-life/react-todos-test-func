import React from 'react'
import PubSub from 'pubsub-js'
import { useHistory } from 'react-router-dom'
import './index.css'

const { useState } = React
export default function Footer() {
  const history = useHistory()
  function showAll() {
    history.push('/')
  }
  function showCompleted() {
    history.push('/completed')
  }
  function showIncompleted() {
    history.push('/inCompleted')
  }
  const [todos, setTodos] = useState()
  
  PubSub.subscribe('todos', (_, data) => {
    setTodos(data)
  })
  // console.log(todos)
  function deleteCompleted() {
    const newTodos = todos.filter((todo) => {
      return !todo.done
    })
    console.log(newTodos)
    PubSub.publish('newTodos', newTodos)
  }
  return (
    <div className="footer-container">
      <button onClick={ showAll }>显示全部</button>
      <button onClick={ showCompleted }>显示已完成</button>
      <button onClick={ showIncompleted }>显示未完成</button>
      <button onClick={ deleteCompleted }>删除已完成</button>
    </div>
  )
} 