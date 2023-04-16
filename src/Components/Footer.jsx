import React from 'react'
import { Col, Container, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsFacebook, BsInstagram, BsTwitter, BsYoutube } from 'react-icons/bs'

const Footer = () =>
{
  const date = new Date()
  const year = date.getFullYear()
  return (
    <div className="text-dark bg-light mt-4">
      <footer>
        <Container className="p-4">
          <Row>
            <Col md={12} lg={6} className="mb-4">
              <h3 className="mb-3 f-percifico">Witwater</h3>
              <p>
                With a team of highly skilled professionals, we strive to achieve the highest levels of quality, efficiency, and customer satisfaction. Our cutting-edge technology and state-of-the-art facilities allow us to stay ahead of the curve and constantly improve our offerings. At the model company, we don't just meet expectations - we exceed them.
              </p>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <h5 className="mb-3 text-capitalize">quick links</h5>
              <ul className="list-unstyled mb-0">
                <li key={1} className="mb-1">
                  <Link to='/' className="link-dark text-capitalize"  >Home</Link>
                </li>
                <li key={2} className="mb-1">
                  <Link to='about' className="link-dark text-capitalize" >About</Link>
                </li>
                <li key={3}>
                  <Link to='auth/login' className="link-dark text-capitalize" >login</Link>
                </li>
                <li key={4} className="mb-1">
                  <Link to='auth/register' className="link-dark text-capitalize" >register</Link>
                </li>
              </ul>
            </Col>
            <Col lg={3} md={6} className="mb-4">
              <h5 className="mb-1 ">Socials</h5>
              <Row className='g-2'>
                <Col xs={ 6 }>
                  <Link to='https://www.twitter.com/'>
                    <BsTwitter className=' text-primary border rounded-circle display-3 p-2 border-dark'/>
                  </Link>
                </Col>
                <Col xs={ 6 }>
                  <Link to='https://www.facebook.com/'>
                    <BsFacebook className='border rounded-circle display-3 p-2 border-dark text-primary'/>
                  </Link>
                </Col>
                <Col xs={ 6 }>
                  <Link to='https://www.instagram.com/'>
                    <BsInstagram className='border rounded-circle display-3 p-2 border-dark text-danger'/>
                  </Link>
                </Col>
                <Col xs={ 6 }>
                  <Link to='https://www.youtube.com/'>
                    <BsYoutube className='border rounded-circle display-3 p-2 border-dark text-danger'/>
                  </Link>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <div className="text-center p-3" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
          © {year} Copyright 
          <Link className=" mx-1 link-dark" to="/">witwater.com</Link>
        </div>
      </footer>
    </div>
)
}

export default Footer
