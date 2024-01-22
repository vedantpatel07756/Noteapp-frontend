import {useState} from 'react'
import { Link } from 'react-router-dom';
export default function Login(params) {
    const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [error, setError] = useState('');

  const handleSuccessfulLogin = (user_id,user_name) => {
    // Set the loggedInUser state with the user_id
    setLoggedInUser(user_id);
    console.log(user_id);
    // Construct the URL with the user_id
    const redirectURL = `https://noteappfrontend.onrender.com/task?user_id=${user_id}&user_name=${user_name}`;
    
    // Redirect to the new URL
    window.location.href = redirectURL;
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Add your authentication logic here
    try {
        const response = await fetch('https://noteappbackend-mma5.onrender.com/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email:email, password:password, }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Login successful', data);
    
          const userId = data.user_id;
          const userName = data.user_name;
    
          // Call your handleSuccessfulLogin function with the user_id
          handleSuccessfulLogin(userId, userName);
        } else {
          const data = await response.json();
          setError(data.error || 'Invalid username or password');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred during login');
      }
      };
   

    return(
        <>
    <div className="flex items-center justify-center h-screen ">
      <form className="bg-white p-10  w-2/4 shadow-md rounded" onSubmit={handleSignIn}>
        <h2 className="text-2xl font-bold mb-4">Sign In</h2>
        <span className="text-red-500">{error}</span>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setUsername(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border rounded w-full py-2 px-3"
            required
          />
        </div>
        
        <div className="flex space-x-5">

        
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </button>
        <Link to="/register">
        <button  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "> Sign Up</button>
        </Link>
        </div>
      </form>
    </div>
        </>
    );
};
