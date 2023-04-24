import DashboardContext from '../Components/context/Context';
import { useContext } from 'react';

const useAuth = () =>
{
      return useContext( DashboardContext );
};

export default useAuth