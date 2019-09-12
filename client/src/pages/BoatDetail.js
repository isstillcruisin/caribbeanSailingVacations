import React, { Component } from "react";
import API from "../utils/API";
import Fade from "react-reveal/Fade";
import Loader from '../components/Loader';

class BoatDetail extends Component {
  state = {};

  componentDidMount() {
    let { id } = this.props.match.params;
    API.getBoat(id).then(res => {
      this.setState({
        boat: res.data
      });
    });
  }

  showBoat = () => {
    return this.state.boat ? (
      <div>
        <Fade bottom cascade>
          <div>{this.state.boat.boatName}</div>
          <div>{this.state.boat.crewBio}</div>
        </Fade>
      </div>
    ) : (
      <Loader/>
    );
  };

  render() {
    return <div>{this.showBoat()}</div>;
  }
}

export default BoatDetail;
