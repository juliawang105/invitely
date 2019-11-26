import { connect } from "react-redux";
import { getEvent } from "../../actions/event_actions";
import { fetchEventPosts, createPost } from "../../actions/post_actions";
import Posts from './posts';


const mSTP = (state, ownProps) => {
  return {
    event: state.events,
    posts: state.posts,
    user: state.session.user
    //   [ownProps.match.params.id]
  };
};

const mDTP = dispatch => ({
  getEvent: id => dispatch(getEvent(id)),
  fetchEventPosts: id => dispatch(fetchEventPosts(id)),
  createPost: data => dispatch(createPost(data))
});

export default connect(mSTP, mDTP)(Posts);
