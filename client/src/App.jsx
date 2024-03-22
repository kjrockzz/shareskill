import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './signup'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Login from './Login';
import HomePage from "./home"
import Chat from "./chat"
import Profilepage from "./profile"
import Admin from './admin/admin';
import Test from './admin/test';

function App() {
  return(
    <BrowserRouter>
  <Routes>
    <Route path='/register' element={<Signup />} ></Route>
    <Route path='/login' element={<Login />} ></Route>
    <Route path='/home' element={<HomePage />} ></Route>
    <Route path= '/homefeed' element={<homefeed />} ></Route>
    <Route path= '/chat' element={<Chat />} ></Route>
    <Route path= '/profile' element={<Profilepage />} ></Route>
    <Route path='/test' element={<Test />} ></Route>
    <Route path='/admin' element={<Admin />} ></Route>

  </Routes>
  </BrowserRouter> 
  );
  
  
}

export default App;
