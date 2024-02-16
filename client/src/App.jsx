import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Signup from './signup'
import {BrowserRouter, Routes , Route} from "react-router-dom"
import Login from './Login';
import Home from './Home';
import Admin from './admin/admin';
import Test from './admin/test';

function App() {
  return(
    <BrowserRouter>
  <Routes>
    <Route path='/register' element={<Signup />} ></Route>
    <Route path='/login' element={<Login />} ></Route>
    <Route path='/home' element={<Home />} ></Route>
    <Route path='/admin' element={<Admin />} ></Route>
    <Route path='/test' element={<Test />} ></Route>
  </Routes>
  </BrowserRouter> 
  );
  
  
}

export default App;
