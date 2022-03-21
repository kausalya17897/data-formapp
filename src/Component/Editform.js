import React from 'react';
import './Form.css';
import { useState,useEffect } from 'react';
import {  Row, Col,Form,Container,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Select,MenuItem ,Button} from '@mui/material';
import {useParams,useHistory} from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export  function Editform() {
    console.log("edit")
    const {id}=useParams();
    const[employee,setEmployee]=useState(null)
    useEffect(() => {
        fetch(`https://62368e85163bf7c4746552f6.mockapi.io/employee/${id}`,{
        method:"GET",
    })
    .then((data)=>data.json())
    .then((a)=>setEmployee(a))
},[id]);
    return employee?<UpdatedEmployee employee={employee}/>:"";
    }
function UpdatedEmployee({employee}){
  const[countrycode,setCountrycode]=useState(employee.countrycode)
  const [jobtype, setJobtype] = useState(employee.jobtype);
  const [location, setLocation] =useState(employee.location);
 const [fullname,setFullname]=useState(employee.fullname);
 const [dob,setDob]=useState(employee.dob);
 const [img,setImg]=useState(employee.img);
 const [email,setEmail]=useState(employee.email)
 const [mobile,setMobile]=useState(employee.mobile);
 
  const history=useHistory();
const editEmployee=()=>{
    
    const updatedEmployee={
        fullname,img,email,mobile,location,jobtype,dob
    };
    fetch(`https://61681515ba841a001727c589.mockapi.io/movie/${employee.id}`,{
        method:"PUT",
        body:JSON.stringify(updatedEmployee),
        headers:{
        "Content-Type":"application/json",
        },
    }).then(()=>history.push("/employee"))
};
  return (
    <div className='Form'>
    
    <Form>
    <fieldset className='fieldset'>
      <legend className="legend">Registration</legend>
      <Container>
  <Row>
    <Col xl={6} className="fullnamecontainer">
      <label for="fullname la">Fullname</label>
      <input className='fullname' 
      type="text"
      value={fullname}
      onChange={(a)=>setFullname(a.target.value)}/>
    
    </Col>
    <Col xl={6} className="img">
      <label for="profilepic la">Profile Pic</label>
      <Card className='imagebox'>
        
        <img  className="image"src={img} 
        alt="profilepic"/>
        
      </Card>
      <input type="file"
      accept='image/*'
      value={img}
      />
    </Col>
  </Row>
  <Row>
    <Col xl={6} className="mobilecontainer input">
      <label for="mobile la">Mobile</label>
      <Select
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={countrycode}
          label="Age *"
          onChange={(event)=>setCountrycode(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={+91}>+91</MenuItem>
          <MenuItem value={+47}>+47</MenuItem>
          <MenuItem value={+35}>+385</MenuItem>
        </Select>
      <input className='Mobile' type="text"
      value={mobile}
      onChange={(a)=>setMobile(a.target.value)}/>
    
    </Col>
    <Col xl={6} className="emailcontainer">
      <label for="email la">Email Id</label>
      <input className='emailinput' type="email"
      value={email}
      onChange={(event)=>setEmail(event.target.value)}/>
    </Col>
  </Row>
  <Row>
    <Col xl={6} className="Jobcontainer">
      <label for="Jobtype la">Job Type</label>
      <Select
          className='input'
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={jobtype}
          label="Age *"
          onChange={(event)=>setJobtype(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Full Time"}>Full Time</MenuItem>
          <MenuItem value={"Part Time"}>Part Time</MenuItem>
          <MenuItem value={"Consultancy"}>Consultancy</MenuItem>
        </Select>
    
    </Col>
    <Col xl={6} className="dobcontainer">
      <label for="dob la"> DOB</label>
      <input className='dob' type="date"
      value={dob}
       onChange={(a)=>setDob(a.target.value)}/>
    </Col>
  </Row>
  
  <Row>
    <Col xl={6} className="locationcontainer input">
      <label for="location la">Pref. Location</label>
      <Select
          className='input'
          labelId="demo-simple-select-required-label"
          id="demo-simple-select-required"
          value={location}
          label="Age *"
          onChange={(event)=>setLocation(event.target.value)}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={"Chennai"}>Chennai</MenuItem>
          <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
          <MenuItem value={"Coimbatore"}>Coimbatore</MenuItem>
        </Select>
     
    </Col>
    <Col xl={6} className="">
    <Button variant="outlined" onClick={editEmployee}>Updated</Button>
    <Button variant="outlined" onClick={()=>history.goBack("/employee")}
    startIcon={<ArrowBackIcon/>}>Back</Button>
    </Col>
  </Row>
  

  </Container>
  </fieldset>
</Form>

    </div>
  )
}
