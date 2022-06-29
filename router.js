const express = require('express')
const { getDb, saveDb } = require('./db')

const router = express.Router()

router.get('', async (req, res, next) => {
  try {
    const db = await getDb()
    res.status(200).json(db.todos)
  } catch (err) {
    next(err)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const db = await getDb()
    const todo = db.todos.find(({ id }) => id === Number(req.params.id))
    todo ? res.status(200).json(todo) : res.status(404).end()
  } catch (err) {
    next(err)
  }
});

router.post('', async (req, res, next) => {
  try {
    const todo = req.body
    if (!todo.title) {
      return res.status(422).json({
        error: 'The field title is required'
      })
    }
    const db = await getDb()
    const lastTodo = db.todos[db.todos.length - 1]
    todo.id = lastTodo ? lastTodo.id + 1 : 1
    db.todos.push(todo)
    await saveDb(db)
    res.status(200).json(todo)
  } catch (err) {
    next(err)
  }
});

router.patch('/:id', async (req, res, next) => {
  try {
    const newTodo = req.body
    const db = await getDb()
    const todo = db.todos.find(({ id }) => id === Number(req.params.id))
    if (!todo) return res.status(404).end()
    Object.assign(todo, newTodo)
    await saveDb(db)
    res.status(200).json(todo)
  } catch (err) {
    next(err)
  }
});

router.delete('/:id', async (req, res, next) => {
  try {
    const db = await getDb()
    const index = db.todos.findIndex(({ id }) => id === Number(req.params.id))
    if (index === -1) return res.status(404).end()
    db.todos.splice(index, 1)
    await saveDb(db)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
});

module.exports = router