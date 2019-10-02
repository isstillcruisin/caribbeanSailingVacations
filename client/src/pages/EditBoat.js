import React, { Component } from "react"
import AddBoatForm from "../components/AddBoatForm"
import API from "../utils/API"
import Loader from "../components/Loader"
import Alert from "../components/Alert"

class EditBoat extends Component {
  state = {
    boat: null
  }

  handleFormSubmit = event => {
    event.preventDefault()
    try {
      this.saveBoat()
    } catch (err) {
      console.log("error in save boats (╯°□°)╯︵ ┻━┻ ", err)
    }
  }

  componentDidMount() {
    let { id } = this.props.match.params
    API.getBoat(id).then(res => {
      this.setState({
        boat: res.data
      })
    })
  }

  saveBoat = () => {
    API.updateBoat(this.state.boat)
      .then(res =>
        this.setState({
          boat: this.state.boat,
          alert: 'Yacht Saved'
        })
      )
      .catch(err => console.log("saving boat error", err))
  }

  handleInputChange = event => {
    const { name, value } = event.target
    let boat = Object.assign({}, this.state.boat, {[name]: value})

    this.setState({
      boat: boat
    })
  }

  handleSetUrls = urls => {
    let boat =  Object.assign({}, this.state.boat, {imgs: urls})

    this.setState({
      boat: boat
    })
  }

  render() {
    if (this.state.boat) {
      return (
        <div className="EditBoat">
          <Alert location={{state: { alert: this.state.alert }}} />
          <header className="EditBoat-header">
            <AddBoatForm
              handleInputChange={this.handleInputChange}
              handleFormSubmit={this.handleFormSubmit}
              handleSetUrls={this.handleSetUrls}
              boatName={this.state.boat.boatName}
              imgs={this.state.boat.imgs}
              year={this.state.boat.year}
              maxPassengers={this.state.boat.maxPassengers}
              manufacture={this.state.boat.manufacture}
              crewBio={this.state.boat.crewBio}
              pricePerWeek={this.state.boat.pricePerWeek}
            />
          </header>
        </div>
      )
    } else {
      return <Loader />
    }
  }
}

export default EditBoat
