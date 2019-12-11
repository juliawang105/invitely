import React from 'react';

class TodoItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = this.props.todo;
    // this.handleSubmit = this.handleSubmit.bind(this);
    this.changeStatus = this.changeStatus.bind(this);
    // this.handleDelete = this.handleDelete.bind(this);
  }

  changeStatus(e) {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    // debugger;
    
    let task = {
      event: this.state.event,
      body: this.state.body,
      done: value,
      _id: this.state._id
    };
    // console.log(task)
    this.setState({done: value})
    this.props
      .updateTodo(task)
      // .then(res => console.log(res))
      .catch(err => console.log(err));
  }

  render() {
    let todo = this.props.todo;
    // console.log(this.state);
    return (
      <div className="todo-item">
        <div>
          <input
            name="done"
            type="checkbox"
            checked={this.state.done}
            onChange={this.changeStatus} 
            className="todo-checkbox"
          />
          <span className="todo-body"> 
            {todo.body}
          </span>
        </div>
        <div onClick={() => this.props.deleteTodo(todo._id)} className="x-todo">
          <i className="fas fa-times"></i>
        </div>
      </div>
    )
  }
}

export default TodoItem