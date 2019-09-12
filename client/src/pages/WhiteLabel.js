import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";

class WhiteLabel extends Component {
  state = {};

  componentDidMount() {
    let { name } = this.props.match.params;
    API.getWhiteLabel(name).then(res => {
      this.setState({
        whiteLabel: res.data
      });
    });
  }

  showWhiteLabel = () => {
    return this.state.whiteLabel ? (
      <div>
        <h3>A WhiteLabel Website For Yacht Charters</h3>
        <div>NAME: {this.state.whiteLabel.name}</div>
      </div>
    ) : (
      <div>loading..</div>
    );
  };

  render() {
    return <div>{this.showWhiteLabel()}</div>;
  }
}

export default WhiteLabel;
