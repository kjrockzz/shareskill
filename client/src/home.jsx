import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './HomePage.css';

function HomePage() {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: token }
        });
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

  // Sample data for demonstration purposes
  const feedData = [
    {
      user: {
        name: 'John Doe',
        dp: 'url_to_user_dp.jpg',
      },
      post: {
        content: 'Working on an exciting project!',
        project: 'Awesome Project',
        difficulty: '3 stars',
        languages: ['JavaScript', 'React'],
        teamSize: 5,
      },
    },
    {
      user: {
        name: 'John Doe',
        dp: 'url_to_user_dp.jpg',
      },
      post: {
        content: 'Working on an exciting project!',
        project: 'Awesome Project',
        difficulty: '3 stars',
        languages: ['JavaScript', 'React'],
        teamSize: 5,
      },
    },
    {
      user: {
        name: 'John Doe',
        dp: 'url_to_user_dp.jpg',
      },
      post: {
        content: 'Working on an exciting project!',
        project: 'Awesome Project',
        difficulty: '3 stars',
        languages: ['JavaScript', 'React'],
        teamSize: 5,
      },
    },
    {
      user: {
        name: 'John Doe',
        dp: 'url_to_user_dp.jpg',
      },
      post: {
        content: 'Working on an exciting project!',
        project: 'Awesome Project',
        difficulty: '3 stars',
        languages: ['JavaScript', 'React'],
        teamSize: 5,
      },
    },
    {
      user: {
        name: 'John Doe',
        dp: 'url_to_user_dp.jpg',
      },
      post: {
        content: 'Working on an exciting project!',
        project: 'Awesome Project',
        difficulty: '3 stars',
        languages: ['JavaScript', 'React'],
        teamSize: 5,
      },
    },
    {
      user: {
        name: 'John Doe',
        dp: 'url_to_user_dp.jpg',
      },
      post: {
        content: 'Working on an exciting project!',
        project: 'Awesome Project',
        difficulty: '3 stars',
        languages: ['JavaScript', 'React'],
        teamSize: 5,
      },
    },
    {
      user: {
        name: 'John Doe',
        dp: 'url_to_user_dp.jpg',
      },
      post: {
        content: 'Working on an exciting project!',
        project: 'Awesome Project',
        difficulty: '3 stars',
        languages: ['JavaScript', 'React'],
        teamSize: 5,
      },
    },
    
    {
      user: {
        name: 'Jane Smith',
        dp: 'url_to_another_user_dp.jpg',
      },
      post: {
        content: 'Looking for collaborators!',
        project: 'Cool Project',
        difficulty: '4 stars',
        languages: ['Python', 'Django'],
        teamSize: 3,
      },
      
    },
    // Add more posts as needed
  ];

  return (
    <div className="ui grid">
    <div className="four wide column">
      {/* Left Block */}
      <div className="ui vertical menu">
        <a className="active item">Chat</a>
        <a className="item">Profile</a>
        <a className="item">News</a>
        <a className="item">Settings</a>
        <a className="item" onClick={handleLogout}>Logout</a> {/* Logout hyperlink */}
      </div>
    </div>
      <div className="twelve wide column">
        {/* Main Content */}
        <div className="ui segment">
          <p>Welcome to the Home Page!</p>
          <div className="ui feed">
            {feedData.map((post, index) => (
              <div className="event post" key={index}>
                <div className="label">
                  <img src={post.user.dp} alt={post.user.name} />
                </div>
                <div className="content">
                  <div className="summary">
                    <a className="user">{post.user.name}</a> posted
                    <div className="date">1 hour ago</div>
                  </div>
                  <div className="extra text">
                    <strong>{post.post.content}</strong>
                  </div>
                  <div className="meta">
                    <div className="ui basic label">
                      {post.post.difficulty}
                    </div>
                    <div className="ui basic label">
                      Languages: {post.post.languages.join(', ')}
                    </div>
                    <div className="ui basic label">
                      Team Size: {post.post.teamSize}
                    </div>
                    <div className="ui labeled button">
                      <div className="ui button">
                        <i className="chat icon"></i> Chat
                      </div>
                      <a className="ui basic label">2</a>
                    </div>
                    <div className="ui labeled button">
                      <div className="ui button">
                        <i className="hand point up outline icon"></i> Interested
                      </div>
                      <a className="ui basic label">5</a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

// return (
//   <div className="ui grid">
//     <div className="four wide column">
//       {/* Left Block */}
//       <div className="ui vertical menu">
//         <a className="active item">Chat</a>
//         <a className="item">Profile</a>
//         <a className="item">News</a>
//         <a className="item">Settings</a>
//       </div>
//     </div>
//     <div className="twelve wide column">
//       {/* Main Content */}
//       <div className="ui segment">
//         <p className="welcome-text">Welcome to the Home Page!</p>
//         <div className="ui feed">
//           {feedData.map((post, index) => (
//             <div className="event post" key={index}>
//               <div className="label">
//                 <img src={post.user.dp} alt={post.user.name} />
//               </div>
//               <div className="content">
//                 <div className="summary">
//                   <a className="user">{post.user.name}</a> posted
//                   <div className="date">1 hour ago</div>
//                 </div>
//                 <div className="extra text">
//                   <strong>{post.post.content}</strong>
//                 </div>
//                 <div className="meta">
//                   <div className="ui basic label">
//                     {post.post.difficulty}
//                   </div>
//                   <div className="ui basic label">
//                     Languages: {post.post.languages.join(', ')}
//                   </div>
//                   <div className="ui basic label">
//                     Team Size: {post.post.teamSize}
//                   </div>
//                   <div className="ui labeled button">
//                     <div className="ui button">
//                       <i className="chat icon"></i> Chat
//                     </div>
//                     <a className="ui basic label">2</a>
//                   </div>
//                   <div className="ui labeled button">
//                     <div className="ui button">
//                       <i className="hand point up outline icon"></i> Interested
//                     </div>
//                     <a className="ui basic label">5</a>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   </div>
// );
          }
          


          
export default HomePage;
