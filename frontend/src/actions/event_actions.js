import * as EventAPIUtil from "../util/event_api_util";
// import jwt_decode from "jwt-decode";

export const RECEIVE_EVENTS = "RECEIVE_EVENTS";
export const RECEIVE_EVENT = "RECEIVE_EVENT";
export const RECEIVE_USER_EVENTS = "RECEIVE_USER_EVENTS";
export const REMOVE_EVENT = "REMOVE_EVENT";
// export const RECEIVE_USER_RESERVATION_EVENT =
//          "RECEIVE_USER_RESERVATION_EVENT";

const receiveEvents = events => ({
    type: RECEIVE_EVENTS,
    events
});

const receiveEvent = event => ({
    type: RECEIVE_EVENT,
    event
});

const receiveUserEvents = events => ({
    type: RECEIVE_USER_EVENTS,
    events
});

const removeEvent = event => ({
    type: REMOVE_EVENT,
    event
})

export const deleteEvent = id => dispatch => {
    return EventAPIUtil.deleteEvent(id)
        .then(event => dispatch(removeEvent(event)))
        .catch(err => console.log(err));
}


export const getEvents = () => dispatch =>
    EventAPIUtil.getEvents()
        .then(events => {
            dispatch(receiveEvents(events));
        })
        .catch(err => console.log(err));

export const getEvent = id => dispatch =>
    EventAPIUtil.getEvent(id)
        .then(event => {
            if (new Date(event.data.end_time) >= new Date()) {
              dispatch(receiveEvent(event));
            }
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


export const fetchUserEvents = id => dispatch =>
    EventAPIUtil.getUserEvents(id)
        .then(events => {
            // console.log(events);
            dispatch(receiveUserEvents(events));
        })
        .catch(err => console.log(err));


                    // let filteredEvents = {};
                    // events.map(event => {
                    //   if (new Date(event.data.end_time) >= new Date()) {
                    //     filteredEvents;
                    //   }
                    // });