import React from 'react'
import useLogout from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom';
import { Button, Navbar, Container, Offcanvas, Nav, NavLink } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import {BsHouse, BsChat, BsPersonCircle, BsPlusLg} from 'react-icons/bs'

const DashBoardHeader = () =>
{
  const logout = useLogout()
  const navigate = useNavigate()

  const signOut = async () =>
  {
    await logout();
    navigate('../auth/login')
  }
  return (
  <Navbar collapseOnSelect  bg="light" className='py-0 px-0 w-100 mx-0' expand='md'>
    <Container fluid>
      <Navbar.Brand className='f-percifico'>
        <Link to='../dashboard' className='nav-link d-flex'>
          <p className=" h4 f-percifico">Witwater</p>
        </Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls='offcanvasNavbar-expand-lg'/>
      <Navbar.Offcanvas
        id='offcanvasNavbar-expand-lg'
        aria-labelledby="offcanvasNavbarLabel-expand-lg"
        placement="end"
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title >
            Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className='justify-content-end'>
          <Nav className="">
            <NavLink eventKey={ 1 } >
              <Link className='nav-link text-secondary d-flex' to='/dashboard'>
                <BsHouse className='text-dark d-none my-auto d-md-block'/>
                <span className='ms-1 my-auto small'>Home</span>
              </Link>
            </NavLink>
            <NavLink eventKey={ 1 } >
              <Link className='nav-link text-secondary d-flex' to='new-post'>
                <BsPlusLg className='text-dark d-none my-auto d-md-block'/>
                <span className='ms-1 my-auto small'>New Post</span>
              </Link>
            </NavLink>
            <NavLink eventKey={3} >
              <Link className='nav-link text-secondary d-flex' to='chat'>
                <BsChat className='text-dark d-none my-auto d-md-block'/>
                <span className='ms-1 my-auto small'>Chats</span>
              </Link>
            </NavLink>
            <NavLink eventKey={4} >
              <Link className='nav-link text-secondary d-flex' to='profile'>
                <BsPersonCircle className='text-dark d-none my-auto d-md-block'/>
                <span className='ms-1 my-auto small'>Profile</span>
              </Link>
            </NavLink>
          </Nav>
          <div className='my-auto'>
            <Button variant='outline-primary' className='my-auto' onClick={signOut} size='sm'>Sign out</Button>
          </div>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </Container>
  </Navbar>
  )
}

export default DashBoardHeader