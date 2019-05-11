import React, { Component } from "react";
import styled, { ThemeProvider, injectGlobal } from "styled-components";
import ls from "local-storage";
import { withRouter } from "react-router-dom";
import Fade from "react-reveal/Fade";
import withReveal from "react-reveal/withReveal";
import Header from "../Header";
import Meta from "../Meta";

const theme = {
  red: "#FF0000",
  black: "#393939",
  grey: "#3A3A3A",
  lightgrey: "#E1E1E1",
  offWhite: "#EDEDED",
  transparentGrey: "rgba(.3, .3, .3, .09)",
  turquoise: "#2DECB1",
  maxWidth: "1000px",
  bs: "0 12px 24px 0 rgba(0, 0, 0, 0.09)"
};

const StyledPage = styled.div`
  background: ${props => props.theme.transparentGrey};
  color: ${props => props.theme.offWhite};
`;

injectGlobal`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'radnika_next';
    background-color: whitesmoke;
  }
  a {
    text-decoration: none;
    color: ${theme.offWhite};
  }
  button {  font-family: 'radnika_next'; }
`;

class Page extends Component {
  state = {
    userToken: false,
    mounted: false
  };

  componentDidMount() {
    let loggedIn = ls.get("user-token") || false;

    return loggedIn
      ? this.setState({
          userToken: true
        })
      : this.setState({ userToken: false });
  }

  componentDidUpdate(prevProps, prevState) {
    let token = ls.get("user-token") || false;
    if (!prevState.userToken) {
      if (token) {
        this.handleUserExistance();
      }
    } else if (prevState.userToken) {
      if (!token) {
        this.setState({ userToken: false });
      }
    }
  }

  componentWillMount() {
    this.setState({
      mounted: true
    });
  }
  displayAuthOptions = () => {
    return this.state.userToken ? true : false;
  };

  handleUserExistance = async () => {
    return await this.setState({ userToken: true });
  };

  render() {
    let token = ls.get("user-token");
    const Inner = withReveal(
      styled.div`
        max-width: ${props => props.theme.maxWidth};
        margin: 0 auto;
        padding: 2rem;
      `,
      <Fade bottom opposite when={this.state.mounted} />
    );
    return (
      <ThemeProvider theme={theme}>
        <StyledPage>
          <Meta />
          <Header display={this.displayAuthOptions} loggedIn={token} />
          <Inner>{this.props.children}</Inner>
        </StyledPage>
      </ThemeProvider>
    );
  }
}

export default withRouter(Page);
