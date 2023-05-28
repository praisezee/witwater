import { createContext, useState, useRef, useEffect } from "react";
import axios from '../api/register'
import { useNavigate, useLocation } from "react-router-dom";


const MainContext = createContext( {} );

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%.,;]).{8,24}$/
const EMAIL_REGEX = /^[a-zA-z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
const REGISTER_URL = '/register'
const LOGIN_URL = '/auth'
const USER_URL = '/user'

export const MainProvider = ({children}) =>
{
  const [ title, setTitle ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ image, setImage ] = useState( '' )
  const [ auth, setAuth ] = useState( {} )
  const [user, setUser] = useState([])
  
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "dashboard";


  const [isLoggedIn,setIsLoggedIn] = useState(false)

  
  
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
  const [ emailFocus, setEmailFocus ] = useState( false )
  const [ persist, setPersist ] = useState( JSON.parse( localStorage.getItem( 'persist' ) ) || false )
  const [code,setCode] =  useState('')

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

  const verifyEmail = async () =>
  {
    try {
      await axios.post( '/verify-code', JSON.stringify({ email, code }),
        {
        headers: { "Content-Type": "application/json" },
        withCredentials: true
      } )
      navigate( '../login' )
      setEmail('')
      setCode('')
    } catch (err) {
      if ( !err?.res ) {
        console.log('no server response')
      } else if ( err.response.status === 400 ) {
        console.log('invalid Verification code')
        setErrMsg('invalid Verification code')
      }

      errRef.current.focus()
    }
  }

  
  // function to handle 
  
  const handleRegister = async (e) =>
  {
    
    e.preventDefault()
    const v1 = EMAIL_REGEX.test( email )
    const v2 = PWD_REGEX.test( password )
    if ( !v1 ) {
      setErrMsg( 'Email is not supported' );
      return;
    } else if(!v2){
setErrMsg('Password must be 8 to 24 characters long which must include 1 uppercase letter, 1 lowercase letter, 1 number and 1 special character')
return;
} else {
setErrMsg('An error occured')
return;
}
    setIsLoggedIn( true )
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
      await axios.post('/verify-mail',JSON.stringify({email}),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        })
      setSuccess( true )
      setName( '' )
      setGender( 'Select an option' )
      setRole( 'Select an option' )
      setCity( '' )
      setConfirm( '' )
      setPassword( '' )
      setPhoneNumber( '' )
      setState( '' )
      setIsLoggedIn(false)
    } catch (err) {
      if ( !err?.response ) {
          setErrMsg('No server response')
        } else if (err.response?.status === 409) {
        setErrMsg('Email already exist. Enter an new email')
      } else {
        setErrMsg('Registration failed. pls try again or contact the admin support')
      }
      setIsLoggedIn(false)
      errRef?.current.focus()
    }
  }

  const handleLogin = async ( e ) =>
  {
    setIsLoggedIn( true )
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
      setTimeout( () =>
      {
        setIsLoggedIn( false )
      },2000)
      
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
      setIsLoggedIn(false)
      errRef.current.focus()
    }
  }
  
  const getUsers = async () =>
  {
    try {
        const response = await axios.get(
          USER_URL
        )
      const result = response.data;
      setUser( result )
      } catch (err) {
        if ( !err?.response ) {
          setErrMsg('No server response')
        } else if ( err.response?.status === 204 ) {
          setErrMsg('No user to display')
        } else {
          setErrMsg('Unable to get post pls try again later')
        }
      }
  }



  return (
    <MainContext.Provider value={ {
      title,message,setMessage,setTitle, image, setImage, errMsg, errRef,  success, name, setName, gender, setGender, role, setRole, state, setState, city, setCity, email,setEmail, phoneNumber, setPhoneNumber, password, setPassword, confirm, setConfirm, handleRegister, validPwd, validEmail,validMatch,pwdFocus,setPwdFocus, matchFocus, setMatchFocus, setEmailFocus, emailFocus, setErrMsg, handleLogin, auth, setAuth,user, getUsers,isLoggedIn,persist, setPersist, verifyEmail, code, setCode
    }}>
      {children}
    </MainContext.Provider>
  )
};

export default MainContext;