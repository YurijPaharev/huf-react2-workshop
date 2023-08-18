import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const VerifyUser = () => {
  const [email, setEmail] = useState<string>('');
  const [code, setCode] = useState<string>('');
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/auth/verify-user',
        data: {
          email,
          code
        }
      });
      if (res.status === 200) {
        alert('Successfully verified! Please log in');
        navigate('/login');
      }
    } catch (e: any) {
      console.error(e);
      if (e.response.data.error.name) {
        alert(e.response.data.error.name);
      }
    }
  };
  return (
    <div className="layout">
      <form action="" className="form">
        <Typography variant="h5" component="h2">
          Verify Your Email
        </Typography>
        <TextField
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          id="email"
          label="Email"
          variant="outlined"
          required
        />
        <TextField
          value={code}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCode(event.target.value);
          }}
          id="code"
          label="Code"
          variant="outlined"
          required
        />
        <Button variant="contained" onClick={submitForm}>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default VerifyUser;
