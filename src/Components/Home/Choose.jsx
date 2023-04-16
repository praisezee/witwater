import React from 'react'
import { Col, Row } from 'react-bootstrap';
import img from '../../assets/img/bg_5.jpg'

const Choose = () => {
  return (
    <Row className='my-4'>
      <p className="text-center text-uppercase fw-bold fs-3 my-5">Why choose <span className="f-percifico text-capitalize">witwater</span></p>
      <Col md={4} className='d-none d-md-block my-auto'>
      <img src={img} alt="" className='img-fluid rounded rounded-5'/>
      </Col>
      <Col xs={ 12 } md={ 8 } className='my-auto p-4 rounded rounded-5 shadow'>
        <ol className='list-group list-group-numbered'>
          <li className='list-group-item d-flex justify-content-between align-items-start fs-5'>
            <div className="ms-2 me-auto">
              <div className="fw-bold h3">Reptuation</div>
              <p>
                Reputation is a crucial factor to consider when choosing a model company to work with. Our company's reputation is a reflection of its track record, reliability, and credibility within the industry. Our company with a strong reputation has earned the trust of its clients by consistently delivering high-quality services and meeting their expectation
              </p>
            </div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start fs-5'>
            <div className="ms-2 me-auto">
              <div className="fw-bold h3">Expertise</div>
              <p>
                A company's expertise refers to its level of knowledge and experience in specific feild or industry. When it comes to modeling, <span className="f-percifico text-capitalize">witwater</span> has trained expertise on each aspect of modeling
              </p>
            </div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start fs-5'>
            <div className="ms-2 me-auto">
              <div className="fw-bold h3">Flexibility</div>
              <p>
                A flexible model company provide customized solutions that meet your specific modeling requirements. By working collaboratively with you and adapting its servicesto meet your needs.<span className="f-percifico text-capitalize">witwater</span> flexibility will bring a quick turnaround time, scalability and cost savings.
              </p>
            </div>
          </li>
          <li className='list-group-item d-flex justify-content-between align-items-start fs-5'>
            <div className="ms-2 me-auto">
              <div className="fw-bold h3">Pricing</div>
              <p>
                Pricing for a model company will depend on a variety of faactor and can vary significantly.It's important to consider the pricing structure, level of expertise and quality of services provided when choosing a model company to work with and <span className="f-percifico text-capitalize">witwater</span> provides an affordable pricing plan.
              </p>
            </div>
          </li>
        </ol>
      </Col>
    </Row>
  )
}

export default Choose