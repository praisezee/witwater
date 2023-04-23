import React from 'react'

const Message = ({own}) => {
  return (
    <div className={own ? 'd-flex flex-column align-items-end my-3 w-100' : ' d-flex flex-column my-3'}>
      <div className='d-flex w-50 align-items-center my-0 '>
        <img src="/logo512.png" alt="profile" className='img-fluid rounded-circle border me-3' width={40}/>
        <p className={own? 'p-2 rounded-3 bg-secondary text-light' : 'p-2 rounded-3 bg-light'}>hello my message Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi dolores saepe corrupti omnis error voluptate impedit facere nemo placeat? Dolorum, voluptas odit. Repudiandae, odio quae modi praesentium officia itaque sunt?</p>
      </div>
      <div className='text-muted ps-5 ms-1 py-0'>1 hour ago</div>
    </div>
  )
}

export default Message