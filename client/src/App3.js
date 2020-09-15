import React from "react";
import Application from "./Pages/Application";
import UserProvider from "./Components/UserProvider";

function App3() {
  
  return (
    <UserProvider>
      <Application />
    </UserProvider>
  );
}

export default App3;