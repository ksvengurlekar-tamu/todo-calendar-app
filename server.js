const express = require('express');
const bodyParser = require('body-parser');
const sequelize = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Connection to PostgreSQL has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

// Define routes
app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const Todo = require('./models/todo');

// Create a new todo
app.post('/todos', async (req, res) => {
  try {
    const todo = await Todo.create(req.body);
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all todos
app.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll();
    res.status(200).json(todos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a single todo by id
app.get('/todos/:id', async (req, res) => {
  try {
    const todo = await Todo.findByPk(req.params.id);
    if (todo) {
      res.status(200).json(todo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update a todo by id
app.put('/todos/:id', async (req, res) => {
  try {
    const [updated] = await Todo.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedTodo = await Todo.findByPk(req.params.id);
      res.status(200).json(updatedTodo);
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a todo by id
app.delete('/todos/:id', async (req, res) => {
  try {
    const deleted = await Todo.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).json();
    } else {
      res.status(404).json({ error: 'Todo not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

