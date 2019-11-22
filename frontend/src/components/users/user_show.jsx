import React from "react";

class Users extends React.Component {
  constructor(props) {
    super(props);
    };

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
  }


  update() {
    return e =>
      
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  render() {
    return (
      <div className="users">
        <div>
          <ul>
            {users.map(user => {
              // return <userItem user={user} key={user._id} />;
            })}
          </ul>
          <ul>
            {users.map(user => {
              // return <userItem user={user} key={user._id} />;
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default Users;