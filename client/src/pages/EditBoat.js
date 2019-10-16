import React, { Component } from "react"
import YachtForm from "../components/YachtForm"
import API from "../utils/API"
import Loader from "../components/Loader"
import Alert from "../components/Alert"
import Tab from "react-bootstrap/Tab"
import Tabs from "react-bootstrap/Tabs"
import Card from "react-bootstrap/Card"
import MultipleDateRangePicker from '../components/MultipleDateRangePicker'
import moment from 'moment';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

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
      API.getUnavailableDateRanges(id).then(ranges => {
        this.setState({
          boat: res.data,
          unavailableDateRanges: ranges,
        })
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
      boat: boat,
      alert: '',
    })
  }

  handleSetUrls = urls => {
    let boat =  Object.assign({}, this.state.boat, {imgs: urls})

    this.setState({
      boat: boat
    })
  }

  handleDeleteRange = range => {
    //TODO: make this actually remove from the DB via an API call
    const ranges = this.state.unavailableDateRanges.filter(range2 => !(range.from === range2.from && range.to === range2.to)) 
    this.setState({unavailableDateRanges: ranges})
  }

  handleAddRange = range => {
    //TODO: make this actually add a range to the DB via an API call
    const ranges = [...this.state.unavailableDateRanges, range]
    this.setState({unavailableDateRanges: ranges})
  }

  render() {
    if (this.state.boat) {
      return (
        <div className="EditBoat">
          <Tabs>
            <Tab eventKey="configure" title="Configure">
              <Card>
                <Card.Header>
                  <h3>Configure Yacht: <i>{this.state.boat.boatName}</i></h3>
                </Card.Header>
                <Card.Body>
                  <YachtForm
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
                    alert={this.state.alert}
                  />
                </Card.Body>
              </Card>
            </Tab>
            <Tab eventKey="availability" title='Yacht availability'>
              <Card>
                <Card.Header>Availability</Card.Header>
                <Card.Body>
                  <MultipleDateRangePicker 
                    ranges={this.state.unavailableDateRanges} 
                    handleDeleteRange={this.handleDeleteRange} 
                    handleAddRange={this.handleAddRange} 
                  />
                  <BootstrapTable 
                    keyField='dateRange' 
                    data={ this.state.unavailableDateRanges } 
                    columns={[{
                      dataField: 'from',
                      text: 'From',
                      formatter: (from) => moment(from).format('LL')
                    }, {
                      dataField: 'to',
                      text: 'To',
                      formatter: (to) => moment(to).format('LL')
                    }]}
                    pagination={ paginationFactory() }
                  />  
                </Card.Body>
              </Card>
            </Tab>
          </Tabs>
        </div>
      )
    } else {
      return <Loader />
    }
  }
}

export default EditBoat
