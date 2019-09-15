import React, { Component } from "react";
import API from "../utils/API";
import Loader from "../components/Loader";
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'

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
      return <tr><td>{whiteLabel.name}</td><td>
        <BootstrapSwitchButton
          checked={whiteLabel.isConfirmed}
          onlabel='Y'
          offlabel='N'
          onChange={(checked: boolean) => {
              whiteLabel.isConfirmed = checked;
              API.updateIsConfirmed(whiteLabel, checked);
          }}
      /></td></tr>
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
                <th>Enabled?</th>
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
