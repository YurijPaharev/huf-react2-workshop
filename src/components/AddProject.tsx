import React, { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button, Dialog, Typography, TextField } from '@mui/material';
import axios from 'axios';

const AddProject = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}');
      const res = await axios({
        method: 'post',
        url: 'http://byrdbox-env.eba-4kxk4yka.eu-north-1.elasticbeanstalk.com/projects/create',
        data: {
          title,
          description
        },
        headers: { Authorization: `Bearer ${tokens.idToken}` }
      });
      if (res.status === 200) {
        setOpen(false);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Button onClick={() => setOpen(true)}>
        <AddIcon /> Add New Project
      </Button>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{ sx: { borderRadius: '8px' } }}>
        <form onSubmit={(e) => submitForm(e)} className="form">
          <Typography variant="h5" component="h2">
            Create New Project
          </Typography>
          <TextField
            value={title}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setTitle(event.target.value);
            }}
            id="title"
            label="Title"
            variant="outlined"
            required
          />
          <TextField
            value={description}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setDescription(event.target.value);
            }}
            id="description"
            label="Description"
            variant="outlined"
            multiline
            rows={3}
          />
          <Button variant="contained" type="submit">
            Submit
          </Button>
        </form>
      </Dialog>
    </>
  );
};

export default AddProject;
