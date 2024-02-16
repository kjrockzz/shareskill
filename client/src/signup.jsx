// import { useState } from "react";
// import {Link} from "react-router-dom";
// import axios from 'axios'
// import {useNavigate} from "react-router-dom"
// function signup(){
//     const [name,setName] = useState()
//     const [email,setEmail] = useState()
//     const [pass,setPass] = useState()
//     const navigate = useNavigate()
//     const handleSubmit=(e)=> {
//         e.preventDefault()
//         axios.post('http://localhost:3000/register',{name,email,pass},)
//         .then(result => {
//             console.log(result)
//             navigate('/login')

//         })
//         .catch(err => console.log(err))
//     }

//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//         <div className="bg-white p-3 rounded w-25">
//         <h2>Register</h2>
//         <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//             <label htmlFor="email">
//                 <strong>Name</strong>
//             </label>
//             <input type="text"
//                 placeholder="Enter Name" 
//                 autoComplete="off"
//                 name="email"
//                 className="form-control rounded-0"
//                 onChange={(e)=>{setName(e.target.value)}}
//                 />   
                
                
//         </div>
//         <div className="mb-3">
//             <label htmlFor="email">
//                 <strong>Email</strong>
//             </label>
//             <input type="text"
//                 placeholder="Enter Email" 
//                 autoComplete="off"
//                 name="email"
//                 className="form-control rounded-0"
//                 onChange={(e)=>{setEmail(e.target.value)}}
//                 />   
//         </div>
//         <div className="mb-3">
//             <label htmlFor="email">
//                 <strong>Password</strong>
//             </label>
//             <input type="password"
//                 placeholder="Enter password" 
//                 autoComplete="off"
//                 name="password"
//                 className="form-control rounded-0"
//                 onChange={(e)=>{setPass(e.target.value)}}
//                 />   
//         </div>
//         <div>
//         <button type="submit" className="btn btn-success w-100 rounded-0">
//             Register
//         </button>
//         </div>
//         </form>
//         <p>Already have a Account</p>
//         <Link to = "/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
//             Login
//         </Link >
       
        
//         </div>
//         </div>
        
//     );
// }

// export default signup


// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import { useNavigate } from "react-router-dom";

// function Signup() {
//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [pass, setPass] = useState('');
//     const [isNameUnique, setIsNameUnique] = useState(true); // State to track uniqueness
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Check if name is unique before submitting
//         if (!isNameUnique) {
//             alert('Username is not unique');
//             return;
//         }
//         axios.post('http://localhost:3000/register', { name, email, pass })
//             .then(result => {
//                 console.log(result);
//                 navigate('/login');
//             })
//             .catch(err => console.log(err));
//     };

//     // Function to handle checking uniqueness
//     const handleCheckUniqueName = () => {
//         axios.post('http://localhost:3000/checkUniqueName', { name: name })
//             .then(response => {
//                 setIsNameUnique(response.data.isUnique);
//             })
//             .catch(error => {
//                 console.log(error);
//                 // Handle error
//             });
//     };

//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>Register</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="name"><strong>Name</strong></label>
//                         <input
//                             type="text"
//                             placeholder="Enter Name"
//                             autoComplete="off"
//                             name="name"
//                             className="form-control rounded-0"
//                             value={name}
//                             onChange={(e) => {
//                                 setName(e.target.value);
//                                 setIsNameUnique(true); // Reset uniqueness status when name changes
//                             }}
//                             onBlur={handleCheckUniqueName} // Check uniqueness when focus leaves the input
//                         />
                        
//                         {!isNameUnique && <p className="text-danger">Username is not unique</p>}
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="email"><strong>Email</strong></label>
//                         <input
//                             type="text"
//                             placeholder="Enter Email"
//                             autoComplete="off"
//                             name="email"
//                             className="form-control rounded-0"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="password"><strong>Password</strong></label>
//                         <input
//                             type="password"
//                             placeholder="Enter password"
//                             autoComplete="off"
//                             name="password"
//                             className="form-control rounded-0"
//                             value={pass}
//                             onChange={(e) => setPass(e.target.value)}
//                         />
//                     </div>
//                     <div>
//                         <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
//                     </div>
//                 </form>
//                 <p>Already have an account?</p>
//                 <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
//             </div>
//         </div>
//     );
// }

// export default Signup;


import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]); // State for selected skills array
    const [skills, setSkills] = useState([]); // State for skills fetched from database
    const [bio, setBio] = useState('');
    const [image, setImage] = useState(null);
    const [base64, setbase64] = useState('');
    const [isNameUnique, setIsNameUnique] = useState(true); // State to track uniqueness
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch skills from backend when component mounts
        axios.get('http://localhost:3000/api/getSkills')
            .then(response => {
                
                const s =response.data.skills;
                const skl=[]
                for (const [key, value] of Object.entries(s)){
                    skl.push(value["skill"])
                }
                setSkills(skl);
                console.log(skills);
            })
            .catch(error => {
                console.error(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Check if name is unique before submitting
        if (!isNameUnique) {
            alert('Username is not unique');
            return;
        }
        
        console.log(image);
        axios.post('http://localhost:3000/api/register', {name,pass,email,skills:JSON.stringify(selectedSkills),bio,image: base64})
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    const handleCheckUniqueName = () => {
        axios.post('http://localhost:3000/api/checkUniqueName', { name: name })
            .then(response => {
                setIsNameUnique(response.data.isUnique);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const convertToBase64 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          const base64String = reader.result;
            setbase64(base64String);
          // Here you can send the base64String to your backend to store in MongoDB
        //   console.log(base64String);
        };
        reader.onerror = (error) => {
          console.error('Error converting to base64:', error);
        };
      };
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImage(file);
        convertToBase64(file);
    };

    const handleSkillChange = (e) => {
        const skill = e.target.value;
        if (e.target.checked) {
            setSelectedSkills([...selectedSkills, skill]);
        } else {
            setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name"><strong>Name</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-0"
                            value={name}
                            onChange={(e) => {
                                setName(e.target.value);
                                setIsNameUnique(true); // Reset uniqueness status when name changes
                            }}
                            onBlur={handleCheckUniqueName}
                        />
                        {!isNameUnique && <p className="text-danger">Username is not unique</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input
                            type="text"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <input
                            type="password"
                            placeholder="Enter password"
                            autoComplete="off"
                            name="password"
                            className="form-control rounded-0"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label><strong>Skills</strong></label>
                        <br />
                        {skills.map(skill => (
                            <div key={skill}>
                                <input
                                    type="checkbox"
                                    id={skill}
                                    value={skill}
                                    checked={selectedSkills.includes(skill)}
                                    onChange={handleSkillChange}
                                />
                                <label htmlFor={skill}> {skill}</label>
                                <br />
                            </div>
                        ))}
    
                    </div>
                    <div className="mb-3">
                        <label htmlFor="bio"><strong>Bio</strong></label>
                        <textarea
                            placeholder="Enter Bio"
                            className="form-control rounded-0"
                            rows="4"
                            value={bio}
                            onChange={(e) => setBio(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="image"><strong>Image</strong></label>
                        <input
                            type="file"
                            className="form-control rounded-0"
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        {image && (
                        <div>
                        <h3>Preview:</h3>
                        <img src={URL.createObjectURL(image)} alt="Preview" width="200" />
                        </div>)}
                    </div>
                    <div>
                        <button type="submit" className="btn btn-success w-100 rounded-0">Register</button>
                    </div>
                </form>
                <p>Already have an account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link>
            </div>
        </div>
    );
}

export default Signup;

