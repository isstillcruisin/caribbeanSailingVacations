import React, { Component } from "react";
import API from "../utils/API";
import Loader from "../components/Loader";
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap'
import formatPrice from '../utils/formatPrice'

class WhiteLabelCharterInquiries extends Component {
  _isMounted = false;
  state = {
    charterInquiries: []
  };

  componentDidMount() {
    this._isMounted = true;
    this.loadCharterInquiries();
  }

  loadCharterInquiries() {
    let { whiteLabelName } = this.props.match.params;
    
    API.getWhiteLabelCharterInquiries(whiteLabelName).then(res => {
      if (this._isMounted) {
        this.setState({charterInquiries: res.data});
      }
      console.log(res.data);
    });
  }

  handleSendOrientationPacket(event) {
    event.target.disabled = true;
    event.target.innerText = 'Sent Orientation Packet';
    API.sendOrientationPacket(event.target.dataset.id);
  }

  handleSetInquiryConfirmed = event => {
    event.target.disabled = true;
    this.setState({});
    API.setCharterInquiryConfirmed(event.target.dataset.id)
      .then(this.loadCharterInquiries())
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  confirmedCharterInquiryRows=() => this.renderCharterInquiryRows(this.state.charterInquiries.confirmed, true);
  unconfirmedCharterInquiryRows=() => this.renderCharterInquiryRows(this.state.charterInquiries.unconfirmed, false);

  renderCharterInquiryRows(charterInquiries, confirmed) {
    return charterInquiries && charterInquiries.map((charterInquiry, i) => {
      const sendOrientationButtonColumn = <td><Button onClick={this.handleSendOrientationPacket} data-id={charterInquiry._id}>Send Orientation Packet</Button></td>,
        setConfirmedButtonColumn = <td><Button onClick={this.handleSetInquiryConfirmed} data-id={charterInquiry._id}>Confirm</Button></td>,
        buttonColumn = confirmed ? sendOrientationButtonColumn : setConfirmedButtonColumn;            
      return (<tr key={i}>
                <td>{charterInquiry.firstName}</td>
                <td>{charterInquiry.lastName}</td>
                <td>{charterInquiry.email}</td>
                <td>{charterInquiry._yacht.boatName}</td>
                <td>{moment(charterInquiry.startDate).format('LL')}</td>
                <td>{moment(charterInquiry.endDate).format('LL')}</td>
                <td>{formatPrice(charterInquiry._yacht.pricePerWeek)}</td>
                <td>{formatPrice(charterInquiry.estimatedPrice)}</td>
                <td><LinkContainer
                      to={`/e-brochure/${charterInquiry._eBrochure._id}`}
                      className="e-brochure-link"
                    ><Button>E-Brochure</Button></LinkContainer>
                </td>
                {buttonColumn}
              </tr>
      )
    });
  }

  renderTableHeaders(confirmed) {
    const buttonHeader = confirmed ? <th>Post-Acceptance Email Link</th> : <th>Set Confirmed</th>

    return  <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email Address</th>
                <th>Yacht Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Price Per Week</th>
                <th>Estimated Price</th>
                <th>E-Brochure</th>
                {buttonHeader}
              </tr>
            </thead>
  }

  render() {
    if (this.state.charterInquiries) {
      return <Container>
        <Card style={{color: 'black'}}>
          <Card.Header>
            Unconfirmed Charter Inquiries on White Label: <i>{this.props.match.params.whiteLabelName}</i>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              {this.renderTableHeaders(false)}
              <tbody>
                {this.unconfirmedCharterInquiryRows()}   
              </tbody>
            </Table>
          </Card.Body>
        </Card>
        <Card style={{color: 'black'}}>
         <Card.Header>
            Confirmed Charter Inquiries on White Label: <i>{this.props.match.params.whiteLabelName}</i>
          </Card.Header>
          <Card.Body>
            <Table striped bordered hover>
              {this.renderTableHeaders(true)}
              <tbody>
                {this.confirmedCharterInquiryRows()}   
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    } else {
      return <Loader />
    }
  }
}

export default WhiteLabelCharterInquiries;
