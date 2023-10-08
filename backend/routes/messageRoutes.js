const {sendMessage, allMessages} = require('../controllers/messageController.js');

const express = require('express');
const { protect } = require('../middleware/authMiddleware.js');

const messageRoutes = express.Router();

messageRoutes.route('/').post(protect,sendMessage)
messageRoutes.route('/:chatId').get(protect,allMessages);



exports.messageRoutes = messageRoutes;
