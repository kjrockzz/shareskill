import { Link } from "react-router-dom";
import axios from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Select from 'react-select'; // Import react-select
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import backgroundImage from './ss2.jpg';

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

var loading = false;
  return (
    <div className="d-flex vh-100">
      <div className="flex-grow-1 p-3" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <h2>About Skill Share</h2>
        <p>This website helps you connect with people with whom you can collaboratively work on a project of your own choice. Here you'll find people from all around the world.</p>
      </div>

      <div className="bg-facebook p-3 rounded w-25">
        <Dimmer active={loading}>
          <Loader />
        </Dimmer>
        <h2 className="ui center aligned icon header">
          <i className="circular users icon"></i>
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Existing form fields */}
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                setIsNameUnique(true);
              }}
              onBlur={handleCheckUniqueName}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              value={email}
              className="form-control rounded-0"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              type="password"
              placeholder="Enter password"
              autoComplete="off"
              name="password"
              className="form-control rounded-0"
              value={pass}
              onChange={(e) => {
                setPass(e.target.value);
              }}
            />
          </div>

          {/* Profile Picture */}
          <div className="mb-3">
            <label htmlFor="profilePicture">
              <strong>Profile Picture</strong>
            </label>
            <input
              type="file"
              accept="image/*"
              name="profilePicture"
              onChange= {handleImageChange}
              className="form-control rounded-0"
            />
          </div>

          {/* Skills Dropdown */}
          <div className="mb-3">
            <label htmlFor="skills">
              <strong>Skills</strong>
            </label>
            <Select
              isMulti
              options={skills.map(item => {
                return { value: item, label: item };
              })}
              value={selectedSkills}
              onChange={(selected)=> {
               var a=selected.map(item => item.value);
                console.log(a);
                setSelectedSkills(a)}}
            />
            {console.log("a",selectedSkills)}
            
          </div>
          

          {/* Submit button */}
          <div>
            <button type="submit" className="ui primary button">
              Register
            </button>
          </div>
        </form>
        <p>Already have an Account</p>
        <Link to="/login" className="btn btn-default border w-50 bg-light rounded-0 text-decoration-none">
          <button type="Login" className="ui green button">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Signup;
