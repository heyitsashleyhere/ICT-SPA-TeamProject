import React, { useState } from "react";

export const LoginRegisterContext = React.createContext(null);

function LoginRegisterContextProvider(props){
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [show, setShow] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const USER_REGEX = /^[a-zA-Z0-9-_]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
    const EMAIL_REGEX = /\S+@\S+\.\S+/;

    const [login, setLogin] = useState(false);

    const LoginRegisterContextValue = { 
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
        showConfirm, setShowConfirm,
        login, setLogin
    }
    return (
        <LoginRegisterContext.Provider value ={LoginRegisterContextValue}>
            {props.children}
        </LoginRegisterContext.Provider>
    )
}

export default LoginRegisterContextProvider