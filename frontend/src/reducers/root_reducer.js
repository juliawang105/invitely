import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import events from "./events_reducer";
import posts from "./posts_reducer";
import reservations from "./reservations_reducer";
import todos from "./todos_reducer";

const RootReducer = combineReducers({
  errors,
  session,
  posts,
  events,
  reservations,
  todos
});

export default RootReducer;
