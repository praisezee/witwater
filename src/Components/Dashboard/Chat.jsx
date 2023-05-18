import { Alert, Button, Col, Container, FormControl, Row } from 'react-bootstrap';
import { BsSend,BsArrowLeftCircle } from 'react-icons/bs'
import Conversation from './chat/Conversation';
import Message from './chat/Message';
import useChatContext from '../../hooks/useChatContext';



const Chat = () =>
{
  const { auth, handleNewMessage, conversations, currentChat, setCurrentChat, messages, newMessage, setNewMessage, scrollRef, friend } = useChatContext()


  const handleClick = () =>
  {
    setCurrentChat(null)
  }

  return (
    <div className='h-100 overflow-auto'> 
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
                <div className="d-flex flex-column vh-95">
              <div className='w-100 flex-grow-1 overflow-auto'>
                <div className="sticky-top justify-content-between d-flex align-item-center bg-dark text-white m-0 p-0">
                  <div>
                    <Button onClick={handleClick} variant='dark'>
                    <BsArrowLeftCircle/>
                  </Button>
                </div>

                  <div className='ms-5 my-auto flex-grow-1'>
                    <p className="text-capitalize my-auto">
                      {friend.name}
                    </p>
                  </div>
              </div>
              { messages.map( message => 
                <div ref={scrollRef}>
                  <Message message={ message } own={message.sender === auth.id} handleClick={handleClick} />
                </div>
                )
              }
            </div>
          <div className='d-flex align-item-center justify-content-evenly h-5'>
                <FormControl
                  placeholder='Enter your message...' className='fs-5 w-75'
                  value={newMessage}
                  onChange={(e)=>setNewMessage(e.target.value)}
                />
            <Button className='my-auto mx-2 w-25' onClick={handleNewMessage}>
              <BsSend className='bg-transparent text-white'/>
            </Button>
          </div>
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
      <div className="w-100 container-fluid d-block d-md-none">
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
          <Col xs={ 12 } className={ currentChat ? 'z-1 d-md-none d-block flex-grow-1' : 'd-none' }>
            <div className="d-flex flex-column vh-95">
              <div className='w-100 flex-grow-1 overflow-auto'>
                <div className="sticky-top justify-content-between d-flex align-item-center bg-dark text-white m-0 p-0">
                  <div>
                    <Button onClick={handleClick} variant='dark'>
                    <BsArrowLeftCircle/>
                  </Button>
                </div>

                  <div className='ms-5 my-auto flex-grow-1'>
                    <p className="text-capitalize my-auto">
                      {friend.name}
                    </p>
                  </div>
              </div>
              { messages.map( message => 
                <div ref={scrollRef}>
                  <Message message={ message } own={message.sender === auth.id} handleClick={handleClick} />
                </div>
                )
              }
            </div>
          <div className='d-flex align-item-center justify-content-evenly h-5'>
                <FormControl
                  placeholder='Enter your message...' className='fs-5 w-75'
                  value={newMessage}
                  onChange={(e)=>setNewMessage(e.target.value)}
                />
            <Button className='my-auto mx-2 w-25' onClick={handleNewMessage}>
              <BsSend className='bg-transparent text-white'/>
            </Button>
          </div>
            </div>
        </Col>
        </Row>
        </div>
    </div>
  )
}

export default Chat