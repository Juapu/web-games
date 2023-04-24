import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:4001/user', {
        username,
        password,
      });
      console.log("sending request:", username, password);
      
      //Store token to local storage
      let token = response.data.token;
      localStorage.setItem('token', token);

      // Redirect based off of gameID presence
      let gameID = URLSearchParams(window.location.search).get('gameID');
      if (!gameID) {
        navigate('/games');
      }
      else {
        // TODO: ensure correct routes with backend 
        navigate(`/play?gameid=${gameID}`);
      }
    } catch (error) {
      // setError(error.response.data.message);
      console.log(error);
    }
  };

  return(
    <div>
      <h1>Create Your Account</h1>
      <h2>Create an account to start gaming with your friends</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="username"
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        {error && <p>{error}</p>}

        <Button type="submit">Create Account</Button>
      </Form>
    </div>
  )
}

export default CreateAccount