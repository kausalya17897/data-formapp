import React from "react";
import "./Form.css";
import { useState } from "react";
import { Row, Col, Form, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Select, MenuItem, Button } from "@mui/material";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import Table from "./Table";

export default function Formfull(){
  const [countrycode, setCountrycode] = useState("");
  const [jobtype, setJobtype] = useState("");
  const [location, setLocation] = useState("");
  const [fullname, setFullname] = useState("");
  const [dob, setDob] = useState("");
  const [img, setImg] = useState({preview:"",data:""});
  const [status,setStatus]=useState('');
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const history = useHistory();
  const handleSubmit = async (e) => {
    e.preventDefault()
    let formData = new FormData()
    formData.append('file', img.data)
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: formData,
    })
    if (response) setStatus(response.statusText)
  }

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    }
    setImg(img)
  }
  const addemployee = () => {
    console.log(
      "adding...",
      fullname,
      email,
      mobile,
      dob,
      location,
      jobtype,
      img
    );
   
    const newEmployee = {
      fullname,
      email,
      mobile,
      dob,
      location,
      jobtype,
      img,
    };

  
    const data = new FormData();
  data.append("file", img.data);
  data.append("upload_preset", "Project1");
  data.append("cloud_name", "kausalya");
  fetch("https://api.cloudinary.com/v1_1/kausalya/image/upload",{
    method: "POST",
    body: data,
  }).then((data) => data.json())
  .then((data)=>{
    newEmployee[img] = data.secure_url
    fetch(`https://paripornaform.herokuapp.com/employee`, {
      method: "POST",
      body: JSON.stringify(newEmployee),
      headers: {
        "content-Type": "application/json",
      },
    }).then(() => history.push("/employee"))
  }}
  useEffect(() => {
    addemployee();
  }, []);
  

  return (
    <div className="Form">
      <Form>
        <fieldset className="fieldset">
          <legend className="legend">Registration</legend>
          <Container>
            <Row>
              <Col xl={6} className="fullnamecontainer">
                <label htmlFor="fullname la">Fullname</label>
                <input
                  className="fullname"
                  type="text"
                  value={fullname}
                  onChange={(a) => setFullname(a.target.value)}
                />
              </Col>
              <Col xl={6} className="img">
                <label htmlFor="profilepic la">Profile Pic</label>
                <Card className="imagebox">
                 {/* <img className="image" src={img} alt="profilepic" />*/}
                  {img.preview && <img src={img.preview} width='100' height='100' alt={img} />}
                </Card>
                <input
                  type="file"
                  name="file"
                  accept="image/*"
                  
                  onChange={handleFileChange}
                />
              </Col>
            </Row>
            <Row>
              <Col xl={6} className="mobilecontainer input">
                <label htmlFor="mobile la">Mobile</label>
                <Select
                  labelId="demo-simple-select-required-html"
                  id="demo-simple-select-required"
                  value={countrycode}
                  html="Age *"
                  onChange={(event) => setCountrycode(event.target.value)}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  <MenuItem value={+91}>+91</MenuItem>
                  <MenuItem value={+47}>+47</MenuItem>
                  <MenuItem value={+385}>+385</MenuItem>
                </Select>
                <input
                  className="Mobile"
                  type="text"
                  value={mobile}
                  onChange={(a) => setMobile(a.target.value)}
                />
              </Col>
              <Col xl={6} className="emailcontainer">
                <label htmlFor="email la">Email Id</label>
                <input
                  className="emailinput"
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Col>
            </Row>
            <Row>
              <Col xl={6} className="Jobcontainer">
                <label htmlFor="Jobtype la">Job Type</label>
                <Select
                  className="input"
                  labelId="demo-simple-select-required-html"
                  id="demo-simple-select-required"
                  value={jobtype}
                  html="Age *"
                  onChange={(event) => setJobtype(event.target.value)}
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
                <label htmlFor="dob la"> DOB</label>
                <input
                  className="dob"
                  type="date"
                  value={dob}
                  onChange={(a) => setDob(a.target.value)}
                />
              </Col>
            </Row>

            <Row>
              <Col xl={6} className="locationcontainer input">
                <label htmlFor="location la">Pref. Location</label>
                <Select
                  className="input"
                  labelId="demo-simple-select-required-html"
                  id="demo-simple-select-required"
                  value={location}
                  html="Age *"
                  onChange={(event) => setLocation(event.target.value)}
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
                <Button variant="contained" onClick={addemployee}>
                  +Add/Update
                </Button>
              </Col>
            </Row>
          </Container>
        </fieldset>
        <Table />
      </Form>
    </div>
  );
}
