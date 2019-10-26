import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import API from "../../utils/API";

class AvailableYachtSearchForm extends Component {
  state = {};

  handleSearchForAvailableYachts = event => {
    event.preventDefault()
    API.findAvailableYachts(this.props.eBrochure, this.state.startDate, this.state.endDate, this.state.numPassengers)
      .then(res => console.log(res.data))
  }

  handleInputChange = event => {
    const { name, value } = event.target
    this.setState({
      [name]: value,
    })
  }

  render() {
    return (
      <Form>
        <Col>
          <Form.Control name='startDate' type='date' value={this.state.startDate} onChange={this.handleInputChange} />
        </Col>
        <Col>
          <Form.Control name='endDate' type='date' value={this.state.endDate} onChange={this.handleInputChange} />
        </Col>
        <Col>
          <Form.Control name='numPassengers' type='number' value={this.state.numPassengers} onChange={this.handleInputChange} />
        </Col>
        <Col>
          <Button onClick={this.handleSearchForAvailableYachts}>Search</Button>
        </Col>
      </Form>
    )
  }
}
export default AvailableYachtSearchForm;
