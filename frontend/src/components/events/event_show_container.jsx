import { connect } from 'react-redux';
import { getEvent } from '../../actions/event_actions';
import EventShow from './event_show';
import { fetchEventPosts } from '../../actions/post_actions';

const mSTP = (state, ownProps) => {
    // debugger
    return {
      event: state.events,
      session: state.session,
      posts: state.posts,
    //   [ownProps.match.params.id]
    };
    
}


const mDTP = dispatch => ({
    getEvent: id => dispatch(getEvent(id)),
    fetchEventPosts : eventId => dispatch(fetchEventPosts(eventId)),
});

export default connect(mSTP, mDTP)(EventShow)