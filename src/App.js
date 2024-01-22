import Navbar from './Components/Nav/Navbar';
import './App.css';
import profile from './Components/Nav/profile.jpg';
import List from './Components/Body/List';
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Login from './Components/Auth/login';
import Register from './Components/Auth/register';



function App() {

  const queryParams = new URLSearchParams(window.location.search);
  // Get the value of the 'user_id' parameter
  const user_name = queryParams.get('user_name');
  return (
   <>
   <Router>
      <div className="main  h-screen bg-[#F9F9F9]" > 
      <Navbar name={user_name} pic={profile}/> 
      {/* <List />  */}

      <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/task" element={<List />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
      </Routes>
      
      </div>
    </Router>
   </>
  );
}

export default App;
