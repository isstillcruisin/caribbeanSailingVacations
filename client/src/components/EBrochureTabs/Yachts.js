import React, {Component} from 'react'
import Row from 'react-bootstrap/Row'
import EBrochureYacht from '../EBrochureYacht'
import AvailableYachtSearchForm from '../AvailableYachtSearchForm'


class Yachts extends Component {
  showYachts = (yachts) => {
    if (yachts.length === 0) {
      return <h3>No Yachts Match Your Selected Dates And Number Of Passengers</h3>
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
export default Yachts