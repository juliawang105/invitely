import { RECEIVE_EVENT_TODOS, RECEIVE_TODO, REMOVE_TODO } from "../actions/todo_actions";

const TodosReducer = (
  state = {all: {}, event: [], new: undefined},
  action
  ) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    
    switch(action.type) {
      case RECEIVE_EVENT_TODOS: 
        newState.event = action.todos.data;
        return newState;
      case RECEIVE_TODO:
        let task = action.todo.data;
        let ids = [];
        for (let i = 0; i < newState.event.length; i++) {
          ids.push(newState.event[i]._id);
        }
        if (!ids.includes(task._id)) {
          newState.event.unshift(task);
        }
        return newState;
      case REMOVE_TODO: 
        let task2 = action.todo.data;
        let idx;
        const BreakException = {};

        try {
          Object.values(newState.event).forEach((pojo, i) => {
            if (pojo._id === task2._id) {
              idx = i;
              throw BreakException;
            }
          });
        } catch (e) {
          if (e !== BreakException) throw e;
        }

        newState.event.splice(idx, 1);
        return newState;
      default:
        return state;
    }
}