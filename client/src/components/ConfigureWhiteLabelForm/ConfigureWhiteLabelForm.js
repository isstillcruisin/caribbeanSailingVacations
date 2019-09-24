import React, {Component} from "react";
import { Table, Button, Form } from 'react-bootstrap';
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
            <th>View</th>
            <th>Edit</th>
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
    </div>
  }

  renderAllEBrochureRows = (whiteLabel) => {
    return whiteLabel.ebrochures.map((eBrochure, i) => {
      return <tr key={`ebrochure-${i}`}>
        <td>{eBrochure.name}</td>
        <td>
          <LinkContainer
            to={`/e-brochure/${eBrochure._id}`}
            className="e-brochure-link"
          >
            <Button>View E-Brochure</Button>
          </LinkContainer>
        </td> 
        <td>
          <LinkContainer
            to={`/e-brochure/${eBrochure._id}/edit`}
            className="edit-e-brochure-link"
          >
            <Button>Edit E-Brochure</Button>
          </LinkContainer>
        </td> 
        
      </tr>
    });
  }
}

export default ConfigureWhiteLabelForm;
