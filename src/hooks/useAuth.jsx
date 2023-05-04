import MainContext from '../Components/context/Context';
import { useContext } from 'react';

const useAuth = () =>
{
      return useContext( MainContext );
};

export default useAuth