import React, { useContext } from 'react'
// Router-dom:
import { Route, Routes } from 'react-router-dom'
// Context:
import { UserContext } from '../context/UserContext'
// Components:
import Navbar from '../header/Navbar.jsx'
import Footer from '../footer/Footer.jsx'
import Moments from './Moments.jsx'
import Profile from './Profile.jsx'
import UserSettings from './UserSettings.jsx'
import CreatePost from './CreatePost.jsx'

const UserPlatform = () => {
  const { currentUser } = useContext(UserContext)

  return (
    <div>
      <Navbar />
      {/* <h1>Welcome {currentUser.username}!</h1> */}
      <CreatePost />
      <Routes>
        <Route path='moments' element={<Moments />} />
        <Route path='profile' element={<Profile />} />
        <Route path='settings' element={<UserSettings />} />
        {/* <Route path='createPost' element={<CreatePost />} /> */}
      </Routes>
      <Footer />
    </div>
  )
}

export default UserPlatform