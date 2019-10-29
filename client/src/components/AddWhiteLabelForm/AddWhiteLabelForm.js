import React from 'react'
import PropTypes from 'prop-types'

const AddWhiteLabelForm = props => (
  <form>
    <div className="form-group add-white-label-form">
      <label htmlFor="white-label-name">
        <strong>White-Label Name</strong>
      </label>
      <input
        className="form-control"
        id="white-label-name"
        type="text"
        value={props.whiteLabelName}
        placeholder="name of the white-label website..."
        name="whiteLabelName"
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

AddWhiteLabelForm.propTypes = {
  whiteLabelName: PropTypes.string,
  handleInputChange: PropTypes.func,
  handleFormSubmit: PropTypes.func,
}

export default AddWhiteLabelForm
