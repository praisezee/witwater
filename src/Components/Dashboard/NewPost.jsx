import React, { useContext } from 'react'
import { Button, Container, Form, FormControl, FormLabel } from 'react-bootstrap';
import DashboardContext from '../context/Context';

const NewPost = () =>
{
  const {title, setTitle, message, setMessage, sendPost, image, setImage} = useContext(DashboardContext)
  return (
    <Container fluid>
      <Form className='py-3 fs-3'>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <FormControl
          id='title'
          placeholder='Title of post'
          required
          value={ title }
          onChange={(e)=>setTitle(e.target.value)}
        />
        <FormLabel htmlFor='images' className='mt-3'>Add Image</FormLabel>
        <FormControl
          type='file'
          placeholder='Add an image'
          id='images'
          value={ image }
          onChange={(e)=>setImage(e.target.value)}
        />
        <FormLabel htmlFor='post' className='mt-3'>Post</FormLabel>
        <FormControl
          id='post'
          rows={ 12 }
          required
          as='textarea'
          placeholder='Enter your post'
          value={ message }
          onChange={(e)=>setMessage(e.target.value)}
        />
        <div className='text-end my-3'>
          <Button variant='outline-primary' onClick={sendPost}>
            Post
          </Button>
        </div>
      </Form>
    </Container>
  )
}

export default NewPost