import React, { Component } from "react";
import AddBoatForm from "../components/AddBoatForm";
import API from "../utils/API";
import { Redirect } from "react-router-dom";
import Container from 'react-bootstrap/Container'

class AddBoat extends Component {
  state = {
    boatName: "",
    imgUrls: [],
    year: 0,
    maxPassengers: 0,
    manufacture: "",
    crewBio: ""
  };

  handleFormSubmit = event => {
    event.preventDefault();
    try {
      this.saveBoat();
    } catch (err) {
      console.log("error in save boats (╯°□°)╯︵ ┻━┻ ", err);
    }
  };

  saveBoat = () => {
    API.saveBoat({
      boatName: this.state.boatName,
      imgs: this.state.imgs,
      year: this.state.year,
      maxPassengers: this.state.maxPassengers,
      manufacture: this.state.manufacture,
      crewBio: this.state.crewBio,
      pricePerWeek: this.state.pricePerWeek
    })
      .then(res =>
        this.setState({
          saved: true
        })
      )
      .catch(err => console.log("saving boat error", err));
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleSetUrls = urls => {
    this.setState({
      imgs: urls
    });
  };

  render() {
    if (this.state.saved) {
      return (<Redirect 
        to={{ 
          pathname: `/boats`,
          state: { alert: `Yacht creation successful!` } 
        }} 
      />)
    } else {
      return (
        <Container className="AddBoat">
          <header className="AddBoat-header">
            <AddBoatForm
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              handleSetUrls={this.handleSetUrls}
              boatName={this.state.boatName}
              imgs={this.state.imgs}
              year={this.state.year}
              maxPassengers={this.state.maxPassengers}
              manufacture={this.state.manufacture}
              crewBio={this.state.crewBio}
              pricePerWeek={this.state.pricePerWeek}
            />
          </header>
        </Container>
      );
    }
  }
}

export default AddBoat;
