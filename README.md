# Invitely

## Background and Overview 
Invitely is an online event planning and organizational app that allows for easy management for hosts and for guests. This user-friendly app takes the stress out of planning and leaves only the joy and excitement for gathering. 

## Technology
Invitely is implemented using MERN stack (MongoDB, Express.js, React.js & Redux, and Node.js) to track users, events, posts, reservations, and to-do lists. Utilizing Google Maps API and Google Calendar, users can access exact location and directions to and from the event. Additionally, SendGrid allows hosts to automate emails according to the guest list for a streamlined planning process. 

# Features 
### Automatic Invitations 

![invite](https://i.pinimg.com/originals/59/94/41/599441e27013bdf91bd4a78ee1b2f902.gif)

### RSVP Real-Time Updates 
To make tracking of attendees easier, Invitely allows real-time RSVP updates. 
![rsvp](https://i.pinimg.com/originals/c5/63/d3/c563d32e737f25a86d7103a5c75846ec.gif)

### User Event Filtering 
We wanted to make the user's page is easy to read, and one of the features we built filters events by date and automatically removes events that have already passed. In order to achieve this, the events reducer was updated to allow for this happen. 
```javascript
const EventsReducer = (
    state = { all: {}, user: [], new: undefined }, action ) => {
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
	      case REMOVE_EVENT: 
	        delete newState.new;
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
```
### To-Do List 
The to-do list feature allows hosts to see what still needs to be completed for the event and check off completed tasks.
![todo](https://i.pinimg.com/originals/bf/e2/fa/bfe2fa4ac20b2720af12355ee05d9179.gif)


### Discussion 
Invitely allows for live discussions between guests for easy coordinating. 
![posts](https://i.pinimg.com/originals/81/1c/60/811c60e3560f472a1446c0b02c2ee0e4.png)
```javascript
router.post(
  "/event/:event_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validatePostInput(req.body);

    if (!isValid) {
      return res.status(400).json(errors);
    }

    const newPost = new Post({
      user: req.user.id,
      body: req.body.body,
      event: req.params.event_id,
      authorFirst: req.body.authorFirst,
      authorLast: req.body.authorLast,
    });

    newPost.save().then(post => res.json(post));
  }
);
```

