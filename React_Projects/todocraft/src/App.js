import React, { Component } from 'react'
import Navbar from './Components/Navbar'
import Todos from './Components/Todos'
import AddTodo from './Components/AddTodo'
import { BrowserRouter as Router } from 'react-router-dom'

export default class App extends Component {
  constructor() {
    super()
    let initTodo;
    if (localStorage.getItem('todos') === null) {
      initTodo = []
    }
    else {
      initTodo = JSON.parse(localStorage.getItem('todos'))
    }
    this.state = {
      todos: initTodo
    }
  }
  onDelete = (todo) => {
    this.setState((prevState) => ({
      todos: prevState.todos.filter((e) => {
        return e !== todo
      })
    }), () => { localStorage.setItem('todos', JSON.stringify(this.state.todos)) })
  }
  addTodo = (title, desc) => {
    let sno;
    const { todos } = this.state;
    if (todos.length === 0) {
      sno = 0
    }
    else {
      sno = todos[todos.length - 1].sno + 1
    }
    const myTodo = {
      title: title,
      desc: desc,
      sno: sno
    }

    this.setState((prevState) => ({
      todos: [...prevState.todos, myTodo]
    }), () => { localStorage.setItem('todos', JSON.stringify(this.state.todos)) })
  }
  render() {
    const { todos } = this.state
    return (
      <>
        <Router>
          <Navbar />
          <AddTodo addTodo={ this.addTodo } />
          <Todos onDelete={ this.onDelete } todos={ todos } />
        </Router>
      </>
    )
  }
}
