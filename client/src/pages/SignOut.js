import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import API from "../utils/API";

class SignOut extends Component {
  componentDidMount() {
    this.handleSignOut();
  }

  handleSignOut = () => {
    API.userSignOut();
  };

  render() {
    const signOut = () => {
      this.handleSignOut();
      return <Redirect to={{ pathname: "/" }} />;
    };
    return signOut() || "Thank you!";
  }
}

export default SignOut;
