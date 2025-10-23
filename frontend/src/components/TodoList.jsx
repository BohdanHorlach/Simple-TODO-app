import TodoCard from './TodoCard';
import { Grid, Button, Box } from '@mui/material';


const TodoList = ({ todos, onAddTodo, onUpdateTodo, onDeleteTodo }) => {
  return (
    <Box>
      <Button
        variant="contained"
        color="primary"
        onClick={onAddTodo}
        sx={{ marginBottom: 2 }}
      >
        Add New Todo
      </Button>
      <Grid container spacing={2} justifyContent="center">
        {todos.map(todo => (
          <Grid item key={todo._id}>
            <TodoCard
              todo={todo}
              onUpdate={onUpdateTodo}
              onDelete={onDeleteTodo}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TodoList;
