import React from 'react';
import './Form.css';
import { useState } from 'react';
import {  Row, Col,Form,Container,Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Select,MenuItem ,Button,IconButton} from '@mui/material';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Table from './Table';

export default function Formfull() {
  const [countrycode, setCountrycode] = useState('');
  const [jobtype, setJobtype] = useState('');
  const [location, setLocation] =useState('');
 const [fullname,setFullname]=useState('');
 const [dob,setDob]=useState('');
 const [img,setImg]=useState("");
 const [email,setEmail]=useState("")
 const [mobile,setMobile]=useState("");
 const history=useHistory();

 const addemployee=()=>{
   console.log("adding...",fullname,email,mobile,dob,location,jobtype,img)
   const newEmployee={
    fullname,email,mobile,dob,location,jobtype,img
   }
   fetch(`https://62368e85163bf7c4746552f6.mockapi.io/employee`,{
     method:"POST",
     body:JSON.stringify(newEmployee),
     headers:{
       "content-Type":"application/json",
     },
   }).then(()=>history.push("/employee"))
  }
  useEffect(() => {
    addemployee() 
      
  }, [])
 const handleChange=(a)=>{
   if(a.target.files.length!==0){
     setImg(URL.createObjectURL(a.target.files[0]))
    }
  }

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
      onChange={handleChange}/>
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
          <MenuItem value={+385}>+385</MenuItem>
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
          <MenuItem value={"chennai"}>Chennai</MenuItem>
          <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
          <MenuItem value={"Coimbatore"}>Coimbatore</MenuItem>
        </Select>
     
    </Col>
    <Col xl={6} className="">
    <Button variant="contained" onClick={addemployee}>+Add/Update</Button>
    </Col>
  </Row>
  

  </Container>
  </fieldset>
  <Table/>
</Form>

    </div>
  )
}