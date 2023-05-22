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
      <Navbar collapseOnSelect  bg="light" className='py-0 px-0 w-100 mx-0 height-50' expand='sm'>
          <Container fluid>
            <Navbar.Brand className='f-percifico'><Link to='../dashboard' className='nav-link d-flex'>
            <p className=" h3 f-percifico">Witwater</p>
          </Link></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar"/>
            <Navbar.Offcanvas
            placement="end"
            id="responsive-navbar"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title >
                  Menu
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1">
                <NavLink eventKey={ 1 } className='mx-2'>
                  <Link className='nav-link text-secondary d-flex' to='/dashboard'>
                    <BsHouse className='text-dark d-none my-auto d-md-block'/>
                    <span className='mx-1 my-auto'>Home</span>
                  </Link>
                </NavLink>
                <NavLink eventKey={ 1 } className='mx-2'>
                  <Link className='nav-link text-secondary d-flex' to='new-post'>
                    <BsPlusLg className='text-dark d-none my-auto d-md-block'/>
                    <span className='mx-1 my-auto'>New Post</span>
                  </Link>
                </NavLink>
                <NavLink eventKey={3} className='mx-2'>
                  <Link className='nav-link text-secondary d-flex' to='chat'>
                    <BsChat className='text-dark d-none my-auto d-md-block'/>
                    <span className='mx-1 my-auto'>Chats</span>
                  </Link>
                </NavLink>
                <NavLink eventKey={4} className='mx-2'>
                  <Link className='nav-link text-secondary d-flex' to='profile'>
                    <BsPersonCircle className='text-dark d-none my-auto d-md-block'/>
                    <span className='mx-1 my-auto'>Profile</span>
                  </Link>
                </NavLink>
                <div className="my-auto">
                  <Button variant='outline-primary' onClick={signOut}>Sign out</Button>
                </div>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
  )
}

export default DashBoardHeader