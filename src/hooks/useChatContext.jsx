import { useContext } from "react"
import ChatContext from "../Components/context/ChatContext"

const useChatContext = () => {
  return useContext(ChatContext)
}

export default useChatContext