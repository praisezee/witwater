
import { format } from 'timeago.js'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { Button } from 'react-bootstrap';

const Message = ( { message, own, handleClick } ) =>
{
  
  return (
    <>
    <div className="sticky-top d-flex justify-content-between align-item center bg-dark text-white m-0 p-0">
      <Button onClick={handleClick} variant='dark'>
        <BsArrowLeftCircle/>
      </Button>

      <p className="h4 text-capitalize text-center">
        
      </p>
    </div>
    <div className={own ? 'd-flex flex-column align-items-end my-3 w-100' : ' d-flex flex-column my-3'}>
      <div className='d-flex w-50 align-items-center my-0 '>
        <img src="/logo512.png" alt="profile" className='img-fluid rounded-circle border me-3' width={40}/>
        <p className={own? 'p-2 rounded-3 bg-secondary text-light' : 'p-2 rounded-3 bg-light'}>{message.text}</p>
      </div>
      <div className='text-muted ps-5 ms-1 py-0'>{format(message.createdAt)}</div>
      </div>
    </>
  )
}

export default Message