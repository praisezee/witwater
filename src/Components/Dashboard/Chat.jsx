import React, { useEffect, useState } from 'react'
import { Alert, Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import {BsSend, BsArrowLeftCircle} from 'react-icons/bs'
import Conversation from './chat/Conversation';
import Message from './chat/Message';
import useChatContext from '../../hooks/useChatContext';
import axios from '../api/register'


const Chat = () =>
{
  const { auth, handleNewMessage, conversations, currentChat, setCurrentChat, messages, newMessage, setNewMessage, scrollRef } = useChatContext()

  const [ friendsName, setFriendsName ] = useState( '' )
  

    
  /*useEffect( () =>
  {
    const friendId = conversations.map( conversation => conversation.members.find( member => member !== auth.id ) )
    const getUser = async () =>
    {
      try {
        const response = await axios.get( '/user/'+friendId )
        setFriendsName( response.data )
      } catch (err) {
        console.log(err);
      }
    }
      getUser()
  }, [conversations, auth])*/


  const handleClick = () =>
  {
    setCurrentChat(null)
  }

  return (
    <div className='w-100'> 
      <Container fluid>
        <Row className='d-none d-md-flex'>
          <Col md={ 4 } className='Main d-none d-md-block'>
            <p className="h6 text-uppercase">My chat</p>
            <div className="p-0">
              <FormControl type='text' placeholder='search for chat' className='w-75' />
              { conversations.map( conversation => 
                <div onClick={()=>setCurrentChat(conversation)}>
                  <Conversation conversation={conversation} auth={auth} />
                </div>
              )
              }
            </div>
          </Col>
          { currentChat ?
            (
              <Col md={ 8 } className='Main d-none d-md-block'>
                <p className="h4 text-uppercase">{friendsName.name}</p>
            <div className='w-100 Chat'>
                  { messages.map( message => 
                    <div ref={scrollRef}>
                      <Message message={ message } own={message.sender === auth.id}  />
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
      <div className="w-100">
        <Row className='d-block d-md-none'>
          <Col xs={ 12 } className={currentChat ? 'z-1 Main d-none' : 'd-block'}>
            <p className="h6 text-uppercase">My chat</p>
            <div className="p-0">
              <FormControl type='text' placeholder='search for chat' className='w-75' />
              { conversations.map( conversation => 
                <div onClick={()=>setCurrentChat(conversation)}>
                  <Conversation conversation={conversation} auth={auth}/>
                </div>
              )
              }
            </div>
          </Col>
          <Col xs={ 12 } className={ currentChat ? 'z-1 Main d-md-none d-block' : 'd-none' }>
            <div className="d-flex justify-content-between align-item center bg-dark text-white m-0 p-0">
              <Button onClick={handleClick} variant='dark'>
                <BsArrowLeftCircle/>
              </Button>

              <p className="h4 text-capitalize text-center">
                {friendsName.name}
              </p>
          </div>
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
        </Row>
        </div>
    </div>
  )
}

export default Chat