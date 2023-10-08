const asyncHandler = require('express-async-handler');
const { Message } = require('../models/messageModel');
const { User } = require('../models/userModel');
const { Chat } = require('../models/chatModel');

const sendMessage = asyncHandler(async (req, res) => {
    const { content, chatId } = req.body;
    if(!content || !chatId) {
        console.log('Please enter all fields');
        res.status(400);
        throw new Error('Please enter all fields');
    }

    var newMessage = {
        content : content,
        chat: chatId,
        sender: req.user._id,
    }

    console.log(newMessage);

    try{
        // fix this line
        var message = await Message.create(newMessage);

        message = await message.populate("sender", "name pic", );
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message 
        });

        res.status(201).json(message);


    }catch(err){
        console.log(err);
        console.log('Server Error 301');
        res.status(500);
        throw new Error('Server Error 301');
    }


});

const allMessages = asyncHandler(async (req, res) => {






});

exports.sendMessage = sendMessage;
exports.allMessages = allMessages;