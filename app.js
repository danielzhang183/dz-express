const express = require('express');
const router = require('./router')

const app = express();
app.use(express.json())
app.use(express.urlencoded())
app.use((req, res, next) => {
  console.log(req.method, req.url, Date.now())
  next()
})

app.use('/todos', router)

app.use((err, req, res, next) => {
  res.status(500).json({
    error: err.message
  })
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/');
});
