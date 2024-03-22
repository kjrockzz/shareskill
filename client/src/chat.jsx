import React, { useState } from 'react';
import './Chat.css';

// Sample profile pictures for online users
import profilePic1 from './kashik.jpg';
import profilePic2 from './kashik.jpg';
import profilePic3 from './kashik.jpg';

function ChatPage() {
  const [messages, setMessages] = useState([
    { content: 'Hi there!', sender: 'user', timestamp: '10:00 AM' },
    { content: 'Hello!', sender: 'other', timestamp: '10:01 AM' },
    { content: 'How are you?', sender: 'user', timestamp: '10:02 AM' },
    { content: 'I am good, thanks!', sender: 'other', timestamp: '10:03 AM' },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [attachedFiles, setAttachedFiles] = useState([]);
  const sampleOnlineUsers = [
    { name: 'Alice', online: true, profilePic: profilePic1 },
    { name: 'Bob', online: false, profilePic: profilePic2 },
    { name: 'Charlie', online: true, profilePic: profilePic3 }
  ];

  // Function to handle sending a message
  const sendMessage = () => {
    if (inputMessage.trim() !== '') {
      const newMessage = {
        content: inputMessage,
        sender: 'user', // Assuming user is sending the message
        timestamp: new Date().toLocaleString(),
      };
      setMessages([...messages, newMessage]);
      setInputMessage('');
    }
  };

  // Function to handle attaching files
  const handleFileAttach = (event) => {
    const files = event.target.files;
    setAttachedFiles([...attachedFiles, ...files]);
  };

  return (
    <div className="chat-page">
      {/* Online Users Section */}
      <div className="online-users">
        <h2>Online Users</h2>
        <ul>
          {sampleOnlineUsers.map((user, index) => (
            <li key={index}>
              <img src={user.profilePic} alt="Profile" className="profile-pic" />
              <span className={`online-indicator ${user.online ? 'online' : 'offline'}`}></span>
              {user.name}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="chat-container">
        <div className="chat-header">
          <img src={profilePic2} alt="Profile" className="profile-pic" />
          <span className="chatting-with">Chatting with: Bob</span>
        </div>
        <div className="message-list">
          {/* Display messages here */}
          {messages.map((message, index) => (
            <div key={index} className={`message ${message.sender}`}>
              <div className="message-content">{message.content}</div>
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
          <input type="file" accept="image/*" onChange={handleFileAttach} />
        </div>
      </div>
    </div>
  );
}

export default ChatPage;
