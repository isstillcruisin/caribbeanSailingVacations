import React from 'react'
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'

const Home = () => {
  return <div className='home'>
    <h1 style={{textAlign: 'center'}}>Charter Assistant</h1>
    <h2 style={{textAlign: 'center'}}>Your White-Label Solution For Chartering Yachts</h2>
    <Container>
      <Card>
        <Card.Header>
          <h3>How it works:</h3>
        </Card.Header>
        <Card.Body>
          <ol>
            <li><b>You</b> create a White-Label with your personalized information and a logo.</li>
            <li><b>You</b> create E-Brochures, choosing which Yachts go on which E-Brochures, catered to the needs of your specific clients.</li>
            <li><b>You</b> communicate directly with your clients.</li>
            <li>Charter Assistant facilitates communication through automated emails to you and from you on your behalf.</li>
          </ol>
        </Card.Body>
      </Card>
      <Card>
        <Card.Header>
          <h3>Example e-brochure:</h3>
        </Card.Header>
        <Card.Body>
          <div style={{width: '600px', height: '300px'}}>
            <a href='https://caribbean-sailing-vacations.herokuapp.com/e-brochure/5d8d146b5d2c7f1564d7d17b' rel="noopener noreferrer" target='_blank'>
              <img src='https://res.cloudinary.com/dui3yyhou/image/upload/c_fill,h_300,w_600/v1573256106/ExampleEBrochure.png'></img>
            </a>
          </div>
        </Card.Body>
      </Card>
    </Container>
  </div>
}

export default Home
