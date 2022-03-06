var express = require('express');
var router = express.Router();
var UserModel = require('../models/UserModels');


const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await UserModel.find({});//{role: 'Admin'}
  //console.log(users)
  let result = (users.length > 0)? users: [{message: "No hay usuarios que mostrar."}];
  res.json(result);
});

router.get('/:id', auth, async function(req, res) {
  const user = await UserModel.findOne({ _id: req.params.id })
  let result = ( user !== null )? user: {};
  res.json(result);  
});

router.post('/register', async (req, res, next) => {
  // recibo los datos por bodi
  const { name, email, password} = req.body;
  // Valido los datos recibidos. Si son incorrectos, devuelvo ko
  // Valido que el correo no existe
  const userExists = await UserModel.findOne({ email: email});
  if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }

  // Valido que el password tiene el formato correcto (minlength: 6)
  if (password.length < 6 ) return res.status(401).json({message: 'password incorrecto. Debe tener almenos 6 caracteres.'});
    
  // Guardo los datos
 
  /*if  (role === 'admin') {
    let user = await UserModel.create({name: name, email: email, password: password,  role: "admin" })
    if( user === null) return res.status(500).json({message: 'Internal error. Please, let you contact with the administrator'})
    res.status(204).json({message: 'User created!!!!'});
  } else {*/ 
    const user = await UserModel.create({name: name, email: email, password: password,})
    if( user === null) return res.status(500).json({message: 'Internal error. Please, let you contact with the administrator'})
    res.status(204).json({message: 'User created!!!!'});
    //}
     // Respondo ok o ko
  });
 

router.post('/login', async (req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body
    const user = await UserModel.findByCredentials(email, password)
    if (!user) {
       return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken();
    res.json({ "user": {"email": user.email, "name": user.name}, token })
  } catch (error) {
     res.status(400).send(error)
  }
});

router.delete('/:id', auth, async (req, res, next) => {
  try {
    const result = await UserModel.remove({_id: req.params.id});
    (result > 0) ? res.status(204).json({message: "El usuario ha sido eliminado correctamente"}) : res.status(200).json({});
  } catch (e) {
    res.status(500).json({message: "No se pudo hacer la eliminacion."});
  }
});

router.get('/logout', auth, async (req, res, next) => {
  res.status(501).json({});
}); 
 

/* router.get('/create/', async function(req, res) {
  
  const usersData = [{
      name: "Jordi Valentín",
      email: 'test4@test.com',
      password: '123456',
      address: [
        {street: 'Calle a', zip: '08010', city: 'Barcelona', country: 'España'},
        {street: 'Calle b', zip: '08010', city: 'Barcelona', country: 'España'}
      ],
      tokens:[]
    },
    {
      name: "Rafa Garcia",
      email: 'test24@test.com',
      password: '123456',
      address: [
        {street: 'Calle a', zip: '46900', city: 'Torrente', country: 'España'},
        {street: 'Calle b', zip: '46900', city: 'Torrente', country: 'España'}
      ],
      tokens:[]
    }]
  const user = await UserModel.insertMany(usersData);//{role: 'Admin'}
  console.log(user);
  res.json({});
});

 */
module.exports = router;
