export default function Button({name,selected,color,id,onClic}) {
 
    return(
        <button className="px-3 lg:px-5 text-base font-semibold font-sans text-gray-500 rounded-md p-1 mt-2 lg:mt-0" 
        style={{backgroundColor: selected ? '#8981D8':'white' ,color: selected ? 'white':'grey'}}
        onClick={()=>onClic(id)}>
        {name}
        </button>
    );
};
