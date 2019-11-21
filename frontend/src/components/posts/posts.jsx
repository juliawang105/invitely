import React from "react";
import PostItem from "./post_item";
import * as PostsCss from "./posts.css";
import EventMap from './event_map';

class Posts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      post: {
        body: "",
      }
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    let event = this.props.event.new;
    
    this.props
      .fetchEventPosts(event._id)
      .then(() => this.setState({ loaded: true }));
  }


  update() {
    return e =>
      this.setState({
        post: {
          body: e.currentTarget.value,
          event: this.props.event.new._id,
          user: this.props.user.id,
          authorFirst: this.props.user.firstName,
          authorLast: this.props.user.lastName
        }
      });
  }

  handleSubmit(e) {
    e.preventDefault();
    let post = this.state.post;
    console.log(post);
    this.props.createPost(post);
    this.setState({ post: {body: ""} });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    let posts = this.props.posts.all;
    let event = this.props.event.new;
    // console.log(event);

    // debugger
    return (
    
      <div className="posts">
        <div>
          <ul>
            {posts.map(post => {
              return <PostItem post={post} key={post._id} />;
            })}
          </ul>
            <div>
              <EventMap event={event}/>
            </div>
          <form onSubmit={this.handleSubmit}>
            <textarea
              cols="30"
              rows="5"
              value={this.state.post.body}
              onChange={this.update()}
            ></textarea>
            <br/>
            <input type="submit" value="Post!" />
          </form>
        </div>
      </div>
    );
  }
}

export default Posts;