import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import moment from 'moment'
import { DashboardContext } from '../context/DashboardContext'
import './dashboard.scss'
import { UserContext } from '../context/UserContext'

export default function Profile() {
  const { currentUser } = useContext(UserContext)
  const { handleDashboard, isDashboardOpen } = useContext(DashboardContext);



  console.log(currentUser)
  const time = Intl.DateTimeFormat().resolvedOptions().timeZone

  console.log(time);
  return (
    <div className={`${!isDashboardOpen ? 'dashboard ' : 'show-dashboard dashboard'}`}>


      {/* <p>{time}</p> */}
      <section className="dashboard_user_data">
        <section className="dashboard_logo">
         <img src={process.env.PUBLIC_URL + "/images/idea-removebg.png"} alt="log"></img>
         <h2>ideas come together</h2>
        </section>

        <p className="dashboard_info">username: {currentUser.username}</p>
        <p className="dashboard_info">created at: {moment(currentUser.joined).format('MMMM, YYYY')}</p>
        <p className="dashboard_info">email: {currentUser.email}</p>
      </section>
      <section className="dashboard_user_settings">
        <NavLink onClick={handleDashboard} to="settings" className="dashboard_one dashboardSettings"><p>user settings</p></NavLink>
        <p className="dashboard_two dashboardSettings">your activity</p>
        <p className="dashboard_three dashboardSettings">saved</p>
        <p className="dashboard_four dashboardSettings">privacy</p>
        <p className="dashboard_five dashboardSettings">security</p>
        <p className="dashboard_six dashboardSettings">notifications</p>
        <p className="dashboard_seven dashboardSettings">help</p>
      </section>



    </div>
  )
}