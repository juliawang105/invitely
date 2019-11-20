import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
import reservations from "./reservations_reducer";

const RootReducer = combineReducers({
  errors,
  session,
  reservations
});

export default RootReducer;
