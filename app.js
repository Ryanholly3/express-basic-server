const express = require('express');
const app = express();
const port = 3000;
const bodyParser = require('body-parser');


//DATA
const characters = require('./data.json');


// General Middleware (applied to all requests)
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (req, res, next) =>{
  res.send('🐶')
})

app.get('/characters', (req, res, next) =>{
  res.json({characters})
})

//loop
// app.get('/characters/:id', (req, res, next) =>{
//   for(let i = 0; i < characters.length; i++){
//     let id = req.params.id;
//     if(characters[i].id == id){
//       res.json(characters[i])
//     }
//   }
// })

//filter
app.get('/characters/:id', (req, res, next) =>{
  const id = req.params.id;


  if(!Number(id) || characters.length < parseInt(id)){
    next({ error: 'not found', status: 404})
  } else {
    const character = characters.filter((character) => {
      return character.id == id
    })[0];
    res.json({character: character});
  }

})


app.post('/characters', (req, res, next) =>{
  //pull the data that is to be posted from request body
  const body = req.body;
  characters.push(body)

  res.json({ characters: characters })
})
//alternative solution \/
// app.get('/characters/:id', (req, res, next) =>{
//   res.json(characters[req.params.id - 1])
// })
// ^ this method is flawed if index does not start at 1!!!!

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
