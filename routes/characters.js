const express = require('express')
const router = express.Router();
const characters = require('../data.json');

router.get('/', (req, res, next) =>{
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
router.get('/:id', (req, res, next) =>{
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


router.post('/', (req, res, next) =>{
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

// PUT route

router.put('/:id', (req, res) =>{
  const body = req.body;
  const id = req.params.id;

  for(let i = 0; i < characters.length; i++){
    if(id == characters[i].id){
      characters[i] = body;
    }
  }
  res.json({ characters: characters })
})

router.delete('/:id', (req, res) => {
  const id = req.params.id;

  for(let i = 0; i < characters.length; i++){
    if(id == characters[i].id){
      let indexDelete = characters.indexOf(characters[i]);
      characters.splice(indexDelete, 1);
    }
  }
  res.json({ characters: characters })
})

module.exports = router
