import React from 'react'
import { useState } from 'react';
import { Button, Col, Form, FormControl, FormLabel, FormSelect, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import useAuth from '../../hooks/useAuth';

const EditProfile = ( { show, auth,hide } ) =>
{
  const axiosPrivate = useAxiosPrivate()
  const [ name, setName ] = useState( auth.name )
  const [gender, setGender] = useState(auth.gender)
  const [role, setRole] = useState(auth.role)
  const [state, setState] = useState(auth.state)
  const [city, setCity] = useState(auth.city)
  const [ email, setEmail ] = useState( auth.email )
  const [ phoneNumber, setPhoneNumber ] = useState( auth.phoneNumber )
  const {setAuth} = useAuth()
  const handleSubmit = async () =>
  {
    try {
      const response = await axiosPrivate.patch( '/user', JSON.stringify( { name, gender, role, state, city, email, phoneNumber, id: auth.id } ) )
      console.log(response.data)
      setAuth( response.data )
      hide()
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <Modal show={show} onHide={hide} centered scrollable>
      <ModalHeader>
        <div className='d-flex justify-content-between w-100'>
            <Button variant='outline-danger' onClick={hide}>
            Cancle
          </Button>
          <Button variant='outline-primary' onClick={handleSubmit} >
            Save
          </Button>
          </div>
      </ModalHeader>
      <ModalBody>
        <Form>
          <Row className='p-3'>
            <Col className='my-2' xs={12}>
            <FormLabel className='h5' htmlFor='name'>
              Fullname
            </FormLabel>
            <FormControl className='fs-5' onChange={(e)=>setName(e.target.value)} value={name}/>
          </Col>
            <Col className='my-2' xs={12} lg={6}>
            <FormLabel className='h5' htmlFor='email'>
              Email
            </FormLabel>
            <FormControl className='fs-5' onChange={(e)=>setEmail(e.target.value)} value={email}/>
          </Col>
          <Col className='my-2' xs={12} lg={6}>
            <FormLabel className='h5' htmlFor='tel'>
              Phone Number
            </FormLabel>
            <FormControl className='fs-5' onChange={(e)=>setPhoneNumber(e.target.value)} value={phoneNumber
}/>
          </Col>
          <Col className='my-2' xs={12} lg={6}>
            <FormLabel className='h5' htmlFor='gender'>
              Gender
            </FormLabel>
              <FormSelect className='fs-5' onChange={ ( e ) => setGender( e.target.value ) } value={ gender }>
                    <option defaultValue="Select an option" disabled>Select an option</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
            </FormSelect>
          </Col>
          <Col className='my-2' xs={12} lg={6}>
            <FormLabel className='h5' htmlFor='skill'>
              Skill
            </FormLabel>
              <FormSelect className='fs-5' onChange={ ( e ) => setRole( e.target.value ) } value={ role }>
                <option defaultValue="Select an option"  disabled>Select an option</option>
                    <option value="model">Model</option>
                    <option value="client">Client</option>
                    <option value="photographer">Photographer</option>
                    <option value="videographer">Videographer</option>
                    <option value="artist">Makeup Artist</option>
                    <option value="stylist">Hair stylist</option>
                    <option value="influencer">Influencer</option>
            </FormSelect>
          </Col>
          <Col className='my-2' xs={12} lg={6}>
            <FormLabel className='h5' htmlFor='state'>
              State
            </FormLabel>
            <FormControl className='fs-5' onChange={(e)=>setState(e.target.value)} value={state}/>
          </Col>
          <Col className='my-2' xs={12} lg={6}>
            <FormLabel className='h5' htmlFor='city'>
              City
            </FormLabel>
            <FormControl className='fs-5' onChange={(e)=>setCity(e.target.value)} value={city}/>
          </Col>
          </Row>
        </Form>
      </ModalBody>
    </Modal>
  )
}

export default EditProfile
