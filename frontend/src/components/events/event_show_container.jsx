import { connect } from 'react-redux';
import { getEvent, deleteEvent } from '../../actions/event_actions';
import EventShow from './event_show';
import { fetchEventPosts, deletePost } from '../../actions/post_actions';
import {
  fetchEventReservations, destroyReservation
} from '../../actions/reservation_actions';
import {
  fetchEventTodos,
  deleteTodo,
} from "../../actions/todo_actions";
import "./events.css";

const mSTP = (state, ownProps) => {
    return {
      event: state.events,
      session: state.session,
      posts: state.posts,
      reservations: state.reservations.event,
      todos: state.todos
    //   [ownProps.match.params.id]
    };
    
}


const mDTP = dispatch => ({
    getEvent: id => dispatch(getEvent(id)),
    fetchEventPosts : eventId => dispatch(fetchEventPosts(eventId)),
    deleteEvent: id => dispatch(deleteEvent(id)),
    fetchEventTodos : eventId => dispatch(fetchEventTodos(eventId)),
    deleteTodo: id => dispatch(deleteTodo(id)),
    deletePost: id => dispatch(deletePost(id)),
    destroyReservation: id => dispatch(destroyReservation(id)),
    fetchEventReservations: eventId => dispatch(fetchEventReservations(eventId))
});

export default connect(mSTP, mDTP)(EventShow);