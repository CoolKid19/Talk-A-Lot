const mongoose = require('mongoose');
const {Schema} = mongoose;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
    name: { type: String, trim: true },
    email: { type: String, trim: true, required: true, unique: true },
    password: { type: String, trim: true },
    pic: { type: String, default: "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg" },
}, { timestamps: true });

userSchema.methods.matchPassword = async function (enteredPassword) {   // this function is used to compare the entered password with the password in the database
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function (next) {   // this function is used to hash the password before saving it to the database
    if (!this.isModified('password')) {
        next();
    }

    const salt = await bcrypt.genSalt(10); // generate a salt

    this.password = await bcrypt.hash(this.password, salt); // hash the password
});

const User = mongoose.model("User", userSchema); // "User" is the name of the collection in the database

exports.User = User; // export the User model
