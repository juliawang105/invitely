import { RECEIVE_EVENT_POSTS, RECEIVE_POST, REMOVE_POST } from "../actions/post_actions";


const PostsReducer = (
    state = { all: {}, user: {}, new: undefined },
    action 
    ) => {
      Object.freeze(state);
      let newState = Object.assign({}, state);
      switch(action.type) {
        case RECEIVE_EVENT_POSTS: 
          newState.all = action.posts.data;
          return newState;
        case RECEIVE_POST:
          newState.all.push(action.post.data);
          return newState;
        case REMOVE_POST:
          const post = action.post.data;
          let idx;
          const BreakException = {};

          try {
            Object.values(newState.all).forEach((pojo, i) => {
              if (pojo._id === post._id) {
                idx = i;
                throw BreakException;
              }
            });
          } catch (e) {
            if (e !== BreakException) throw e;
          }

          newState.all.splice(idx, 1);
          return newState;
        default: 
          return state;
      }
};

export default PostsReducer;