import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Register(params) {
    const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');


  const handleSignUp = async (e) => {
    e.preventDefault();
    // Add your registration logic here
    try {
        const response = await fetch('https://noteappbackend-mma5.onrender.com/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, password }),
        });
        // .then(response => response.json()).then(data=>{
        //       console.log(data.error);
        //       err=data.error?"User Already Exit":""
        // });
  
        if (response.ok) {
          console.log('Registration successful');
          const redirectURL = `http://localhost:3000/login`;
    
          // Redirect to the new URL
          window.location.href = redirectURL;
        } else {
          const data = await response.json();
          setError(data.error || 'User already exists');
        }
      } catch (error) {
        console.error('Error:', error);
        setError('An error occurred during registration');
      }
    console.log('Signing up with:', { email, password });
  };
    return(
        <>
           <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-8 w-2/4 shadow-md rounded" onSubmit={handleSignUp}>
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
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
          Sign Up
        </button>

        <Link to="/login">
        <button  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded "> Sign In </button>
        </Link>
        </div>
      </form>
    </div>
        </>
    );
};
