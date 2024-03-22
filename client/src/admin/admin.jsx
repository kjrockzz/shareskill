import React from "react";
import { useState } from "react";
import {Link} from "react-router-dom";
import axios from 'axios'
import {useNavigate} from "react-router-dom"
function Admin(){
    const [skill,setSkill] = useState()
    
    const handleSubmit=(e)=> {
        e.preventDefault()
        axios.post('http://localhost:3000/api/skill',{skill},)
        .then(result => {
            console.log(result)
            
                console.log("skill added successfully");
            
           

        })
        .catch(err => console.log(err))
    }
    return(
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
        <div className="bg-white p-3 rounded w-25" >
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
            
        <div className="mb-3" >
            <label htmlFor="email">
                <strong>Skill</strong>
            </label>
            <input type="text"
                placeholder="Enter Email" 
                autoComplete="off"
                name="Skill"
                className="form-control rounded-0"
                onChange={(e)=>{setSkill(e.target.value)}}
                />   
        </div>
        
        <div>
        <button type="sumit" className="btn btn-success w-100 rounded-0">
            Register
        </button>
        </div>
        </form>
        </div>
        </div>
    );
}

function chg() {
    document.getElementById("asd").style.color ="red"
}


export default Admin;