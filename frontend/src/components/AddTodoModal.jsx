import React, { useState } from 'react';
import { Modal, Box, Button, TextField, Typography } from '@mui/material';

const AddTodoModal = ({ open, handleClose, handleAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState(1);

  const handleSubmit = () => {
    handleAdd({ title, description, priority });
    handleClose();
    window.location.reload();
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          padding: 4,
          boxShadow: 24,
          borderRadius: 2,
          width: 400,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Add New Todo
        </Typography>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Priority"
          type="number"
          fullWidth
          value={priority}
          onChange={(e) => {
            const value = Number(e.target.value);
            if (value >= 1 && value <= 5) {
              setPriority(value);
            }
          }}
          margin="normal"
          inputProps={{ min: 1, max: 5 }}
        />
        <Box mt={2} display="flex" justifyContent="space-between">
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Add
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddTodoModal;