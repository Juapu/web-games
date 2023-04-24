import React, { useRef, useState, useEffect} from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';
import axios from 'axios'

function Login(props) {

  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    /*const token = localStorage.getItem('token');
    if (token) {
      navigate('/tic-tac-toe');
    }*/
  }, []);

  const token = localStorage.getItem("token");
  const loginAttempt = e => {
    e.preventDefault();
    console.log("login attempt")
    console.log(usernameRef.current.value)
    console.log(passwordRef.current.value)
    const uName = usernameRef.current.value;
    const pwd = passwordRef.current.value;
    axios.post('http://localhost:4001/user/login', {
        username: uName,
        password: pwd
    }).then((result) => {
          console.log("Logged in! Token: " + result.data.token);
          localStorage.setItem('token', result.data.token);
          navigate('/tic-tac-toe');
        },(err) => {
          console.log("Failed to log in");
        }
      )
  };

  const switchPage = (e) => {
    console.log()
    e.preventDefault();
    console.log('switch')
    navigate('/create-account');
  }


  return (
    <div>
      <h1>Sign In</h1>
      <Form className="form" onSubmit={(e) => loginAttempt(e)}>

        <Form.Group className="field" controlId="formBasicUsername">
          <Form.Control ref={usernameRef} type="name" placeholder="Username" className="secondry-font" />
        </Form.Group>

        <Form.Group className = "field" controlId="formBasicPassword">
          <Form.Control ref={passwordRef} type="password" placeholder="Password" className="secondry-font"/>
        </Form.Group>

        <Button className = "submit-button" id="login" variant="primary" type="submit">
          Sign In
        </Button>
        <div className="subtext" onClick={(e) => switchPage(e)}>Don't have an account?</div>
      </Form>
    </div>
  )

}


export default Login;
