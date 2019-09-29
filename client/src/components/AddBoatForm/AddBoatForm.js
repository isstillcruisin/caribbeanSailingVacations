import React from "react";
import ImageUploader from '../ImageUploader'

const AddBoatForm = props => (
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
        <strong>Manufacturer of Boat</strong>
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
      <label htmlFor="image-url">
        <strong>Boat Images</strong>
      </label>
      <ImageUploader
        imgs={props.imgs}
        setUrls={props.handleSetUrls}
        placeholder='Try dropping some files here, or click to select files to upload.'
        multiple={true}
      />
    </div>
    <div className="pull-right">
      <button
        onClick={props.handleFormSubmit}
        type="submit"
        className="btn btn-lg btn-danger"
      >
        Submit
      </button>
    </div>
  </form>
);

export default AddBoatForm;
