import React, { useEffect, useRef, useState } from 'react'
import { Alert, Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import {BsSend} from 'react-icons/bs'
import Conversation from './chat/Conversation';
import Message from './chat/Message';
import useAuth from '../../hooks/useAuth'
import axios from '../api/register'
import { io } from 'socket.io-client';

const Chat = () =>
{
  const { auth } = useAuth()
  const [ conversations, setConversations ] = useState( [] )
  const [ currentChat, setCurrentChat ] = useState( null )
  const [ messages, setMessages ] = useState( [] )
  const [ newMessage, setNewMessage ] = useState( '' )
  const [arivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  const socket = useRef()

  const handleNewMessage = async ( e ) =>
  {
    e.preventDefault()
    const message = {
      sender: auth.id,
      text: newMessage,
      conversationId : currentChat.id
    }

    const receiverId = currentChat.members.find(member => member !== auth.id)

    socket.current.emit( 'sendMessage', {
      senderId: auth.id,
      receiverId,
      text: newMessage
    })
    try {
      const response = await axios.post( '/message', message );
      setMessages( [ ...messages, response.data ] )
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }


  

  useEffect( () =>
  {
    socket.current = io( 'ws://localhost:3500' );
    socket.current.on( 'getMessage', data =>
    {
      setArrivalMessage( {
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now()
      })
    })
  }, [])

  useEffect( () =>
  {
    arivalMessage &&
      currentChat?.members.includes( arivalMessage.sender ) &&
      setMessages( prev => [ ...prev, arivalMessage ] )
  }, [arivalMessage, currentChat])
  
  useEffect( () =>
  {
    socket.current.emit( 'addUser', auth.id );
    socket.current.on( 'getUsers', users =>
    {
      
    })
  }, [auth] )
  useEffect( () =>
  {
    const getConversation = async () =>
    {
      try {
        const response = await axios.get( "/conversation" + auth.id )
        setConversations(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getConversation()
  }, [ auth.id ] )
  useEffect( () =>
  {
    const getMessages = async ()=> {
      try {
        const response = await axios.get( 'message/' + currentChat.id )
        setMessages(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getMessages()
  }, [ currentChat ] )
  
  useEffect( () =>
  {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [messages])
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