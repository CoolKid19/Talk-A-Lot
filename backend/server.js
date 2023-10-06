const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
//const {chats} = require('./data/data'); 
const {connectDB} = require('./config/db');
const {userRoutes} = require('./routes/userRoutes');
const {chatRoutes} = require('./routes/chatRoutes');
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

app.listen(PORT, () => console.log(`Server Running on port ${PORT}`));