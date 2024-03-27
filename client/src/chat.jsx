import './Chat.css';
import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

// Sample profile pictures for online users
import profilePic1 from './kashik.jpg';
import profilePic2 from './kashik.jpg';
import profilePic3 from './kashik.jpg';

function ChatPage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [messages, setMessages] = useState([]);
  const [currCon,setcurrCon] = useState(null);
  const [convo,setConvo]=useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const navigate = useNavigate();
  const [users, setUsers] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State to manage the visibility of the popup


  useEffect( () => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3000/profile', {
          headers: { Authorization: token }
        });
        const res = await axios.get(`http://localhost:3000/api/getuser/${response.data.userId}`);
        setUser(prevUser => {
          return  res.data;
        });
        const allusers = await axios.get(`http://localhost:3000/api/users`);
        setUsers(prevUser => {
          return  allusers.data;
        });

        setLoading(false)
         // Set loading to false after data retrieval
      } catch (error) {
        console.error(error.response.data.message);
        localStorage.removeItem('token'); // Remove invalid token from localStorage
        navigate('/login'); // Redirect to login page
      }
    };
    
          

    fetchData()
    console.log(user);
  }, [navigate],);


  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        conversationId:currCon.conversationId , 
        senderId:user.userId,
        message:inputMessage
      };
      axios.post(`http://localhost:3000/api/message`, newMessage)
      console.log(newMessage);
      setInputMessage('');
    }
  };

 
  
  useEffect( () =>{
    const fetchConversations = async (userId) => {
      try {
        // Make GET request to the server
        const response = await axios.get(`http://localhost:3000/api/conversation/${userId}`);
        console.log('Conversations:', response.data);
        // Update the UI or perform other actions with the data
        return await response.data; // Return the data if needed
      } catch (error) {
        // Handle error
        console.error('Error fetching conversations:', error);
        // Handle error UI or other actions
        throw error; // Re-throw the error if needed
      }
    };
    if(user){
      
      fetchConversations(user.userId)
      .then(data => {
        setConvo(data);
      })
      .catch(error => {

        console.error(
          error
        );
        // Handle error if needed
      });
}  },[user])



const handleClick = async (usr) => {
  try {
    // Update current conversation
    let convoId = usr.conversation;
    if(!usr.conversation){
      let res = await axios.get(`http://localhost:3000/api/conversation/${usr.userId}/${user.userId}`);
       convoId=res.data.conversationId;
    }
    
  const newCurrCon = { conversationId: convoId, name: usr.user.name, profile: usr.user.profile };
  setcurrCon(newCurrCon);
    // Fetch messages related to the selected conversation
    const response = await axios.get(`http://localhost:3000/api/message/${newCurrCon.conversationId}`);
    
    // Check if response.data exists
    if (response.data) {
      const updatedMessages = response.data.map(message => ({
        ...message,
        sender: message.user.name === usr.user.name ? 'user' : 'other'
      }));
      setMessages(updatedMessages);
      
    } else {
      console.error('Error: Response data is undefined');
    }
  } catch (error) {
    console.error('Error fetching user data:', error);
  }
};

useEffect(() => {
  // Filter users based on search query
  if (users) {
    const filtered = users.filter((usr) =>
      usr.user.name.toLowerCase().includes(searchQuery.toLowerCase()) && usr.userId !== user.userId
    );
    setFilteredUsers(filtered);
  }
}, [searchQuery, users, user]);

const handleSearchInputChange = (e) => {
  setSearchQuery(e.target.value);
  if (e.target.value.trim() !== '') {
    setShowPopup(true);
  } else {
    setShowPopup(false);
  }
};

// Function to handle selecting a user from the popup
const handleUserSelection = (usr) => {
  handleClick(usr);
  setShowPopup(false); // Close the popup after selecting a user
};

  if (loading) {
    
    return <div>Loading...</div>;
  }
  return (
    <div className="chat-page">
      {/* Online Users Section */
      
      }
      
      <div className="online-users">
      <input
        type="text"
        className="search-input"
        placeholder="Search users..."
        value={searchQuery}
        onChange={handleSearchInputChange} // Handle input change for search
      />
      {showPopup && ( // Render the popup only if showPopup is true
        <div className="popup">
          <ul>
            {/* Render filtered users */}
            {filteredUsers.map((usr, index) => (
              <li key={index} onClick={() => handleUserSelection(usr)}> {/* Update onClick handler */}
                <img src={usr.user.profile} alt="Profile" className="profile-pic" />
                {usr.user.name}
              </li>
            ))}
          </ul>
        </div>
      )}
        <div className="spacer">
        <h2>Online Users</h2>
        </div>
        
        <ul>
          {convo.map((usr, index) => (
          
            <li key={index} onClick={() => handleClick(usr)}>
              <img src={usr.user.profile} alt="Profile" className="profile-pic" />
              {/* <span className={`online-indicator ${user.online ? 'online' : 'offline'}`}></span> */}
              {usr.user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="chat-container">
  <div className="chat-header">
    {currCon ? (
      <>
        <img src={currCon.profile} alt="Profile" className="profile-pic" />
        <span className="chatting-with">{currCon.name}</span>
      </>
    ) : (
      <span>No conversation selected</span>
    )}
  </div>
  {currCon && (
    <>
      <div className="message-list">
        {/* Display messages here */}
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.sender}`}>
            <div className="message-content">{message.message}</div>
            <div className="message-timestamp">{message.timestamp}</div>
          </div>
        ))}
      </div>
      <div className="message-input">
        {/* Input field for typing message */}
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
        />
        {/* Button to send message */}
        <button onClick={sendMessage}>Send</button>
        {/* Input for attaching files */}
        <input type="file" accept="image/*"  />
      </div>
    </>
  )}
</div>

    </div>
  );
}

export default ChatPage;
