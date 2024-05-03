import React, { Component } from 'react'
import TodoItem from './TodoItem'

export default class Todos extends Component {
    render() {
        const { todos, onDelete } = this.props;
        return (
            <>
                <div className="container">
                    { todos.length === 0 ? "No todo to display!! Please add something to remove this message." :
                        todos.map((todo) => {
                            return <TodoItem key={ todo.sno } todo={ todo } onDelete={ onDelete } />
                        })
                    }
                </div>
            </>
        )
    }
}