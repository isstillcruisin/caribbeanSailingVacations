import React from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'
import ls from 'local-storage'
import { LinkContainer } from 'react-router-bootstrap'
import { withRouter } from 'react-router-dom'
import API from '../../utils/API'
import PropTypes from 'prop-types'

class IncompleteHeader extends React.Component {
  state = {};

  refreshCurrentUser() {
    let userToken = ls.get('user-token')
    if (!userToken && 
      !(['/sign-in', '/sign-up', '/', '/forgot-password', '/reset-password'].includes(this.props.location.pathname))
    ) {
      this.setState({
        noToolbar: true,
        currentUser: null,
        userToken: false,
      })
    } else if (this.props.location.pathname === '/sign-out' && !userToken) {
      this.setState({
        noToolbar: false,
        currentUser: null,
        userToken: false,
      })
    } else if (this.state.userToken !== userToken) {
      API.getCurrentUser().then(res => {
        this.setState({
          noToolbar: false,
          currentUser: res.data,
          userToken: userToken,
        })
      })
    } 
  }

  componentDidMount() {
    this.refreshCurrentUser()
  }


  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.refreshCurrentUser()
    }
  }

  render() {
    if (this.state.currentUser && this.state.currentUser.isAdmin) {
      return (
        <Navbar bg="light" variant="light">
          <LinkContainer to='/'>
            <Navbar.Brand>Charter Assistant - Admin</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
            <LinkContainer to='/boats'>
              <Nav.Link>Yachts</Nav.Link>
            </LinkContainer>
            <LinkContainer to='/all-white-labels'>
              <Nav.Link>White Labels</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav pullright={1}>
            <NavDropdown title={`${this.state.currentUser.firstName} ${this.state.currentUser.lastName}`} id="basic-nav-dropdown">
              <LinkContainer to='/settings'>
                <NavDropdown.Item>Settings</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/sign-out'>
                <NavDropdown.Item>Sign Out</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>        
          </Nav>
        </Navbar>
      )
    } else if (this.state.currentUser) {
      return (
        <Navbar bg="light" variant="light">
          <LinkContainer to='/'>
            <Navbar.Brand>Charter Assistant</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
            <LinkContainer to='/my-white-labels'>
              <Nav.Link>White Labels</Nav.Link>
            </LinkContainer>
          </Nav>
          <Nav pullright={1}>
            <NavDropdown title={`${this.state.currentUser.firstName} ${this.state.currentUser.lastName}`} id="basic-nav-dropdown">
              <LinkContainer to='/settings'>
                <NavDropdown.Item>Settings</NavDropdown.Item>
              </LinkContainer>
              <LinkContainer to='/sign-out'>
                <NavDropdown.Item>Sign Out</NavDropdown.Item>
              </LinkContainer>
            </NavDropdown>        
          </Nav>
        </Navbar>
      )
    } else if (this.state.noToolbar) {
      return ''
    } else {
      return (
        <Navbar bg="light" variant="light">
          <LinkContainer to='/'>
            <Navbar.Brand>Charter Assistant</Navbar.Brand>
          </LinkContainer>
          <Nav className="mr-auto">
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
      )
    }
  }
}

IncompleteHeader.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }),
}

const Header = withRouter(IncompleteHeader)

export default Header
