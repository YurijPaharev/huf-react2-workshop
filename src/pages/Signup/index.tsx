import { Button, TextField, Typography, Dialog } from '@mui/material';
import axios from 'axios';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function SignUpPage() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [familyName, setFamilyName] = useState<string>('');
  const [focusedPhone, setFocusedPhone] = useState<boolean>(false);
  const [focusedPass, setFocusedPass] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);
  const navigate = useNavigate();

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios({
        method: 'post',
        url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/auth/signup',
        data: {
          email,
          password,
          phoneNumber,
          name,
          familyName
        }
      });
      if (res.status === 200) {
        setOpenPopup(true);
        setTimeout(() => {
          setOpenPopup(false);
          navigate('/verify-user');
        }, 2000);
      }
    } catch (e: any) {
      console.error(e);
      if (e.response.data.validation_errors) {
        alert(e.response.data.validation_errors[0].msg);
      } else if (e.response.data.error) {
        alert(e.response.data.error.name);
      }
    }
  };

  return (
    <div className="layout">
      <form onSubmit={(e) => submitForm(e)} className="form">
        <Typography variant="h5" component="h2">
          Sign-up Form
        </Typography>
        <TextField
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
          id="name"
          label="First Name"
          variant="outlined"
          required
        />
        <TextField
          value={familyName}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setFamilyName(event.target.value);
          }}
          id="familyName"
          label="Last Name"
          variant="outlined"
          required
        />
        <TextField
          value={phoneNumber}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPhoneNumber(event.target.value);
          }}
          onFocus={() => setFocusedPhone(true)}
          onBlur={() => setFocusedPhone(false)}
          id="phoneNumber"
          label="Phone Number"
          variant="outlined"
          helperText={
            focusedPhone && 'Must start with a + and contain at least 9 symbols'
          }
          required
        />
        <TextField
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
          id="email"
          label="Email"
          variant="outlined"
          type={'email'}
          required
        />
        <TextField
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
          onFocus={() => setFocusedPass(true)}
          onBlur={() => setFocusedPass(false)}
          id="password"
          label="Password"
          variant="outlined"
          type="password"
          helperText={
            focusedPass &&
            'Password must be at least 8 characters long, contain a special character, a number and an upper case letter'
          }
          required
        />
        <Button variant="contained" type="submit">
          Sign Up!
        </Button>
      </form>
      <div className="link">
        Already have an account? <Link to={'/login'}>Login!</Link>
      </div>
      <Dialog open={openPopup} PaperProps={{ sx: { borderRadius: '8px' } }}>
        <h3>
          Signed up successfully. Verify your account using code sent to your
          email
        </h3>
      </Dialog>
    </div>
  );
}

export default SignUpPage;
