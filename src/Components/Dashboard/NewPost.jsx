import React from 'react'
import { Button, Container, Form, FormControl, FormLabel } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth'


const NewPost = () =>
{
  const {title, setTitle, message, setMessage, sendPost, image, setImage, errMsg, errRef} = useAuth()
  return (
    <Container fluid className='Main'>
      <p className="text-center text-uppercase text-center h1 fw-bold py-1">Add new post</p>
      <div ref={ errRef } role='alert' className={errMsg? 'alert alert-danger w-75 mx-auto' : 'd-none'} aria-live='assertive'>{ errMsg }</div>
      <Form className='py-1'>
        <FormLabel htmlFor='title'>Title</FormLabel>
        <FormControl
          id='title'
          placeholder='Title of post'
          className='py-2'
          required
          value={ title }
          onChange={(e)=>setTitle(e.target.value)}
        />
        <FormLabel htmlFor='images' className='py-1'>Add Image</FormLabel>
        <FormControl
          type='file'
          placeholder='Add an image'
          id='images'
          value={ image }
          onChange={(e)=>setImage(e.target.value)}
        />
        <FormLabel htmlFor='post' className='pt-3'>Post</FormLabel>
        <FormControl
          id='post'
          rows={ 5 }
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