import React, { Component } from "react";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import API from "../../utils/API";

class AvailableYachtSearchForm extends Component {
  state = this.props.filters || {}

  handleSearchForAvailableYachts = event => {
    event.preventDefault()
    this.props.onSearch(this.state)
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
        <Container className='mb-2'>
          <Row>
            <Col xs={3}>
              <Form.Control name='startDate' type='date' value={this.state.startDate} onChange={this.handleInputChange} />
            </Col>
            <Col xs={3}>
              <Form.Control name='endDate' type='date' value={this.state.endDate} onChange={this.handleInputChange} />
            </Col>
            <Col xs={3}>
              <Form.Control name='numPassengers' type='number' value={this.state.numPassengers} onChange={this.handleInputChange} />
            </Col>
            <Col xs={3}>
              <Button onClick={this.handleSearchForAvailableYachts}>Search</Button>
            </Col>
          </Row>
        </Container>
      </Form>
    )
  }
}
export default AvailableYachtSearchForm;
