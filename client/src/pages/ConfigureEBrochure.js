import React, { Component } from "react";
import ConfigureEBrochureForm from "../components/ConfigureEBrochureForm";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import Loader from '../components/Loader'
import Card from 'react-bootstrap/Card';

class ConfigureEBrochure extends Component {
  state = {};

  componentDidMount() {
    let { id } = this.props.match.params;

    API.getEBrochure(id).then(res => {
      API.getCurrentUserId().then(res2 => {
        if (res2 && res2.data.id !== res.data._whiteLabel._travelAgent._id) {
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

  // handleFormSubmit = event => {
  //   event.preventDefault();
  //   try {
  //     this.saveWhiteLabel();
  //   } catch (err) {
  //     console.log("error in save White Label (╯°□°)╯︵ ┻━┻ ", err);
  //   }
  // };

  // saveWhiteLabel = () => {
  //   API.saveWhiteLabel({
  //     whiteLabelName: this.state.whiteLabelName,      
  //   })
  //     .then(res =>
  //       this.setState({
  //         saved: true
  //       })
  //     )
  //     .catch(err => console.log("saving white label error", err));
  // };

  // handleInputChange = event => {
  //   const { name, value } = event.target;
  //   this.setState({
  //     [name]: value
  //   });
  // };

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
        <h1>Configure Charter Assistant EBrochure {this.state.eBrochure.name}</h1>
        <Card>
          <ConfigureEBrochureForm
            eBrochure = {this.state.eBrochure}
            allYachts = {this.state.boats}
            handleEnableYacht = {this.handleEnableYacht}
            handleDisableYacht = {this.handleDisableYacht}
          />
        </Card>
      </>)
    } else {
      return <Loader />;
    }
  }
}

export default ConfigureEBrochure;
