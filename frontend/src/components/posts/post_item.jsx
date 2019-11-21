import React from 'react';

class PostItem extends React.Component {

  render() {
    // console.log(this.props.post)
    let date = new Date(this.props.post.date).toDateString();
    return (
      <div>
        {date}
        <br/>
        {this.props.post.authorFirst} {this.props.post.authorLast[0]}.: {this.props.post.body}
        <br/>
        <br/>
      </div>
    );
  }
}

export default PostItem