import React from 'react'
import ImageUploader from '../ImageUploader'
import Container from 'react-bootstrap/Container'
import Alert from '../Alert'
import PropTypes from 'prop-types'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'

const YachtForm = props => (
  <Container>
    <Alert alert={props.alert} />      
    <Form>
      <Form.Row controlId="form-boat-name">
        <Col xs="2">
          <Form.Label>Boat Name</Form.Label>
        </Col>
        <Col>
          <Form.Control 
            type='text' 
            value={props.boatName}
            placeholder='name of the boat...' 
            name='boatName'
            onChange={props.handleInputChange}
            required
          />
        </Col>
      </Form.Row>
      <Form.Row controlId="form-crew-bio">
        <Col xs="2">
          <Form.Label>Crew Bio</Form.Label>
        </Col>
        <Col>
          <Form.Control 
            as='textarea'
            rows={4} 
            value={props.crewBio}
            placeholder='about the crew...' 
            name='crewBio'
            onChange={props.handleInputChange}
            required
          />
        </Col>
      </Form.Row>
          <Form.Row controlId="form-max-passengers">
        <Col xs="2">
          <Form.Label>Max Passengers</Form.Label>
        </Col>
        <Col>
          <Form.Control 
            type='number'
            value={props.maxPassengers}
            placeholder='maximum number of passengers on the yacht' 
            name='maxPassengers'
            onChange={props.handleInputChange}
            required
          />
        </Col>
      </Form.Row>
      <Form.Row controlId="form-year">
        <Col xs="2">
          <Form.Label>Year Made</Form.Label>
        </Col>
        <Col>
          <Form.Control 
            type='number'
            value={props.year}
            placeholder='year the yacht was constructed' 
            name='year'
            onChange={props.handleInputChange}
            required
          />
        </Col>
      </Form.Row>
      <Form.Row controlId="form-manufacture">
        <Col xs="2">
          <Form.Label>Manufacture of Yacht</Form.Label>
        </Col>
        <Col>
          <Form.Control 
            type='text'
            value={props.manufacture}
            placeholder='Boat size, etc...' 
            name='manufacture'
            onChange={props.handleInputChange}
            required
          />
        </Col>
      </Form.Row>
      <Form.Row controlId="form-price-per-week">
        <Col xs="2">
          <Form.Label>Price Per Week</Form.Label>
        </Col>
        <Col>
          <Form.Control 
            type='number'
            value={props.pricePerWeek}
            placeholder='price per week ($)' 
            name='pricePerWeek'
            onChange={props.handleInputChange}
            required
          />
        </Col>
      </Form.Row>
      <Form.Row controlId="form-cya-id">
        <Col xs="2">
          <Form.Label>Central Yacht Agent ID</Form.Label>
        </Col>
        <Col>
          <Form.Control 
            type='text'
            value={props.cyaId}
            placeholder='Central Yacht Agent ID' 
            name='cyaId'
            onChange={props.handleInputChange}
            required
          />
        </Col>
      </Form.Row>
      <Form.Row controlId='form-images'>
        <Col xs='2'>
          <Form.Label>Boat Images</Form.Label>
        </Col>
        <Col xs='10'>
          <ImageUploader
            imgs={props.imgs}
            setUrls={props.handleSetUrls}
            placeholder='Drop a file here, or click to select a file to upload.'
            multiple={true}
            showDropZone={true}
          />
        </Col>
      </Form.Row>
      <div className="pull-right">
        <button
          onClick={props.handleFormSubmit}
          type="submit"
          className="btn btn-lg btn-danger"
        >
          Save
        </button>
      </div>
      { props.cyaId && (
        <div className='mt-2'>
          <a href={`https://www.centralyachtagent.com/yachtadmin/showyachts.php?id=${props.cyaId}&disptype=1&uid=1892&unit=1&stat=1`} target='_blank' rel="noopener noreferrer">
            CYA E-Brochure (opens in new tab)
          </a>
        </div>
      )}
    </Form>
  </Container>
)

YachtForm.propTypes = {
  cyaId: PropTypes.number,
  alert: PropTypes.string,
  boatName: PropTypes.string,
  handleInputChange: PropTypes.func,
  crewBio: PropTypes.string,
  maxPassengers: PropTypes.number,
  year: PropTypes.number,
  manufacture: PropTypes.string,
  pricePerWeek: PropTypes.number,
  imgs: PropTypes.arrayOf(PropTypes.string),
  handleSetUrls: PropTypes.func,
  handleFormSubmit: PropTypes.func,
}

export default YachtForm
