import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Home() {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
          try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3000/profile', {
              headers: { Authorization: token }
            });
            console.log(response.data);
            setUser(response.data);
          } catch (error) {
            console.error(error.response.data.message);
            localStorage.removeItem('token'); // Remove invalid token from localStorage
            navigate('/login'); // Redirect to login page
          }
        };
        fetchData();
      }, [navigate]);


      const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
      };

    return (
        <div>
            <h2>Profile</h2>
            {user && (
                <div>
                    <p>Username: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    );
}

export default Home;
