import React, { useContext } from 'react';
// React-Router
import { NavLink } from 'react-router-dom';
// Moment
import moment from 'moment';
// Context
import { UserContext } from '../context/UserContext'
import { PostContext } from '../context/PostContext'
import { DashboardContext } from '../context/DashboardContext';
// Component
import Dashboard from './Dashboard.jsx'
// style
import './navbar.scss'
import SearchBar from './SearchBar';

export default function Navbar() {
  const { currentUser } = useContext(UserContext);
  const { openPopUp } = useContext(PostContext);
  const { isDashboardOpen, handleDashboard } = useContext(DashboardContext);

  const handleOpenPopUp = () => {
    openPopUp()
  }

  // useEffect(() => {
  //   if (isPopUpOpen && submitPost) {
  //     setSubmitPost(false);
  //     setCreateNewPost(true)
  //   }
  // }, [submitPost, isPopUpOpen, createNewPost])
  // console.log(createNewPost);


  return (
    <header className="Navbar">
      <nav className="upper-nav" >

        <section className="nav-home">
          <img src={currentUser.avatar} alt="profile"
            onClick={handleDashboard}
            className="user-avatar"
          />
          {isDashboardOpen ? <Dashboard /> : ''}
          <NavLink to={`/${currentUser.username}/profile`} className="navlink_profile ">Profile</NavLink>
          <NavLink to={`/${currentUser.username}/moments`} className="navlink_moments">Moments</NavLink>
        </section>

        <section className="nav-create">
          <button onClick={handleOpenPopUp} className="create-link"><span> + </span>Create Post</button>
          <section className="nav-date">
          <p>{moment().format('HH:mm dddd, Do MMM YYYY')}</p>
        </section>

        </section>
      </nav>

      <nav className='lower-nav'>
        <section className="nav-greeting">
          <p>welcome back {currentUser.username}</p>
        </section>
        <SearchBar />
      </nav>
    </header>
  )
}