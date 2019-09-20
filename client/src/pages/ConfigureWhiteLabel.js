import React, { Component } from "react";
import ConfigureWhiteLabelForm from "../components/ConfigureWhiteLabelForm";
import API from "../utils/API";
import ls from "local-storage";
import { Redirect } from "react-router-dom";
import Loader from '../components/Loader'

class ConfigureWhiteLabel extends Component {
  state = {};

  componentDidMount() {
    let { name } = this.props.match.params;
    API.getWhiteLabel(name).then(res => {
      API.getCurrentUserId().then(res2 => {

        if (res2 && res2.data.id !== res.data._travelAgent._id) {
          this.setState({ unauthorized: true});
        } else {
          API.getBoats().then(res3 => {
            this.setState({
              whiteLabel: res.data,
              boats: res3.data,
            });
          });
        }
      });
    });
  }

  render() {
    if (this.state.unauthorized) {
      return (<Redirect 
        to={{ 
          pathname: `/`,
          state: { alert: `You are not authorized to perform this action.` } 
        }} 
      />);
    }
    if (this.state.whiteLabel) {
      return (<> 
        <h1>Configure Charter Assistant {this.state.whiteLabel.name}</h1>
        <ConfigureWhiteLabelForm
          whiteLabel = {this.state.whiteLabel}
          boats = {this.state.boats}
        />
      </>)
    } else {
      return <Loader />;
    }
  }
}

export default ConfigureWhiteLabel;
