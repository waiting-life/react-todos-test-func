import React from 'react'
import PubSub from 'pubsub-js'
import { Switch, Route, Redirect } from 'react-router-dom'

import './index.css'
export default function List() {
  const [todos, setTodos] = React.useState([])
  React.useEffect(() => {
    PubSub.subscribe('addTodo', (_, todo) => {
      let newTodos
      newTodos = [todo, ...todos]
      setTodos(newTodos)
      // console.log(todos)
    })
  }, [todos])


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
                  <li key={todo.id} className="todo">
                    <div className="todo-box">
                      <input type="checkbox" onChange={() => handleToggle(todo.id)} className="todo-toggle" />
                      <span className="todo-content">{todo.value}</span>
                    </div>
                    <button onClick={() => deleteTodo(index)}>删除</button>
                  </li>
                )
              })
            }
          </Route>
          <Route path="/completed">
            {
              todos.map((todo, index) => {
                if (todo.done) {
                  return (
                    <li key={todo.id} className="todo">
                      <div className="todo-box">
                        <input type="checkbox" onChange={() => handleToggle(todo.id)} className="todo-toggle" />
                        <span className="todo-content">{todo.value}</span>
                      </div>
                      <button onClick={() => deleteTodo(index)}>删除</button>
                    </li>
                  )
                }
              })
            }
          </Route>
          <Route path="/inCompleted">
            {
              todos.map((todo, index) => {
                if (!todo.done) {
                  return (
                    <li key={todo.id} className="todo">
                      <div className="todo-box">
                        <input type="checkbox" onChange={() => handleToggle(todo.id)} className="todo-toggle" />
                        <span className="todo-content">{todo.value}</span>
                      </div>
                      <button onClick={() => deleteTodo(index)}>删除</button>
                    </li>
                  )
                }
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
