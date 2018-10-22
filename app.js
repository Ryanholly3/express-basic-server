const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser')

//DATA
const characters = require('./data.json');
console.log(characters)

app.get('/', (req, res, next) =>{
  res.send('🐶')
})

app.get('/characters', (req, res, next) =>{
  res.json({characters})
})

//loop
app.get('/characters/:id', (req, res, next) =>{
  for(let i = 0; i < characters.length; i++){
    let id = req.params.id;
    if(characters[i].id == id){
      res.json(characters[i])
    }
  }
})

//alternative solution \/
// app.get('/characters/:id', (req, res, next) =>{
//   res.json(characters[req.params.id - 1])
// })
// ^ this method is flawed if index does not start at 1!!!!

app.listen(port, ()=>{
  console.log(`Server running on port ${port}`)
})
