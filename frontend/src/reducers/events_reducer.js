import { RECEIVE_EVENT, RECEIVE_EVENTS, RECEIVE_USER_EVENTS } from "../actions/event_actions";
import { RECEIVE_USER_LOGOUT } from "../actions/session_actions";
import { RECEIVE_USER_RESERVATIONS } from "../actions/reservation_actions";

const EventsReducer = (
    state = { all: {}, user: [], new: undefined },
    action 
) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
      case RECEIVE_EVENTS:
        newState.all = action.events.data;
        return newState;

      case RECEIVE_USER_EVENTS:
        let filteredEvents = action.events.data.filter(event =>
          new Date(event.end_time) >= new Date()
        );
        newState.all = filteredEvents;
        return newState;
      case RECEIVE_EVENT:
        newState.new = action.event.data;
        newState.user.push(action.event.data);
        return newState;
      case RECEIVE_USER_LOGOUT:
        newState = { all: {}, user: [], new: undefined };
        return newState;
      case RECEIVE_USER_RESERVATIONS:
        newState.user = [];
        return newState;
      default:
        return state;
    }
};

export default EventsReducer; 