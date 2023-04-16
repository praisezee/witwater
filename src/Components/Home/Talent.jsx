import React from 'react'
import {  Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import img from '../../assets/img/photographer.jpg'
import img2 from '../../assets/img/female.jpg'
import img3 from '../../assets/img/male.jpg'
import img4 from '../../assets/img/studio.jpg'
import img5 from '../../assets/img/makeup.jpg'
import img6 from '../../assets/img/stylist.jpg'
import img7 from '../../assets/img/videographer.jpg'
import img8 from '../../assets/img/influencer.jpg'

const Talent = () =>
{
  const talents = [
    {
      src: img,
      name: 'photographers',
      url: 'photographer'
    },
    {
      src: img2,
      name: 'female Model',
      url: 'model/female'
    },
    {
      src: img3,
      name: 'male model',
      url: 'model/male'
    },
    {
      src: img4,
      name: 'studio',
      url: 'studio'
    },
    {
      src: img5,
      name: 'makeup artist',
      url: 'artist'
    },
    {
      src: img6,
      name: 'hair stylist',
      url: 'stylist'
    },
    {
      src: img7,
      name: 'videographer',
      url: 'videographer'
    },
    {
      src: img8,
      name: 'influencer',
      url: 'influencer'
    }
  ]
  return (
    <Row className='border rounded shadow'>
      <p className="h3 text-uppercase my-3">talent for hire</p>
      { talents.map( talent => (
        <Col xs={ 6 } md={4} lg={3} className='p-3' key={talents.indexOf(talent)+1}>
          <div className="border rounded shadow">
            <Link to={talent.url} className='text-dark nav-link'>
              <div className="img-container rounded">
                <img src={ talent.src } alt={ talent.name } className=' w-100 expand' />
              </div>
              <p className="text-center fw-bold text-capitalize text-dark h6 my-3">{ talent.name}</p>
            </Link>
          </div>
        </Col>
      ))}
    </Row>
  )
}

export default Talent