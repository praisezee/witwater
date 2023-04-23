import { createContext, useState, useRef, useEffect } from "react";
import axios from '../api/register'


const DashboardContext = createContext( {} );

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.,;]).{8,24}$/
const EMAIL_REGEX = /^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const REGISTER_URL ='/register'

export const DashboardProvider = ({children}) =>
{
  const [posts, setPosts] = useState([])
  const [ title, setTitle ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ image, setImage ] = useState( '' )
  
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
  }, [password, confirm,email])

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
      const response = await axios.post(
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
      console.log( JSON.stringify( response ) );
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
        setErrMsg( 'No server Response. pls reload the app and try again' )
        setTimeout( () =>
        {
          setErrMsg('')
        },5000)
      } else if (err.response?.status === 409) {
        setErrMsg('Email already exist. Enter an new email')
      } else {
        setErrMsg('Registration failed. pls try again or contact the admin support')
      }
    }
  }



  const sendPost = (e) =>
  {
    e.preventDefault()
    const newPost = {
      title,
      message,
      id: posts.length + 1,
      image
    }
    setPosts( [newPost, ...posts] )
    setTitle( '' )
    setMessage('')
  }


  return (
    <DashboardContext.Provider value={ {
      title,message,setMessage,setTitle,posts, sendPost, image, setImage, errMsg, errRef,  success, name, setName, gender, setGender, role, setRole, state, setState, city, setCity, email,setEmail, phoneNumber, setPhoneNumber, password, setPassword, confirm, setConfirm, handleRegister, validPwd, validEmail,validMatch,pwdFocus,setPwdFocus, matchFocus, setMatchFocus, setEmailFocus, emailFocus
    }}>
      {children}
    </DashboardContext.Provider>
  )
};

export default DashboardContext