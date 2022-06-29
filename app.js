const express = require('express');
const fs = require('fs')
const { getDb } = require('./db')

const app = express();

app.get('/todos', async (req, res) => {
  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }
    const db = JSON.parse(data)
    res.status(200).json(db.todos)
  })
});

app.get('/todos/:id', (req, res) => {
  fs.readFile('./db.json', 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({
        error: err.message
      })
    }
    const db = JSON.parse(data)
    const todo = db.todos.find(({ id }) => id === Number(req.params.id))
    todo
      ? res.status(200).json(todo)
      : res.status(404).end()
  })
});

app.post('/todos', (req, res) => {
  res.send('post /todos');
});

app.patch('/todos/:id', (req, res) => {
  res.send('patch /todos');
});

app.delete('/todos/:id', (req, res) => {
  res.send('delete /todos');
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
