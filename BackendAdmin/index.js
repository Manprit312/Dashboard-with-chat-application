const express = require('express');
const app = express();
const port = require('./config');
const multer = require('multer');
const bodyparser = require('body-parser');
const http = require('http');
const { Server } = require('socket.io');
const server = http.createServer(app);

const user = require('./Models/users');
const db = require('./db');
const DeleteMultiple = require('./COntrollers/UserController/DeleteMultipleUser');
const getAllUsers = require('./COntrollers/UserController/getUserController');
const AddUsers = require('./COntrollers/UserController/AddUserController');
const deleteUser = require('./COntrollers/UserController/DeleteUserController');
const EditUser = require('./COntrollers/UserController/EditUserModal');
const cors = require('cors');
const RegisterNewUser = require('./COntrollers/RegisteredUserController/newUser');
const bodyParser = require('body-parser');
const alluser = require('./COntrollers/RegisteredUserController/allusers');
const LoginUser = require('./COntrollers/RegisteredUserController/loginUser');
app.use(cors());

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (data) => {
    console.log('messege from user', data);
    socket.broadcast.emit('usermessege',data);
  });
 
});

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + uniqueSuffix);
  },
});

const upload = multer({ storage: storage, limits: { fieldSize: 1000000 } });
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Handle GET request for the chat page
app.get('/chat', (req, res) => {
  res.render('chat');
});

// Socket.IO event handlers

app.use(bodyParser.json({ limit: '100mb' }));
app.get('/users', getAllUsers.getAllUsers);
app.post('/newUser', AddUsers.AddUsers);
app.get('/allusers', alluser.allusers);
app.post('/loginUser', LoginUser.LoginUser);
app.post('/register', RegisterNewUser.RegisterUser);
app.delete('/deleteUser/:id', deleteUser.DeleteUser);
app.delete('/deleteUserMultiple', DeleteMultiple.DeleteMultiple);
app.put('/editUser/:id', EditUser.EditUser);
// app.listen(port, console.log('app listening on port', port));
server.listen(port, console.log('app listening on port', port));