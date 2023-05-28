import React, { useState } from 'react'
import { Container, Form, Row, Col, FormControl, FloatingLabel, Button } from 'react-bootstrap';
import axios from '../api/register'
import { Link } from 'react-router-dom';

const Contact = () =>
{
  const [ surname, setSurname ] = useState( '' )
  const [ firstname, setFirstname ] = useState('')
  const [ phoneNumber, setPhoneNumber ] = useState('')
  const [ email, setEmail ] = useState('')
  const [ message, setMessage ] = useState( '' )
  const [status, setStatus] = useState(false)
  
  const submit = async () =>
  {
    try {
      await axios.post( '/contact', JSON.stringify( { surname, firstname, phoneNumber, email, message } ) )
      setStatus(true)
    } catch (err) {
      if (!err?.response) {
        setStatus('no server response')
      } else if ( err.response.status === 500 ) {
        setStatus('internal server error')
      }
    }
  }
  return (
    <div className='vh-100'>
        <p className="text-center fs-3 text-capitalize pt-4">
        contact <span className="f-percifico">witwater </span>
      </p>
      { !status ? (
        <div className="h-75 center">
          <Container fluid>
          <Row>
            <Col xs={ 10 } md={ 8 } className='mx-auto myy-auto py-4'>
              <Form className='text-dark'>
                <Row className='g-4'>
                  <Col xs={6}>
                    <FloatingLabel controlId='floatingInputGrid' label="Surname">
                      <FormControl placeholder='Enter your surname' type='text' value={surname} onChange={(e)=> setSurname(e.target.value)} />
                    </FloatingLabel>
                  </Col>
                  <Col xs={6}>
                    <FloatingLabel controlId='floatingInputGrid' label="Firstname">
                      <FormControl placeholder='Enter your surname' type='text' value={firstname} onChange={(e)=> setFirstname(e.target.value)} />
                    </FloatingLabel>
                  </Col>
                  <Col xs={6}>
                    <FloatingLabel controlId='floatingInputGrid' label="Phone Number">
                      <FormControl placeholder='Enter your phone number' type='tel' value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} />
                    </FloatingLabel>
                  </Col>
                  <Col xs={6}>
                    <FloatingLabel controlId='floatingInputGrid' label="Email">
                      <FormControl placeholder='Enter your email address' type='email' value={email} onChange={(e)=>setEmail(e.target.value)} />
                    </FloatingLabel>
                  </Col>
                  <Col xs={ 12 }>
                    <FloatingLabel controlId='floatingInputGrid' label="Your Message">
                        <FormControl placeholder='Enter your message' type='text' as='textarea' rows={ 4 } style={ {minHeight: '100px'} } value={message} onChange={(e)=>setMessage(e.target.value)} />
                    </FloatingLabel>
                  </Col>
                    <Col xs={ 12 } className='text-end'>
                      <Button variant='outline-primary' className=' text-capitalize' onClick={submit}>send your message</Button>
                  </Col>
                  </Row>
              </Form>
            </Col>
            <Col xs={ 10 } md={ 4 } className='my-auto mx-auto py-2'>
              <p className="text-capitalize h5">phone: +2349015230294</p>
              <p className="text-capitalize h5">email: <span className="text-lowercase">example@email.com</span></p>
              <p className="text-capitalize h5">website: <Link className="f-percifico link-dark link" to='/'>Witwater</Link> website</p>
            </Col>
          </Row>
        </Container>
        </div>
      ) : (
          <div className="vh-75 center">
            <p className='border eounded shadow-sm p-5'>Thank you for contacting witwater</p>
          </div>
      )}
    </div>
  )
}

export default Contact
