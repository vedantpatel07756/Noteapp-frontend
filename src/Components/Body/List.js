import Button from './Button';
import Note from './Note/Note';
import Addnote from './Note/Addnote';
import {useState,useEffect} from 'react';
// import axios from 'axios';



function List(params) {

const [selected,setselect]=useState(1);
const [model,setmodel]=useState(false);
const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchdata();
  }, []);


// Parse the query parameters from the location search string
const queryParams = new URLSearchParams(window.location.search);

// Get the value of the 'user_id' parameter
const user_id = queryParams.get('user_id');
  const fetchdata = async ()=>{
        try{
            

            // const response = await fetch('http://127.0.0.1:5000/tasks');
            const response = await fetch(`https://noteappbackend-mma5.onrender.com/tasks?user_id=${user_id}`);
            const jsonData = await response.json();
            console.log(jsonData);
            setTasks(jsonData);
            
        }catch(err){
            console.log('Errot =>',err);
            <h1>Error = {err}</h1>
        }
  }


const change=(id)=>{
    // console.log(id);
    setselect(id);
}   

const togglemodel=()=>{
    setmodel(!model);
}

const formatDate = (dateString) => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formattedDate = new Date(dateString).toLocaleDateString('en-US', options);
    return formattedDate;
  };

const decideId =(type)=>{
    if(type=="Project"){
        return 2
    }else{
        if(type=="Personal"){
            return 3
        }else{
            return 4
        }
    }
}

    return(
        <div className="">
        <div className="flex flex-col lg:flex-row justify-between px-5 lg:px-20">
            <div className="flex justify-start space-x-4 pt-5">
                <Button id={1} selected={selected===1} onClic={change} name="All" ></Button>
                <Button id={2} selected={selected===2} onClic={change} name="Project" ></Button>
                <Button id={3} selected={selected===3} onClic={change} name="Personal" ></Button>
                <Button id={4} selected={selected===4} onClic={change} name="Bussiness" ></Button>
                {/* <h1>{tasks[1].title}</h1> */}
            </div>

            <div className="flex justify-start w-full lg:w-auto mt-6 lg:mt-0 lg:justify-around">
                <button className="text-blue-700 text-base font-semibold font-sans lg:mt-5" onClick={togglemodel}>
                <i class="fa-solid fa-plus text-blue-700 text-xl font-bold font-sans pr-1"></i>
                    Add New Note
                </button>
            </div>

        </div>

        {/* ADD NOte Model HEre  */}

        <Addnote state={model} set={togglemodel} fetchdata={fetchdata}></Addnote>
        
        <div className="Note mt-10 flex flex-wrap lg:justify-start md:justify-start   sm:justify-center sm:items-center   gap-4 px-5 md:px-10 lg:px-20">
        {Array.isArray(tasks) && tasks.map(task => (
                    <Note
                        key={task.id}
                        task={task}
                        date={formatDate(task.date)}
                        title={task.title}
                        para={task.para}
                        name={task.type}
                        display={selected}
                        id={decideId(task.type)}
                        fetchdata={fetchdata}
                    />
                ))}
            {/* {tasks.map(task=>(
             
                <Note
                    task={task}
                 date={formatDate(task.date)} 
                title={task.title}
                 para={task.para}
                  name={task.type} 
                  display={selected}
                   id={decideid(task.type)}
                   fetchdata={fetchdata}
                     >
                   </Note> 
            ))} */}
           {/* <Note date={formatDate(tasks[0].date)} title={tasks[0].title} para={tasks[0].para} name={tasks[0].type} display={selected} id={3}  ></Note>  */}
           
        </div>

        </div>

        
    );
};

export default List;

