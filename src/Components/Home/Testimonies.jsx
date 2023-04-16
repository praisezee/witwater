import React from 'react'
import { Card, CardImg, Carousel, CarouselItem, Row } from 'react-bootstrap';
import { FaQuoteLeft, FaQuoteRight } from 'react-icons/fa'
import img1 from '../../assets/img/IMG-20221113-WA0037.jpg.png'
import img2 from '../../assets/img/img4.jpeg'
import img3 from '../../assets/img/FaceApp_1668954628433.jpg.png'
import img4 from '../../assets/img/Screenshot_20220614-174046_2.png.png'

const Testimonies = () =>
{
  const testimonies = [
    {
      img: img1,
      testimony: 'Human fashion model companies are an essential component of the fashion industry, as they represent and promote talented models who bring creative visions to life. Witwater work tirelessly to discover, develop, and showcase models who can make a significant impact in the industry.'
    },
    {
      img: img2,
      testimony: 'They work closely with each model to help them develop their skills, build their brand, and achieve their career goals. Their team of experts is highly skilled and experienced, providing top-notch support to their models throughout their careers.'
    },
    {
      img: img3,
      testimony: 'Their dedication to their models, commitment to inclusivity, and years of experience make them a reliable and trustworthy partner for anyone looking to launch a successful career in the fashion industry.'
    },
    {
      img: img4,
      testimony: 'Fashion models play a vital role in the fashion industry, showcasing the latest styles and trends on the runway and in print media. Witwater understands this and works hard to cultivate a diverse and talented group of models who can bring their creative vision to life.'
    },
  ]
  return (
    <Row className='vh-100'>
      <div className="h-100 center">
        <p className="fs-4 fw-bold text-center my-3 text-uppercase">Testimonies</p>
        <Carousel variant='dark'>
          { testimonies.map( testimony => (
            <CarouselItem key={testimonies.indexOf(testimony)+1}>
              <Card className='w-75 mx-auto my-2 shadow'>
                <div className="w-25 mx-auto img-container my-3 rounded-circle border border-2 border-dark">
                  <CardImg src={testimony.img} alt='testifier' className='w-100 rounded-circle  expand'/>
                </div>
                <div className='px-4 mx-auto w-75'>
                  <FaQuoteLeft/>
                  <Card.Text>
                    {testimony.testimony}
                  </Card.Text>
                  <FaQuoteRight className='float-end mb-3'/>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </Carousel>
      </div>
    </Row>
  )
}

export default Testimonies