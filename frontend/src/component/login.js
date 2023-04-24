import React, { useRef, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../stylesheets/Login.css';
import axios from 'axios'

function Login(props) {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();


  const loginAttempt = e => {
    e.preventDefault();
    console.log("login attempt")
    const uName = usernameRef.current.value;
    const pwd = passwordRef.current.value;
    axios.post('http://localhost:4001/user/login', {
        username: uName,
        password: pwd
    }).then((result) => {
            if (result.data.message === "success") {
                console.log("Logged in! Token: " + result.data.token);
                localStorage.setItem('token', result.data.token)
                localStorage.setItem('user', JSON.stringify(result.data.user))
                navigate('/tic-tac-toe');
            } else {
                console.log("Did not log in");
            }},(err) => {
                console.log("Did not log in");
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
