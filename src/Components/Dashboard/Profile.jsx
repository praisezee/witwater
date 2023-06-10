import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import { Button, Col, Container,  ListGroup, ListGroupItem, Row } from 'react-bootstrap';
import male from '../../assets/male.jpg'
import female from '../../assets/female.jpg'
import useDashboardContext from '../../hooks/useDashboardContext'
import MyPost from './MyPost';
import axios from '../api/register';
import { useEffect } from 'react';
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import EditProfile from './EditProfile';
import Verify from './Verify';
import Skeleton from '../Skeleton'
import { useNavigate } from 'react-router-dom';
import { BsCameraFill } from 'react-icons/bs'
import ProfileEdit from './ProfileEdit';

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
  const [ url, setUrl ] = useState( null )
  const [verify, setVerify] = useState(false)

    const monthly = subscribe?.data.map((s)=> s.plan ==='36573' && s.status === 'active')
  const biannual = subscribe?.data.map((s)=> s.plan ==='36577' && s.status === 'active')
  const annual = subscribe?.data.map( ( s ) => s.plan === '36578' && s.status === 'active' )

  const handleClose = () =>
  {
    setModal( false );
    setUrl(null)
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
    if ( !monthly.length || !biannual.length || !annual.length ) {
      navigate('../subscribe')
    } else {
      setEditForm(true)
    }
  }

  // const onImgChange = ( e ) =>
  // {
    
  //   setFileToBase(e)


  //   // console.log(imgUrl)
  // }

  // const setFileToBase = ( file ) =>
  // {
  //   const reader = new FileReader()
  //   reader.readAsDataURL( file )
  //   reader.onloadend = () =>
  //   {
  //     setUrl(reader.result)
  //   }
  // }
  const onImgChange = view =>
  {
    setUrl(view)
  }

  

  return (
    <main className='w-100'>
      <Container fluid>
        <Row>
          <Col xs={12} md={4} className='my-auto'>
            <div className="d-flex">
              <div className='position-relative mx-auto'>
                <div className="rounded-circle mx-auto border border-info">
                  <img className='img-fluid rounded-circle' src={image} alt="profile" />
                </div>
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
          { loading && (
            <Skeleton/>
          )}
          { !loading && myPosts.length ? 
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
      <ProfileEdit modal={modal} handleClose={handleClose} upload={upload} url={url} onImgChange={onImgChange} />
    </main>
  )
}

export default Profile
