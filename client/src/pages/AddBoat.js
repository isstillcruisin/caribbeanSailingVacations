import React, { Component } from "react";
import AddBoatForm from "../components/AddBoatForm";
import API from "../utils/API";

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
      imgs: this.state.imgUrls,
      year: this.state.year,
      maxPassengers: this.state.maxPassengers,
      manufacture: this.state.manufacture,
      crewBio: this.state.crewBio
    })
      .then(res =>
        this.setState({
          boats: res.data,
          message: !res.data.length
            ? "No New boats Found, Try a Different Query"
            : ""
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

  handleSetUrls = url => {
    this.setState({
      imgUrls: [...this.state.imgUrls, url]
    });
  };

  render() {
    return (
      <div className="AddBoat">
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
          />
        </header>
      </div>
    );
  }
}

export default AddBoat;
