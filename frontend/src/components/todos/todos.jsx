import React from "react";
import TodoItem from "./todo_item";
import CreateTodo from "./create_todo";

class Todo extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      todo: {
        event: this.props.event._id,
        body: "",
        done: false,
      }
    };

    this.createTodo = this.createTodo.bind(this);
  }

  componentDidMount() {
    this.props.fetchEventTodos(this.props.event._id)
      .then(() => this.setState({loaded: true}));
  }

  createTodo(e) {
    e.preventDefault();
    const todo = this.state.todo;
    this.props.createTodo(todo)
      .then(() => this.setState({
        todo: {
          event: this.props.event._id,
          body: "",
          done: false, 
        } 
      }));
  }

  handleInput() {
    return e => {
      this.setState({
        todo: {
          event: this.props.event._id,
          body: e.target.value,
          done: false,
        }
      });
    };
  }

  render() {

    if (!this.state.loaded) {
      return null;
    }

    let todos = this.props.todos.event;

    todos.sort(function (x, y) {
      // true values first
      // return (x === y) ? 0 : x ? -1 : 1;
      // false values first
      return (x.done === y.done) ? 0 : x.done ? 1 : -1;
    });

    return (
      <div className="todos">
        <h2 className="todos-title bold">To-do List</h2>
        <div className="reservation-form-box">
          <form
            onSubmit={this.createTodo}
            className="create-reservation-form"
          >
            <input
              type="text"
              value={this.state.todo.body}
              onChange={this.handleInput()}
              className="reservation-text-box"
              placeholder="Add a task"
            />
            <input
              type="submit"
              value="Add Task"
              className="reservation-button"
            />
          </form>
        </div>
        {todos.map(todo => {
          return <TodoItem 
            todo = {todo}
            key= {todo._id}
            deleteTodo = {this.props.deleteTodo}
            updateTodo = {this.props.updateTodo}
          />
        })}
      </div>
    )
  }
}

export default Todo