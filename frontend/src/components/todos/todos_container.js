import { connect } from "react-redux";
import Todo from "./todos";
import {fetchEventTodos,
        createTodo,
        updateTodo,
        deleteTodo,
} from "../../actions/todo_actions";
import "./todos.scss";

const mSTP = (state, ownProps) => {
  return {
    event: state.events.new,
    user: state.session.user,
    todos: state.todos
  };
};

const mDTP = dispatch => ({
  fetchEventTodos: id => dispatch(fetchEventTodos(id)),
  createTodo: id => dispatch(createTodo(id)),
  updateTodo: data => dispatch(updateTodo(data)),
  deleteTodo: data => dispatch(deleteTodo(data)),
});

export default connect (mSTP, mDTP)(Todo);