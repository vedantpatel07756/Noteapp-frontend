import profile from './profile.jpg';
import { Link } from 'react-router-dom';
import {useState,useEffect} from 'react';
 
 function Navbar(props) {

    // Set a default value for name in the useState hook
    const [name, setName] = useState(props.name || "User");

    // Use useEffect to update the name when props.name changes
    useEffect(() => {
      // Update name only if props.name is truthy
      if (props.name) {
        setName(props.name);
      }
    }, [props.name]);

    return (
        <div className="nav m-0 p-2 px-10 bg-white flex justify-between drop-shadow-lg ">
            <div className="Nav_L flex justify-end space-x-4 ">
                <img src={props.pic} alt="" width="35" height="35" className="rounded-full"/>
                <span className="font-semibold text-slate-600 pt-1">Hello,{name}!</span>
            </div>
            <div className="Nav_R flex justify-end space-x-4">
                
                <i class="fa-regular fa-bell text-xl pt-1 "></i>
                <Link to="/"><button className='pt-1' onClick={()=>{setName("User")}} style={{display:name=="User"?'none':'block'}}> Logout </button></Link>
            </div>
          
        </div>
    );
};


export default Navbar;