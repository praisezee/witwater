import React from 'react'
import useLogout from '../../hooks/useLogout'
import { useNavigate } from 'react-router-dom';
import { Button, Navbar, Container, Offcanvas, Nav } from 'react-bootstrap';
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
    <div>
      <Navbar  bg="light" expand='lg' className="mb-3">
          <Container fluid>
            <Navbar.Brand href="#">Navbar Offcanvas</Navbar.Brand>
            <Navbar.Toggle aria-controls="offcanvasNavbar-expand-lg" />
            <Navbar.Offcanvas
              id='offcanvasNavbar-expand-lg'
              aria-labelledby='offcanvasNavbar-expand-lg'
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id='offcanvasNavbar-expand-lg'>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe">
                <Nav.Link eventKey={1} className='my-2'>
                  <Link className='nav-link text-info fs-5' to='/dashboard'>
                    <BsHouse className='text-dark'/>
                    <span className='mx-3'>Home</span>
                  </Link>
                </Nav.Link>
                <Nav.Link eventKey={1} className='my-2'>
                  <Link className='nav-link text-info fs-5' to='new-post'>
                    <BsPlusLg className='text-dark'/>
                    <span className='mx-3'>New Post</span>
                  </Link>
                </Nav.Link>
                <Nav.Link eventKey={1} className='my-2'>
                  <Link className='nav-link text-info fs-5' to='chat'>
                    <BsChat className='text-dark'/>
                    <span className='mx-3'>Chats</span>
                  </Link>
                </Nav.Link>
                <Nav.Link eventKey={1} className='my-2'>
                  <Link className='nav-link text-info fs-5' to='profile'>
                    <BsPersonCircle className='text-dark'/>
                    <span className='mx-3'>Profile</span>
                  </Link>
                </Nav.Link>
                <Button variant='outline-primary' onClick={signOut}>Sign out</Button>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </div>
  )
}

export default DashBoardHeader