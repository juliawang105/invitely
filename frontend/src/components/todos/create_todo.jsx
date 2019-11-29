import React from 'react';

class CreateTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: this.props.event._id,
      body: "",
      done: false,
    };
  }
}

export default CreateTodo