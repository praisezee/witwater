import React from 'react'
import { Container, FloatingLabel, Form, FormControl, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Login = () => {
  return (
    <div className="py-4 vh-75">
      <div className="d-flex align-items-center h-100">
        <Container fluid>
          <Row className='border rounded shadow py-5 w-100 mx-auto'>
            <p className="text-center text-uppercase text-center h1 fw-bold py-3">Login</p>
            <Form >
              <Row>
                <Col xs={12} lg={6} className='mx-auto'>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Email'>
                  <FormControl placeholder='Enter your email address' type='email'/>
                </FloatingLabel>
                <FloatingLabel className='my-2'  controlId='floatingInputGrid' label='Password'>
                  <FormControl placeholder='Enter your password' type='password'/>
                </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={6} className="d-flex my-4 mx-auto">
                <p className="text-secondary my-auto">
                  Don't have an account? click <Link to='../register' className='link-primary'>here</Link>
                </p>
                <Button className='ms-auto h-3 text-capitalize fw-bold'>
                  Login
                </Button>
              </Col>
              </Row>
            </Form>
          </Row>
        </Container>
      </div>
    </div>
  )
}

export default Login