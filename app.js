const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


// ROUTE Middleware
const charactersRoutes = require('./routes/characters')

// General Middleware (applied to all requests)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


//BASE ROUTE
app.get('/', (req, res, next) =>{
  res.send('🐶')
})

// ROUTE Middleware use
app.use('/characters', charactersRoutes)


//ERROR HANDLING
app.use(notFound);
// general purpose catch all
app.use(errorHandler);

function errorHandler(err, req, res, next) {
  console.error('ERROR', err)
  res.status(404).send({error: "not an integer"})
}

function notFound(req, res, next) {
  res.status(404).send(err)
}

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})
