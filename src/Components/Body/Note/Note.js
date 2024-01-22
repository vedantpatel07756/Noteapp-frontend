import { useState } from "react";

export default function Note({date,title,para,name,id,display,task,fetchdata}) {


  // Parse the query parameters from the location search string
const queryParams = new URLSearchParams(window.location.search);

// Get the value of the 'user_id' parameter
const user_id = queryParams.get('user_id');

    const handleDelete = async () => {
        console.log(task);
        try {
            if (!task) {
                console.error('Task prop is undefined');
                return;
              }
           
          const response = await fetch(`http://127.0.0.1:5000/deletenote/${task.id}?user_id=${user_id}`, {
            method: 'DELETE',
          });
    
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
    
          const result = await response.json();
    
          if (result.message === 'Task Deleted') {
            console.log('Task Deleted successfully');
            fetchdata(); // Trigger the parent component to fetch updated data
          }
        } catch (error) {
          console.error('Error deleting task:', error.message);
        }
      };
    return(
        
    <div className=" w-52 h-44 bg-white rounded-md px-5 my-5 flex justify-between"  style={{ display: display === 1 ? "block" : display === id ? "block" : "none" }}>
        <div><span className=" text-xs text-gray-400">{date}</span></div>
        
        <div className="flex justify my-1"> 
            <div className="w-2 h-2 rounded-full  m-2" style={{backgroundColor:name=="Project"?"red":name=="Bussiness"?"blue":"yellow"}}></div>
            <h3 className=" font-semibold" >{title}</h3>
        </div>
       
       <div className="h-20"> <p className="text-gray-400 my-1 font-medium">{para}</p></div>
       
        <div className="flex justify-end"> 
        <button type="button" className=" text-red-600 p-1 text-sm " onClick={handleDelete}><i class="fa-solid fa-trash"></i></button>
       </div>
        </div>
    );
};
