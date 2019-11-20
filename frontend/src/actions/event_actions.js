import * as EventAPIUtil from "../util/event_api_util";
// import jwt_decode from "jwt-decode";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";

const receiveEvents = events => ({
    type: RECEIVE_EVENTS,
    events
});

const receiveEvent = event => ({
    type: RECEIVE_EVENT,
    event
});

export const getEvents = () => dispatch =>
    EventAPIUtil.getEvents()
        .then(events => dispatch(receiveEvents(events)))
        .catch(err => console.log(err))

export const getEvent = id => dispatch =>
    EventAPIUtil.getEvent(id)
        .then(event => {
            dispatch(receiveEvent(event))
        })
        .catch(err => console.log(err));

export const createEvent = event => dispatch =>
         EventAPIUtil.createEvent(event)
           .then(event => dispatch(receiveEvent(event)))
           .catch(err => console.log(err));

export const updateEvent = event => dispatch =>
    EventAPIUtil.updateEvent(event)
        .then(event => dispatch(receiveEvent(event)))
        .catch(err => console.log(err));
