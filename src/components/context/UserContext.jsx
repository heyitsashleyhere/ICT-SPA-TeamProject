import React, { useEffect, useState } from "react";

export const UserContext = React.createContext(null);

const fakeUsers = [
  {
    userid: 1,
    username: 'Ashley',
    email: 'ashley@gmail.com',
    joined: '03-03-2022',
    age: 25,
    avatar: `https://robohash.org/Ashley`,
    password: '12345!aA',

  },
  {
    userid: 2,
    username: 'Ivo',
    email: 'ivo@gmail.com',
    joined: '03-03-2022',
    age: 35,
    avatar: `https://robohash.org/Ivo`,
    password: '12345!aB',

  },
  {
    userid: 3,
    username: 'Henrik',
    email: 'henrik@gmail.com',
    joined: '03-03-2022',
    age: 35,
    avatar: `https://robohash.org/Henrik`,
    password: '12345!aC',

  },
  {
    userid: 4,
    username: 'Darren',
    email: 'darren@gmail.com',
    joined: '03-03-2022',
    age: 30,
    avatar: `https://robohash.org/Darren`,
    password: '12345!aD',

  },
  {
    userid: 5,
    username: 'Murad',
    email: 'murad@gmail.com',
    joined: '03-03-2022',
    age: 28,
    avatar: `https://robohash.org/Murad`,
    password: '12345!aE',

  }
]

const localUsers = localStorage.getItem("users")
const localUsersObj = localUsers ? JSON.parse(localUsers) : fakeUsers;
// Keep user signed in
const localCurrentUser = localStorage.getItem("currentUser");
const localCurrentUserObj = localCurrentUser !== null ? JSON.parse(localCurrentUser) : null;

function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(localCurrentUserObj);
  const [userName, setUserName] = useState('');
  const [pwd, setPwd] = useState('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState(localUsersObj)



  useEffect(() => {
    localStorage.setItem("currentUser", JSON.stringify(currentUser));
  }, [currentUser])

  const userContextValue = {
    currentUser, setCurrentUser,
    userName, setUserName,
    pwd, setPwd,
    email, setEmail,
    users, setUsers,
  }

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  )
}

export default UserContextProvider