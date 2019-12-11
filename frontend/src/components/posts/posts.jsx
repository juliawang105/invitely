import React from "react";
import PostItem from "./post_item";
import * as PostsCss from "./posts.css";

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
   
    let navbar = document.querySelector(".nav-bar.orange");
    if (navbar) {
      navbar.classList.remove("orange");
    }
  

    let event = this.props.event.new;
    
    // this.props
    //   .fetchEventPosts(event._id)
    //   .then(() => 
      this.setState({ loaded: true });
      // );
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
    this.props.createPost(post);
    this.setState({ post: {body: ""} });
  }

  render() {
    if (!this.state.loaded) {
      return null;
    }

    let posts = this.props.posts.all;
    let event = this.props.event.new;
    return (
    
      <div className="posts">
        <h2 className="posts-title bold">Discussion</h2>
        
        <ul className="posts-list">
          {posts.map(post => {
            return <PostItem post={post} key={post._id} className="post-item-box" />;
          })}
        </ul>
          

        <form onSubmit={this.handleSubmit} className="post-form">
          <textarea
            rows="3"
            value={this.state.post.body}
            onChange={this.update()}
            className="post-text-box"
            placeholder="Write a message here"
          ></textarea>
          <input type="submit" value="Send Reply" className="post-button bold"/>
        </form>
  
      </div>
    );
  }
}

export default Posts;