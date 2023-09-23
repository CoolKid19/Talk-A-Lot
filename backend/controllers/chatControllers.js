const asyncHandler = require('express-async-handler');

const {User} = require('../models/userModel');
const {Chat} = require('../models/chatModel');


// route responsible for creating or fetching a chat

const accessChat = asyncHandler(async (req, res) => {
    
   const {userId} = req.body; // loggedin user will provide the id of the user he wants to chat with

   if(!userId){ // if not provided
       res.status(400);
       throw new Error('Please provide a valid user id');
   }

   // check if the chat already exists
   var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
        { users: {$elemMatch: {$eq: req.user._id}} },
        { users: {$elemMatch: {$eq: userId}} }
    ]
    
   }).populate('users', '-password')
        .populate('latestMessage');

        isChat = await User.populate(isChat, // populate the sender field of the latestMessage field of the chat with the user data
            {
                path: 'latestMessage.sender',
                select: 'name pic email'
            });

        if(isChat.length > 0){
            res.status(200).json(isChat[0]);
        }else{
            // if chat does not exist, create a new one

            var chatData = {
                chatName: "sender",
                users: [req.user._id, userId],
                isGroupChat: false
            };

            try{
                const newChat = await Chat.create(chatData);

                const fullChat = await Chat.findById(newChat._id)
                                    .populate('users', '-password'); // populate the users field of the chat with the user data


                res.status(201).json(fullChat);
            }catch(err){
                console.log(err);
            }
        }

});

// route responsible for fetching all chats of a user

const fetchChats = asyncHandler(async (req, res) => {

    try{
        console.log(req);
        const chats = await Chat.find({
            users: {$elemMatch: {$eq: req.user._id}}
        })
        .populate('users', '-password')
        .populate('groupAdmin', '-password')
        .populate('latestMessage')
        .sort({updatedAt: -1})
        .then(async (results) => {
            results = await User.populate(results, // populate the sender field of the latestMessage field of the chat with the user data
                {
                    path: 'latestMessage.sender',
                    select: 'name pic email'
                });

            res.status(200).json(results);
        });

    }catch(err){
        console.log(err);
    }



});


// route responsible for creating a group chat

const createGroupChat = asyncHandler(async (req, res) => {

    if(!req.body.users || !req.body.chatName){
        res.status(400);
        throw new Error('Please provide users and chat name');
    }

    const users = JSON.parse(req.body.users); // parse the stringified users array

    if(users.length < 2){
        res.status(400);
        throw new Error('Please provide users');
    }

    users.push(req.user); // add the loggedin user to the users array

    // create the group chat

    try{

        var groupChat = await Chat.create({
            isGroupChat: true,
            chatName: req.body.chatName,
            users: users,
            groupAdmin: req.user
        });
    
        const fullChat = await Chat.findById(groupChat._id)
                                .populate('users', '-password')
                                .populate('groupAdmin', '-password');
    
        res.status(201).json(fullChat);

    }catch(err){
        console.log(err);
    }

});


exports.createGroupChat = createGroupChat;
exports.fetchChats = fetchChats;
exports.accessChat = accessChat;
