const express = require('express');
const router = require('./router')

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use((req, res, next) => {
  console.log(req.method, req.url, Date.now())
  next()
})

// add router
app.use('/todos', router)

// handle 404
app.use((req, res, next) => {
  res.status(404).send('404 Not Found.')
})

// handle error
app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
