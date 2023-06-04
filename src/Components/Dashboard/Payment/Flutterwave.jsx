import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { BsCheck } from 'react-icons/bs';
import { useFlutterwave,closePaymentModal } from 'flutterwave-react-v3';
import useAuth from '../../../hooks/useAuth';
import { useNavigate, useLocation } from "react-router-dom";
import useAxiosPrivate from '../../../hooks/useAxiosPrivate';

const Flutterwave = () =>
{
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "../";
  const { auth, setSubscribe } = useAuth()

  const Subscribed = async() =>
    {
      try {
        const response = await axiosPrivate.post( '/subscription', JSON.stringify( { email: auth.email } ) )
        const result = response.data
        setSubscribe(result)
    } catch (err) {
      console.log(err)
      }
    }
  
  // configuration for ome month plan
  const aMonthConfig={
    public_key: 'FLWPUBK_TEST-53153e88384c416b228ffb431b095132-X',
    tx_ref: Date.now(),
    amount: 1000,
    currency: 'NGN',
    payment_options:"card,ussd",
    payment_plan:"36573",
    customer: {
      email: auth.email,
      phone_number: auth.phoneNumber,
      name: auth.name
    }
  };

  // configuration for biannual plan
  const sixMonthConfig={
    public_key: 'FLWPUBK_TEST-53153e88384c416b228ffb431b095132-X',
    tx_ref: Date.now(),
    amount: 5500,
    currency: 'NGN',
    payment_options:"card",
    payment_plan:"36577",
    customer: {
      email: auth.email,
      phone_number: auth.phoneNumber,
      name: auth.name
    }
  };

  //configuration for yearly plan
  const aYearConfig={
    public_key: 'FLWPUBK_TEST-53153e88384c416b228ffb431b095132-X',
    tx_ref: Date.now(),
    amount: 11000,
    currency: 'NGN',
    payment_options: ['card','banktransfer','ussd'],
    payment_plan:"36578",
    customer: {
      email: auth.email,
      phone_number: auth.phoneNumber,
      name: auth.name
    }
  };
  const aPayment = useFlutterwave( aMonthConfig )
  const sixPayment = useFlutterwave( sixMonthConfig )
  const aYearPayment = useFlutterwave( aYearConfig )
  const handleMonthlyPayment = () =>
  {
    aPayment( {
      callback: ( res ) =>
      {
        console.log( res )
        Subscribed()
        closePaymentModal()
        navigate( from, { replace: true } )
      },
      onClose: () =>
      {
        navigate('../subscribe')
      }
    })
    
  }
  const sixMonthlyPayment = () =>
  {
    sixPayment( {
      callback: ( res ) =>
      {
        console.log( res )
        Subscribed()
        closePaymentModal()
        navigate( from, { replace: true } )
      },
      onClose: () =>
      {
        navigate('../subscribe')
      }
    })
    
  }
  const handleYearlyPayment = () =>
  {
    aYearPayment( {
      callback: ( res ) =>
      {
        console.log( res )
        Subscribed()
        closePaymentModal()
        navigate( from, { replace: true } )
      },
      onClose: () =>
      {
        navigate('../subscribe')
      }
    })
    
  }
  return (
    <div className="d-flex h-screen align-items-center justify-content-center py-2">
      <Container>
        <Row>
          <div>
            <p className="h4 text-center my-4 text-uppercase w-75 mx-auto">Choose a plan to enjoy premium features</p>
            <hr className="w-50 mx-auto" />
          </div>
          <Col xs={8} md={4} className='mx-auto my-2'>
            <div className="shadow-sm border rounded">
              <Card>
                <Card.Header className='bg-white py-2  text-center'>
                  <p className="h6 my-1 text-info-emphasis">1 Month Subscription</p>
                  <p className="h2 fw-bold my-4 text-primary">1000NGN</p>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Private chat</p>
                  </div>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Comments on post</p>
                  </div>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Profile Edit</p>
                  </div>
                </Card.Body>
                <Card.Footer className='bg-white text-center py-3 border-top-0'>
                  <Button onClick={handleMonthlyPayment} variant='outline-primary' className='h5 text-uppercase'>
                    Subscribe
                  </Button>
                </Card.Footer>
              </Card>
            </div>
          </Col>
          <Col xs={8} md={4} className='mx-auto my-2'>
            <div className="shadow-sm border rounded">
              <Card>
                <Card.Header className='bg-white py-2  text-center'>
                  <p className="h6 my-1 text-info-emphasis">6 Months Subscription</p>
                  <p className="h2 fw-bold my-4 text-primary">5500NGN</p>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Private chat</p>
                  </div>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Comments on post</p>
                  </div>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Profile Edit</p>
                  </div>
                </Card.Body>
                <Card.Footer className='bg-white text-center py-3 border-top-0'>
                <Button onClick={sixMonthlyPayment} variant='outline-primary' className='h5 text-uppercase'>
                  Subscribe</Button></Card.Footer>
              </Card>
            </div>
          </Col>
          <Col xs={8} md={4} className='mx-auto my-2'>
            <div className="shadow-sm border rounded">
              <Card>
                <Card.Header className='bg-white py-2  text-center'>
                  <p className="h6 my-1 text-info-emphasis">1 year Subscription</p>
                  <p className="h2 fw-bold my-4 text-primary">11000NGN</p>
                </Card.Header>
                <Card.Body>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Private chat</p>
                  </div>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Comments on post</p>
                  </div>
                  <div className="d-flex">
                    <BsCheck className='text-info'/>
                    <p className="ms-2 fw-bold text-info">Profile Edit</p>
                  </div>
                </Card.Body>
                <Card.Footer className='bg-white text-center py-3 border-top-0'>
                <Button onClick={handleYearlyPayment} variant='outline-primary' className='h5 text-uppercase'>
                  Subscribe</Button></Card.Footer>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Flutterwave
