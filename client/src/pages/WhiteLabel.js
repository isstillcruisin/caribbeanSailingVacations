import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import AllBoats from "./AllBoats";
import Alert from '../components/Alert';
import Loader from '../components/Loader';

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
    if (this.state.whiteLabel) {
      if (this.state.whiteLabel.isConfirmed) {
        return (
          <div>
            <h3>A WhiteLabel Website For Yacht Charters</h3>
            <div>NAME: {this.state.whiteLabel.name}</div>
            <div>EMAIL: {this.state.whiteLabel._travelAgent.email}</div>
            <div><AllBoats whiteLabel={this.state.whiteLabel.name}/></div>
          </div>
        )
      } else {
        return (
          <div>
            This WhiteLabel has been built, but hasn't been confirmed yet. For now, please peruse the yachts:
            <AllBoats />
          </div>
        )
      }
    } else {
      return <Loader />;
    }
  };

  render() {
    return <div>
      <Alert {...this.props}/>
      {this.showWhiteLabel()}
    </div>;
  }
}

export default WhiteLabel;
