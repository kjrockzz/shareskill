import { useState } from "react";
import {Link} from "react-router-dom";
function signup(){
    const [name,setName] = useState()
    const [email,setEmail] = useState()
    const [pass,setPass] = useState()
    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25">
        <h2>Register</h2>
        <form>
        <div className="mb-3">
            <label htmlFor="email">
                <strong>Name</strong>
            </label>
            <input type="text"
                placeholder="Enter Name" 
                autoComplete="off"
                name="email"
                className="form-control rounded-0"/>   
                onChange=()
        </div>
        <div className="mb-3">
            <label htmlFor="email">
                <strong>Email</strong>
            </label>
            <input type="text"
                placeholder="Enter Email" 
                autoComplete="off"
                name="email"
                className="form-control rounded-0"/>   
        </div>
        <div className="mb-3">
            <label htmlFor="email">
                <strong>Password</strong>
            </label>
            <input type="password"
                placeholder="Enter password" 
                autoComplete="off"
                name="password"
                className="form-control rounded-0"/>   
        </div>
        <div>
        <button type="sumit" className="btn btn-success w-100 rounded-0">
            Register
        </button>
        </div>
        </form>
        <p>Already have a Account</p>
        <Link to = "/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
            Login
        </Link >
       
        
        </div>
        </div>
        
    );
}

export default signup