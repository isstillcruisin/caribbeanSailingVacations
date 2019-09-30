import React, { Component } from "react";
import API from "../utils/API";
import Loader from "../components/Loader";
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
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

    let { whiteLabelName } = this.props.match.params;
    
    API.getWhiteLabelCharterInquiries(whiteLabelName).then(res => {
      if (this._isMounted) {
        this.setState({
          charterInquiries: res.data
        });
      }
    });
  }

  handleSendOrientationPacket(event) {
    event.target.disabled = true;
    event.target.innerText = 'Sent Orientation Packet';
    API.sendOrientationPacket(event.target.dataset.id);
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  allCharterInquiryRows() {
    return this.state.charterInquiries.map((charterInquiry, i) => {
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
                <td><Button onClick={this.handleSendOrientationPacket} data-id={charterInquiry._id}>Send Orientation Packet</Button></td>
              </tr>
      )
    });
  }

  render() {
    if (this.state.charterInquiries) {
      return <Card style={{color: 'black'}}>
        <Card.Header>
          Charter Inquiries on White Label: <i>{this.props.match.params.whiteLabelName}</i>
        </Card.Header>
        <Card.Body>
          <Table striped bordered hover>
            <thead>
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
                <th>Post-Acceptance Email Link</th>
              </tr>
            </thead>
            <tbody>
              {this.allCharterInquiryRows()}   
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    } else {
      return <Loader />
    }
  }
}

export default WhiteLabelCharterInquiries;
