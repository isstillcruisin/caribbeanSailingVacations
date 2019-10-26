import React, { Component } from "react";
import API from "../utils/API";
import Loader from "../components/Loader";
import Card from "react-bootstrap/Card"
import Button from "react-bootstrap/Button"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import moment from 'moment';
import { LinkContainer } from 'react-router-bootstrap'
import formatPrice from '../utils/formatPrice'
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

class WhiteLabelCharterInquiries extends Component {
  _isMounted = false;
  state = {
    charterInquiries: undefined
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
    });
  }

  handleSendOrientationPacket(event) {
    event.target.disabled = true;
    event.target.innerText = 'Sent Orientation';
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

  handleSendContract=() => this.setState(Object.assign({}, this.state, {showSendContractModal: true}))
  handleCloseSendContractModal=() => this.setState(Object.assign({}, this.state, {showSendContractModal: false}))

  columnDefinitions(confirmed) {
    const commonColumns = [{
      dataField: 'firstName',
      text: 'First Name',
    }, {
      dataField: 'lastName',
      text: 'Last Name',     
    }, {
      dataField: '_yacht',
      text: 'Yacht Name',
      formatter: (yacht) => yacht ? yacht.boatName : 'N/A'
    }, {
      dataField: 'startDate',
      text: 'Start Date',
      formatter: (date) => moment(date).format('LL')
    }, {
      dataField: 'endDate',
      text: 'End Date',
      formatter: (date) => moment(date).format('LL')
    }, {
      dataField: 'numberOfPassengers',
      text: 'Number Of Passengers',
    }, {
      dataField: '_yacht',
      text: 'Price Per Week',
      formatter: (yacht) => yacht ? formatPrice(yacht.pricePerWeek) : 'N/A'
    }, {
      dataField: 'estimatedPrice',
      text: 'Estimated Price',
      formatter: (estimatedPrice, row) => row._yacht ? formatPrice(estimatedPrice) : 'N/A'
    }, {
      dataField: '_eBrochure',
      text: 'E-Brochure',
      formatter: (eBrochure) => <LinkContainer
         to={`/e-brochure/${eBrochure._id}`}
         className="e-brochure-link"
      ><Button>E-Brochure</Button></LinkContainer>
    }]
    if (confirmed) {
      return commonColumns.concat([{
        dataField: '_id',
        text: 'Send Orientation Packet',
        formatter: (id, row) => {
          return <Button onClick={this.handleSendOrientationPacket} data-id={id}>{row.sentOrientationEmail ? 'Re-Send Orientation' : 'Send Orientation'}</Button>
        }
      }])
    } else {
      return commonColumns.concat([{
        dataField: '_id',
        text: 'Send Contract',
        formatter: (id) => <Button onClick={this.handleSendContract} data-id={id}>Send</Button>
      }, {
        dataField: '_id',
        text: 'Confirm Charter ',
        formatter: (id) => <Button onClick={this.handleSetInquiryConfirmed} data-id={id}>Confirm</Button>
      }])
    }
  }

  renderTable(confirmed) {
    return <BootstrapTable 
      keyField='id' 
      data={ confirmed ? this.state.charterInquiries.confirmed : this.state.charterInquiries.unconfirmed } 
      columns={ this.columnDefinitions(confirmed) } 
      pagination={ paginationFactory() }
    />  
  }

  renderUnconfirmedTab = () => {
    return <Tab eventKey="unconfirmed" title="Unconfirmed">
      <Card style={{color: 'black'}}>
        <Card.Header>
          Unconfirmed Charter Inquiries on White Label: <i>{this.props.match.params.whiteLabelName}</i>
        </Card.Header>
        <Card.Body>
          {this.renderTable(false)}
        </Card.Body>
      </Card>
    </Tab>
  }

  renderConfirmedTab = () => {
    return <Tab eventKey="confirmed" title="Confirmed">
      <Card style={{color: 'black'}}>
        <Card.Header>
          Confirmed Charter Inquiries on White Label: <i>{this.props.match.params.whiteLabelName}</i>
        </Card.Header>
        <Card.Body>
          {this.renderTable(true)}
        </Card.Body>
      </Card>
    </Tab>
  }

  render() {
    if (this.state.charterInquiries) {
      return <Container>
        <Tabs defaultActiveKey="unconfirmed" id="charter-inquiries" variant='pills'>
          {this.renderUnconfirmedTab()}
          {this.renderConfirmedTab()}
        </Tabs>
        <Modal show={this.state.showSendContractModal} onHide={this.handleCloseSendContractModal}>
          <Modal.Header closeButton>
            <Modal.Title>Send Contract</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please send a contract to the client. Once the contract is signed and returned to you, click the "Confirm" button.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleCloseSendContractModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    } else {
      return <Loader />
    }
  }
}

export default WhiteLabelCharterInquiries;
