import React from 'react';
import EventMap from './event_map';


class PostItem extends React.Component {

  render() {
    // console.log(this.props.post)
    let date = new Date(this.props.post.date).toDateString();
    let time = new Date(this.props.post.date).toLocaleTimeString();
    return (
      <div>
        {date} {time}
        <br/>
        {this.props.post.authorFirst} {this.props.post.authorLast}: {this.props.post.body}
        <br/>
        <br/>
        
      </div>
    );
  }
}

export default PostItem