import React from 'react'
import PubSub from 'pubsub-js'
import { Switch, Route } from 'react-router-dom'

import './index.css'

const { useState } = React
export default function List() {
  const [todos, setTodos] = useState([])
  // 收到增加数据的消息
  PubSub.subscribe('addTodo', (_, todo) => {
    let newTodos = [todo, ...todos]
    setTodos(newTodos)
  })

  // 和Footer组件通信
  PubSub.publish('todos', todos)
  // 接收到触发删除已完成事件的新数据 
  PubSub.subscribe('newTodos', (_, data) => {
    setTodos(data)
  }) 

  function deleteTodo(index) {
    let newTodos = [ ...todos ]
    newTodos.splice(index, 1)
    setTodos(newTodos)
  }
  // let [ done, setDone ] = React.useState(false)
  function handleToggle(id) {
    let newTodos = todos.slice()
    for (let todo of newTodos) {
      if (todo.id === id) {
        todo.done = !todo.done;
      }
    }
    setTodos(newTodos)
  }
  // const location = useLocation()
  return (
    <ul className="list-container">
      {/* {
        todos.map((todo, index) => {
          // console.log(todo.id)
          return (
            <li key={ todo.id } className="todo">
              <div className="todo-box">
                <input type="checkbox" onChange={ () => handleToggle(todo.id) } className="todo-toggle"/>
                <span className="todo-content">{ todo.value }</span>
              </div> 
              <button onClick={ () => deleteTodo(index) }>删除</button>
            </li>
          )
        })
      } */}
      {
        <Switch>
          <Route path="/" exact>
            { 
              todos.map((todo, index) => {
                return(
                  <li key={ todo.id } className="todo">
                    <div className="todo-box">
                      <input type="checkbox" checked={ todo.done } onChange={ () => handleToggle(todo.id) } className="todo-toggle" />
                      <span className="todo-content">{ todo.value }</span>
                    </div>
                    <button onClick={ () => deleteTodo(index) }>删除</button>
                  </li>
                )
              })
            }
          </Route>
          <Route path="/completed">
            {
              todos.map((todo, index) => {
                return todo.done ? (
                  <li key={ todo.id } className="todo">
                    <div className="todo-box">
                      <input type="checkbox" checked={ todo.done } onChange={ () => handleToggle(todo.id) } className="todo-toggle" />
                      <span className="todo-content">{ todo.value }</span>
                    </div>
                    <button onClick={ () => deleteTodo(index) }>删除</button>
                  </li>
                ) : null 
                // if (todo.done) {
                //   return (
                //     <li key={todo.id} className="todo">
                //       <div className="todo-box">
                //         <input type="checkbox" onChange={() => handleToggle(todo.id)} className="todo-toggle" />
                //         <span className="todo-content">{todo.value}</span>
                //       </div>
                //       <button onClick={() => deleteTodo(index)}>删除</button>
                //     </li>
                //   )
                // } else {
                //   return null
                // }
              })
            }
          </Route>
          <Route path="/inCompleted">
            {
              todos.map((todo, index) => {
                return !todo.done ? (
                  <li key={ todo.id } className="todo">
                    <div className="todo-box">
                      <input type="checkbox" checked={ todo.done } onChange={ () => handleToggle(todo.id) } className="todo-toggle" />
                      <span className="todo-content">{ todo.value }</span>
                    </div>
                    <button onClick={ () => deleteTodo(index) }>删除</button>
                  </li>
                ) : null
                // if (!todo.done) {
                //   return (
                //     <li key={todo.id} className="todo">
                //       <div className="todo-box">
                //         <input type="checkbox" checked={todo.done} onChange={() => handleToggle(todo.id)} className="todo-toggle" />
                //         <span className="todo-content">{todo.value}</span>
                //       </div>
                //       <button onClick={() => deleteTodo(index)}>删除</button>
                //     </li>
                //   )
                // }
              })
            }
          </Route>
        </Switch>
      }
    </ul>
  )
}




// import React, { Component } from 'react'

// export default class Input extends Component {

//   constructor(props) {
//     super(props)
//     // this.handleClick = this.handleClick.bind(this)
//   }


//   handleClick = () => {
//     console.log(this)
//   }


//   render() {
//     return (
//       <div>
//         <a href="#" onClick={this.handleClick}>连接</a>
//       </div>
//     )
//   }
// }
