import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class Logout extends Component {

  // When the component mounts, call the doLogout method from props to log out the user
  componentDidMount() {
    this.props.doLogout();
  }
  
  render() {
    // Redirect the user to the login page after logging out
    return (
      <div>
        <Redirect to={{ pathname: "/login" }} />
      </div>
    );
  }
}
