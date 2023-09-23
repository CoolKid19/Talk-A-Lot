const asyncHandler = require('express-async-handler');

const {User} = require('../models/userModel');
const {Chat} = require('../models/chatModel');


// route responsible for creating or fetching a chat

const accessChat = asyncHandler(async (req, res) => {
    console.log("dsfsd");
   const {userId} = req.body; // loggedin user will provide the id of the user he wants to chat with

   if(!userId){ // if not provided
       res.status(400);
       throw new Error('Please provide a valid user id');
   }

   // check if the chat already exists
   var isChat = await Chat.find({
    isGroupChat: false,
    users: {
        $and: [
            { users: {$elemMatch: {$eq: req.user._id}} },
            { users: {$elemMatch: {$eq: userId}} }
        ]
    }
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

exports.accessChat = accessChat;
