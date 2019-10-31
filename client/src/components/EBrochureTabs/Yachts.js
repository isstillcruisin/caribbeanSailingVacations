import React, {Component} from 'react'
import Row from 'react-bootstrap/Row'
import Container from 'react-bootstrap/Container'
import EBrochureYacht from '../EBrochureYacht'
import AvailableYachtSearchForm from '../AvailableYachtSearchForm'
import PropTypes from 'prop-types'

class Yachts extends Component {
  showYachts = (yachts) => {
    if (yachts.length === 0) {
      return  <Container>
        <p className='text-left'>No Yachts Match Your Selected Dates And Number Of Passengers</p>
      </Container>
    } else {
      return yachts.map((yacht, i) => {
        return <div key={i} style={{display: 'flex', flexDirection: 'column', height: '500px'}}>
          <EBrochureYacht yacht={yacht} onCharterYacht={() => this.props.onCharterYacht(yacht._id)} />
        </div>
      })
    }
  }

  render() {
    return <>
      <AvailableYachtSearchForm 
        eBrochure={this.props.eBrochure} 
        onSearch={this.props.handleSearch} 
        filters={this.props.filters}
      />
      <Row style={{'marginBottom': '20px'}}>
        {this.showYachts(this.props.yachts)}
      </Row>
    </>

  }
}

Yachts.propTypes = {
  yachts: PropTypes.arrayOf(PropTypes.object),
  eBrochure: PropTypes.object,
  filters: PropTypes.object,
  onCharterYacht: PropTypes.func,
  handleSearch: PropTypes.func,
}

export default Yachts