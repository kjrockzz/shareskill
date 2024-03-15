import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import Select from 'react-select'; // Import react-select

import backgroundImage from './ss2.jpg';

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [profilePicture, setProfilePicture] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [loading, setLoading] = useState(false);

  const skillOptions = [
    { value: 'JavaScript', label: 'JavaScript' },
    { value: 'Python', label: 'Python' },
    { value: 'Java', label: 'Java' },
    { value: 'C++', label: 'C++' },
    // Add more skills as needed
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Create FormData to handle file upload
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("pass", pass);
    formData.append("profilePicture", profilePicture);
    formData.append("skills", selectedSkills.map(skill => skill.value).join(',')); // Join selected skills into a comma-separated string

    axios.post("", formData)
      .then(result => {
        console.log(result);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div className="d-flex vh-100">
      <div className="flex-grow-1 p-3" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <h2>About Skill Share</h2>
        <p1>This website helps you connect with people with whom you can collaboratively work on a project of your own choice. Here you'll find people from all around the world.</p1>
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
              onChange={(e) => {
                setName(e.target.value);
              }}
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
              onChange={(e) => setProfilePicture(e.target.files[0])}
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
              options={skillOptions}
              value={selectedSkills}
              onChange={(selected) => setSelectedSkills(selected)}
            />
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
