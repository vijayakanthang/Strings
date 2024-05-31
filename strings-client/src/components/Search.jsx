import React from 'react'
import { toast,ToastContainer } from "react-toastify";
import Header from './Header';



const Search = () => {
    const handleToast= ()=>{
        toast.success("This is a success message");

    }
  
  return (
    <div>  
      <Header/> 
    <button onClick={handleToast}>dgfhvb</button>
    </div>
  )
}

export default Search
