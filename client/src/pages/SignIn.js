import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import API from "../utils/API";
import ls from "local-storage";

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    validatedUser: "",
    admin: false
  };

  handleSignIn = async event => {
    event.preventDefault();
    const { email, password } = this.state;
    const validatedUser = await API.userSignIn({ email, password });
    this.setState({ validatedUser, admin: validatedUser.data.adminMode });
    console.log("validatedUser (╯°□°)╯︵ ┻━┻ ", validatedUser);
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return this.state.validatedUser !== "" && ls.get("user-token") ? (
      <Redirect to={{ pathname: "/boats" }} />
    ) : (
      <>
        <h4>Sign In</h4>
        <SignInForm
          handleInputChange={this.handleInputChange}
          handleSignIn={this.handleSignIn}
          email={this.state.email}
          password={this.state.password}
        />
      </>
    );
  }
}

export default SignIn;
