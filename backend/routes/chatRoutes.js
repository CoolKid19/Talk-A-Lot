const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { accessChat, fetchChats, createGroupChat } = require('../controllers/chatControllers');

const chatRoutes = express.Router();

 chatRoutes.route('/').get(protect, fetchChats) // fetch all chats of a user
 chatRoutes.route('/').post(protect, accessChat); // one on one chat for a user
 chatRoutes.route("/group").post(protect, createGroupChat); // create a group chat
// chatRoutes.route("/rename").put(protect, renameGroup);
// chatRoutes.route("/groupremove").put(protect, removeFromGroup);
// chatRoutes.route("/groupadd").put(protect, addToGroup);

exports.chatRoutes = chatRoutes;