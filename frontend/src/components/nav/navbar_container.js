import { connect } from "react-redux";
import { logout } from "../../actions/session_actions";

import NavBar from "./navbar";


const mapStateToProps = state => ({
  loggedIn: state.session.isAuthenticated,
  session: state.session
  // currentUserId: state.session.user.id,
  // currentUserFirstName: state.session.user.firstName,
  // currentUserLastName: state.session.user.lastName,
  // currentUserEmail: state.session.user.email
});

export default connect(mapStateToProps, { logout })(NavBar);
