import { createContext, useState, useRef, useEffect } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import useDashboardContext from "../../hooks/useDashboardContext";

const ChatContext = createContext( {} );
//const DEV_SOCKET = 'ws://localhost:3500'
export const ChatProvider = ( { children } ) =>
{
  const { auth, setErrMsg, errRef } = useAuth()
  const {setArrivalMessage, arivalMessage, socket} = useDashboardContext()
  const axiosPrivate = useAxiosPrivate()

  const [ conversations, setConversations ] = useState( [] )
  const [ currentChat, setCurrentChat ] = useState( null )
  const [ messages, setMessages ] = useState( [] )
  const [ newMessage, setNewMessage ] = useState( '' )
  const [friend, setFriend] = useState({})
  const scrollRef = useRef()



  
    useEffect( () =>
  {
    arivalMessage &&
      currentChat?.members.includes( arivalMessage.sender ) &&
      setMessages( prev => [ ...prev, arivalMessage ] )
  }, [arivalMessage, currentChat])
  
  
  useEffect( () =>
  {
    let isMounted = true
    const controller = new AbortController();
    const getConversation = async () =>
    {
      try {
        const response = await axiosPrivate.get( `conversation/${ auth.id }`,
          {
            signal: controller.signal
          }
        )
        isMounted && setConversations(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getConversation()

    return () =>
    {
      isMounted = false
      controller.abort()
    }
  }, [ auth, axiosPrivate ] )
  
  useEffect( () =>
  {
    const friendId = conversations.map(c => c?.members.find( member => member  !== auth?.id))
    const getFriend = async () =>
    {
      try {
        const response = await axiosPrivate( `/user/${ friendId }` )
        setFriend(response.data)
    } catch (err) {
      console.log(err)
    }
    }
    getFriend()
  }, [conversations, auth, axiosPrivate])

  useEffect( () =>
  {
    let isMounted = true
    const controller = new AbortController();
    const getMessages = async ()=> {
      try {

        const response = await axiosPrivate.get( `/message/${currentChat?._id}`, {
            signal: controller.signal
          }
        )
        const result = response.data
      isMounted && setMessages(result)
        
      } catch (err) {
        console.log(err);
      }
    }
    getMessages()

    return () =>
    {
      isMounted = false
      controller.abort()
    }
  }, [ currentChat, axiosPrivate ] )
  
  useEffect( () =>
  {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [ messages ] )

  const handleNewMessage = async ( e ) =>
  {
    e.preventDefault()
    const message = {
      sender: auth.id,
      text: newMessage,
      conversationId : currentChat._id
    }

    const receiverId = currentChat.members.find(member => member !== auth.id)

    socket.current.emit( 'sendMessage', {
      senderId: auth.id,
      receiverId,
      text: newMessage
    })
    try {
      const response = await axiosPrivate.post( '/message', message);
      setMessages( [ ...messages, response.data ] )
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <ChatContext.Provider value={ {
      errRef, setErrMsg, auth, handleNewMessage,conversations, setConversations,currentChat, setCurrentChat,messages, setMessages,newMessage, setNewMessage, arivalMessage, setArrivalMessage, socket, scrollRef, friend
    }}>
      {children}
    </ChatContext.Provider>
  )
};


export default ChatContext;