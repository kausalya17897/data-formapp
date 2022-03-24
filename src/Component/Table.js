import React from 'react'
import './Table.css';
import{useEffect,useState} from 'react';
import { useHistory } from 'react-router-dom';
import { Link } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
export default function Table() {
  const [employee,setEmployee]=useState([]);
  const history=useHistory()
  const getEmployee=()=>{
    fetch(`https://62368e85163bf7c4746552f6.mockapi.io/employee`)
  // fetch(`https://paripornaform.herokuapp.com/employee`)
    .then((data)=>data.json())
    .then((a)=>setEmployee(a.data))
    console.log("employee",employee)
  }
  useEffect(getEmployee,[])
  const deleteEmployee = (id) => {
    //fetch(`https://paripornaform.herokuapp.com/employee/${id}`,{
   fetch(`https://62368e85163bf7c4746552f6.mockapi.io/employee/${id}`,{
      method:"DELETE",
  }).then(()=>getEmployee());
    };

  return (
    <div className='table-container'>
<table>
    <thead>
        <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Mobile</th>
        <th>DOB</th>
        <th>Job Type</th>
        <th>Action</th>
        </tr>
    </thead>
    <tbody>
      {employee.map(({_id,fullname,mobile,email,jobtype,dob,location})=>(
        
        <tr>
        <td>{fullname}</td>
        <td>{email}</td>
        <td>{mobile}</td>
        <td>{dob}</td>
        <td>{jobtype}</td>
        <td> <button  
        className="editbutton"
                      onClick={()=>{
                        console.log(_id)
                        history.push(`employee/edit/${_id}`)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEmployee(_id)}
                      className="deletebutton"
                      style={{marginLeft:"20px"}}
                    >
                      Delete
                    </button></td>
        </tr>
      ))
}
    </tbody>
</table>

    </div>
  )
}
