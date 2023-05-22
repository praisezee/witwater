import { format } from 'timeago.js'

const Message = ( { message, own } ) =>
{
  
  return (
    <>
    <div className={own ? 'd-flex flex-column align-items-end my-3 w-100' : ' d-flex flex-column my-3'}>
      <div className={own ? 'd-flex w-50 align-items-center justify-content-end my-0 ': 'd-flex w-50 align-items-center my-0 '}>
        <p className={own? 'p-2 rounded-3 alert alert-primary' : 'p-2 rounded-3 alert alert-dark'}>{message.text}</p>
      </div>
      <div className='text-muted ps-5 ms-1 py-0'>{format(message.createdAt)}</div>
      </div>
    </>
  )
}

export default Message