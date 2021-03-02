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

  // 定义变量保存接收到的todos
  const [todos, setTodos] = useState([])
  // Footer组件接收到从List组件发布的消息
  PubSub.subscribe('todos', (_, data) => {
    setTodos(data)
  })
  // 获取到数据后，分别获取到全部、已完成、未完成数据的条数
  const len = todos.length
  const completedTodos = todos.filter(todo => {
    return todo.done
  })
  const completedLen = completedTodos.length
  const inCompletedLen = len - completedLen

  // 删除已完成的数据项
  function deleteCompleted() {
    // 过滤出已完成数据
    const newTodos = todos.filter((todo) => {
      return !todo.done
    })
    // 发布给List组件，并且把删除了已完成得到的新数据带给List组件
    PubSub.publish('newTodos', newTodos)
  }
  return (
    <div className="footer-container">
      <button onClick={showAll}>全部 <span>{ len }</span> 条</button>
      <button onClick={showCompleted}>已完成 <span>{ completedLen }</span> 条</button>
      <button onClick={showIncompleted}>未完成 <span>{ inCompletedLen }</span> 条</button>
      <button onClick={ deleteCompleted }>删除已完成</button>
    </div>
  )
} 