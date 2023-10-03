const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { accessChat, fetchChats, createGroupChat, renameGroup, addToGroup, removeFromGroup } = require('../controllers/chatControllers');

const chatRoutes = express.Router();

 chatRoutes.route('/').get(protect, fetchChats) // fetch all chats of a user
 chatRoutes.route('/').post(protect, accessChat); // one on one chat for a user
 chatRoutes.route("/group").post(protect, createGroupChat); // create a group chat
 chatRoutes.route("/rename").put(protect, renameGroup); // rename a group chat
 chatRoutes.route("/groupadd").put(protect, addToGroup); // add a user to a group chat
 chatRoutes.route("/groupremove").put(protect, removeFromGroup); // remove a user from a group chat

exports.chatRoutes = chatRoutes;