import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Test() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [selectedSkills, setSelectedSkills] = useState([]);
    const [skills, setSkills] = useState([]);
    const [isNameUnique, setIsNameUnique] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch skills from backend when component mounts
        axios.get('http://localhost:3000/getSkills')
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
        // Rest of your form submission logic
    };

    const handleCheckUniqueName = () => {
        // Check uniqueness logic
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                    {/* Other form inputs */}
                    <div className="mb-3">
                        <label htmlFor="skills"><strong>Skills</strong></label>
                        {skills.map(skill => (
                            <div key={skill}>
                                <input
                                     type="checkbox"
                                     id={skill}
                                     value={skill}
                                     checked={selectedSkills.includes(skill)}
                                    onChange={(e) => {
                                        const skillName = e.target.value;
                                        setSelectedSkills(prevSkills => {
                                            if (prevSkills.includes(skillName)) {
                                                return prevSkills.filter(name => name !== skillName);
                                            } else {
                                                return [...prevSkills, skillName];
                                            }
                                        });
                                    }}
                                />
                                <label htmlFor={skill}>{skill}</label>
                            </div>
                        ))}
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

export default Test;
