import React from "react";
import styled from "styled-components";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import { Form, FormControl, Button } from 'react-bootstrap'
import ls from "local-storage";
import { Redirect, LinkContainer } from 'react-router-bootstrap'
import { withRouter } from "react-router";
import API from "../../utils/API";


class IncompleteHeader extends React.Component {
  state = {};

  refreshCurrentUser() {
    console.log("***** REFRESHING")
    let userToken = ls.get("user-token")
    if (userToken) {
      API.getCurrentUser().then(res => {
        this.setState({
          currentUser: res.data,
          mounted: true,
          userToken: userToken,
        })
      })
    } else {
      console.log("****** NOT LOGGED IN")
      this.setState({
        currentUser: null,
        userToken: false,
      })
    } 
  }

  componentDidUpdate(prevProps) {
    console.log("******", prevProps, this.props)
    if (this.props.location !== prevProps.location) {
      this.refreshCurrentUser();
    }
  }

  render() {
    if (this.state.currentUser && this.state.currentUser.isAdmin) {
      return <Navbar bg="light" variant="light">
              <Navbar.Brand href="#home">Charter Assistant - Admin</Navbar.Brand>
              <Nav className="mr-auto">
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/boats'>
                  <Nav.Link>Yachts</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/all-white-labels'>
                  <Nav.Link>All White Labels</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav pullright={1}>
                <LinkContainer to='/sign-out'>
                  <Nav.Link>Sign Out</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar>
    } else if (this.state.currentUser) {
      return <Navbar bg="light" variant="light">
              <Navbar.Brand href="#home">{`Charter Assistant - Logged In as ${this.state.currentUser.firstName}`}</Navbar.Brand>
              <Nav className="mr-auto">
                <LinkContainer to='/'>
                  <Nav.Link>home</Nav.Link>
                </LinkContainer>
                <Nav.Link href="/white-labels">My White Labels</Nav.Link>
              </Nav>
              <Nav pullright={1}>
                <LinkContainer to='/sign-out'>
                  <Nav.Link>Sign Out</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar>
    } else {
      return <Navbar bg="light" variant="light">
              <Navbar.Brand href="#home">{'Charter Assistant'}</Navbar.Brand>
              <Nav className="mr-auto">
                <LinkContainer to='/'>
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <LinkContainer to='/sign-up'>
                  <Nav.Link>Sign Up</Nav.Link>
                </LinkContainer>
              </Nav>
              <Nav pullright={1}>
                <LinkContainer to='/sign-in'>
                  <Nav.Link>Sign In</Nav.Link>
                </LinkContainer>
              </Nav>
            </Navbar>
    }

  }
}
const Header = withRouter(IncompleteHeader);

export default Header;
