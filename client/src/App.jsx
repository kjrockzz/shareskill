import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './signup'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Login from './Login';
import HomePage from "./home"

function App() {
  return(
    <BrowserRouter>
  <Routes>
    <Route path='/register' element={<Signup />} ></Route>
    <Route path='/login' element={<Login />} ></Route>
    <Route path='/home' element={<HomePage />} ></Route>
  </Routes>
  </BrowserRouter> 
  );
  
  
}

export default App;
