import React, { Component } from 'react'

export default class TodoItem extends Component {
  render() {
    const { todo, onDelete } = this.props;
    return (
      <>
      <div className="container">
        <h1>{todo.title}</h1>
        <p>{todo.desc}</p>
        <button className="btn btn-sm btn-danger" onClick={()=>{onDelete(todo)}}>Delete</button>
      </div>
      </>
    )
  }
}