import { createContext,useState, useEffect } from "react";


const DashboardContext = createContext({});

export const DashboardProvider = ({children}) =>
{
  const [posts, setPosts] = useState([])
  const [ title, setTitle ] = useState( '' );
  const [ message, setMessage ] = useState( '' );
  const [image, setImage] = useState('')



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
    console.log( newPost);
    console.log( posts);
  }


  return (
    <DashboardContext.Provider value={ {
      title,message,setMessage,setTitle,posts, sendPost, image, setImage
    }}>
      {children}
    </DashboardContext.Provider>
  )
};

export default DashboardContext