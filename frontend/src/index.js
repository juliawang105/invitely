import React from "react";
import ReactDOM from "react-dom";
import Root from "./components/root";
import configureStore from "./store/store";
import jwt_decode from "jwt-decode";
import { getEvent, getEvents, createEvent, updateEvent, deleteEvent } from "./actions/event_actions"
import { fetchEventPosts, createPost, updatePost } from "./actions/post_actions";
// import { fetchEventPosts, createPost } from "./util/post_api_util";
import { destroyReservation, reviseReservation } from "./actions/reservation_actions";
import { fetchEventTodos, createTodo, updateTodo, getTodo, deleteTodo} from "./actions/todo_actions";
import { setAuthToken } from "./util/session_api_util";
import { logout } from "./actions/session_actions";
import "./index.css";
import "./animate.css";


document.addEventListener("DOMContentLoaded", () => {
  let store;
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUser = jwt_decode(localStorage.jwtToken);
    const preloadedState = {
      session: { isAuthenticated: true, user: decodedUser }
  };

  store = configureStore(preloadedState);

  const currentTime = Date.now() / 1000;

    if (decodedUser.exp < currentTime) {
      store.dispatch(logout());
      // window.location.href = "/login";
    }
  } else {
    store = configureStore({});
  }
  const root = document.getElementById("root");

  // window.store = store;
  // window.getState = store.getState;
  // window.dispatch = store.dispatch;
  // window.getEvents = getEvents;
  // window.getEvent = getEvent; 
  // window.createEvent = createEvent; 
  // window.updateEvent = updateEvent; 
  // window.fetchEventPosts = fetchEventPosts;
  // window.createPost = createPost;
  // window.updatePost = updatePost;
  // window.destroyReservation = destroyReservation;
  // window.reviseReservation = reviseReservation;
  // window.createTodo = createTodo;
  // window.updateTodo = updateTodo;
  // window.deleteTodo = deleteTodo;
  // window.deleteEvent = deleteEvent;
  // window.fetchEventTodos = fetchEventTodos;
  // window.getTodo = getTodo;

  ReactDOM.render(<Root store={store} />, root);
});

// import React from 'react';
// import ReactDOM from 'react-dom';
// import './index.css';
// import App from './App';
// import * as serviceWorker from './serviceWorker';

// ReactDOM.render(<App />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();


