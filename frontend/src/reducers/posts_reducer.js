import { RECEIVE_EVENT_POSTS, RECEIVE_POST } from "../actions/post_actions";


const PostsReducer = (
    state = { all: {}, user: {}, new: undefined },
    action 
    ) => {
      Object.freeze(state);
      let newState = Object.assign({}, state);
      // debugger;
      switch(action.type) {
        case RECEIVE_EVENT_POSTS: 
          // for (let i = 0; i < action.posts.data.length; i++ ) {
          //   newState.all[i + 1] = action.posts.data[i];
          // }
          newState.all = action.posts.data
          return newState;
        case RECEIVE_POST:
          newState.all.push(action.post.data);
          return newState;
        default: 
          return state;
      }
};

export default PostsReducer;