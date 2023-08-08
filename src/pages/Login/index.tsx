import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { TextField, Typography } from '@mui/material';
import './Login.css'
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      try {
        const response = await axios({
          method: 'post',
          url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/auth/login',
          data: {
            email,
            password
          }
        })
        if (response.status === 200 && response.statusText === 'OK') {
          console.log(response.data);
          navigate('/projects');
        } 
      } catch(e) {
        console.error(e);
      }
    }
  }

  return (
    <div className="layout">
      <form action="" className="form">
        <Typography variant="h5" component="h2">
          Login Form
        </Typography>
        <TextField
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          id="email"
          label="Email"
          variant="outlined"
        />
        <TextField
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          id="password"
          label="Password"
          variant="outlined"
        />
        <Button variant="contained" onClick={submitForm}>
          Submit
        </Button>
      </form>
      <div className='link'>
        <Link to={'/sign-up'}> Navigate to Sign up </Link>
      </div>
    </div>
  );
}

export default LoginPage;
