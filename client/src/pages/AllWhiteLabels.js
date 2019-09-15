import React, { Component } from "react";
import API from "../utils/API";
import Loader from "../components/Loader";
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import ToggleButton from "react-bootstrap/ToggleButton"


class AllWhiteLabels extends Component {
  state = {
    whiteLabels: []
  };

  componentDidMount() {
    API.getAllWhiteLabels().then(res => {
      this.setState({
        whiteLabels: res.data
      });
    });
  }

  allWhiteLabelRows() {
    return this.state.whiteLabels.map((whiteLabel, i) => {
      return <tr><td>{whiteLabel.name}</td><td><ToggleButton>{whiteLabel.isConfirmed ? "Confirmed" : "Unconfirmed"}</ToggleButton></td></tr>
    });
  }

  render() {
    if (this.state.whiteLabels) {
      return <Card style={{color: 'black'}}>
        <Card.Header>
          All Registered White Labels
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Confirmed?</th>
              </tr>
            </thead>
            <tbody>
              {this.allWhiteLabelRows()}   
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    } else {
      return <Loader />
    }
  }
}

export default AllWhiteLabels;
