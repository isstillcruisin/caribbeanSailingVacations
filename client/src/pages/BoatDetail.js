import React, { Component } from 'react'
import API from '../utils/API'
import Loader from '../components/Loader'
import BoatDetailDisplay from '../components/BoatDetailDisplay'
import PropTypes from 'prop-types'
import Container from 'react-bootstrap/Container'

class BoatDetail extends Component {
  state = {};

  componentDidMount() {
    let { id } = this.props.match.params
    API.getBoat(id).then(res => {
      this.setState({
        boat: res.data
      })
    })
  }

  showBoat = () => {
    return this.state.boat ? (
      <Container>
        <BoatDetailDisplay boat={this.state.boat} />
      </Container>
    ) : (
      <Loader/>
    )
  };

  render() {
    return <div>{this.showBoat()}</div>
  }
}

BoatDetail.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}

export default BoatDetail
