import React from 'react'
import { Container } from 'react-bootstrap';
import Hero from './Home/Hero';
import Trending from './Home/Trending';
import Talent from './Home/Talent';
import Choose from './Home/Choose';
import Socials from './Home/Socials';
import Testimonies from './Home/Testimonies';
import Contact from './Home/Contact';

const Home = () => {
  return (
    <Container fluid className='px-3'>
      {/*<Hero />*/}
      <Trending />
      <Talent />
      <Socials />
      <Choose />
      {/*<Testimonies />*/}
      <Contact/>
    </Container>
  )
}

export default Home
