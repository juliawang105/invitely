import React from "react";
import { Switch, Route } from "react-router-dom";
import {  AuthRoute, ProtectedRoute, NewUserRoute } from "../util/route_util";
import NavBarContainer from "./nav/navbar_container";

// import TweetsContainer from "./tweets/tweets_container";
import MainPage from "./main/main_page";
import LoginFormContainer from "./session/login_form_container";
import SignupFormContainer from "./session/signup_form_container";
import EventShowContainer from "./events/event_show_container";
import CreateEventContainer from "./events/create_event_container";
import EditEventContainer from "./events/edit_event_container";
// import ProfileContainer from "./profile/profile_container";
// import TweetComposeContainer from "./tweets/tweet_compose_container";

const App = () => (
  <div>
    <NavBarContainer />
    <Switch>
      <ProtectedRoute exact path="/events" component={CreateEventContainer}/>
      <ProtectedRoute exact path = "/events/:id" component={EventShowContainer} />
      <ProtectedRoute exact path="/events/:id/edit" component={EditEventContainer} /> 

      {/* <ProtectedRoute exact path="/events" component={TweetsContainer} /> */}
      <AuthRoute exact path="/login" component={LoginFormContainer} />
      <AuthRoute exact path="/signup" component={SignupFormContainer} />

      {/* MODIFY to authroute */}
      <NewUserRoute exact path="/" component={MainPage} />

      {/* <ProtectedRoute exact path="/profile" component={ProfileContainer} /> */}
      {/* <ProtectedRoute exact path="/new_tweet" component={TweetComposeContainer} /> */}
    </Switch>
  </div>
);

export default App;
