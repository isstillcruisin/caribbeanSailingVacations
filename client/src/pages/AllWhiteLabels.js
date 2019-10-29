import React, { Component } from 'react'
import API from '../utils/API'
import Loader from '../components/Loader'
import Card from 'react-bootstrap/Card'
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { Link } from 'react-router-dom'
import BootstrapTable from 'react-bootstrap-table-next'
import paginationFactory from 'react-bootstrap-table2-paginator'

class AllWhiteLabels extends Component {
  state = {
    whiteLabels: []
  };

  componentDidMount() {
    API.getAllWhiteLabels().then(res => {
      this.setState({
        whiteLabels: res.data
      })
    })
  }

  renderWhiteLabelTable() {
    if (this.state.whiteLabels.length > 0) {
      const columns = [{
        dataField: 'name',
        text: 'Name'
      }, {
        dataField: '_travelAgent',
        text: 'Travel Agent',
        formatter: (cell) => <a href={`mailto:${cell.email}`}>{cell.firstName} {cell.lastName}</a>
      }, {
        dataField: 'name',
        text: 'Enabled?',
        formatter: (cell, row) => <BootstrapSwitchButton
          checked={row.isConfirmed}
          onlabel='Y'
          offlabel='N'
          onChange={(checked: boolean) => {
            row.isConfirmed = checked
            API.updateIsConfirmed(row, checked)
          }}
        />
      }, {
        dataField: 'name',
        text: 'Inquiries',
        formatter: (cell) => <Link to={`/charter-inquiries/${cell}`}>Inquiries</Link> 
      }]
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
          All Registered White Labels
        </Card.Header>
        <Card.Body>
          {this.renderWhiteLabelTable()}
        </Card.Body>
      </Card>
    } else {
      return <Loader />
    }
  }
}

export default AllWhiteLabels
