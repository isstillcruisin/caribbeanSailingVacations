import React, { Component } from "react";
import AddWhiteLabelForm from "../components/AddWhiteLabelForm";
import API from "../utils/API";
import { Redirect } from "react-router-dom";

class AddWhiteLabel extends Component {
  state = {
    whiteLabelName: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    try {
      this.saveWhiteLabel();
    } catch (err) {
      console.log("error in save White Label (╯°□°)╯︵ ┻━┻ ", err);
    }
  };

  saveWhiteLabel = () => {
    API.saveWhiteLabel({
      whiteLabelName: this.state.whiteLabelName,      
    })
      .then(res =>
        this.setState({
          saved: true
        })
      )
      .catch(err => console.log("saving white label error", err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return this.state.saved === true ? (
      <Redirect 
        to={{ 
          pathname: `/charter-a-yacht/${this.state.whiteLabelName}`,
          state: { alert: `Your white-label: ${this.state.whiteLabelName} is reserved, but needs approval.` } 
        }} 
      />
    ) : (
      <>
        <h1>Setup Your Yacht Charter Site</h1>
        <AddWhiteLabelForm
          handleInputChange={this.handleInputChange}
          handleFormSubmit={this.handleFormSubmit}
          whiteLabelName={this.state.whiteLabelName}
        />
      </>
    );
  }
}

export default AddWhiteLabel;
