// Hooks:
import { useContext, useEffect, useState } from "react";
// router-dom:
import { NavLink, Navigate } from 'react-router-dom';
// Contexts:
import { LoginRegisterContext } from "../context/LoginRegisterContext";
import { UserContext } from "../context/UserContext";
// Components:
import Loader from "../Loader";
// Styling:
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { TiTick, TiTimes } from "react-icons/ti";
import { HiOutlineLightBulb } from "react-icons/hi";
import './Register.scss'
import { motion } from "framer-motion";
import hexImages from "../../hex/hexagon";

//ANIMATIONS
// page == form
const pageTransition = { 
  type: "tween",
  ease: "anticipate",
  duration: .75
};
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
}

//Hexagon container to allow the children to start their animation apart
const container = {
  show: {
    transition: {
      staggerChildren: 0.35,
    }
  }
}
//item = hexagons
const item = {
  hidden: {
    opacity: 0,
    y: -200
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
      staggerDirection: -1, //it's coming from left to right
    },
  },
  exit: {
    opacity: 0,
    y: 400,
    transition: {
      duration: 1
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
    y: -400,
  },
  animate: {
    y: 0,
    transition: { duration: 1, ...transition },
  },
};


export default function Register() {
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userExist, setUserExist] = useState(false);
  const [emailExist, setEmailExist] = useState(false);

  // IMPORT PROPS ==========================
  const {
    USER_REGEX, PWD_REGEX, EMAIL_REGEX,
    validName, setValidName,
    userFocus, setUserFocus,
    validPwd, setValidPwd,
    pwdFocus, setPwdFocus,
    matchPwd, setMatchPwd,
    validMatch, setValidMatch,
    matchFocus, setMatchFocus,
    validEmail, setValidEmail,
    emailFocus, setEmailFocus,
    show, setShow,
    showConfirm, setShowConfirm
  } = useContext(LoginRegisterContext);
  const {
    userName, setUserName,
    pwd, setPwd,
    email, setEmail,
    users, setUsers
  } = useContext(UserContext);
  // CHECK USERNAME =========================
  const allUsersName = users.map(user => user.username)
  useEffect(() => {
    if (allUsersName.includes(userName)) {
      setUserExist(true)
    } else {
      setUserExist(false)
    }
    setValidName(USER_REGEX.test(userName));
  }, [userName, validName, userExist])
  // CHECK PASSWORD =========================
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    const match = pwd === matchPwd; //Boolean
    setValidMatch(match);
  }, [pwd, matchPwd, validPwd])
  // CHECK EMAIL ============================
  const allUsersEmail = users.map(user => user.email)
  useEffect(() => {
    if (allUsersEmail.includes(email)) {
      setEmailExist(true)
    } else {
      setEmailExist(false)
    }
    setValidEmail(EMAIL_REGEX.test(email))
  }, [email])
  // ON SUBMIT ============================== (remember asynchronous)
  function handleSubmit(e) {
    e.preventDefault()
    setUsers([...users, { userid: users.length + 1, username: userName, avatar: `https://robohash.org/${userName}`, password: pwd }]);
    setSuccess(true)
    // setLoading(true)
    // setTimeout(() => { setLoading(false) }, 2000)
  }

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(users));
  }, [users])

  // PWD SHOW/HIDDEN =========================
  function handleClick() {
    setShow(!show)
  }
  // 2ND PWD SHOW/HIDDEN =========================
  function handleConfirmClick() {
    setShowConfirm(!showConfirm)
  }

  function showTickOrTimesForUserName() {
    if (validName && !userExist) {
      return <span><TiTick className="icon-login" /></span>
    } else if ((validName && !userName) || (validName && userExist)) {
      return <span><TiTimes className="icon-login red" /></span>
    } else if (!validName && userFocus) {
      return <span><TiTimes className="icon-login red" /></span>
    } else {
      return null
    }
  }

  function showTickOrTimesForEmail() {
    if (validEmail && !emailExist) {
      return <span><TiTick className="icon-login" /></span>
    } else if ((validEmail && !email) || (validEmail && emailExist)) {
      return <span><TiTimes className="icon-login red" /></span>
    } else if (!validEmail && emailFocus) {
      return <span><TiTimes className="icon-login red" /></span>
    } else {
      return null
    }
  }


  return (
    <motion.section className="Register"
      initial='hidden'
      animate='show'
      exit='exit'
    >
      <motion.section className='logo'>

        <motion.section className="hex-container"
          variants={container}
        >
          {hexImages.map((image, i) =>
            <motion.img key={`registerHexImages-${i}`} variants={item} className={image.title} src={image.src} alt={image.title} />
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

      {success
        ? 
        // (loading ? <Loader /> :
          window.location.replace('/login') 
          // <Navigate to="/login" />
        :
        <motion.section
          initial="initial"
          animate="in"
          exit="out"
          variants={pageVariants}
          transition={pageTransition}
          className="RegisterForm Login-form">
          <h1 className="login-header">Register</h1>
          <section className="outerLogin">

            <form onSubmit={handleSubmit}>

              <section className="innerLogin">

                <section className="login-user">

                  <label htmlFor="username">
                    {showTickOrTimesForUserName()}
                  </label>

                  <input type="text"
                    id="username"
                    autoComplete="off"
                    onChange={(e) => setUserName(e.target.value)}
                    required
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)} className="log-input" />

                  <p className="placeholder">username</p>

                </section>

                {userFocus && userName && !validName ?
                  <p className="message" id="usernote">
                    <HiOutlineLightBulb className="icon-login" />
                    3 to 24 characters. Must begin with a letter. <br />
                    Letters, numbers, underscores, hyphens are allowed
                  </p> : null}
                {userFocus && userName && validName && userExist ?
                  <p id="userExistnote" className="message red">
                    <HiOutlineLightBulb className="icon-login red" />
                    Username already exist. Please choose a different name <br />
                  </p> : null}

              </section>

              <section className="innerLogin">
                <section className="login-user">
                  <label htmlFor="useremail">
                    {showTickOrTimesForEmail()}
                  </label>

                  <input type="email"
                    id="useremail"
                    autoComplete="off"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)} className="log-input" />

                  <p className="placeholder">email</p>

                </section>

                {emailFocus && email && !validEmail ? <p id="emailnote" className="message">Must be a valid email address (youremail@where.com)</p> : null}
                {emailFocus && email && validEmail && emailExist ?
                  <p id="emailnote" className="message">
                    <HiOutlineLightBulb className="icon-login red" />
                    Email already has an account. Please choose a different email <br />
                  </p> : null}

              </section>

              <section className="innerLogin">

                <section className="login-user">
                  <label htmlFor="password">
                    {validPwd ? <span><TiTick className="icon-login" /></span> : null}
                    {validPwd || !pwd ? null : <span><TiTimes className="icon-login red" /></span>}
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
                  <p id="pwdnote" className="message red">
                    <HiOutlineLightBulb className="icon-login" />
                    8 to 24 characters <br />
                    Must include uppercase and lowercase letters, a number and a special character: ! @ # $ %<br />
                  </p> : null}

              </section>

              <section className="innerLogin">
                <section className="login-user">
                  <label htmlFor="confirm_pwd">
                    {validMatch && matchPwd ? <span><TiTick className="icon-login" /></span> : null}
                    {validMatch || !matchPwd ? null : <span><TiTimes className="icon-login red" /></span>}
                  </label>

                  <input type={showConfirm ? "text" : "password"}
                    id="confirm_pwd"
                    onChange={(e) => setMatchPwd(e.target.value)}
                    onFocus={() => setMatchFocus(true)}
                    onBlur={() => setMatchFocus(false)} className="log-input" />


                  <p className="placeholder">confirm</p>
                  <span className="showPwd" onClick={handleConfirmClick}>{showConfirm ? <AiOutlineEye className="icon-login" /> : <AiOutlineEyeInvisible className="icon-login" />}</span>
                </section>

                {matchFocus && !validMatch ? <p className="message redText" id="confirmnote">Must match the first password</p> : null}
              </section>

              <button className="button-login" disabled={!validName || !validPwd || !validMatch ? true : false}>Register</button>
            </form>

            <section className="allready-register">
              <p className="allreadyText">Already registered?</p>
              <NavLink className="loginNavLink hover-underline-animation" to='/login'>Login</NavLink>
            </section>
          </section>

        </motion.section >
      }
    </motion.section >
  )

}