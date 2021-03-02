import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.css'

export default function Footer(props) {
  
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

  const { todos, onDeleteCompleted } = props
  // 获取到数据后，分别获取到全部、已完成、未完成数据的条数
  const len = todos.length
  const completedTodos = todos.filter(todo => {
    return todo.done
  })
  const completedLen = completedTodos.length
  const inCompletedLen = len - completedLen

 
  return (
    <div className="footer-container">
      <button onClick= {showAll }>全部 <span>{ len }</span> 条</button>
      <button onClick={ showCompleted }>已完成 <span>{ completedLen }</span> 条</button>
      <button onClick={ showIncompleted }>未完成 <span>{ inCompletedLen }</span> 条</button>
      <button onClick={ onDeleteCompleted }>删除已完成</button>
    </div>
  )
} 