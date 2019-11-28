import * as TodoAPIUtil from '../util/todo_api.util';
import Axios from 'axios';

export const RECEIVE_EVENT_TODOS = "RECEIVE_EVENT_TODOS";
export const RECEIVE_TODO = "RECEIVE_TODO";
export const REMOVE_TODO = 'REMOVE_TODO';

const receiveEventTodos = todos => ({
  type: RECEIVE_EVENT_TODOS,
  todos
});

const receiveTodo = todo => ({
  type: RECEIVE_TODO,
  todo
});

const removeTodo = todo => {
  return {
    type: REMOVE_TODO,
    todo
  };
};

export const fetchEventTodos = eventId => dispatch => {
  return TodoAPIUtil.fetchEventTodos(eventId)
    .then( todos => dispatch(receiveEventTodos(todos)) )
    .catch(err => console.log(err));
};

export const createTodo = data => dispatch => {
  return TodoAPIUtil.createTodo(data)
    .then( todo => dispatch(receiveTodo(todo)))
    .catch( err => console.log(err));
};

export const updateTodo = data => dispatch => {
  return TodoAPIUtil.updateTodo(data)
    .then(todo => dispatch(receiveTodo(todo)))
    .catch(err => console.log(err));
};

export const getTodo = id => dispatch => {
  return TodoAPIUtil.getTodo(id) 
    .then(todo => dispatch(receiveTodo(todo)))
    .catch(err => console.log(err));
};

export const deleteTodo = id => dispatch => {
  return TodoAPIUtil.deleteTodo(id)
    .then((todo) => dispatch(removeTodo(todo)))
    .catch(err => console.log(err));
}