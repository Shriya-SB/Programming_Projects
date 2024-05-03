import React, { Component } from 'react'

export default class AddTodo extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            desc: ''
        }
    }

    onChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value })
    }
    handleSubmit = (e) => {
        const { addTodo } = this.props;
        e.preventDefault()
        const {title, desc} = this.state
        addTodo(title, desc)
        this.setState({title: "", desc: ""})
    }
    render() {
        return (
            <>
                <div className="container">
                    <h1 className='text-center'>Add Todo</h1>
                    <form onSubmit={this.handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Todo Title</label>
                            <input name="title" onChange={ this.onChange } value={ this.state.title } type="text" className="form-control" id="title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="desc" className="form-label">Todo Description</label>
                            <textarea name="desc" onChange={ this.onChange } value={ this.state.desc } type='text' className="form-control" id="desc" rows="3" />
                        </div>
                        <button className="btn btn-success">Add Todo</button>
                    </form>
                </div>
            </>
        )
    }
}