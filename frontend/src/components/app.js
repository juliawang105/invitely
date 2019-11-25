import React from "react";
import { Switch } from "react-router-dom";
import {  AuthRoute, ProtectedRoute, NewUserRoute } from "../util/route_util";
import NavBarContainer from "./nav/navbar_container";

// import TweetsContainer from "./tweets/tweets_container";
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import EventShowContainer from "./events/event_show_container";
import CreateEventContainer from "./events/create_event_container";

import EditEventContainer from "./events/edit_event_container";
import UserShowContainer from "./users/user_show_container";

// import ProfileContainer from "./profile/profile_container";
// import TweetComposeContainer from "./tweets/tweet_compose_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/users/:id" component={UserShowContainer} /> 
      <ProtectedRoute exact path="/events" component={CreateEventContainer}/>
      <ProtectedRoute exact path = "/events/:id" component={EventShowContainer} />
      <ProtectedRoute exact path="/events/:id/edit" component={EditEventContainer} /> 

      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />
      <NewUserRoute exact path="/" component={MainPage} />

    </Switch>
  </div>
);

export default App;
