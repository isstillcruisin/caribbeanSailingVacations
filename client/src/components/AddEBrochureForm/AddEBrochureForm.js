import React from 'react'
import PropTypes from 'prop-types'

const AddEBrochureForm = props => (
  <form>
    <div className="form-group add-boat-form">
      <label htmlFor="boat-name">
        <strong>EBrochure Name</strong>
      </label>
      <input
        className="form-control"
        id="boat-name"
        type="text"
        value={props.name}
        placeholder="name of the eBrochure..."
        name="name"
        onChange={props.handleInputChange}
        required
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
)

AddEBrochureForm.propTypes = {
  name: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleFormSubmit: PropTypes.func,
}

export default AddEBrochureForm
