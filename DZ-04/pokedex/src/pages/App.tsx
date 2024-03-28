import '../styles/App.css'
import { Home } from './Home';
import { Collection } from './Collection';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './Login';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route index element={<Home />}/> 
          <Route path="login" element={<Login />}/>
          <Route path="collection" element={<Collection />}/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
