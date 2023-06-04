import { Routes, Route } from "react-router-dom"
import Layout from "./Layout";
import Home from "./Components/Home";
import Missing from "./Components/Missing";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Photographer from "./Components/Photographer";
import Model from './Components/Model'
import MaleModel from './Components/MaleModel'
import FemaleModel from './Components/FemaleModel'
import Videographer from './Components/Videographer'
import Stylist from './Components/Stylist'
import Artist from './Components/Artist'
import Influencer from './Components/Influencer'
import DashboardLayout from "./Components/Dashboard/DashboardLayout";
import DashHome from './Components/Dashboard/DashHome'
import NewPost from './Components/Dashboard/NewPost'
import Chat from './Components/Dashboard/Chat'
import RequireAuth from './Components/RequireAuth'
import PersistLogin from "./Components/PersistLogin";
import { DashboardProvider } from "./Components/context/DashboardContext";
import { ChatProvider } from "./Components/context/ChatContext";
import Profile from "./Components/Dashboard/Profile";
import User from "./Components/Dashboard/User";
import SinglePost from "./Components/Dashboard/SinglePost";
import About from "./Components/About";
import Contact from "./Components/Home/Contact";
import Flutterwave from "./Components/Dashboard/Payment/Flutterwave";
import RequireFlutter from "./Components/RequireFlutter";


const App= ()=> {
  return (
  <Routes>
    <Route path="/" element={<Layout/>}>
      <Route index element={ <Home /> } />
      <Route path="auth" >
        <Route index element={ <Login /> } />
        <Route path="register" element={ <Register /> } />
        <Route path="login" element={ <Login /> } />
      </Route>
      <Route path="photographer" element={ <Photographer /> } />
      <Route path="videographer" element={ <Videographer /> } />
      <Route path="stylist" element={ <Stylist /> } />
      <Route path="artist" element={ <Artist /> } />
      <Route path="influencer" element={ <Influencer /> } />
      <Route path='model'>
        <Route index element={ <Model /> } />
        <Route path="male" element={ <MaleModel /> } />
        <Route path="female" element={<FemaleModel/>}/>
        </Route>
        <Route path='about' element={ <About /> } />
        <Route path="contact" element={<Contact/>}/>
      {/* catch all */}
      <Route path="*" element={ <Missing/> } />
    </Route>
    {/* protected routes */ }
      <Route element={
          <PersistLogin />
      }>
      <Route element={<RequireAuth/>}>
          <Route path="dashboard" element={
            <DashboardProvider>
            <DashboardLayout /> </DashboardProvider>}>
            <Route index element={ <DashHome /> } />
            <Route path=":id" element={ <User /> } />
            <Route path="subscribe" element={ <Flutterwave /> } />
            <Route element={<RequireFlutter/>}>
              <Route path="post">
                <Route path=":id" element={ <SinglePost/> } />
              </Route>
              <Route path="chat" element={
                <ChatProvider>
                  <Chat/>
                </ChatProvider>
            } />
            </Route>
          <Route path="new-post" element={ <NewPost /> } />
            <Route path="profile" element={ <Profile/> } />
        </Route>
      </Route>
    </Route>
  </Routes>
  )
}

export default App
