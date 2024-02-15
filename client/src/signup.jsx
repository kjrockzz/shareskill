import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import { Dimmer, Loader } from 'semantic-ui-react'; // Import Dimmer and Loader from semantic-ui-react
import 'semantic-ui-css/semantic.min.css'; // Import semantic-ui-css for styling

import backgroundImage from './ss2.jpg'; // Import your image file

function Signup() {
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false); // State to manage loading state

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when form is submitted
    axios.post('', { name, email, pass })
      .then(result => {
        console.log(result);
        setLoading(false); // Set loading to false on successful response
      })
      .catch(err => {
        console.log(err);
        setLoading(false); // Set loading to false on error
      });
  };

  return (
    <div className="d-flex vh-100">
      {/* Background Picture */}
      <div className="flex-grow-1 p-3" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', }}>
        <h2>About Skill Share</h2>
        {<p1>This website helps you connect with people with whom you can collaboratively work on a project of your own choice. Here you'll find people from all around the world.</p1>}
      </div>

      {/* Registration Form on the right */}
      <div className="bg-facebook p-3 rounded w-25"> {/* Set background color to the color of Facebook */}
        <Dimmer active={loading}> {/* Display loading spinner when loading is true */}
          <Loader />
        </Dimmer>
        <h2 className="ui center aligned icon header">
          <i className="circular users icon"></i>
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          {/* ... (rest of the form remains the same) */}
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
