import Input from './components/Input'
import List from './components/List'
import Footer from './components/Footer'

import './App.css'
export default function App() {
  return(
    <div className="app-container">
      <h1>todos</h1>
      <Input/>
      <List/>
      <Footer/>
    </div>
  )
}