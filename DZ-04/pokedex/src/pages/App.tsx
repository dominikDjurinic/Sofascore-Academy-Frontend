import '../styles/App.css'
import { Home } from './Home';
import { Collection } from './Collection';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Login';
import { useState } from 'react';
import ThemeContext from '../context/ThemeContext';
import ProfileContext from '../context/ProfileContext';

function App() {
   
  const changeTheme = () => {
    setTheme((previous)=> ({
      theme: previous.theme === "light" ? "dark":"light",
      changeTheme
    }))
    
  }

  const [theme,setTheme] = useState({theme: localStorage.getItem("theme")||"light", changeTheme});  //on reload of page keep theme

  const changeUsername = (newUser:string) => {
    setUsername(()=> ({
      username: newUser,
      changeUsername
    }))
    
  }

  const [username,setUsername] = useState({username: localStorage.getItem("username")||"No user", changeUsername}); ////on reload of page keep username


  return (
    <ThemeContext.Provider value={theme}>
    <ProfileContext.Provider value={username}>
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}/> 
          <Route path="login" element={<Login />}/>
          <Route path="collection" element={<Collection />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </ProfileContext.Provider>
    </ThemeContext.Provider>
  )
}

export default App
