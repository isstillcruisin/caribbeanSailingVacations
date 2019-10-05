import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Card from 'react-bootstrap/Card'

const Home = () => {
  return <div className='home'>
    <h1 style={{textAlign: 'center'}}>Charter Assistant</h1>
    <h2 style={{textAlign: 'center'}}>Your White-Label Solution For Chartering Yachts</h2>
    <Container>
      <Card className='blue-card'>
        <h3>How it works:</h3>
        <ol>
          <li><b>You</b> create a White-Label with your personalized information and a logo.</li>
          <li><b>You</b> create E-Brochures, choosing which Yachts go on which E-Brochures, catered to the needs of your specific clients.</li>
          <li><b>You</b> communicate directly with your clients.</li>
          <li>Charter Assistant facilitates communication through automated emails to you and from you on your behalf.</li>
        </ol>
      </Card>
    </Container>
  </div>
}

export default Home
