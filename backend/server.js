const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//const {chats} = require('./data/data'); 
const {connectDB} = require('./config/db');
const {userRoutes} = require('./routes/userRoutes');
const {chatRoutes} = require('./routes/chatRoutes');
const {messageRoutes} = require('./routes/messageRoutes');
//const {notFound, errorHandler} = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(cors()); // to allow cross origin requests

app.use(express.json()); // to parse json data in the body of the request



app.get('/', (req, res) => {
    res.send('API is running...');
});

app.use('/api/user', userRoutes);

app.use('/api/chat', chatRoutes);

app.use('/api/messages', messageRoutes);

// app.get('/api/chat', (req, res) => {
//     console.log(chats);
//     res.send(chats);

// });

// app.get('/api/chat/:id', (req, res) => {

//     console.log(req.params.id);

//     const chat = chats.find((c) => c._id === req.params.id);

//     res.send(chat);


// });

//Error Handling middlewares
// app.use(notFound);
// app.use(errorHandler);


const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));

const io =  require('socket.io')(server, {
    pingTimeout: 60000,
    cors: {
        origin: 'http://localhost:3000',
    }
});

io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        // created a room with the user's id
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => { // when we click on any chat this should create
        // a room with that user and another user (when he joins this room this should add him too) 
        socket.join(room);
        console.log("User Joined Room: " + room);
    });

    socket.on("typing", (room) => {
        console.log("typing")
        socket.in(room).emit("typing");
    });

    socket.on("stop typing", (room) => {
        socket.in(room).emit("stop typing");
    });

    socket.on("new message", (newMessageRecieved) => {

        // supposed to manage these messages first and send them to above created rooms first
        var chat = newMessageRecieved.chat;

        if(!chat.users) return console.log("Chat.users not defined");

        chat.users.forEach((user) => {
            // everyone should recieve message except the sender
            if(user._id === newMessageRecieved.sender._id) return;
            socket.in(user._id).emit("message recieved", newMessageRecieved);
            // inside that user's room we are emitting message recieved event
            // newMessageRecieved is the object that we are sending to the client
        });
        
    });

    socket.off("setup", () => {
        console.log("UsSER DISCONNECTED");
        socket.leave(userData._id);
    })

});
