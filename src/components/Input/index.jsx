import React from 'react'

import './index.css'
export default function Input(props) {
  const { OnAddtodo } = props
  const [ value, setValue ] = React.useState('')
  function handleChange(e) {
    setValue(e.target.value)
  }

  return (
    <div className="input-constainer">
      <input type="text" 
        value={ value } 
        placeholder="请输入内容..." 
        onChange={ handleChange } 
        onKeyUp={(e) => { 
          if (e.keyCode === 13 && value) {
            OnAddtodo(e, value); 
            setValue('') 
          }
        }}/>
    </div>
  )
}