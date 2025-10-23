import React, { useEffect, useState } from 'react';
import { getAllTodos, createTodo, updateTodo, deleteTodo } from '../api/todoApi';
import TodoList from '../components/TodoList';
import AddTodoModal from '../components/AddTodoModal';
import { Box, Container, Typography } from '@mui/material';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    getAllTodos().then((res) => {
      setTodos(res.data);
    });
  }, []);

  const handleAddTodo = ({ title, description, priority }) => {
    createTodo({ title, description, priority }).then((res) => {
      const newTodo = res.data;
      setTodos((prevTodos) => [...prevTodos, newTodo]);
    });
  };

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleUpdateTodo = (updatedTodo) => {
    updateTodo(updatedTodo).then((res) => {
      const newTodo = res.data;
      console.log('Updated Todo:', newTodo); 
      setTodos((prev) =>
        prev.map((todo) => (todo._id === newTodo._id ? newTodo : todo))
      );
    });
  };
  
  const handleDeleteTodo = (id) => {
    deleteTodo(id).then(() => {
      setTodos((prev) => prev.filter((todo) => todo._id !== id));
    });
  };


  return (
    <Box
      sx={{
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#2a2a2a',
      }}
    >
      <Container
        sx={{
          border: '2px solid #313131',
          borderRadius: 2,
          margin: 3,
          padding: 3,
          backgroundColor: '#313131',
          width: '100%',
          boxShadow: '8px 8px 20px rgba(0, 0, 0, 0.5)',
          color: '#fff',
        }}
      >
        <Typography variant="h4" gutterBottom>
          Todo List
        </Typography>
        <TodoList
          todos={todos}
          onAddTodo={handleOpenModal}
          onUpdateTodo={handleUpdateTodo}
          onDeleteTodo={handleDeleteTodo}
        />
        <AddTodoModal
          open={openModal}
          handleClose={handleCloseModal}
          handleAdd={handleAddTodo}
        />
      </Container>
    </Box>
  );
};

export default Home;