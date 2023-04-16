import React from 'react'
import
{
  Navbar,
  Nav,
  Container,
  NavbarBrand,
  NavLink,
  Offcanvas,
  Form,
  FormControl,
  Button,
  Row,
  Col
} from 'react-bootstrap';
import NavbarToggle from 'react-bootstrap/esm/NavbarToggle';
import { Link } from 'react-router-dom';
import { BsFacebook,BsTwitter, BsInstagram, BsYoutube, BsTiktok, BsEnvelope } from 'react-icons/bs'

const Header = () =>
{
  const socials = [
    {
      id: 1,
      name: <BsFacebook />,
      //this is for the url
      to : ''
    },
    {
      id: 2,
      name: <BsTwitter />,
      //this is for the url
      to : ''
    },
    {
      id: 3,
      name: <BsInstagram />,
      //this is for the url
      to : ''
    },
    {
      id: 4,
      name: <BsTiktok />,
      //this is for the url
      to : ''
    },
    {
      id: 5,
      name: <BsYoutube />,
      //this is for the url
      to : ''
    },
    {
      id: 6,
      name: <BsEnvelope />,
      // this is the url
      to : ''
    }
  ]
  return (
    <Navbar collapseOnSelect expand='none' sticky='top' variant='light' bg='white'>
      <Container fluid className='px-5'>
        <NavbarBrand >
          <Link to='/' className='nav-link d-flex'>
            <img src="/vite.svg" alt="" width='30' height='30' className='d-inline-block align-top' />
            <p className="d-none d-sm-block ms-1 h3 f-percifico">Witwater</p>
          </Link>
        </NavbarBrand>
        <div className="ms-auto d-none d-md-flex me-5">
          <Form className='d-flex mx-auto text-center w-100 px-2'>
            <FormControl
              type='search'
              placeholder="Search"
              className="me-2"
              arial-label="search"
            />
            <Button variant='outline-primary'>Search</Button>
          </Form>
          <Link className='btn btn-outline-primary text-capitalize' to='auth/register'>join</Link>
        </div>
        <NavbarToggle aria-controls="responsive-navbar-nav" />
        <Navbar.Offcanvas className='vh-100' id="responsive-navbar-nav" placement='top'>
          <Offcanvas.Header closeButton>
            <Offcanvas.Title className=' fs-3 fw-bold text-capitalize'>
              <Link to='/' className='nav-link d-flex'>
            <img src="/vite.svg" alt="" width='30' height='30' className='d-inline-block align-top' />
            <p className="d-none d-sm-block ms-1 h3 f-percifico">Witwater</p>
          </Link>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav>
              <Container className='pb-5'>
                <div className="w-100 mx-auto mb-5 d-flex d-md-none ">
                  <Form className='d-flex mx-auto text-center w-100 px-2'>
                    <FormControl
                      type='search'
                      placeholder="Search"
                      className="me-2"
                      arial-label="search"
                    />
                    <Button variant='outline-primary'>Search</Button>
                  </Form>
                  <NavLink eventKey={1} className='p-0'>
                    <Link className='btn btn-outline-primary' to='auth/register'>Join</Link>
                  </NavLink>
                </div>
                <Row className='text-center'>
                  <Col xs={ 6 } className='mx-auto'>
                    <p className="text-muted h2 text-capitalize">News</p>
                    <NavLink eventKey={ 1 }>
                      <Link to='' className='nav-link text-capitalize'>Trending</Link>
                    </NavLink>
                    <NavLink eventKey={ 2 }>
                      <Link to='' className='nav-link text-capitalize'>Ranking</Link>
                    </NavLink>
                    <NavLink eventKey={ 3 }>
                      <Link to='' className='nav-link text-capitalize'>News</Link>
                    </NavLink>
                    <NavLink eventKey={ 4 }>
                      <Link to='' className='nav-link text-capitalize'>Interviews</Link>
                    </NavLink>
                    <NavLink eventKey={ 5 }>
                      <Link to='' className='nav-link text-capitalize'>New Faces</Link>
                    </NavLink>
                    <NavLink eventKey={ 6 }>
                      <Link to='' className='nav-link text-capitalize'>featured lists</Link>
                    </NavLink>
                  </Col>
                  <Col xs={ 6 }>
                    <p className="text-muted h2 text-capitalize">Community</p>
                    <NavLink eventKey={ 1 }>
                      <Link to='' className='nav-link text-capitalize'>People</Link>
                    </NavLink>
                    <NavLink eventKey={ 2 }>
                      <Link to='' className='nav-link text-capitalize'>Agencies</Link>
                    </NavLink>
                    <NavLink eventKey={ 3 }>
                      <Link to='' className='nav-link text-capitalize'>Show packages</Link>
                    </NavLink>
                    <NavLink eventKey={ 4 }>
                      <Link to='' className='nav-link text-capitalize'>updates</Link>
                    </NavLink>
                    <NavLink eventKey={ 5 }>
                      <Link to='' className='nav-link text-capitalize'>your lists</Link>
                    </NavLink>
                  </Col>
                </Row>
                <hr className="mx-auto w-25 mb-5" />
                <hr className="mx-auto w-75 mt-5" />
                <Row>
                  <div className="d-flex justify-content-center">
                  { socials.map( social => (
                    
                      <Link to={social.to} key={social.id} className='mx-3 fs-2 text-dark'>
                        {social.name}
                      </Link>
                    
                  ) ) }
                </div>
                </Row>
                <hr className="mx-auto w-25 mt-5" />
                <Row className="text-center">
                  <NavLink eventKey={ 1 }>
                      <Link to='' className='nav-link text-capitalize'>about witwater.com</Link>
                    </NavLink>
                    <NavLink eventKey={ 2 }>
                      <Link to='' className='nav-link text-capitalize'>help/FAQ</Link>
                    </NavLink>
                    <NavLink eventKey={ 3 }>
                      <Link to='' className='nav-link text-capitalize'>Contact os</Link>
                    </NavLink>
                    <NavLink eventKey={ 4 }>
                      <Link to='' className='nav-link text-capitalize'>copyright</Link>
                    </NavLink>
                    <NavLink eventKey={ 5 }>
                      <Link to='' className='nav-link text-capitalize'>privacy statement</Link>
                    </NavLink>
                    <NavLink eventKey={ 6 }>
                      <Link to='' className='nav-link text-capitalize'>terms of service</Link>
                    </NavLink>
                </Row>
              </Container>
            </Nav>
            </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
      <hr className="w-100 my-2" />
      <Container >
        <Row className='w-100 mx-auto my-2'>
          <div className="d-flex justify-content-center">
            <Link className='nav-link mx-2 disabled'>Model</Link>
            <Link className='nav-link mx-2 disabled'>Creative</Link>
            <Link className='nav-link mx-2 disabled'>Fashion</Link>
            <Link className='nav-link mx-2 disabled'>Beauty</Link>
            <Link className='nav-link mx-2 disabled'>Activism</Link>
          </div>
        </Row>
      </Container>
      <hr className="w-100 mt-2 mb-0 pb-0" />
    </Navbar>
  )
}

export default Header;

