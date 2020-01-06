import React from "react";
import { withRouter, Link } from "react-router-dom";
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
    this.loginDemoUser = this.loginDemoUser.bind(this);
  }

  componentDidMount() {
    let navbar = document.querySelector(".nav-bar.orange");
    if (navbar) {
      navbar.classList.remove("orange");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser === true) {
      this.props.history.push("/");
    }

    this.setState({ errors: nextProps.errors });
  }

  update(field) {
    return e =>
      this.setState({
        [field]: e.currentTarget.value
      });
  }

  loginDemoUser() {
    let demoUser = { email: 'invitelydemo@gmail.com', password: 'password' };
    this.props.login(demoUser);
    // console.log(this.props.history)
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
            <div className="session-form-title">Log In</div>
            <Link to="/signup">Don't have an account? <br/> Sign up</Link>
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
          <div className="demo" onClick={e => this.loginDemoUser()}>
            Try Demo
          </div>
        </form>

      </div>
    );
  }
}

export default withRouter(LoginForm);
