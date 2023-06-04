import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Button, Col, Container, Form, FormControl, FormLabel, ListGroup, ListGroupItem, Modal, ModalBody, ModalHeader, Row } from 'react-bootstrap';
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import useDashboardContext from '../../hooks/useDashboardContext'
import MyPost from './MyPost';
import { BsCameraFill } from 'react-icons/bs'
import axios from '../api/register';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import EditProfile from './EditProfile';
import Verify from './Verify';
import { useNavigate } from 'react-router-dom';

const Profile = () =>
{
  const axiosPrivate = useAxiosPrivate()

  const navigate = useNavigate()
  const { auth, setAuth, subscribe } = useAuth()
  const {deleteAccount} = useDashboardContext()
  const [myPosts, setMyposts] = useState([])
  const [ modal, setModal ] = useState( false )
  const [loading, setLoading]= useState(true)
  const [ image, setImage ] = useState( auth.src !== '' ? auth.src : auth.src === '' && auth.gender.toLowerCase() === 'male' ? male : auth.src === '' && auth.gender.toLowerCase() === 'female' ? female : null )
  const [editForm, setEditForm] = useState(false)
  const [ url, setUrl ] = useState( image )
  const [verify, setVerify] = useState(false)
  const handleClose = () =>
  {
    setModal( false );
    setUrl(image)
  }
  const handleHide = () =>
  {
    setEditForm( false );
  }

  const hideVerify = async () =>
  {
    setVerify( false )
    
  }

  const showVerify = async () =>
  {
    try {
      await axios.post( '/verify-mail', JSON.stringify( { email: auth.email } ),{
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      } )
      setVerify(true)
    } catch (err) {
      console.log(err)
    }
  }
  useEffect( () =>
  {
    const getSinglePost = async (  ) =>
    {
    try {
      const response = await axiosPrivate.get( `/userPost/${ auth.id }` )
      const result = response.data;
      setMyposts( result )
      setLoading(false)
    } catch (err) {
      console.log(err)
    }
    }
    
    getSinglePost()
  },[auth, axiosPrivate])
  const upload = async () =>
  {
    try {
      const res = await axios.post( '/upload',  {
        id: auth.id, profile: url
      },  {
          withCredentials: true,
        } )
      setImage( res.data.imgageUrl )
      setAuth( { ...auth, src: res.data.imgageUrl } )
      handleClose()
      } catch (err) {
        console.log(err)
      }
  }

  const handleEdit = () =>
  {
    if ( !subscribe ) {
      navigate('../subscribe')
    } else {
      setEditForm(true)
    }
  }

  const onImgChange = ( e ) =>
  {
    const img = e.target.files[ 0 ]
    setFileToBase(img)


    // console.log(imgUrl)
  }

  const setFileToBase = ( file ) =>
  {
    const reader = new FileReader()
    reader.readAsDataURL( file )
    reader.onloadend = () =>
    {
      setUrl(reader.result)
    }
  }

  // useEffect( () =>
  // {
  //   const imgUrl = URL.createObjectURL(selectedImage)
  //   setUrl(imgUrl)

  //   return () => URL.revokeObjectURL(imgUrl)
  // },[selectedImage])
  
  return (
    <main className='w-100'>
      <Container fluid>
        <Row>
          <Col xs={12} md={4} className='my-auto'>
            <div className="d-flex">
              <div className="rounded-circle w-50 mx-auto border border-info position-relative">
                <img className='img-fluid rounded-circle' src={image} alt="profile" />
                <span className='position-absolute top-100 start-100 translate-middle text-dark badge fs-1'>
                  <BsCameraFill role='button' onClick={()=>setModal(true)
                  }/>
                </span>
              </div>
              <div className='my-auto flex-grow-1 d-block d-md-none mx-2'>
                <p className="h5 text-primary text-center mx-auto">{ auth.name }</p>
                <p className="text-center text-muted">{ auth.email }</p>
              </div>
            </div>
            <hr className='d-block d-md-none' />
          </Col>
          <Col xs={ 12 } md={ 8 } className='my-auto'>
            <div className='my-auto d-none d-md-block'>
              <p className="h3 text-primary my-auto text-center mx-auto">{ auth.name }</p>
              <p className="w-50 text-center mx-auto text-muted">{ auth.email }</p>
            </div>
            <ListGroup>
              <ListGroupItem className='h6 text-capitalize text-center'>Gender: {auth.gender}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>Skill: {auth.role}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>Phone Number: {auth.phoneNumber}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>State: {auth.state}</ListGroupItem>
              <ListGroupItem className='h6 text-capitalize text-center'>City: {auth.city}</ListGroupItem>
            </ListGroup>
            <div className='w-100 d-flex justify-content-between my-3'>
              <Button onClick={handleEdit} variant='outline-primary' >
                Edit info
              </Button>
              { auth.isVerified ? null : (
                <Button variant='outline-info' onClick={showVerify}>Verify Account</Button>
              )}
              <Button variant='outline-danger' onClick={deleteAccount} >
                Delete account
              </Button>
            </div>
          </Col>
        </Row>
        <hr />
        <Row className='mt-4'>
          <p className="h5">My posts</p>
          { myPosts.length ? 
            myPosts.map( post => (
              <MyPost post={ post } key={post._id} auth={auth} />
            ) )
            : (
              <div className="vh-50 d-flex justify-content-center align-items-center">
                <p className="text-capitalize p-4 shadow border rounded text-center">you have no post uploaded</p>
              </div>
            )
          }
        </Row>
      </Container>
      <EditProfile show={ editForm } auth={ auth } hide={ handleHide } />
      <Verify show={ verify } auth={auth} hide={hideVerify} />
      <Modal show={ modal } onHide={ handleClose } centered >
        <ModalHeader>
          <div className='d-flex justify-content-between w-100'>
            <Button onClick={handleClose} variant='outline-danger'>
            Cancle
          </Button>
          <Button variant='outline-primary' onClick={upload}>
            Save
          </Button>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className=" w-100 mx-auto position-relative">
                <img className='img-fluid rounded-circle border border-info ' src={ url } alt="profile" />
                <span className='position-absolute top-100 start-100 translate-middle text-dark badge fs-1'>
                  <Form>
                    <FormLabel htmlFor='profile' role='button' className='fs-1' >
                      <BsCameraFill className='fs-1' />
                    </FormLabel>
                    <FormControl type='file' name='profile' id='profile' className='visually-hidden' accept='image/*' onChange={onImgChange}/>
                  </Form>
                </span>
              </div>
        </ModalBody>
      </Modal>
    </main>
  )
}

export default Profile
