import React, { useState, useEffect } from 'react';
import {
  Card, Box, CardContent, Typography, Dialog, DialogActions,
  DialogContent, DialogTitle, Button, TextField, Checkbox, FormControlLabel
} from '@mui/material';

const TodoCard = ({ todo, onUpdate, onDelete }) => {
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [cardColor, setCardColor] = useState('');
  const [priority, setPriority] = useState(0);
  const [completed, setCompleted] = useState(false);

  const priorityColor = {
    1: '#008cff',
    2: 'green',
    3: 'orange',
    4: 'red',
    5: 'purple',
  }[todo.priority] || 'gray';


  useEffect(() => {
    setCardColor(todo.completed ? '#6c6c6c' : priorityColor);
  },[]);

  useEffect(() => {
    if (open) {
      setTitle(todo.title);
      setDescription(todo.description);
      setPriority(todo.priority);
      setCompleted(todo.completed);
    }
  }, [open, todo]);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditMode(false);
    setTitle(todo.title);
    setDescription(todo.description);
    setPriority(todo.priority);
    setCompleted(todo.completed);
  };

  const handleSave = () => {
    onUpdate({
      ...todo,
      title,
      description,
      priority,
      completed
    });
    window.location.reload();
  };

  const handleComplete = () => {
    onUpdate({
      ...todo,
      completed: true
    });
    window.location.reload();
  };

  const createdAt = new Date(todo.createdAt);
  const formattedDate = createdAt.toLocaleString();

  return (
    <>
      <Card 
        sx={{
          backgroundColor: '#313131',
          boxShadow: '5px 5px 8px rgba(0, 0, 0, 0.5)',
          width: 200,
          border: '1px solid',
          borderRadius: '5px',
          borderColor: cardColor,
          overflow: 'hidden',  
        }} 
        onClick={handleClickOpen} style={{ cursor: 'pointer' }}
      >
        <CardContent sx={{ padding: 0 }}>
            <Box
              sx={{
                width: '100%',
                height: 40,
                backgroundColor: cardColor,
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography variant="h6" 
                sx={{
                  px: 2,
                  fontWeight: 'bold',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                {todo.title}
              </Typography>
            </Box>
            <Box sx={{ mx: 1, my: 3 }}>
              <Typography 
                sx={{
                  color: '#b5b5b5',
                  px: 1,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }} 
                variant="body2" 
                color="textSecondary"
              >
                {todo.description}
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', width: '100%' }}>
                <Typography sx={{ color: '#b5b5b5', px: 1 }} variant="caption" color="textSecondary">
                  Created on: {formattedDate}
                </Typography>
              </Box>
            </Box>
        </CardContent>
      </Card>

      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>{editMode ? 'Edit Todo' : todo.title}</DialogTitle>
        <DialogContent>
          {editMode ? (
            <>
              <TextField
                fullWidth
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                margin="normal"
              />
              <TextField
                fullWidth
                label="Priority"
                type="number"
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
              <FormControlLabel
                control={
                  <Checkbox
                    checked={completed}
                    onChange={(e) => setCompleted(e.target.checked)}
                  />
                }
                label="Completed"
              />
            </>
          ) : (
            <>
              <Typography variant="body1">{todo.description}</Typography>
              <Typography variant="body2" color="textSecondary">
                Created on: {formattedDate}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Priority: {todo.priority}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Status: {todo.completed ? '✅ Completed' : '⏳ Pending'}
              </Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          {editMode ? (
            <>
              <Button onClick={handleSave} color="primary" variant="contained">
                Save
              </Button>
              <Button onClick={handleClose} color="secondary">
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button onClick={handleComplete} color="primary">
                Complete
              </Button>
              <Button onClick={() => setEditMode(true)} color="primary">
                Edit
              </Button>
              <Button onClick={() => {
                onDelete(todo._id);
                setOpen(false);
              }} color="error">
                Delete
              </Button>
              <Button onClick={handleClose}>Close</Button>
            </>
          )}
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TodoCard;
