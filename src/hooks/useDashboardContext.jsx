import DashboardContext from "../Components/context/DashboardContext"
import { useContext } from "react"

const useDashboardContext = () =>
{
  
  return useContext( DashboardContext );
}

export default useDashboardContext