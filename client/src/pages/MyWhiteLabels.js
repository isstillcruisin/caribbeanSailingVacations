import React, { Component } from "react";
import API from "../utils/API";
import Loader from "../components/Loader";
import Card from "react-bootstrap/Card"
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from "react-router-dom";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

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

  renderWhiteLabelTable() {
    if (this.state.whiteLabels.length > 0) {
      const columns = [{
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: 'name',
        text: 'Configure',
        formatter: (cell) => <Link to={`/white-label/${cell}/edit`}>Configure</Link> 
      }, {
        dataField: 'name',
        text: 'E-Brochures',
        formatter: (cell) => <Link to={`/white-label/${cell}/edit`}>E-Brochures</Link> 
      }, {
        dataField: 'name',
        text: 'Inquiries',
        formatter: (cell) => <Link to={`/charter-inquiries/${cell}`}>Charter Inquiries</Link>
      }];
      return <BootstrapTable 
        keyField='id' 
        data={ this.state.whiteLabels } 
        columns={ columns } 
        pagination={ paginationFactory() }
      />
    } else return ''
  }

  render() {
    if (this.state.whiteLabels) {
      return <Card style={{color: 'black'}}>
        <Card.Header>
          My Registered White Labels
        </Card.Header>
        <Card.Body>
          {this.renderWhiteLabelTable()}
          <Link to='/add-white-label'>{`Add ${(this.state.whiteLabels.length === 0) ? 'First' : ''} White Label`}</Link>
        </Card.Body>
      </Card>
    } else {
      return <Loader />
    }
  }
}

export default MyWhiteLabels;
