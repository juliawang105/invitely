import React from "react";
import { withRouter, Link } from "react-router-dom";
import "./session.css";

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearedErrors = false;
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  componentDidMount() {
    let navbar = document.querySelector(".nav-bar.orange");
    if (navbar) {
      navbar.classList.remove("orange");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.signedIn === true) {
      let user = {
        email: this.state.email,
        password: this.state.password
      };
      this.props.login(user)
        .then(() => this.props.history.push("/"));
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
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.signup(user, this.props.history);
  }

  loginDemoUser() {
    let demoUser = { email: 'invitelydemo@gmail.com', password: 'password' };
    this.props.login(demoUser);
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
        <div className="error-text">
          {error}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="session-form-container">
        <form
          className="session-form fade-in-down"
          onSubmit={this.handleSubmit}
        >
          <div className="session-form-items">
            <div className="session-form-title">Sign Up</div>
            <Link to="/login">
              Already have an account? <br /> Log In
            </Link>
            <input
              type="text"
              value={this.state.firstName}
              onChange={this.update("firstName")}
              placeholder="First Name"
              className="session-form-item"
            />

            <input
              type="text"
              value={this.state.lastName}
              onChange={this.update("lastName")}
              placeholder="Last Name"
              className="session-form-item"
            />

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
              type="password"
              value={this.state.password2}
              onChange={this.update("password2")}
              placeholder="Confirm Password"
              className="session-form-item"
            />

            <input
              type="submit"
              value="Sign Up"
              // className="session-form-item"
              className="session-form-submit"
            />
            {this.renderErrors()}
            <div className="demo" onClick={e => this.loginDemoUser()}>
              Try Demo
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(SignupForm);
