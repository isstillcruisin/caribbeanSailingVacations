import React from "react";
import ImageUploader from '../ImageUploader'
import Container from 'react-bootstrap/Container'
import Alert from '../Alert'

const YachtForm = props => (
  <Container>
    <Alert location={{state: { alert: props.alert }}} />      
    <form>
      <div className="form-group add-boat-form">
        <label htmlFor="boat-name">
          <strong>Boat Name</strong>
        </label>
        <input
          className="form-control"
          id="boat-name"
          type="text"
          value={props.boatName}
          placeholder="name of the boat..."
          name="boatName"
          onChange={props.handleInputChange}
          required
        />
        <label htmlFor="description">
          <strong>Crew Bio</strong>
        </label>
        <input
          className="form-control"
          id="crewBio"
          type="textArea"
          value={props.crewBio}
          placeholder="about the crew.."
          name="crewBio"
          onChange={props.handleInputChange}
          required
        />
        <label htmlFor="maxPassengers">
          <strong>Passenger Capacity</strong>
        </label>
        <input
          className="form-control"
          id="maxPassengers"
          type="number"
          value={props.maxPassengers}
          placeholder="4-30"
          name="maxPassengers"
          onChange={props.handleInputChange}
          required
        />
        <label htmlFor="year">
          <strong>Year made</strong>
        </label>
        <input
          className="form-control"
          id="year"
          type="number"
          value={props.year}
          placeholder="2009"
          name="year"
          onChange={props.handleInputChange}
          required
        />
        <label htmlFor="manufacture">
          <strong>Manufacture of Boat</strong>
        </label>
        <input
          className="form-control"
          id="manufacture"
          type="text"
          value={props.manufacture}
          placeholder="Boat size etc..."
          name="manufacture"
          onChange={props.handleInputChange}
          required
        />
         <label htmlFor="pricePerWeek">
          <strong>Price per week ($)</strong>
        </label>
        <input
          className="form-control"
          id="manufacture"
          type="text"
          value={props.pricePerWeek}
          placeholder="price per week ($)"
          name="pricePerWeek"
          onChange={props.handleInputChange}
          required
        />
        <label htmlFor="cyaId">
          <strong>Central Yacht Agent ID</strong>
        </label>
        <input
          className="form-control"
          id="cyaId"
          type="number"
          value={props.cyaId}
          placeholder="Central Yacht Agent ID"
          name="cyaId"
          onChange={props.handleInputChange}
          required
        />
        <label htmlFor="image-url">
          <strong>Boat Images</strong>
        </label>
        <ImageUploader
          imgs={props.imgs}
          setUrls={props.handleSetUrls}
          placeholder='Drop a file here, or click to select a file to upload.'
          multiple={true}
          showDropZone={true}
        />
      </div>
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
          <a href={`https://www.centralyachtagent.com/yachtadmin/showyachts.php?id=${props.cyaId}&disptype=1&uid=1892&unit=1&stat=1`} target='_blank'>
            CYA E-Brochure (opens in new tab)
          </a>
        </div>
      )}
    </form>
  </Container>
);

export default YachtForm;
