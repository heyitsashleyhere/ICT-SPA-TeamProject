import React from 'react';
import ReactDOM from 'react-dom';
// App Component:
import App from './components/App'
// Router Component:
import { BrowserRouter } from 'react-router-dom';
// Contexts:
import UserContextProvider from './components/context/UserContext';
import LoginRegisterContextProvider from './components/context/LoginRegisterContext'
import PostContextProvider from './components/context/PostContext';
import DashboardContextProvider from './components/context/DashboardContext'

// Styles:
import './components/App.scss'
// json file for setting user themes
import * as themes from './theme/schema.json';

// function to set and get localStorage
import { setToLS } from './utils/storage';

const ProjectIndex = () => {
  setToLS('all-themes', themes.default);
  return (
    <App />
  )
}


ReactDOM.render(
<BrowserRouter>
 <UserContextProvider>
  <PostContextProvider>
    <LoginRegisterContextProvider>
      <DashboardContextProvider> 
        <PostContextProvider>
           <ProjectIndex />
        </PostContextProvider>
      </DashboardContextProvider>
    </LoginRegisterContextProvider>
   </PostContextProvider>
  </UserContextProvider>
</BrowserRouter>
  , document.getElementById('root')
);

