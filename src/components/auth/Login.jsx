// Hooks:
import { useContext, useEffect, useState } from "react";
// router-dom:
import { NavLink, Navigate } from "react-router-dom";
// Contexts:
import { UserContext } from "../context/UserContext";
import { LoginRegisterContext } from '../context/LoginRegisterContext'
// Components:
// import Loader from "../Loader";
// Styling:
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { TiTick, TiTimes } from "react-icons/ti";
import { HiOutlineLightBulb } from "react-icons/hi";
import './Login.scss'
import { motion } from "framer-motion";
import hexImages from "../../theme/hex/hexagon";


//ANIMATIONS
const formVariants = {
  hidden: {
    opacity: 0,
    x: "50vw",
  },
  in: {
    opacity: 1,
    x: 0,
    transition: {
      type: "tween",
      ease: "anticipate",
      duration: .75
    }
  },
  out: {
    opacity: 0,
    x: "50vw",
  }
};
//Hexagon 
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
      duration: 1
    }
  },
  exit: {
    opacity: 0,
    y: -200,
    transition: {
      ease: [.6, .01, -0.5, .95],
      duration: 0.5,
      // delay: 0.3
    }
  }
}


export default function Login() {
  const [login, setLogin] = useState(false);
  const [loading, setLoading] = useState(false);
  const [unfoundUser, setUnfoundUser] = useState(false);
  const [invalidPwd, setInvalidPwd] = useState(false);
  // IMPORT PROPS ==========================
  const {
    USER_REGEX, PWD_REGEX,
    validName, setValidName,
    userFocus, setUserFocus,
    validPwd, setValidPwd,
    pwdFocus, setPwdFocus,
    show, setShow
  } = useContext(LoginRegisterContext);
  const {
    setCurrentUser,
    userName, setUserName,
    pwd, setPwd,
    users } = useContext(UserContext);
  // CHECK USERNAME =========================
  useEffect(() => {
    setValidName(USER_REGEX.test(userName));

  }, [userName, validName])
  // CHECK PASSWORD =========================
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
   
  }, [pwd, invalidPwd])
  // ON SUBMIT ==============================
  function handleSubmit(e) {
    e.preventDefault()
    const theCurrentUser = users.find(user => user.username === userName)
    if (theCurrentUser && theCurrentUser.password === pwd) {
      setInvalidPwd(false)
      setUnfoundUser(false)

      setLogin(true)
      setLoading(true)
      setCurrentUser(theCurrentUser)
      setTimeout(() => { setLoading(false) }, 2000)
      console.log(`Current User:`, theCurrentUser);
    } else if (theCurrentUser) {
      setInvalidPwd(true)
      setValidPwd(false)
      setUnfoundUser(false)
    } else {
      setUnfoundUser(true)
      setValidName(false)
    }
  }

  console.log('unfoundUser :>> ', unfoundUser);

  // PWD SHOW/HIDDEN =========================
  function handleClick() {
    setShow(!show)
  }

  return (
    <section className="Login"
                    initial='hidden'
                    animate='show'
                    exit='exit'>

      <section className='logo'>
        <section className="hex-container" variants={container}>
          {hexImages.map((image, i) =>
            <img key={`loginHexImages-${i}`} variants={item} className={image.title} src={image.src} alt={image.title} />
          )}
        </section>

        <div className="slogan-container">
            <span className="ideas"variants={container}>
              <span variants={item}>I</span>
              <span variants={item}>d</span>
              <span variants={item}>e</span>
              <span variants={item}>a</span>
              <span variants={item}>s</span>
            </span>

          <span className="come" variants={container}>
            <span variants={item}>C</span>
            <span variants={item}>o</span>
            <span variants={item}>m</span>
            <span variants={item}>e</span>
          </span>

          <span className="together" variants={container}>
            <span variants={item}>T</span>
            <span variants={item}>o</span>
            <span variants={item}>g</span>
            <span variants={item}>e</span>
            <span variants={item}>t</span>
            <span variants={item}>h</span>
            <span variants={item}>e</span>
            <span variants={item}>r</span>
          </span>
        </div>
      </section>

      {login
        ? <Navigate to={`/${userName}/moments`} />
        :
        <section
          // initial="hidden"
          // animate="in"
          // exit="out"
          // variants={formVariants}
          className="Login-form">
          <h1 className="login-header">Login</h1>
          <section className="outerLogin">
            <form onSubmit={handleSubmit} className="login-register-form">
              <section className="innerLogin">
                <section className="login-user">
                  <label htmlFor="username">
                    {validName && userName && !unfoundUser ? <span><TiTick className="icon-login" /></span> : <span><TiTimes className="icon-login red" /></span>}
                    {/* {!validName || !userName || unfoundUser ? <span><TiTimes className="icon-login red" /></span> : null} */}

                  </label>

                  <input type="text" className="log-input"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)} />

                  <p className="placeholder">username</p>

                </section>

                {userFocus && userName && !validName ?
                  <p id="usernote" className="message">
                    <HiOutlineLightBulb />
                    3 to 24 characters. Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens are allowed
                  </p> : null}
                {unfoundUser ? <p id="invalid-namenote" className="message red"><HiOutlineLightBulb className="icon-login red" />User does not exist</p> : null}
              </section>


              <section className="innerLogin">
                <section className="login-user">

                  <label htmlFor="password">

                    {validPwd && !invalidPwd ? <span><TiTick className="icon-login" /></span> : <span><TiTimes className="icon-login red" /></span>}
                    {/* {!validPwd || !pwd || !invalidPwd ? null : <span><TiTimes className="icon-login red" /></span>} */}

                  </label>
                  <input type={show ? "text" : "password"}
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)} className="log-input" />

                  <p className="placeholder">password</p>

                  <span className="showPwd" onClick={handleClick}>{show ? <AiOutlineEye className="icon-login" /> : <AiOutlineEyeInvisible className="icon-login" />}</span>


                </section>

                {pwdFocus && !validPwd ?
                  <p id="pwdnote" className="message">
                    <HiOutlineLightBulb className="icon-login" />
                    8 to 24 characters. <br />
                    Must include uppercase and lowercase letters, a number and a special character: ! @ # $ % <br />

                  </p> : null}
                {invalidPwd ? <p className="message"id="invalid-pwdnote"><HiOutlineLightBulb className="icon-login red" />Invalid Password </p> : null}
              </section>

              <button className="button-login" disabled={!validName || !validPwd ? true : false}>Login</button>

            </form>

            <section className="allready-register">
              <p className="allreadyText">Don't have an account?</p>
              <NavLink className="loginNavLink allreadyLink hover-underline-animation" to='/register'>Register here</NavLink>
            </section>

          </section>
        </section>
      }

    </section>

  )
}