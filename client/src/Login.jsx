import React from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import {useNavigate} from "react-router-dom"
function login(){
    const [email,setEmail] = useState()
    const [pass,setPass] = useState()
    const [valid,setvalid] = useState(true)
    const navigate = useNavigate()
    const handleSubmit=async (e)=> {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:3000/api/login', { email, pass });
            console.log(response.data)
            localStorage.setItem('token', response.data.token);
            navigate('/home'); // Redirect to profile page after successful login
          } catch (error) {
            setvalid(false);
            console.error(error.response.data.message);
          }
        // axios.post('http://localhost:3000/api/login',{email,pass},)
        // .then(result => {
        //     console.log(result)
        //     if(result.data ==="success")
        //     {
        //         navigate('/home')
        //     }
        //     else
        //     {   
               
        //         setvalid(false)
        //     }

        // })
        // .catch(err => console.log(err))
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25" >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            
        <div className="mb-3" id='email' >
            <label htmlFor="email">
                <strong>Email</strong>
            </label>
            <input type="text"
                placeholder="Enter Email" 
                autoComplete="off"
                name="email"
                className="form-control rounded-0"
                onChange={(e)=>{setEmail(e.target.value)}}
                />   
        </div>
        <div className="mb-3" id="pass">
            <label htmlFor="email">
                <strong>Password</strong>
            </label>
            <input type="password"
                placeholder="Enter password" 
                autoComplete="off"
                name="password"
                className="form-control rounded-0"
                onChange={(e)=>{setPass(e.target.value)}}
                /> 
                {!valid && (
                <div  className="text-danger">
                    Wrong Email or password
                   
                </div>)}  
        </div>
        <div>
        <button type="sumit" className="btn btn-success w-100 rounded-0">
            Login
        </button>
        </div>
        </form>
        </div>
        </div>
    );
}




export default login;