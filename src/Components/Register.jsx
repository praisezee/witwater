import React, { useEffect, useRef } from 'react'
import { Container, FloatingLabel, Form, FormControl, Row, Col, Button, FormSelect, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Register = () =>
{
  const userRef = useRef()

  useEffect( () =>
  {
    userRef.current.focus()
  }, [])

  const {errMsg, errRef, success, name, setName, gender, setGender, role, setRole, state, setState, city, setCity, email,setEmail, phoneNumber, setPhoneNumber, password, setPassword, confirm, setConfirm, handleRegister, validPwd, validEmail,validMatch,pwdFocus,setPwdFocus, matchFocus, setMatchFocus, setEmailFocus, emailFocus, verifyEmail, isLoggedIn, code, setCode} = useAuth()
  return (
<div className="py-4 min-vh-100">
  <div className="d-flex align-items-center h-100 w-100">
    { success ? (
      <Container fluid>
        <Row className='border rounded py-5  w-75 mx-auto' >
          <p className="text-uppercase text-center">Registration successful</p>
              <p className="h6">Your registration was successful. please check your email and enter the verification code sent</p>
              <FormControl value={ code } onChange={ ( e ) => setCode( e.target.value ) } />
              <Button variant='outline-primary' onClick={verifyEmail}>Verify</Button>
        </Row>
      </Container>
    )
    : (
      <Container fluid>
        <Row className='border rounded shadow py-5  w-100 mx-auto'>
          <p className="text-center text-uppercase text-center h1 fw-bold py-3">Register</p>
          <div ref={ errRef } role='alert' className={errMsg ? 'alert alert-danger w-75 mx-auto' : 'd-none'} aria-live='assertive'>{ errMsg }</div>
          <Form >
            <Row>
              <Col xs={ 12 } className='mx-auto'>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Fullname'>
                  <FormControl
                    placeholder='Enter your fullname'
                    type='text'
                    value={ name }
                    required
                    ref={userRef}
                    onChange={(e)=>setName(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col xs={ 12 } lg={ 6 }>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Gender'>
                  <FormSelect value={gender} onChange={(e)=>setGender(e.target.value)} required>
                    <option defaultValue="Select an option" disabled>Select an option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </FormSelect>
                </FloatingLabel>
              </Col>
              <Col xs={ 12 } lg={ 6 }>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Role'>
                  <FormSelect value={role} onChange={(e)=>setRole(e.target.value)} required>
                    <option defaultValue="Select an option"  disabled>Select an option</option>
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
                  <FormControl
                    placeholder='Enter your State'
                    type='text'
                    value={ state }
                    required
                    onChange={(e)=>setState(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6}>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='City'>
                  <FormControl
                    placeholder='Enter your city'
                    type='text'
                    value={ city }
                    required
                    onChange={(e)=>setCity(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6}>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Email'>
                  <FormControl
                    placeholder='Enter your email address'
                    type='email'
                    value={ email }
                    onChange={ ( e ) => setEmail( e.target.value ) }
                    aria-invalid={ validEmail ? 'false' : 'true' }
                    aria-describedby='email'
                    required
                    onFocus={ () => setEmailFocus( true ) }
                    onBlur={ () => setEmailFocus( false ) }
                  />

                </FloatingLabel>
                <div id='email' className={ emailFocus && email && !validEmail ? "alert alert-danger d-flex align-items-center" : 'd-none' } role='alert'>
                  Please enter a valid email address
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Phone Number'>
                  <FormControl
                    placeholder='Enter your phone number'
                    type='tel'
                    required
                    value={ phoneNumber }
                    onChange={(e)=>setPhoneNumber(e.target.value)}
                  />
                </FloatingLabel>
              </Col>
              <Col xs={12} lg={6}>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Password'>
                  <FormControl
                    placeholder='Enter your password'
                    type='password'
                    value={ password }
                    onChange={ ( e ) => setPassword( e.target.value ) }
                    required
                    aria-invalid={validPwd ? 'false' : 'true'}
                    aria-describedby='password'
                    onFocus={ ( ) => setPwdFocus( true ) }
                    onBlur={ () => setPwdFocus( false ) }
                  />
                </FloatingLabel>
                <div id='password' className={ pwdFocus && !validPwd && password ? "alert alert-danger d-flex align-items-center" : 'd-none' } role='alert'>
                  Password must be 8 to 24 character long which must contain uppercase, lowercase, a number and a special character.
                </div>
              </Col>
              <Col xs={12} lg={6}>
                <FloatingLabel className='my-2' controlId='floatingInputGrid' label='Confirm Password'>
                  <FormControl
                    placeholder='Confirm your password'
                    type='password'
                    required
                    value={ confirm }
                    onChange={ ( e ) => setConfirm( e.target.value ) }
                    aria-invalid={ validMatch ? 'false' : 'true' }
                    aria-describedby='confirm'
                    onFocus={ () => setMatchFocus( true ) }
                    onBlur={ () => setMatchFocus( false ) }
                  />
                </FloatingLabel>
                <div id='confirm' className={ matchFocus && !validMatch  ? "alert alert-danger d-flex align-items-center" : 'd-none' } role='alert'>
                  Password does not match. please confirm your password.
                </div>
              </Col>
            </Row>
            <div className="d-flex my-4">
              <p className="text-secondary my-auto">
                Already have an account? click <Link to='../login' className='link-primary'>here</Link>
              </p>
              { isLoggedIn ?
              <Button variant='primary' className='ms-auto h-3 text-capitalize fw-bold' disabled >
                <Spinner as='span' size='sm' role='status' aria-hidden='true'/> loading
              </Button>
              :
              <Button className='ms-auto h-3 text-capitalize fw-bold' disabled={!validEmail || !validMatch || !validPwd ? true : false}  onClick={handleRegister}>
                Register
              </Button>
          }
            </div>
          </Form>
        </Row>
      </Container>
    )
    }
  </div>
</div>
  )
}

export default Register