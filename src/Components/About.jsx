import React from 'react'
import { Row,Col, Container } from 'react-bootstrap';

const About = () => {
  return (
    <div className='vh-100'>
      <div className="h-100 center scroll">
        <div className='mt-5'>
      <p className="text-center text-capitalize  mx-auto w-75 h1">
        About <span className="f-percifico">Witwater</span>
        
          </p>
          <hr className="mx-auto opacity-1 text-white w-25 mt-0 mb-5" />
          <Container fluid>
            <Row>
              <Col xs={10} md={4} className='my-auto mx-auto text-center'>
                <img src="./vite.svg" className=' img-fluid rounded' alt="owner profile" />
              </Col>
              <Col xs={12} md={8} className='my-auto mx-auto'>
                <p className="h6">Welcome to our model company, where we specialize in creating high-quality, stunningly realistic models for a variety of purposes. Our team of expert model makers has years of experience crafting models of all shapes and sizes, using the latest techniques and materials to bring your vision to life. Whether you need a scale model of a building, a prototype for a new product, or a realistic model for film or TV production, we have the skills and expertise to create a model that meets your exact specifications. We work closely with our clients to ensure that every detail is perfect, from the overall design to the smallest finishing touches. At our model company, we pride ourselves on our commitment to quality, craftsmanship, and customer satisfaction. Our team is dedicated to providing you with the highest level of service and support, from the initial consultation through to the final product. We understand that every project is unique, and we will work with you to create a model that perfectly meets your needs and exceeds your expectations. Our state-of-the-art facility is equipped with the latest tools and technology, allowing us to create models that are not only beautiful and accurate, but also durable and long-lasting. We use only the finest materials, ensuring that your model will look great for years to come. Thank you for considering our model company for your next project. We look forward to working with you to create a model that is truly extraordinary.</p>
              </Col>
            </Row>
        </Container>
    </div>
      </div>
    </div>
  )
}

export default About;
