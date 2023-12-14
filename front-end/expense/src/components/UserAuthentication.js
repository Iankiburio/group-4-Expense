import React, { Component } from "react";
import { Redirect, Route } from "react-router-dom";

// This component ensures that the user is authenticated before accessing the specified route
export default class UserAuthentication extends Component {
  render() {
    // Destructure the token and route component from props
    const { token, ...rest } = this.props;

    return token ? (
      // Render the specified route component if the user is authenticated
      <Route {...rest} />
    ) : (
      // Redirect to the login page if the user is not authenticated
      <Redirect to={{ pathname: "/login" }} />
    );
  }
}
