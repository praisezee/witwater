import React from 'react'
import { Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import {BsSend} from 'react-icons/bs'
import Conversation from './chat/Conversation';
import Message from './chat/Message';

const Chat = () => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col xs={ 4 } className='Main'>
            <p className="h6 text-uppercase">My chat</p>
            <div className="p-0">
              <FormControl type='text' placeholder='search for chat' className='w-75' />
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
              <Conversation/>
            </div>
          </Col>
          <Col xs={ 8 } className='Main'>
            <p className="h6 text-uppercase">My chat</p>
            <div className='w-100 Chat'>
              <Message own/>
              <Message/>
              <Message/>
            </div>
            <div className='d-flex align-item-center justify-content-evenly h-5'>
              <FormControl as='textarea' placeholder='Enter your message...' className='w-75'/>
              <Button className='my-auto w-10'>
                <BsSend className='bg-transparent text-white'/>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Chat