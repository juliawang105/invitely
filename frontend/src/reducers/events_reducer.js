import {RECEIVE_EVENT, RECEIVE_EVENTS, RECEIVE_USER_EVENTS } from "../actions/event_actions";

const EventsReducer = (
    state = { all: {}, user: {}, new: undefined },
    action 
) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch(action.type){
        case RECEIVE_EVENTS:
            newState.all = action.events.data;
            return newState; 

        case RECEIVE_USER_EVENTS:
            newState.all = action.events.data;
            return newState; 
        
        case RECEIVE_EVENT:
            // debugger
            newState.new = action.event.data; 
            return newState;
        
        default:
            return state; 
    }
};

export default EventsReducer; 