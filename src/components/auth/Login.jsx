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
import hexImages from "../../hex/hexagon";


//ANIMATIONS
const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: .75
};

//Hexagon Animation
const pageVariants = {
  initial: {
    opacity: 0,
    x: "50vw",
  },
  in: {
    opacity: 1,
    x: 0,
  },
  out: {
    opacity: 0,
    x: "50vw",
  }
};

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
    y: -200,
    transition: {
      ease: [.6, .01, -0.5, .95],
      duration: 1,
      delay: 0.3
    }
  }
}

//Slogan Animation
const transition = { duration: 1.4, ease: [0.6, 0.01, -0.05, 0.9] };

const ideas = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  exit: {
    opacity: 0,
    y: 400,
    transition: {
      duration: 1,
    }
  }
};

const come = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
  exit: {
    opacity: 0,
    y: 400,
    transition: {
      duration: 1,
    }
  }
};

const together = {
  initial: {
    y: 0,
  },
  animate: {
    y: 0,
    transition: {
      delayChildren: 0.6,
      staggerChildren: 0.04,
      staggerDirection: 1,
    },
  },
  exit: {
    opacity: 0,
    y: 400,
    transition: {
      duration: 1,
    }
  }
};


const letter = {
  initial: {
    y: 400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};



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
    setUnfoundUser(false)
  }, [userName])
  // CHECK PASSWORD =========================
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setInvalidPwd(false)
  }, [pwd])
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

  // PWD SHOW/HIDDEN =========================
  function handleClick() {
    setShow(!show)
  }

  return (
    <motion.section className="Login"
      initial='hidden'
      animate='show'
      exit='exit'
    >
      <motion.section className='logo'>

        <motion.section className="hex-container"
          variants={container}
        >
          {hexImages.map((image, i) =>
            <motion.img key={`loginHexImages-${i}`} variants={item} className={image.title} src={image.src} alt={image.title} />
          )}
        </motion.section>

        <motion.div className="slogan-container"
          initial='initial'
          animate='animate'
          exit='exit'
        >
          <motion.span className="ideas" variants={ideas}>
            <motion.span variants={letter}>I</motion.span>
            <motion.span variants={letter}>d</motion.span>
            <motion.span variants={letter}>e</motion.span>
            <motion.span variants={letter}>a</motion.span>
            <motion.span variants={letter}>s</motion.span>
          </motion.span>

          <motion.span className="come" variants={come}>
            <motion.span variants={letter}>C</motion.span>
            <motion.span variants={letter}>o</motion.span>
            <motion.span variants={letter}>m</motion.span>
            <motion.span variants={letter}>e</motion.span>
          </motion.span>

          <motion.span className="together" variants={together}>
            <motion.span variants={letter}>T</motion.span>
            <motion.span variants={letter}>o</motion.span>
            <motion.span variants={letter}>g</motion.span>
            <motion.span variants={letter}>e</motion.span>
            <motion.span variants={letter}>t</motion.span>
            <motion.span variants={letter}>h</motion.span>
            <motion.span variants={letter}>e</motion.span>
            <motion.span variants={letter}>r</motion.span>
          </motion.span>
        </motion.div>

      </motion.section>

      {login
        ? <Navigate to={`/${userName}/moments`} />
        :
        <motion.section
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition} className="Login-form">
          <h1 className="login-header">Login</h1>
          <section className="outerLogin">
            <form onSubmit={handleSubmit} className="login-register-form">
              <section className="innerLogin">
                <section className="login-user">
                  <label htmlFor="username">
                    {validName && !unfoundUser ? <span><TiTick className="icon-login" /></span> : null}
                    {validName || !userName || !unfoundUser ? null : <span><TiTimes className="icon-login red" /></span>}
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
                {unfoundUser && !validName ? <p id="invalid-namenote" className="message red"><HiOutlineLightBulb className="icon-login red" />User does not exist</p> : null}
              </section>


              <section className="innerLogin">
                <section className="login-user">

                  <label htmlFor="password">

                    {validPwd && !invalidPwd ? <span><TiTick className="icon-login" /></span> : null}
                    {validPwd || !pwd || !invalidPwd ? null : <span><TiTimes className="icon-login red" /></span>}

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
        </motion.section>
      }

    </motion.section>

  )
}