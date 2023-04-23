import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import axios from 'axios'

function Login() {
  const [signedIn, setSignedIn] = useState(false);
  const usernameRef = useRef();
  const passwordRef = useRef();


  const loginAttempt = e => {
    e.preventDefault();
    // Your sign-in logic here
  };


  return (
    <div>
      <h1>Sign In</h1>
      <Form className="form" onSubmit={(e) => loginAttempt(e)}>

        <Form.Group className="field" controlId="formBasicUsername">
          <Form.Control ref={usernameRef} type="name" placeholder="Username" className="secondry-font" />
        </Form.Group>

        <label>
          Email:
          <input type="username" value={username} onChange={e => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="submit">Sign In</button>
      </form>
    </div>
  )

}


export default withRouter(Login);
