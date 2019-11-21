import React from "react";
import { withRouter } from "react-router-dom";
import "./session.css";

class LoginForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.renderErrors = this.renderErrors.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/events");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  handleSubmit(e) {
    e.preventDefault();

    let user = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.login(user);
      // .catch(err => this.renderErrors())
      // .then(() => this.props.history.push("/events"))
  }

  renderErrors() {
    let errorsArray = Object.keys(this.state.errors);
    let error = this.state.errors[errorsArray[0]];
    return (
      // <ul>
      //   {Object.keys(this.state.errors).map((error, i) => (
      //     <li key={`error-${i}`} className="session-form-item error">
      //       {this.state.errors[error]}
      //     </li>
      //   ))}
      // </ul>
      <div className="error">
        <div className="error-text">{error}</div>
      </div>
    );
  }

  render() {
    return (
      <div className="session-form-container">
        <form className="session-form fade-in-down" onSubmit={this.handleSubmit}>
          <div className="session-form-items">
            <input
              type="text"
              value={this.state.email}
              onChange={this.update("email")}
              placeholder="Email"
              className="session-form-item"
            />

            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
              placeholder="Password"
              className="session-form-item"
            />

            <input
              type="submit"
              value="Log In"
              // className="session-form-item"
              className="session-form-submit"
            />
            {this.renderErrors()}
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(LoginForm);
