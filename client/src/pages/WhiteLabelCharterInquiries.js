import React, { Component } from "react";
import API from "../utils/API";
import Loader from "../components/Loader";
import Table from "react-bootstrap/Table"
import Card from "react-bootstrap/Card"
import moment from 'moment';

class WhiteLabelCharterInquiries extends Component {
  state = {
    charterInquiries: []
  };

  componentDidMount() {
    let { whiteLabelName } = this.props.match.params;
    
    API.getWhiteLabelCharterInquiries(whiteLabelName).then(res => {
      this.setState({
        charterInquiries: res.data
      });
    });
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
                <td>LINK TO SEND EMAIL WITH PDFs</td>
              </tr>)
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