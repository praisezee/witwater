import { createContext, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";

const DashboardContext = createContext( {} );

const POST_URL = '/posts'

export const DashboardProvider = ( { children } ) =>
{


  const {auth, setErrMsg, errRef,setAuth} = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [posts, setPosts] = useState([])
  const [ title, setTitle ] = useState( '' );
  const [ message, setMessage ] = useState( '' );



  const sendPost = async (e) =>
  {
    e.preventDefault()
    try {
      const response = await axiosPrivate.post(
        POST_URL,
        JSON.stringify( { title, post: message, senderId: auth.id } )
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
            withCredentials: true,
            signal: controller.signal
          }
        )
        const result = response.data
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

  
  return (
    <DashboardContext.Provider value={ {
      title,message,setMessage,setTitle,posts, sendPost, errRef, setErrMsg, auth, setAuth, getPost
    }}>
      {children}
    </DashboardContext.Provider>
  )
};


export default DashboardContext;