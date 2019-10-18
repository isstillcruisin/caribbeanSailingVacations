import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import SignInForm from "../components/SignInForm";
import API from "../utils/API";
import ls from "local-storage";
import Alert from "../components/Alert"
import Container from "react-bootstrap/Container"
import { Link } from 'react-router-dom'

class SignIn extends Component {
  state = {
    email: "",
    password: "",
    validatedUser: "",
    admin: false
  };

  componentDidMount() {
    if (this.props.location && this.props.location.state) {
      this.setState({alert: this.props.location.state.alert})
    }
  }

  handleSignIn = async event => {
    event.preventDefault();
    event.stopPropagation();
    const { email, password } = this.state;
    const res = await API.userSignIn({ email, password });
    if (res.message) {
      this.setState({
        alert: 'Incorrect Username Or Password',
        password: "",
        validatedUser: null,
        admin: false
      })
    } else {
      this.setState({ validatedUser: res, admin: res.data.adminMode });
    }
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    if (this.state.validatedUser !== "" && ls.get("user-token")) {
      if (this.state.admin) {
        return <Redirect to={{ pathname: "/all-white-labels" }} />
      } else {
        return <Redirect to={{ pathname: "/my-white-labels" }} />
      }
    } else {
      return <Container>
        <Alert alert={this.state.alert}/>
        <h4>Sign In</h4>
        <SignInForm
          handleInputChange={this.handleInputChange}
          handleSignIn={this.handleSignIn}
          email={this.state.email}
          password={this.state.password}          
        />
        <Link to='/forgot-password' style={{ marginTop: '15px', display: 'block' }}>
          Forgot Password?
        </Link>
      </Container>
    }
  }
}

export default SignIn;
