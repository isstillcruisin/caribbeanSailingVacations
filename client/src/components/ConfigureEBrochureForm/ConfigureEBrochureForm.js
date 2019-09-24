import React, {Component} from "react";
import { Table, Row, Col, Button } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { LinkContainer } from 'react-router-bootstrap'

class ConfigureEBrochureForm extends Component {
  render() {
    return <div style={{color: 'black'}}>
      <form>
        <div className="form-group edit-e-brochure-form">
          <label htmlFor="e-brochure-name">
            <strong>EBrochure Name</strong>
          </label>
          <input
            className="form-control"
            id="e-brochure-name"
            type="text"
            value={this.props.eBrochure.name}
            name="eBrochureName"
            required
          />
        </div>
      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Enabled?</th>
            <th>Yacht Details</th>
          </tr>
        </thead>
        <tbody>
          {this.renderAllYachtRows(this.props.allYachts, this.props.eBrochure)}
        </tbody>
      </Table>
    </div>
  }

  eBrochureIncludesYacht = (eBrochure, yacht) => {
    return eBrochure.yachts.map(y => y._id).includes(yacht._id);
  }

  renderAllYachtRows = (allYachts, eBrochure) => {
    return allYachts.map((yacht, i) => {
      return <tr key={`yacht-${i}`}>
          <td>{yacht.boatName}</td>
          <td>
            <BootstrapSwitchButton
              checked={this.eBrochureIncludesYacht(eBrochure, yacht)}
              onlabel='Y'
              offlabel='N'
              onChange={(checked: boolean) => {
                if (checked) {
                  this.props.handleEnableYacht(yacht)
                } else {
                  this.props.handleDisableYacht(yacht) 
                }
              }}
            />
          </td>
          <td>
            <LinkContainer
              params={{ id: yacht._id }}
              to={`/boat/${yacht._id}`}
              className="boat-detail-link"
            >
              <Button>See Details</Button>
            </LinkContainer>
          </td> 
        </tr>
    });
  }
}

export default ConfigureEBrochureForm;
