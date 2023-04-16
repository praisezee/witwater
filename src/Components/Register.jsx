import React from 'react'
import { Container, FloatingLabel, Form, FormControl, Row, Col, Button, FormSelect } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Register = () => {
  return (
    <div className="py-4 min-vh-100">
      <div className="d-flex align-items-center h-100">
        <Container fluid>
          <Row className='border rounded shadow py-5  w-100 mx-auto'>
            <p className="text-center text-uppercase text-center h1 fw-bold py-3">Register</p>
            <Form >
              <Row>
                <Col xs={ 12 } className='mx-auto'>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Fullname'>
                    <FormControl placeholder='Enter your fullname' type='text'/>
                  </FloatingLabel>
                </Col>
                <Col xs={ 12 } lg={ 6 }>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Gender'>
                    <FormSelect>
                      <option value="0" selected disabled>Select an option</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </FormSelect>
                  </FloatingLabel>
                </Col>
                <Col xs={ 12 } lg={ 6 }>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Role'>
                    <FormSelect>
                      <option value="0" selected disabled>Select an option</option>
                      <option value="model">Model</option>
                      <option value="client">Client</option>
                      <option value="photographer">Photographer</option>
                      <option value="videographer">Videographer</option>
                      <option value="artist">Makeup Artist</option>
                      <option value="stylist">Hair stylist</option>
                      <option value="influencer">Influencer</option>
                    </FormSelect>
                  </FloatingLabel>
                </Col>
                <Col xs={12} lg={6}>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='State'>
                    <FormControl placeholder='Enter your State' type='text' />
                  </FloatingLabel>
                </Col>
                <Col xs={12} lg={6}>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='City'>
                    <FormControl placeholder='Enter your city' type='text' />
                  </FloatingLabel>
                </Col>
                <Col xs={12} lg={6}>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Email'>
                    <FormControl placeholder='Enter your email address' type='email'/>
                  </FloatingLabel>
                </Col>
                <Col xs={12} lg={6}>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Phone Number'>
                    <FormControl placeholder='Enter your phone number' type='tel'/>
                  </FloatingLabel>
                </Col>
                <Col xs={12} lg={6}>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Password'>
                    <FormControl placeholder='Enter your password' type='password'/>
                  </FloatingLabel>
                </Col>
                <Col xs={12} lg={6}>
                  <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Confirm Password'>
                    <FormControl placeholder='Confirm your password' type='password'/>
                  </FloatingLabel>
                </Col>
              </Row>
              <div className="d-flex my-4">
                <p className="text-secondary my-auto">
                  Already have an account? click <Link to='../login' className='link-primary'>here</Link>
                </p>
                <Button className='ms-auto h-3 text-capitalize fw-bold'>
                  Register
                </Button>
              </div>
            </Form>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Register