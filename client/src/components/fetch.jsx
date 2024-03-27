
const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3000/profile', {
        headers: { Authorization: token }
      });

      setUser(prevUser => {
        console.log(response.data); // Log inside setUser callback
        return response.data;
      });
      setLoading(false); // Set loading to false after data retrieval
    } catch (error) {
      console.error(error.response.data.message);
      localStorage.removeItem('token'); // Remove invalid token from localStorage
      navigate('/login'); // Redirect to login page
    }
  };

  export default fetchData