// Hooks:
import { useContext, useEffect, useState } from "react";
// Contexts:
import { LoginRegisterContext } from "../context/LoginRegisterContext";
import { UserContext } from "../context/UserContext";
// Components:
import ThemeSelector from '../../theme/ThemeSelector';
import useTheme from '../../theme/useTheme.jsx';
// Styling:
import { motion } from 'framer-motion';
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { TiTick, TiTimes } from "react-icons/ti";
import { HiOutlineLightBulb } from "react-icons/hi";
import './userSettings.scss'


export default function UserSettings() {

  const content = {
    animate: {
      transition: { staggerChildren: 0.2 },
    },
  }
  const userInfo = {
    initial: {
      y: -20, opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      }
    }
  }

  const userTheme = {
    initial: {
      y: -20,
      opacity: 0
    },
    animate: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 1,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    },
  };


  // =============================

  const { theme } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  const [pwdExist, setPwdExist] = useState(false)
  const [crntPwd, setCrntPwd] = useState()
  const [newPwd, setNewPwd] = useState(null)
  const [matchNewPwd, setMatchNewPwd] = useState(false)

  const [pwdExistFocus, setPwdExistFocus] = useState(false)

  // IMPORT PROPS ==========================
  const {
    PWD_REGEX,
    validPwd, setValidPwd,
    pwdFocus, setPwdFocus,
    validMatch, setValidMatch,
    matchFocus, setMatchFocus,
    show, setShow,
    showConfirm, setShowConfirm
  } = useContext(LoginRegisterContext);
  const {
    currentUser, setCurrentUser,
    // pwd, setPwd,
    users, setUsers
  } = useContext(UserContext);

  // CHECK PASSWORD =========================
  useEffect(() => {
    setValidPwd(PWD_REGEX.test(newPwd));
    const match = newPwd === matchNewPwd; //Boolean
    setValidMatch(match);
  }, [newPwd, matchNewPwd])

  console.log('currentUser :>> ', currentUser);
  const [usersArray, setUsersArray] = useState(users)

  const handleSubmit = (e) => {
    e.preventDefault();
    const updateUser = usersArray.filter(user => user.userid !== currentUser.userid)
    setCurrentUser({ ...currentUser, password: newPwd })
    updateUser.push(currentUser)
    setUsers(updateUser)
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

  // const handleShowPwd = (e) => {
  //   e.preventDefault();
  //   setShowPwd(!showPwd)
  // }

  useEffect(() => {
    if (crntPwd === currentUser.password) {
      setPwdExist(true)
    } else {
      setPwdExist(false)
    }
  }, [crntPwd, pwdExist, currentUser.password]);

  return (
    <section className="Settings">

      <motion.div variants={content} animate="animate" initial="initial" className="container">
        <motion.section variants={userInfo} className="change-pass">

          <header>
            <h3>Change your password</h3>
          </header>
          <form onSubmit={handleSubmit} className="update-form">
            <section className="settings-form-section">
              <section className="update-user-pass">

                <label htmlFor="current-pwd">
                  {pwdExist && pwdExistFocus ? <span><TiTick className="icon-login" /></span> : null}
                  {!pwdExist && pwdExistFocus ? <span><TiTimes className="icon-login red" /></span> : null}
                </label>
                <input type="text"
                  id="current-pwd"
                  autoComplete="off"
                  onChange={(e) => setCrntPwd(e.target.value)}
                  required
                  onFocus={() => setPwdExistFocus(true)}
                  onBlur={() => setPwdExistFocus(false)}
                />
                <p className="placeholder">Password</p>

              </section>
              {pwdExistFocus && !pwdExist ?
                <p id="userExistnote" className="message icon-login red">
                  <HiOutlineLightBulb />
                  The password you entered was incorrect.
                </p> : null}
            </section>

            <section className="settings-form-section">
              <section className="update-user-pass">
                <label htmlFor="password">
                  {validPwd && pwdFocus ? <span><TiTick className="icon-login" /></span> : null}
                  {!validPwd && pwdFocus ? <span><TiTimes className="icon-login red" /></span> : null}
                </label>
                <input type={show ? "text" : "password"}
                  id="password"
                  onChange={(e) => setNewPwd(e.target.value)}
                  required
                  onFocus={() => setPwdFocus(true)}
                  onBlur={() => setPwdFocus(false)} />
                <p className="placeholder">new</p>
                <span className="showPwd" onClick={handleClick}>{show ? <AiOutlineEye className="icon-login" /> : <AiOutlineEyeInvisible className="icon-login" />}</span>

              </section>
              {pwdFocus && !validPwd ?
                <p id="pwdnote" className="message red">
                  <HiOutlineLightBulb className="icon-login" />
                  8 to 24 characters <br />
                  Must include uppercase and lowercase letters, a number and a special character: ! @ # $ %<br />
                </p> : null}
            </section>
            <section className="settings-form-section">
              <section className="update-user-pass">

                <label htmlFor="confirm_pwd">
                  {validMatch && matchFocus ? <span><TiTick className="icon-login" /></span> : null}
                  {!validMatch && matchFocus ? <span><TiTimes className="icon-login red" /></span> : null}
                </label>
                <input type={showConfirm ? "text" : "password"}
                  id="confirm_pwd"
                  onChange={(e) => setMatchNewPwd(e.target.value)}
                  onFocus={() => setMatchFocus(true)}
                  onBlur={() => setMatchFocus(false)} className="log-input" />
                <p className="placeholder">confirm</p>
                <span className="showPwd" onClick={handleConfirmClick}>{showConfirm ? <AiOutlineEye className="icon-login" /> : <AiOutlineEyeInvisible className="icon-login" />}</span>
              </section>
              {matchFocus && !validMatch ? <p className="message redText" id="confirmnote">Must match the first password</p> : null}
            </section>
            <button className="submitButton">update</button>
          </form>
        </motion.section>

        <motion.section variants={userTheme} className="themes">
          <h1 id="header">Select a Theme from below</h1>
          <div id='container' style={{
            fontFamily: selectedTheme.font,
            // position: "relative"
          }}>
            <ThemeSelector setter={setSelectedTheme} />
          </div>
        </motion.section>
      </motion.div>
    </section>
  )
}