import React from 'react'
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Missing = () => {
  return (
    <div className='vh-75'>
      <div className="center h-100">
        <Container className='bg-light p-5 rounded rounded-5 shadow'>
          <p className="h2 text-danger text-uppercase text-center">404 Error: Page Not Found.</p>
          <p className="h5">
            We're sorry, but the page you are looking for could not be found.
            The requested URL may have been moved, deleted, or it may have never existed.
            Please check the URL for any typos or errors, and try again.
            If you believe you have reached this page in error, please contact our support team for further assistance.Thank you for your understanding.
          </p>
          <p className="h5">
            Click <Link to='/' className='link-primary'>here</Link> to visit our homepage
          </p>
        </Container>
      </div>
    </div>
  )
}

export default Missing;
