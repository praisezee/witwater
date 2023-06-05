import axios from '../Components/api/register'
import useAuth from './useAuth'

const useLogout = () =>
{
  const { setAuth, setSubscribe } = useAuth()
  const logout = async () =>
  {
    setAuth( {} );
    setSubscribe( null );
    try {
      const response = await axios( '/logout', {
        withCredentials: true
      })
      console.log(response.data)
    } catch (err) {
      console.log(err)
    }
  }

  return logout
}

export default useLogout