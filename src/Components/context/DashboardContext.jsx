import { createContext, useState} from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

const DashboardContext = createContext( {} );

const POST_URL = '/posts'
const USER_URL = '/user'

export const DashboardProvider = ( { children } ) =>
{


  const {auth, setErrMsg, errRef,setAuth} = useAuth()
  const axiosPrivate = useAxiosPrivate()
  const [posts, setPosts] = useState([])
  const [ title, setTitle ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [ userPost, setUserPost ] = useState( [] )
  const [ user, setUser ] = useState( {} )
  const [singlePost, setSinglePost] = useState(null)
  const [ isLoading, setIsLoading ] = useState( true )
  const [ comments, setComments ] = useState( [] )
  const [newComment, setNewComment] = useState('')
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
      navigate('../dashboard')
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

  const getUserPost = async (id,isMounted,controller) =>
  {
    try {
      const response = await axiosPrivate.get( `userPost/${ id }`, {
        signal: controller.signal
      } )
      const result = await response.data
      isMounted && setUserPost(result)
      
    } catch (err) {
      console.log(err)
    }
  }

  const getUser = async (id) =>
  {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.get( `${ USER_URL }/${ id }` )
      const result = await response.data
      setUser( result )
      setTimeout( () =>
      {
        setIsLoading(false)
      }, 3000)
    } catch (err) {
      console.log(err)
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
        isMounted && setPosts( result )
        setTimeout( () =>
      {
        setIsLoading(false)
      }, 1000)
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

  const getSinglePost = async ( id, isMounted,controller ) =>
  {
      setIsLoading(true)
    try {
      const response = await axiosPrivate.get( `${ POST_URL }/${ id }`, {
        signal: controller.signal
      } )
      const result = await response.data
      isMounted && setSinglePost( result )
      setTimeout( () =>
      {
        setIsLoading( false )
      },2000)
    } catch (err) {
      console.log(err)
    }
  }

  const deleteAccount = async () =>
  {
    try {
      const response = await axiosPrivate.delete( `/user/${ auth.id }` )
      console.log( response.data )
      navigate('..')
    } catch ( err ) {
      console.log(err)
    }
  }

  const addConversation = async (id) =>
  {
    try {
      const response = await axiosPrivate.post( '/conversation', JSON.stringify( { senderId: auth.id, receiverId: id } ) )
      console.log( response.data )
      navigate('../dashboard/chat')
    } catch (err) {
      if ( !err?.response ) {
        console.log('no server response')
      } else if ( err.response?.status === 409 ) {
        console.log('duplicate conversation not allowed')
        navigate('../dashboard/chat')
      }else {
        console.log(`failed to add id ${id} to chat conversation`)
      }
    }
  }
  const sendComment = async (id) =>
  {
    try {
      const response = await axiosPrivate.post( '/comment', JSON.stringify( { comment: newComment, senderId: auth.id, postId:id } ) )
      const result = response.data
      setComments( [result, ...comments] )
      setNewComment('')
    } catch (err) {
      console.log(err)
    }
  }

  const getComment = async ( id ) =>
  {
    try {
      const response = await axiosPrivate.get( `/comment/${id}` )
      const result = response.data
      setComments( result )
    } catch (err) {
      console.log(err)
    }
  }

  
  return (
    <DashboardContext.Provider value={ {
      title,message,setMessage,setTitle,posts, sendPost, errRef, setErrMsg, auth, setAuth, getPost,deleteAccount, getUserPost, userPost, getUser, user,setUser, getSinglePost, singlePost, isLoading, addConversation, setNewComment, comments, setComments, newComment,sendComment, getComment,
    }}>
      {children}
    </DashboardContext.Provider>
  )
};


export default DashboardContext;