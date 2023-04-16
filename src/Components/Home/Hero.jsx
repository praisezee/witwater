import React from 'react'
import { Carousel, CarouselItem } from 'react-bootstrap';
import img1 from '../../assets/img/D702F65F-22CC-4671-944E-F656301F4667.jpeg.png'
import img2 from '../../assets/img/DSC_1955.JPG.png'
import img3 from '../../assets/img/halima.jpg'


const Hero = () =>
{
  const heros = [
    {
      id: 1,
      img: img1,
      category: 'fashion',
      text: 'The art of african beauty'
    },
    {
      id: 2,
      img: img2,
      category: 'fashion',
      text: 'black in fashion '
    },
    {
      id: 3,
      img: img3,
      category: 'fashion',
      text: 'The glowing skin of an african woman'
    }

  ]
  return (
    <Carousel  variant='dark' indicators= {false} controls={false} fade>
      { heros.map( item => (
        <CarouselItem key={item.id}>
          <div className='img-container rounded-circle'>
            <img src={ item.img } className='w-100 rounded-circle img-fluid expand' />
          </div>
          <div>
            <p className="text-muted fw-bold text-uppercase text-center">{ item.category }</p>
            <p className="h1 text-center fw-bold text-capitalize">{ item.text }</p>
          </div>
        </CarouselItem>
      ))}
    </Carousel>
  )
}

export default Hero
