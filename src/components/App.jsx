import React, { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from "framer-motion";


import styled, { ThemeProvider } from "styled-components";
import WebFont from 'webfontloader';
import { GlobalStyles } from '../theme/GlobalStyling';
import useTheme from '../theme/useTheme';
import ThemeSelector from '../theme/ThemeSelector'

// Components =============================================
import RequireLogin from './RequiredLogin.jsx'
// Public routes
import Index from './index.jsx'
import Login from './auth/Login.jsx'
import Register from './auth/Register.jsx'
// Private routes
import UserPlatform from './pages/UserPlatform.jsx'


const Container = styled.div`
  margin: 5px auto 5px auto;
`;

export default function App() {
  const location = useLocation()
  const { theme, themeLoaded, getFonts } = useTheme();
  const [selectedTheme, setSelectedTheme] = useState(theme);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [themeLoaded]);

  useEffect(() => {
    WebFont.load({
      google: {
        families: getFonts()
      }
    });
  });

  return (
    <main className='App'>
      {
        themeLoaded && <ThemeProvider theme={selectedTheme}>
          {/* <GlobalStyles /> */}
          <Container style={{ fontFamily: selectedTheme.font }}>

            {/* <ThemeSelector setter={setSelectedTheme} /> */}
            <AnimatePresence
              exitBeforeEnter
            >
              <Routes location={location} key={location.key}>
                <Route path='/' element={<Index />}>
                  <Route index element={<Login />} />
                  <Route path="/login" element={<Login />} />

                  <Route path=':username/*'
                    element={
                      <RequireLogin redirectTo="/login">
                        <UserPlatform />
                      </RequireLogin>
                    }
                  />
                </Route>
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<p>404: Page not found</p>} />
              </Routes>
            </AnimatePresence>
          </Container>
        </ThemeProvider>

      }
    </main >
  )
};
