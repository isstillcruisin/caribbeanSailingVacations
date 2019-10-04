import React, {Component} from "react";
import { Table, Button, Image } from 'react-bootstrap';
import BootstrapSwitchButton from 'bootstrap-switch-button-react'
import { LinkContainer } from 'react-router-bootstrap'
import formatPrice from '../../utils/formatPrice';

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
            disabled
          />
        </div>
      </form>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Maximum Number Of Passengers</th>
            <th>Price Per Week</th>
            <th>Images</th>
            <th>Enabled?</th>
            <th>More Yacht Details</th>
          </tr>
        </thead>
        <tbody>
          {this.renderAllYachtRows(this.props.allYachts, this.props.eBrochure)}
        </tbody>
      </Table>
    </div>
  }

  renderAllYachtRows = (allYachts, eBrochure) => {
    return allYachts.map((yacht, i) => {
      return <tr key={`yacht-${i}`}>
          <td>{yacht.boatName}</td>
          <td>{yacht.maxPassengers}</td>
          <td>{formatPrice(yacht.pricePerWeek)}</td>
          <td><div className='image-thumbnails-in-table'>
            {yacht.imgs && yacht.imgs.map((image, index) => {
              return <Image key={index + 1} src={image} alt="" thumbnail />
            })}</div>
          </td>
          <td>
            <BootstrapSwitchButton
              checked={ eBrochure.yachts.map(y => y._id).includes(yacht._id) }
              onlabel='Y'
              offlabel='N'
              onChange={(checked) => {
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
