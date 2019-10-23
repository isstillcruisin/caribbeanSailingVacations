import React from 'react'
import Row from 'react-bootstrap/Row'
import Button from 'react-bootstrap/Button'
import EBrochureYacht from '../EBrochureYacht'

const Yachts = props => {
  return <>
    <Row>
      <h4 style={{'margin': '20px'}}>Please choose a yacht to book:</h4>
    </Row>
    <Row style={{'marginBottom': '20px'}}>
      {props.eBrochure.yachts.map((yacht, i) => {
        return <div key={i} style={{display: 'flex', flexDirection: 'column', height: '500px'}}>
          <EBrochureYacht yacht={yacht} />
          <Button onClick={() => props.onCharterYacht(yacht._id)} >Book Now</Button>
        </div>
      })}
    </Row>
    <Row className='footer-address'>
      <i>These yachts were specifically chosen for you by your Travel Agent, and all communication will be with them, on your behalf.</i>
    </Row>
  </>
}
export default Yachts