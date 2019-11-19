import {RECEIVE_EVENT, RECEIVE_EVENTS } from "../actions/event_actions";

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
        
        case RECEIVE_EVENT:
            newState.new = action.tweet.data; 
            return newState;
        
        default:
            return state; 
    }
};

export default EventsReducer; 