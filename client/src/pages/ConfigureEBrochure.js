import React, { Component } from "react";
import ConfigureEBrochureForm from "../components/ConfigureEBrochureForm";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import Loader from '../components/Loader'

class ConfigureEBrochure extends Component {
  state = {};

  componentDidMount() {
    let { id } = this.props.match.params;

    API.getEBrochure(id).then(res => {
      API.getCurrentUser().then(res2 => {
        if (res2 && res2.data._id !== res.data._whiteLabel._travelAgent._id) {
          this.setState({ unauthorized: true});
        } else {
          API.getBoats({}).then(res3 => {
            this.setState({
              eBrochure: res.data,
              boats: res3.data,
            });
          });
        }
      });
    });
  }

  handleEnableYacht = (yacht) => {
    let eBrochure = Object.assign({}, this.state.eBrochure)
    eBrochure.yachts.push(yacht)
    API.updateEBrochure(eBrochure)
    this.setState(Object.assign({}, this.state, { eBrochure }));
  }

  handleDisableYacht = (yacht) => {
    let eBrochure = Object.assign({}, this.state.eBrochure)
    eBrochure.yachts = eBrochure.yachts.filter(function(y, index, arr){
      return y._id !== yacht._id
    });
    API.updateWhiteLabel(eBrochure)
    this.setState(Object.assign({}, this.state, { eBrochure }));
  }

  render() {
    if (this.state.unauthorized) {
      return (<Redirect 
        to={{ 
          pathname: `/`,
          state: { alert: `You are not authorized to perform this action.` } 
        }} 
      />)
    } else if (this.state.eBrochure && this.state.boats) {
      return (<> 
        <h1>Configure e-Brochure: {this.state.eBrochure.name}</h1>
        <ConfigureEBrochureForm
          eBrochure = {this.state.eBrochure}
          allYachts = {this.state.boats}
          handleEnableYacht = {this.handleEnableYacht}
          handleDisableYacht = {this.handleDisableYacht}
        />
      </>)
    } else {
      return <Loader />;
    }
  }
}

export default ConfigureEBrochure;
