import React, {useRef, useEffect} from 'react'
import { Container, FloatingLabel, Form, FormControl, Row, Col, Button, Spinner, FormCheck } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () =>
{
  const userRef = useRef()
  const { errRef, email, password, errMsg, setErrMsg, handleLogin, setEmail, setPassword, isLoggedIn, persist, setPersist } = useAuth()

  
  


  useEffect( () =>
  {
    userRef.current.focus()
  }, [] )
  
  useEffect( () =>
  {
    setErrMsg( '' );
  }, [ email, password ] )

  const togglePersist = () =>
  {
    setPersist( prev => !prev );
  }
  useEffect( () =>
  {
    localStorage.setItem('persist', persist)
  }, [persist])
  
  return (
    <div className="py-4 vh-75">
      <div className="d-flex align-items-center h-100">
        <Container fluid>
          <Row className='border rounded shadow py-5 w-100 mx-auto'>
            <p className="text-center text-uppercase text-center h1 fw-bold py-3">Login</p>
            <div ref={ errRef } role='alert' className={errMsg? 'alert alert-danger w-75 mx-auto' : 'd-none'} aria-live='assertive'>{ errMsg }</div>
            <Form >
              <Row>
                <Col xs={12} lg={6} className='mx-auto'>
                <FloatingLabel className='my-2' controlId='floatingInputGrid1' label='Email'>
                    <FormControl
                      ref={userRef}
                      placeholder='Enter your email address'
                      type='email'
                      value={ email }
                      onChange={ ( e ) => setEmail( e.target.value ) }
                      required
                    />
                </FloatingLabel>
                <FloatingLabel className='my-2'  controlId='floatingInputGrid2' label='Password'>
                    <FormControl
                      placeholder='Enter your password'
                      type='password'
                      value={ password }
                      onChange={ ( e ) => setPassword( e.target.value ) }
                      required
                    />
                </FloatingLabel>
                </Col>
              </Row>
              <Row>
                <Col xs={12} lg={6} className="d-flex my-4 mx-auto">
                  <div>
                    <FormCheck type='checkbox' id='default-checkbox' label='Remember me on this device' onChange={ togglePersist } checked={ persist } />
                    <p className="text-secondary my-auto">
                    Don't have an account? click <Link to='../register'  className='link-primary'>here</Link>
                    </p>
                  </div>
                  { isLoggedIn ?
                    <Button variant='primary' className='ms-auto h-3 text-capitalize fw-bold ' disabled  onClick={ handleLogin }>
                      <Spinner as='span' size='sm' role='status' aria-hidden='true'/> loading
                    </Button>
                    
                    :
                    <Button className='ms-auto h-3 text-capitalize fw-bold' onClick={ handleLogin }>
                      Login
                    </Button>
                }
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