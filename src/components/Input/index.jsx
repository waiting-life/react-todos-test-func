import React from 'react'
import { nanoid } from 'nanoid'
import PubSub from 'pubsub-js'

import './index.css'
export default function Input() {
  const [ value, setValue ] = React.useState('')
  // const [ todo, setTodo ] = React.useState({ id: nanoid(), value })
  function handleChange(e) {
    setValue(e.target.value)
  }
  function addTodo(e) {
    if (e.keyCode === 13 && value) {
      // console.log(value)
      // setTodo({ id: nanoid(), value })
      // console.log(todo)
      PubSub.publish('addTodo', { id: nanoid(), value, done: false })
      setValue('')
    }
    
    // if(e.code === 'Enter' && value) {
    //   console.log(e)
    // }
  }
  return (
    <div className="input-constainer">
      <input type="text" value={ value } placeholder="请输入内容..." onChange={ handleChange } onKeyUp={ addTodo }/>
    </div>
  )
}