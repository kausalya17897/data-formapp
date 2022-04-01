import React from "react";
import "./Form.css";
import { useState, useEffect } from "react";
import { Row, Col, Form, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { Select, MenuItem, Button } from "@mui/material";
import { useParams, useHistory } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export function Editform() {
  console.log("edit");
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  useEffect(() => {
    // fetch(`https://62368e85163bf7c4746552f6.mockapi.io/employee/${id}`,{
    fetch(`https://paripornaform.herokuapp.com/employee`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((a) => {
        setEmployee(a.data.find((data) => data._id === id));
      });
  }, [id]);
  console.log(employee);
  return employee ? <UpdatedEmployee employee={employee} /> : "";
}

function UpdatedEmployee({ employee }) {
  const [countrycode, setCountrycode] = useState(employee.countrycode);
  const [jobtype, setJobtype] = useState(employee.jobtype);
  const [location, setLocation] = useState(employee.location);
  const [fullname, setFullname] = useState(employee.fullname);
  const [dob, setDob] = useState(employee.dob);
  const [img, setImg] = useState(employee.img);
  const [email, setEmail] = useState(employee.email);
  const [mobile, setMobile] = useState(employee.mobile);

  const handleFileChange = (e) => {
    const img = {
      preview: URL.createObjectURL(e.target.files[0]),
      data: e.target.files[0],
    };
    setImg(img);
  };

  const history = useHistory();
  const editEmployee = () => {
    const updatedEmployee = {
      fullname,
      img,
      email,
      mobile,
      location,
      jobtype,
      dob,
    };

    if (img.data) {
      const data = new FormData();
      data.append("file", img.data);
      data.append("upload_preset", "Project1");
      data.append("cloud_name", "kausalya");
      fetch("https://api.cloudinary.com/v1_1/kausalya/image/upload", {
        method: "POST",
        body: data,
      })
        .then((data) => data.json())
        .then((data) => {
          updatedEmployee.img = data.secure_url;
          fetch(
            `https://paripornaform.herokuapp.com/employee/${employee._id}`,
            {
              method: "PUT",
              body: JSON.stringify(updatedEmployee),
              headers: {
                "Content-Type": "application/json",
              },
            }
          ).then(() => history.push("/employee"));
        });
      return;
    }

    // fetch(`https://61681515ba841a001727c589.mockapi.io/movie/${employee.id}`,{
    fetch(`https://paripornaform.herokuapp.com/employee/${employee._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedEmployee),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => history.push("/employee"));
  };
  return (
    <div className="Form">
      <Form>
        <fieldset className="fieldset">
          <legend className="legend">Registration</legend>
          <Container>
            <Row>
              <Col xl={6} className="fullnamecontainer">
                <html for="fullname la">Fullname</html>
                <input
                  className="fullname"
                  type="text"
                  value={fullname}
                  onChange={(a) => setFullname(a.target.value)}
                />
              </Col>
              <Col xl={6} className="img">
                <html for="profilepic la">Profile Pic</html>
                <Card className="imagebox">
                  <img
                    className="image"
                    src={img.preview ? img.preview : img}
                    alt="profilepic"
                  />
                </Card>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Col>
            </Row>
            <Row>
              <Col xl={6} className="mobilecontainer input">
                <html for="mobile la">Mobile</html>
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
                  <MenuItem value={+35}>+385</MenuItem>
                </Select>
                <input
                  className="Mobile"
                  type="text"
                  value={mobile}
                  onChange={(a) => setMobile(a.target.value)}
                />
              </Col>
              <Col xl={6} className="emailcontainer">
                <html for="email la">Email Id</html>
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
                <html for="Jobtype la">Job Type</html>
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
                <html for="dob la"> DOB</html>
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
                <html for="location la">Pref. Location</html>
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
                  <MenuItem value={"Chennai"}>Chennai</MenuItem>
                  <MenuItem value={"Bangalore"}>Bangalore</MenuItem>
                  <MenuItem value={"Coimbatore"}>Coimbatore</MenuItem>
                </Select>
              </Col>
              <Col xl={6} className="">
                <Button variant="outlined" onClick={editEmployee}>
                  Updated
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => history.goBack("/employee")}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
              </Col>
            </Row>
          </Container>
        </fieldset>
      </Form>
    </div>
  );
}