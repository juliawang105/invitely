import {
  RECEIVE_EVENT_ERRORS,
  RECEIVE_EVENTS,
  RECEIVE_EVENT,
  RECEIVE_USER_EVENTS
} from "../actions/event_actions";

const _nullErrors = [];

const EventsErrorsReducer = (state = _nullErrors, action) => {
  Object.freeze(state);
  switch (action.type) {
    case RECEIVE_EVENT_ERRORS:
      return action.errors;
    case RECEIVE_EVENTS:
      return _nullErrors;
    case RECEIVE_EVENT:
      return _nullErrors;
    case RECEIVE_USER_EVENTS:
      return _nullErrors;
    default:
      return state;
  }
};

export default EventsErrorsReducer;
