import { combineReducers } from "redux";
import session from "./session_reducer";
import errors from "./errors_reducer";
// import tweets from "./tweets_reducer";
import events from "./events_reducer";

const RootReducer = combineReducers({
  errors,
  session,
  // tweets
  events
});

export default RootReducer;
