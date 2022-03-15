import React, { useState } from 'react';
export const DashboardContext = React.createContext();



const DashboardContextProvider = ({ children }) => {
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);


  const handleDashboard = () => {
    setIsDashboardOpen(!isDashboardOpen)
  }



  return (
    <DashboardContext.Provider value={{
      isDashboardOpen,
      handleDashboard
    }} >
      {children}
    </DashboardContext.Provider>
  )
}

export default DashboardContextProvider
