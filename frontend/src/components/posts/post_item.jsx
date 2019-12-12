import React from 'react';
import EventMap from './event_map';


class PostItem extends React.Component {

  render() {

    let date = new Date(this.props.post.date).toDateString();
    let time = new Date(this.props.post.date).toLocaleTimeString();
    let remove 

    let post = this.props.post;

    if (this.props.post.user === this.props.user.id) {
      remove = (
        <div onClick={() => this.props.delete(post._id)} className="x">
          <i className="fas fa-times"></i>
        </div>
      )
    }

    return (
      <div className="post-item">
        <div className="post-content-box">
          <div className="post-content">
            <div>
              <div className="post-time-info">
                {date} {time}
              </div>
              <span className="bold">
                {this.props.post.authorFirst} {this.props.post.authorLast}:{" "}
              </span>
              {this.props.post.body}
            </div>
            <div>
              {remove}
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default PostItem