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
    .then((data)=>data.json())
    .then((a)=>setEmployee(a))
    console.log(employee)
  }
  useEffect(getEmployee,[])
  const deleteEmployee = (id) => {
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
      {employee.map(({id,fullname,mobile,email,img,jobtype,dob,location})=>(
        <tr>
        <td>{fullname}</td>
        <td>{email}</td>
        <td>{mobile}</td>
        <td>{dob}</td>
        <td>{jobtype}</td>
        <td> <button  
        className="editbutton"
                      onClick={()=>{
                        console.log(id)
                        history.push(`employee/edit/${id}`)
                      }}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => deleteEmployee(id)}
                      className="deletebutton "
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
