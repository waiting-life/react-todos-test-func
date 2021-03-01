import React from 'react'
import { useHistory } from 'react-router-dom'
import './index.css'

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
  return (
    <div className="footer-container">
      <button onClick={ showAll }>全部</button>
      <button onClick={ showCompleted }>已完成</button>
      <button onClick={ showIncompleted }>未完成</button>
      <button>删除已完成</button>
    </div>
  )
} 