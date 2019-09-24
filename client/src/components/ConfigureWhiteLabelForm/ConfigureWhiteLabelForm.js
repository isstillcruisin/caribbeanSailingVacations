import React, {Component} from "react";
import { Table, Row, Col, Button } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { LinkContainer } from 'react-router-bootstrap'

class ConfigureWhiteLabelForm extends Component {
  render() {
    return <div style={{color: 'black'}}>
      <form>
        <div className="form-group add-white-label-form">
          <label htmlFor="white-label-name">
            <strong>White-Label Name</strong>
          </label>
          <input
            className="form-control"
            id="white-label-name"
            type="text"
            disabled={true}
            value={this.props.whiteLabel.name}
            name="whiteLabelName"
            required
          />
        </div>
      </form>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {this.renderAllEBrochureRows(this.props.whiteLabel)}   
        </tbody>
      </Table>

      <LinkContainer
        to={`/white-label/${this.props.whiteLabel.name}/new-e-brochure`}
        className="add-e-brochure-link"
      >
        <Button>Add New E-Brochure</Button>
      </LinkContainer>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Enabled?</th>
            <th>Yacht Details</th>
          </tr>
        </thead>
        <tbody>
          {this.renderAllYachtRows(this.props.allYachts, this.props.whiteLabel)}
        </tbody>
      </Table>
    </div>
  }

  renderAllEBrochureRows = (whiteLabel) => {
    return whiteLabel.ebrochures.map((eBrochure, i) => {
      return <tr key={`ebrochure-${i}`}>
        <td>{eBrochure.name}</td>
      </tr>
    });
  }

  whiteLabelIncludesYacht = (whiteLabel, yacht) => {
    return whiteLabel.yachts.map(wl => wl._id).includes(yacht._id);
  }

  renderAllYachtRows = (allYachts, whiteLabel) => {
    return allYachts.map((yacht, i) => {
      return <tr key={`yacht-${i}`}>
          <td>{yacht.boatName}</td>
          <td>
            <BootstrapSwitchButton
              checked={this.whiteLabelIncludesYacht(whiteLabel, yacht)}
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
              key={`${yacht._id}${i + 5}`}
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

export default ConfigureWhiteLabelForm;
