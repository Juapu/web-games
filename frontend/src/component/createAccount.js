import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import axios from 'axios';

const CreateAccount = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('/signup', {
        email,
        password,
      });
      
      //Store token to local storage
      let token = response.data.token;
      localStorage.setItem('token', token);

      // Redirect based off of gameID presence
      let gameID = URLSearchParams(window.location.search).get('gameID');
      if (!gameID) {
        window.location.href = '../games';
      }
      else {
        window.location.href = `../play?gameid=${gameID}`;
      }
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return(
    <div>
      <h1>Create Your Account</h1>
      <h2>Create an account to start gaming with your friends</h2>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
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