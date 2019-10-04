import React from "react";
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import ls from "local-storage";
import { LinkContainer } from 'react-router-bootstrap'
import { withRouter } from "react-router";
import API from "../../utils/API";


class IncompleteHeader extends React.Component {
  state = {};

  refreshCurrentUser() {
    let userToken = ls.get("user-token")
    if (this.props.location.pathname === '/sign-out' && !userToken) {
      this.setState({
        currentUser: null,
        userToken: false
      })
    } else if (this.state.userToken !== userToken) {
      API.getCurrentUser().then(res => {
        this.setState({
          currentUser: res.data,
          userToken: userToken,
        })
      })
    }
  }

  componentDidMount() {
    this.refreshCurrentUser();
  }


  componentDidUpdate(prevProps) {
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
                  <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                 <LinkContainer to='/my-white-labels'>
                  <Nav.Link>White Labels</Nav.Link>
                </LinkContainer>
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
