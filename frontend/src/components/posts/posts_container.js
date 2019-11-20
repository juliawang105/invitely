import { connect } from "react-redux";
import { getEvent } from "../../actions/event_actions";
import { fetchEventPosts } from "../../actions/post_actions";
import Posts from './posts';

const mSTP = (state, ownProps) => {
  // debugger
  return {
    event: state.events,
    posts: state.posts
    //   [ownProps.match.params.id]
  };
};

const mDTP = dispatch => ({
  getEvent: id => dispatch(getEvent(id)),
  fetchEventPosts: id => dispatch(fetchEventPosts(id))
});

export default connect(mSTP, mDTP)(Posts);
