import React, { Component } from 'react'
import API from '../utils/API'
import styled from 'styled-components'
import { LinkContainer } from 'react-router-bootstrap'
import Zoom from 'react-reveal/Zoom'
import Button from 'react-bootstrap/Button'
import Loader from '../components/Loader'
import Row from 'react-bootstrap/Row'
import EBrochureYacht from '../components/EBrochureYacht'
import PropTypes from 'prop-types'

const BoatsDisplay = styled.div`
  display: grid;
  grid-template: 50% 50% / 50% 50%;
  background: ${props => props.theme.lightgreen};
  @media (max-width: 800px) {
    grid-template: 50% 50% / 100%;
  }
`

class AllBoats extends Component {
  state = {
    boats: []
  };

  componentDidMount() {
    this.getBoats()
  }

  componentDidUpdate() {
    this.showBoats()
  }

  getBoats = () => {
    API.getBoats(this.props).then(response => {
      if (response) {
        this.setState({ boats: response.data })
      } else {
        console.error('response error (╯°□°)╯︵ ┻━┻ ', response)
      }
    })
  }

  deleteLink = (boat) => {
    if (!this.props.eBrochure) {
      return <Button variant="danger" style={{marginLeft: '100px', }} onClick={() => this.handleDeleteBoat(boat)}>Delete</Button>
    }
  }

  editLink = (boat) => {
    if (!this.props.eBrochure) {
      return <LinkContainer to={`/boat/${boat._id}/edit`}  style={{marginRight: '100px'}}>
        <Button>Modify</Button>
      </LinkContainer>
    }
  }

  handleDeleteBoat = (boat) => {
    if (window.confirm(`Are you sure you want to delete the yacht named ${boat.boatName}.`)) {
      API.deleteBoat(boat._id).then(response => {
        if (response) {
          let boats = this.state.boats.filter( b => b._id !== boat._id)
          this.setState({boats: boats})
        }
      })
    } 
  }

  showBoats = () => {
    if (this.state.boats) {
      return this.state.boats.map((boat, i) => {
        return (
          <Zoom bottom key={boat._id}>
            <div style={{display: 'flex', flexDirection: 'column', height: '500px'}}>
              <EBrochureYacht yacht={boat} />
              <Row className='button-row'> 
                {this.editLink(boat)}
                <LinkContainer
                  key={`${boat._id}${i + 5}`}
                  to={`/boat/${boat._id}`}
                  className="boat-detail-link"
                ><Button>See Details</Button></LinkContainer>               
                {this.deleteLink(boat)}
              </Row>
            </div>
          </Zoom>
        )
      })
    } else {
      return <Loader />
    }
  };

  render() {
    return <div className='bg-lightgreen'>
      <LinkContainer to='/add-boat' className='m-4'>
        <Button>Add Yacht</Button>
      </LinkContainer>
      <BoatsDisplay>
        {this.showBoats()}
      </BoatsDisplay>
    </div>
  }
}

AllBoats.propTypes = {
  eBrochure: PropTypes.object
}


export default AllBoats
