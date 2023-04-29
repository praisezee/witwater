import { createContext, useState, useRef, useEffect } from "react";
import axios from '../api/register'
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useNavigate, useLocation } from "react-router-dom";
import { io } from 'socket.io-client';


const DashboardContext = createContext( {} );

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.,;]).{8,24}$/
const EMAIL_REGEX = /^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const REGISTER_URL = '/register'
const LOGIN_URL = '/auth'
const POST_URL = '/posts'
const USER_URL = '/user'
const LOGOUT_URL ='/logout'

export const DashboardProvider = ({children}) =>
{
  const axiosPrivate = useAxiosPrivate()
  const [posts, setPosts] = useState([])
  const [ title, setTitle ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ image, setImage ] = useState( '' )
  const [ auth, setAuth ] = useState( {} )
  const [user, setUser] = useState([])
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "dashboard";

  // chat components
  const [ conversations, setConversations ] = useState( [] )
  const [ currentChat, setCurrentChat ] = useState( null )
  const [ messages, setMessages ] = useState( [] )
  const [ newMessage, setNewMessage ] = useState( '' )
  const [arivalMessage, setArrivalMessage] = useState(null)
  const scrollRef = useRef()
  const socket = useRef(io( 'ws://localhost:3500' ))
  
  
  // ursRef for errors and the likes
  const errRef = useRef()
  // states for the registration component
  const [ errMsg, setErrMsg ] = useState( '' )
  const [success, setSuccess] = useState(false)
  const [ name, setName ] = useState( '' )
  const [gender, setGender] = useState('Select an option')
  const [role, setRole] = useState('Select an option')
  const [state, setState] = useState('')
  const [city, setCity] = useState('')
  const [ email, setEmail ] = useState( '' )
  const [phoneNumber, setPhoneNumber] = useState('')
  const [password, setPassword] = useState('')
  const [ confirm, setConfirm ] = useState( '' )
  const [validPwd, setValidPwd] =useState(false)
  const [pwdFocus, setPwdFocus] =useState(false)
  const [validMatch, setValidMatch] =useState(false)
  const [ matchFocus, setMatchFocus ] = useState( false )
  const [ validEmail, setValidEmail ] = useState( false )
  const [emailFocus, setEmailFocus] = useState(false)

  // useEffect to handle password check
  
  useEffect( () =>
  {
    const result = PWD_REGEX.test( password )
    setValidPwd( result )
    const match = password === confirm
    setValidMatch(match)
  }, [ password, confirm ] )

  useEffect( () =>
  {
    const result = EMAIL_REGEX.test( email )
    setValidEmail(result)
  },[email])
  
  useEffect( () =>
  {
    setErrMsg('')
  }, [ password, confirm, email ] )


  //use effect for chat
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
      console.log(users)
    })
  }, [auth] )
  useEffect( () =>
  {
    const getConversation = async () =>
    {
      try {
        const response = await axiosPrivate.get( "/conversation/" + auth.id )
        setConversations(response.data)
      } catch (err) {
        console.log(err);
      }
    }
    getConversation()
  }, [ auth,axiosPrivate ] )
  useEffect( () =>
  {
    let isMounted = true
    const controller = new AbortController();
    const getMessages = async ()=> {
      try {

        const response = await axiosPrivate.get( `/message/${currentChat._id}`, {
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
  }, [ axiosPrivate,currentChat ] )
  
  useEffect( () =>
  {
    scrollRef.current?.scrollIntoView({behavior: 'smooth'})
  }, [ messages ] )
  

  
  // function to handle 
  
  const handleRegister = async (e) =>
  {
    e.preventDefault()
    const v1 = EMAIL_REGEX.test( email )
    const v2 = PWD_REGEX.test( password )
    if ( !v1 || !v2 ) {
      setErrMsg( 'An Error occured pls try again' );
      return;
    }
    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify(
          {
            name, gender, role, state, city, email,phoneNumber, password
          }
        ),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      )
      setSuccess( true )
      setName( '' )
      setGender( 'Select an option' )
      setRole( 'Select an option' )
      setCity( '' )
      setConfirm( '' )
      setEmail( '' )
      setPassword( '' )
      setPhoneNumber( '' )
      setState('')
    } catch (err) {
      if ( !err?.response ) {
          setErrMsg('No server response')
        } else if (err.response?.status === 409) {
        setErrMsg('Email already exist. Enter an new email')
      } else {
        setErrMsg('Registration failed. pls try again or contact the admin support')
      }
      errRef.current.focus()
    }
  }

  const handleLogin = async ( e ) =>
  {
    e.preventDefault()
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify( { email, password } ),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      const result = await response.data
      setAuth( result )
      setEmail( '' );
      setPassword( '' );
      navigate(from, {replace: true})
    } catch ( err ) {
      if ( !err.response ) {
          setErrMsg('No server response')
        } else if ( err.response?.status === 400 ){
        setErrMsg( 'Missing Email or password' )
      } else if (err.response?.status === 401){
        setErrMsg('Invalid Email or password')
      }
      else {
        setErrMsg('Login Failed')
      }
      errRef.current.focus()
    }
  }

  const sendPost = async (e) =>
  {
    e.preventDefault()
    try {
      const response = await axiosPrivate.post(
        POST_URL,
        JSON.stringify( { title, post: message, name: auth.name, email: auth.email } )
      );
      const result = await response.data
      console.log( result );
      setTitle( '' )
      setMessage('')
    } catch (err) {
      if ( !err.response ) {
        setErrMsg('No server response')
      } else if (err.response?.status === 400){
        setErrMsg('All feilds are required')
      } else {
        setErrMsg('Unable to create post')
      }
      errRef.current.focus()
      navigate('auth/login', {state: {from :location}, replace: true})
    }
  }


  const getPost = async (isMounted,controller) =>
    {
      try {
        const response = await axiosPrivate.get(
          POST_URL, {
            signal: controller.signal
          }
        )
        const result = response.data
      isMounted && setPosts(result)
      } catch (err) {
        if ( !err.response ) {
          setErrMsg('No server response')
        } else if ( err.response?.status === 204 ) {
          setErrMsg('No user to display')
        } else {
          setErrMsg('Unable to get post pls try again later')
        }
        errRef.current.focus()
        navigate('auth/login', {state: {from :location}, replace: true})
      }
  }
  
  const getUsers = async (isMounted, controller) =>
  {
    try {
        const response = await axios.get(
          USER_URL, {
            signal: controller.signal
          }
        )
        const result = response.data
      isMounted && setUser(result)
      } catch (err) {
        if ( !err?.response ) {
          setErrMsg('No server response')
        } else if ( err.response?.status === 204 ) {
          setErrMsg('No user to display')
        } else {
          setErrMsg('Unable to get post pls try again later')
        }
      errRef.current.focus()
      }
  }

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
      const response = await axiosPrivate.post( '/message', message );
      setMessages( [ ...messages, response.data ] )
      setNewMessage('')
    } catch (err) {
      console.log(err)
    }
  }

  const handelLogout = async (e) =>
  {
    e.preventDefault()
    try {
      await axiosPrivate.get( LOGOUT_URL )
      setAuth({})
      } catch (err) {
        console.log(err)
        errRef.current.focus()
        navigate('auth/login', {state: {from :location}, replace: true})
      }
  }
  


  return (
    <DashboardContext.Provider value={ {
      title,message,setMessage,setTitle,posts, sendPost, image, setImage, errMsg, errRef,  success, name, setName, gender, setGender, role, setRole, state, setState, city, setCity, email,setEmail, phoneNumber, setPhoneNumber, password, setPassword, confirm, setConfirm, handleRegister, validPwd, validEmail,validMatch,pwdFocus,setPwdFocus, matchFocus, setMatchFocus, setEmailFocus, emailFocus, setErrMsg, handleLogin, auth, setAuth, getPost,user, getUsers,handleNewMessage,conversations, setConversations,currentChat, setCurrentChat,messages, setMessages,newMessage, setNewMessage, arivalMessage, setArrivalMessage, socket, scrollRef, handelLogout
    }}>
      {children}
    </DashboardContext.Provider>
  )
};

export default DashboardContext