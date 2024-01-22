import React, { useState } from 'react';

export default function Addnote({state,set,fetchdata}) {

    const [formData, setFormData] = useState({
        date:'',
        title: '',
        type: '',
        para: ''
      });
    
      const handleChange = (e) => {
        console.log("Handling change");
        setFormData((prevFormData) => ({

          ...prevFormData,
          [e.target.name]: e.target.value
        }));
      };

      const queryParams = new URLSearchParams(window.location.search);

      // Get the value of the 'user_id' parameter
      const user_id = queryParams.get('user_id');

      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
        // Replace with the actual user ID
        console.log(user_id);
          const response = await fetch('https://noteappbackend-mma5.onrender.com/addnote', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
             body: JSON.stringify({
                ...formData,
                user_id: user_id,
            }),
          });
      
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
      
          const result = await response.json();
      
          if (result.message === 'Note Created') {
            console.log('Note Created successfully');
            // You can add additional logic or reset the form here if needed
          }

          // window.location.reload();
          fetchdata();
          set();
        } catch (error) {
          console.error('Error aya:', error.message);
        }

        
      };

    return(
       
        <div className=" w-[100vw] h-[100vh] m-0 p-0 top-0 bottom-0 bg-[#d4d6d644] absolute" style={{display: state ? "block":"none"}} >
                <div className=" w-[60vw] h-[50vh] bg-white fixed top-32 left-60 p-5 rounded-md">
                    <div className="head flex justify-between  text-base font-semibold font-sans text-black-500">
                        <div>ADD NOTE</div>
                        <button onClick={set}><i class="fa-solid fa-x font-bold hover:text-red-600"></i></button>
                    </div>
                    <hr className="mt-2"/>
                    <form  onSubmit={handleSubmit} className="mt-2">
                        <label htmlFor="" className=" font-semibold text-lg mt-2"> Date :</label>  <input type="date" name="date" id="date"  defaultValue={formData.date} onChange={handleChange} required/> 
                        <label htmlFor="" className=" font-semibold text-lg mt-5 ml-5">Type : </label>
                        <select name="type" id="type"  defaultValue={formData.type} onChange={handleChange} required>
                        <option defaultValue="Select">__Select__</option>
                        <option defaultValue="Project">Project</option>
                        <option defaultValue="Personal">Personal</option>
                        <option defaultValue="Bussiness">Bussiness</option>
                        </select> <br />
                        <label htmlFor="" className=" font-semibold text-lg mt-10">Title:</label> <input type="text" name="title" id="title"  placeholder=" Enter Title .."  defaultValue={formData.title} onChange={handleChange}  required/> <br />
                        <label htmlFor="" className=" font-semibold text-lg mt-2">Description:</label><br /><textarea name="para" id="para" cols="60" rows="5" placeholder="Enter Description..." defaultValue={formData.para} onChange={handleChange} required></textarea>
                        <br />
                        <button type="submit" className="px-5 text-base font-semibold font-sans text-white rounded-md p-1 bg-[#8981D8]">ADD</button>
                    </form>
                </div>
             
        </div>
    );
};
 