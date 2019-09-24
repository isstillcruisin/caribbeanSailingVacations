import React, { Component } from "react";
import AddEBrochureForm from "../components/AddEBrochureForm";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import Loader from "../components/Loader";

class AddEBrochure extends Component {
  componentDidMount() {
    let { name } = this.props.match.params;

    API.getWhiteLabel(name).then(res => {
      API.getCurrentUserId().then(res2 => {
        if (res2 && res2.data.id !== res.data._travelAgent._id) {
          this.setState({ unauthorized: true});
        } else {
          API.getBoats({}).then(res3 => {
            this.setState({
              whiteLabel: res.data,
              boats: res3.data,
            });
          });
        }
      });
    });
  }

  state = {
    name: "",
  };

  handleFormSubmit = event => {
    event.preventDefault();
    try {
      this.saveEBrochure();
    } catch (err) {
      console.log("error in save boats (╯°□°)╯︵ ┻━┻ ", err);
    }
  };

  saveEBrochure = () => {
    API.saveEBrochure(
      this.state.whiteLabel, 
      {
        name: this.state.name
      }
    ).then(() => this.setState({saved: true}));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    if (this.state.saved === true) {
      return <Redirect 
        to={{ 
          pathname: `/white-label/${this.state.whiteLabel.name}/edit`
        }} 
      />
    }
    else if (this.state.unauthorized) {
      return (<Redirect 
        to={{ 
          pathname: `/`,
          state: { alert: `You are not authorized to perform this action.` } 
        }} 
      />)
    } else if (this.state.whiteLabel && this.state.boats) {
      return (<> 
        <h1>Setup Your E-Brochure</h1>
        <AddEBrochureForm
            handleInputChange={this.handleInputChange}
            handleFormSubmit={this.handleFormSubmit}
            name={this.state.name}
          />
      </>)
    } else {
      return <Loader />;
    }  
  }
}

export default AddEBrochure;
