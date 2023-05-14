import { createContext, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DashboardContext = createContext( {} );

const POST_URL = '/posts'

export const DashboardProvider = ( { children } ) =>
{


  const {auth, setErrMsg, errRef,setAuth} = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [posts, setPosts] = useState([])
  const [ title, setTitle ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const navigate = useNavigate()




  const sendPost = async (e) =>
  {
    e.preventDefault()
    try {
      const response = await axiosPrivate.post(
        POST_URL,
        JSON.stringify( { title, post: message, id: auth.id } )
      );
      await response.data
      setTitle( '' )
      setMessage('')
    } catch (err) {
      if ( !err?.response ) {
        setErrMsg('No server response')
      } else if (err.response?.status === 400){
        setErrMsg('All feilds are required')
      } else {
        setErrMsg('Unable to create post')
      }
      errRef.current.focus()
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
        console.log( result )
      isMounted && setPosts(result)
      } catch (err) {
        if ( !err?.response ) {
          setErrMsg('No server response')
        } else if ( err.response?.status === 204 ) {
          setErrMsg('No post to display')
        } else {
          setErrMsg('Unable to get post pls try again later')
        }
      }
  }

  const deleteAccount = async () =>
  {
    console.log('clicked')
    try {
      const response = await axiosPrivate.delete( `/user/${ auth.id }`, {
      withCredentials: true
      } )
      console.log( response.data )
      navigate('..')
    } catch ( err ) {
      console.log(err)
    }
  }

  
  return (
    <DashboardContext.Provider value={ {
      title,message,setMessage,setTitle,posts, sendPost, errRef, setErrMsg, auth, setAuth, getPost,deleteAccount
    }}>
      {children}
    </DashboardContext.Provider>
  )
};


export default DashboardContext;