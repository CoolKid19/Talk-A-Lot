const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = new Schema({
    chat: { type: Schema.Types.ObjectId, ref: "Chat" },// the chat that this message belongs to with reference to the Chat model
    sender: { type: Schema.Types.ObjectId, ref: "User" },
    content: { type: String, trim: true },
    readBy: [{ type: Schema.Types.ObjectId, ref: "User" }]
}, { timestamps: true });

const Message = mongoose.model("Message", messageSchema); // "Message" is the name of the collection in the database

Message.export = Message; // export the Message model