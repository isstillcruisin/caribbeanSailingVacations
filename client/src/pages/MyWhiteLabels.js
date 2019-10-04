import React, { Component } from "react";
import API from "../utils/API";
import Loader from "../components/Loader";
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from "react-router-dom";

class MyWhiteLabels extends Component {
  state = {
    whiteLabels: []
  };

  componentDidMount() {
    API.getMyWhiteLabels().then(res => {
      this.setState({
        whiteLabels: res.data
      });
    });
  }

  myWhiteLabelRows() {
    return this.state.whiteLabels.map((whiteLabel, i) => {
      return (
        <tr key={`${i + 1}`}>
          <td>{whiteLabel.name}</td>
          <td>
            <Link 
              to={`/white-label/${whiteLabel.name}/edit`}
            >Configure</Link>
          </td>
          <td>
            <Link
              to={`/white-label/${whiteLabel.name}/edit`}
            >E-Brochures</Link> 
          </td>
          <td>
            <Link
              to={`/charter-inquiries/${whiteLabel.name}`}
            >Inquiries</Link> 
          </td> 
        </tr>
      )
    });
  }

  render() {
    if (this.state.whiteLabels) {
      return <Card style={{color: 'black'}}>
        <Card.Header>
          My Registered White Labels
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Configure</th>
                <th>E-Brochures</th>
                <th>Charter Inquiries</th>
              </tr>
            </thead>
            <tbody>
              {this.myWhiteLabelRows()}   
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    } else {
      return <Loader />
    }
  }
}

export default MyWhiteLabels;
