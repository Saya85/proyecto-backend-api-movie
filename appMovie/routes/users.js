var express = require('express');
var User = require('../models/User')
var router = express.Router();

const auth = require('../middlewares/auth');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const users = await User.find({});//{role: 'Admin'}
  // user.role = 'user';
  // await user.replaceOne(user);
  
  // console.log(users.toObject());
  console.log(users)
  let result = (users.length > 0)? users: [{message: "No hay usuarios que mostrar."}];
  res.json(result)
});

router.post('/register', async (req, res, next) => {

  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;

  // Valido los datos recibidos. Si son incorrectos, devuelvo ko
  // Valido que el correo no existe
  const userExists = await User.findOne({ email: email});
  if (userExists !== null) { return res.status(401).json({message: 'email incorrecto'}); }

  // Valido que el password tiene el formato correcto (minlength: 6)
  if (password.length < 6 ) return res.status(401).json({message: 'password incorrecto. Debe tener almenos 6 caracteres.'});
    
  // Guardo los datos
  const user = await User.create({name: name, email: email, password: password})
  
  // Respondo ok o ko
  if ( user === null) return res.status(500).json({message: 'Internal error. Please, contact with the administrator'});

  res.json({message: 'User registered!!!!'}).status(204);
  //res.status(501).json({});
});

router.post('/login', async(req, res) => {
  //Login a registered user
  try {
    const { email, password } = req.body
    const user = await User.findByCredentials(email, password)
    if (!user) {
       return res.status(401).send({error: 'Login failed! Check authentication credentials'})
    }
    const token = await user.generateAuthToken();
    res.json({ "user": {"email": user.email, "name": user.name}, token })
  } catch (error) {
     res.status(400).send(error)
  }

})

// router.get('/logout', auth, async (req, res, next) => {
//   res.status(501).json({});
// });

// router.get('/profile', /*auth,*/ async (req, res, next) => {
//   res.status(501).json({});
// });

router.get('/profile', auth, async function(req, res, next) {
  res.json(req.user)
});

router.delete('/delete/:id', /*auth,*/ async (req, res, next) => {
  const result = await User.remove({_id: req.params.id});
  if (result === 0) res.status(200).json({message: "No se ha podido eliminar al usuario."});

  res.json({message: "El usuario ha sido eliminado correctamente."}).status(204);
});

// router.put('/change-password/:id', auth, async (req, res, next) => {
//   // Only users who has admin role;
//   res.status(501).json({});
// });

// router.put('/change-profile/:id', auth, async (req, res, next) => {
//   // Only users who has admin role;
//   res.status(501).json({});
// });

// router.get('/create', async function(req, res) {
//   //res.send('respond with a resource');
//   const teacherData = [{
//       name: "Jordi Valentín",
//       email: 'test@test.com',
//       password: 123456,
//       tokens:[
//         'aaaa-aaaaa-aaaaa',
//         'aaaa-aaaaa-aaaaa'
//       ]
//     },
//     {
//       name: "Rafa Garcia",
//       email: 'test2@test.com',
//       password: 123456,
//       tokens:[
//         'aaaa-aaaaa-aaaaa',
//         'aaaa-aaaaa-aaaaa'
//       ]
//     }]
//   const user = await User.insertMany(teacherData);//{role: 'Admin'}
//   //const user = await User.find();//{role: 'Admin'}
//   //user.role = 'user';
//   //await user.replaceOne(user);
//   console.log(user);
//   res.json({});
// });

module.exports = router;
