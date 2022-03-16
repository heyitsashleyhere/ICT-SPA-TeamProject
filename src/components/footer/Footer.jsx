import React, { useContext } from 'react'
// React-Router
import { NavLink, useNavigate } from 'react-router-dom';
// Context
import { UserContext } from '../context/UserContext'
import { FaGithubAlt } from 'react-icons/fa'

import './footer.scss'
import hexImages from '../../hex/hexagon'
import { motion } from 'framer-motion'


const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    }
  }
}

const item = {
  hidden: {
    opacity: 0,
    y: 200
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      ease: [.6, .01, -0.5, .95],
      duration: 1.6
    }
  },
  exit: {
    opacity: 0,
    y: 200,
    transition: {
      ease: [.6, .01, -0.5, .95],
      duration: 1,
      delay: .5,
    }
  }
}

const Footer = () => {
  const { setCurrentUser } = useContext(UserContext)

  const navigate = useNavigate()
  const handleLogout = () => {
    // setCurrentUser(false)
    navigate('/login')
  }

  const variant = {
    initial: 'hidden',
    animate: 'show',
    exit: 'exit'
  }
  return (
    <motion.footer
      variants={variant}>

      <section className='logo-logout'>
        <NavLink to='/' className="logout-button" onClick={handleLogout}>Logout</NavLink>

        {/* <img src={Logo} alt="logo" className="logo"></img> */}

        <motion.div className="animated-logo" variants={container}>
          {hexImages.map((image, i) =>
            <motion.img key={`footerHexImages-${i}`} variants={item} className={image.title} src={image.src} alt={image.title} />
          )}
        </motion.div>

      </section>

      <section className="git_team">
        <FaGithubAlt className='git_icon' />
        <section className="team_links">
          <p>Ashley Jiang : <a href="https://github.com/heyitsashleyhere" target="_blank" rel="noreferrer">heyitsashleyhere</a></p>
          <p>Darren Snell : <a href="https://github.com/Snell401" target="_blank" rel="noreferrer">Snell401</a></p>
          <p>Henrik / artoo : <a href="https://github.com/chewbacca23" target="_blank" rel="noreferrer">chewbacca23</a></p>
          <p>Ivo Serra : <a href="https://github.com/ivoserra" target="_blank" rel="noreferrer">ivoserra</a></p>
          <p>Murad Muqbel : <a href="https://github.com/muradgm" target="_blank" rel="noreferrer">muradgm</a></p>
        </section>

      </section>

    </motion.footer>
  )
}

export default Footer