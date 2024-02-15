import React from 'react';

function HomePage() {
  return (
    <div>
      <div className="ui pointing menu">
        
        <a className="active item">
          Home
        </a>
        <a className="item">
          Messages
        </a>
        <a className="item">
          Friends
        </a>
        <div className="right menu">
          <div className="item">
            <div className="ui transparent icon input">
              <input type="text" placeholder="Search..." />
              <i className="search link icon"></i>
            </div>
          </div>
        </div>
      </div>
      <div className="ui segment">
        <p>Welcome to the Home Page!</p>
        {/* Add your home page content here */}
      </div>
    </div>
  );
}

export default HomePage;
