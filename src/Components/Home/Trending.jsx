import React from 'react'
import img from '../../assets/img/img.jpeg'
import img2 from '../../assets/img/img3.jpeg'
import img3 from '../../assets/img/img5.jpeg'
import img4 from '../../assets/img/img6.jpeg'
import img5 from '../../assets/img/img12.jpeg'
import img6 from '../../assets/img/img9.jpeg'
import img7 from '../../assets/img/img10.jpeg'
import img8 from '../../assets/img/img8.jpeg'
import img9 from '../../assets/img/img13.jpeg'
import { Carousel, CarouselItem } from 'react-bootstrap';
import {BsArrowRightCircleFill, BsArrowLeftCircleFill} from 'react-icons/bs'


const Trending = () =>
{
  const trendings = [
    [
      {
      img: img,
      trends: 'model'
      },
      {
      img: img2,
      trends: ' model'
      },
      {
      img: img3,
      trends: ' model'
      }
    ],
    [
      {
      img: img4,
      trends: 'model'
      },
      {
      img: img5,
      trends: 'model'
      },
      {
      img: img6,
      trends: ' fashions / model'
      }
    ],
    [
      {
      img: img7,
      trends: ' model'
      },
      {
      img: img8,
      trends: 'model'
      },
      {
      img: img9,
      trends: ' fashions / model'
      }
    ]

  ]
  return (
    <div className="my-3 py-3">
      <p className="h5 text-capitalize ps-3 mb-3">trending</p>
      <p className="text-center text-muted text-capitalize fw-bold">The real faces of africa</p>
      <Carousel indicators={false} variant='dark' prevIcon={<BsArrowLeftCircleFill className='display-3 text-dark'/>} nextIcon={<BsArrowRightCircleFill className='display-3 text-dark'/>}>
        { trendings.map( trends => (
          <CarouselItem key={ trendings.indexOf( trends ) + 1 } interval={ 7000 }>
            <div className='d-flex justify-content-evenly'>
            { trends.map( item => (
                <div key={trends.indexOf(item)+1} className='expand'>
                  <img src={ item.img } alt="" width={100}/>
                  <p className="text-muted text-capitalize">{ item.trends }</p>
                </div>
            ))}
            </div>
          </CarouselItem>
        ))}
      </Carousel>
    </div>
  )
}

export default Trending
