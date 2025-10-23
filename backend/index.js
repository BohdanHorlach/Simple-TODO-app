require('dotenv').config();

const express = require('express');
const cors = require('cors');
const router = require('./router/index');
const mongoose = require('mongoose');
const Todo = require('./models/todo-model');
const PORT = process.env.PORT;

const app = express();


app.use(express.json());

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use('/api/todos', router);


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('Error connecting to MongoDB:', err));


app.listen(PORT, () => console.log(`Server started on PORT = ${PORT}`))