import React, { useEffect } from 'react'
import { Alert, Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import {BsSend} from 'react-icons/bs'
import Conversation from './chat/Conversation';
import Message from './chat/Message';
import useAuth from '../../hooks/useAuth'


const Chat = () =>
{
  const { auth, handleNewMessage,conversations,currentChat, setCurrentChat,messages, newMessage, setNewMessage, setArrivalMessage, socket, scrollRef } = useAuth()


  useEffect( () =>
  {
    socket.current.on( 'getMessage', data =>
    {
      setArrivalMessage( {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })

  })

  return (
    <div> 
      <Container fluid>
        <Row>
          <Col xs={ 4 } className='Main'>
            <p className="h6 text-uppercase">My chat</p>
            <div className="p-0">
              <FormControl type='text' placeholder='search for chat' className='w-75' />
              { conversations.map( conversation => 
                <div onClick={()=>setCurrentChat(conversation)}>
                  <Conversation conversation={ conversation } currentUser={auth} />
                </div>
              )
              }
            </div>
          </Col>
          { currentChat ?
            (
              <Col xs={ 8 } className='Main'>
            <p className="h6 text-uppercase">My chat</p>
            <div className='w-100 Chat'>
                  { messages.map( message => 
                    <div ref={scrollRef}>
                      <Message message={ message } own={message.sender === auth.id} />
                    </div>
                    )
                  }
            </div>
            <div className='d-flex align-item-center justify-content-evenly h-5'>
                  <FormControl
                    as='textarea'
                    placeholder='Enter your message...' className='w-75'
                    value={newMessage}
                    onChange={(e)=>setNewMessage(e.target.value)}
                  />
              <Button className='my-auto w-10' onClick={handleNewMessage}>
                <BsSend className='bg-transparent text-white'/>
              </Button>
            </div>
          </Col>
            ) : (
              <Alert variant='secondary' className='my-4 w-50 mx-auto py-5 fs-4 fw-bold'>
                open a conversation to start a chat
              </Alert>
            )
        }
        </Row>
      </Container>
    </div>
  )
}

export default Chat